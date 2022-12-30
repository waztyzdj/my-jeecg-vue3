<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
        <!-- <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <OaDefineFormModal @register="registerModal" @success="handleSuccess"></OaDefineFormModal>
    <!-- 设计区域 -->
    <OaDefineFormDesignModal @register="designModal" :minHeight="100" @success="handleSuccess" />
    <!-- 历史版本列表 -->
    <OaDefineFormVersionListModal @register="versionListModal" width="60%" />
  </div>
</template>

<script lang="ts" name="define-oaDefineForm" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import OaDefineFormModal from './components/OaDefineFormModal.vue';
import OaDefineFormDesignModal from './components/OaDefineFormDesignModal.vue';
import OaDefineFormVersionListModal from './components/OaDefineFormVersionListModal.vue';
import { columns, searchFormSchema } from './OaDefineForm.data';
import { list, deleteOne, audit, addConfig, batchDelete, getImportUrl, getExportUrl } from './OaDefineForm.api';
import { downloadFile } from '/@/utils/common/renderUtils';

const checkedKeys = ref<Array<string | number>>([]);
//注册model
const [registerModal, { openModal }] = useModal();
const [designModal, { openModal: openDesignModal }] = useModal();
const [versionListModal, { openModal: openVersionListModal }] = useModal();

//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '表单定义',
    api: list,
    columns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [],
      fieldMapToTime: [],
    },
    actionColumn: {
      width: 400,
      fixed: 'right',
    },
  },
  exportConfig: {
    name: '表单定义',
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess,
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
  });
}
/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}
/**
 * 配置流程
 */
function handleConfig(id: string) {
  openDesignModal(true, {
    id: id,
    isUpdate: false,
    showFooter: false,
  });
}
/**
 * 配置新版本
 */
async function handleAddConfig(record: Recordable) {
  const res = await addConfig(record);
  handleSuccess();
  openDesignModal(true, {
    id: res.editVersionId,
    isUpdate: false,
    showFooter: false,
  });
}
/**
 * 详情
 */
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: false,
  });
}
/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, handleSuccess);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
}
/**
 * 发布事件
 */
async function handleAudit(record) {
  await audit(record, handleSuccess);
}
/**
 * 查看历史版本
 */
function handleVersionList(id: string) {
  openVersionListModal(true, {
    id: id,
    isUpdate: false,
    showFooter: false,
  });
}
/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}
/**
 * 操作栏
 */
function getTableAction(record) {
  if(record.status == '0') {// 编辑状态
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '配置',
        onClick: handleConfig.bind(null, record.editVersionId),
      },
      {
        label: '发布',
        popConfirm: {
          title: '是否确认发布',
          confirm: handleAudit.bind(null, record),
        },
      },
    ];
  } else if(record.status == '1') {// 版本已发布状态
    return [
      {
        label: '配置新版本',
        onClick: handleAddConfig.bind(null, record),
      },
      {
        label: '查看已发布表单',
        onClick: handleConfig.bind(null, record.publishVersionId),
      },
    ];
  } else if(record.status == '2') {// 旧版本已发布，新版本编辑中状态
    return [
      {
        label: '配置新版本',
        onClick: handleConfig.bind(null, record.editVersionId),
      },
      {
        label: '发布新版本',
        popConfirm: {
          title: '是否确认发布新版本',
          confirm: handleAudit.bind(null, record),
        },
      },
      {
        label: '查看已发布流程',
        onClick: handleConfig.bind(null, record.publishVersionId),
      },
    ];
  }
}
/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
  if(record.status == '0') {// 编辑状态
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  } else {// 版本已发布状态
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '查看历史版本',
        onClick: handleVersionList.bind(null, record.id),
      },
    ];
  }
}
</script>

<style scoped>
</style>
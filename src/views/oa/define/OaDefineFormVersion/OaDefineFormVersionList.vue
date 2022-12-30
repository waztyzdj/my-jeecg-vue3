<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 设计区域 -->
    <OaDefineFormDesignModal @register="designModal" :minHeight="100" />
  </div>
</template>

<script lang="ts" name="define-oaDefineFormVersion" setup>
import { ref, onUpdated } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import OaDefineFormDesignModal from '/@/views/oa/define/OaDefineForm/components/OaDefineFormDesignModal.vue';
import { columns, searchFormSchema } from './OaDefineFormVersion.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './OaDefineFormVersion.api';
import { downloadFile } from '/@/utils/common/renderUtils';
const checkedKeys = ref<Array<string | number>>([]);
//注册model
const [designModal, { openModal: openDesignModal }] = useModal();
//注册table数据
const { tableContext } = useListPage({
  tableProps: {
    api: loadList,
    columns,
    canResize: false,
    useSearchForm: false,
    showTableSetting: false,
    showIndexColumn: false,
    actionColumn: {
      width: 120,
      fixed: 'right',
    },
  },
});

const [registerTable, { reload }] = tableContext;

// 流程DSL
const props = defineProps({
  formId: {
    type: String,
    default: ref(''),
  },
});

async function loadList() {
  return list({ formId: props.formId });
}
/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '查看配置',
      onClick: handleConfig.bind(null, record.id),
    },
  ];
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
onUpdated(() => {
  reload();
});
</script>

<style scoped>
</style>
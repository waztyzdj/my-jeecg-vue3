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
    <OaDefineFlowDesignModal @register="designModal" :minHeight="100"/>
  </div>
</template>

<script lang="ts" name="define-oaDefineFlowVersion" setup>
import { ref, onUpdated } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import OaDefineFlowDesignModal from '/@/views/oa/define/OaDefineFlow/components/OaDefineFlowDesignModal.vue';
import { columns } from './OaDefineFlowVersion.data';
import { list } from './OaDefineFlowVersion.api';
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
  }
});

const [registerTable, { reload }] = tableContext;

// 流程DSL
const props = defineProps({
  flowId: {
    type: String,
    default: ref(''),
  },
});

async function loadList() {
  return list({ flowId: props.flowId });
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
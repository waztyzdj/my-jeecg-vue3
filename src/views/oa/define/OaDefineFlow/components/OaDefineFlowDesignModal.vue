<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="流程配置"
    :helpMessage="['请拖拽图标配置流程！']"
    width="100%"
    wrap-class-name="flow-full-modal"
    :footer="null"
  >
    <flow-designer ref="flowDesignerRef" @saveFlow="update" v-if="isShowDesigner"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref, nextTick } from 'vue';
import { cloneDeep } from 'lodash-es';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { FlowDesigner } from '/@/components/Flow/Designer';
import { flowConfig as defaultFlowConfig } from '/@/config/flow/flow';
import { list, saveOrUpdate } from '/@/views/oa/define/OaDefineFlowVersion/OaDefineFlowVersion.api';

// Emits声明
const emits = defineEmits(['register', 'success']);
const flowDesignerRef = ref();
const [registerModal] = useModalInner((data) => {
  isShowDesigner.value = false;
  data && onDataReceive(data);
});

const isShowDesigner = ref(false);

// 流程配置
const flowConfig = ref(cloneDeep(defaultFlowConfig));
let oaDefineFlowVersion: { id: string; flowId: string; flowName: string; versionNo: string; configJson: string; status: string };
async function onDataReceive(data) {
  const param = { id: data.id ? data.id : '', pageSize: 1 };
  const res = await list(param);
  isShowDesigner.value = true;
  if (res.records) {
    oaDefineFlowVersion = res.records[0];
    if (oaDefineFlowVersion.configJson) {
      nextTick(() => {flowDesignerRef.value.loadFlow(oaDefineFlowVersion.configJson, oaDefineFlowVersion.status);});
    } else {
      const flowData = {
        nodeList: [],
        linkList: [],
        attr: {
          id: '',
          flowName: '',
          status: '0',
        },
        config: {
          showGrid: true,
          showGridText: '隐藏网格',
          showGridIcon: 'EyeOutlined',
        },
        status: unref(flowConfig).flowStatus.CREATE,
      };
      nextTick(() => {flowDesignerRef.value.loadFlow(JSON.stringify(flowData), '0');});
    }
  }
}

async function update() {
  oaDefineFlowVersion.configJson = flowDesignerRef.value.getFlowDataConfigJson();
  await saveOrUpdate(oaDefineFlowVersion, true);
  emits('success');
}
</script>
<style lang="less">
.flow-full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
    .scrollbar {
      padding: 0px;
    }
    .scroll-container {
      .scrollbar__wrap {
        margin-bottom: 18px !important;
        overflow: hidden;
      }
    }
  }
}
</style>
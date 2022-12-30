<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="表单配置"
    :helpMessage="['请拖拽图标配置表单！']"
    width="100%"
    wrap-class-name="form-full-modal"
    :footer="null"
  >
    <antd-design-form ref="formDesignerRef" 
      @saveForm="update" 
      :uploadJson="false" 
      :generateJson="false" 
      :generateCode="false" 
      :clearable="isEdit" 
      :saveable="isEdit" 
      v-if="isShowDesigner"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref, nextTick } from 'vue';
import { cloneDeep } from 'lodash-es';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { AntdDesignForm } from '/@/components/DesignForm';
import { list, saveOrUpdate } from '/@/views/oa/define/OaDefineFormVersion/OaDefineFormVersion.api';

// Emits声明
const emits = defineEmits(['register', 'success']);
const formDesignerRef = ref();
const [registerModal] = useModalInner((data) => {
  isShowDesigner.value = false;
  data && onDataReceive(data);
});

const isShowDesigner = ref(false);
const isEdit = ref(true);

// 流程配置
let oaDefineFormVersion: { id: string; formId: string; formName: string; versionNo: string; configJson: string; status: string };
async function onDataReceive(data) {
  const param = { id: data.id ? data.id : '', pageSize: 1 };
  const res = await list(param);
  isShowDesigner.value = true;
  if (res.records) {
    oaDefineFormVersion = res.records[0];
    if (oaDefineFormVersion.configJson) {
      nextTick(() => {formDesignerRef.value.setJson(JSON.parse(oaDefineFormVersion.configJson));});
      if(oaDefineFormVersion.status == '1') {
        isEdit.value = false;
      } else {
        isEdit.value = true;
      }
    }
  }
}

async function update() {
  oaDefineFormVersion.configJson = JSON.stringify(formDesignerRef.value.getJson());
  await saveOrUpdate(oaDefineFormVersion, true);
  emits('success');
}
</script>
<style lang="less">
.form-full-modal {
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
        overform: hidden;
      }
    }
  }
}
</style>
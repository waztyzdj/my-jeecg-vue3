<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="流程历史版本"
    :footer="null"
  >
    <OaDefineFlowVersionList :flowId="flowId"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import { reactive, ref, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { OaDefineFlowVersionList } from '/@/views/oa/define/index'

// Emits声明
const emits = defineEmits(['register', 'success']);

let flowId = ref();
const [registerModal] = useModalInner((data) => {
  flowId.value = data.id;
});
</script>
<style lang="less">
</style>
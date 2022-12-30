<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="表单历史版本"
    :footer="null"
  >
    <OaDefineFormVersionList :formId="formId"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import { reactive, ref, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { OaDefineFormVersionList } from '/@/views/oa/define/index'

// Emits声明
const emits = defineEmits(['register', 'success']);

let formId = ref();
const [registerModal] = useModalInner((data) => {
  formId.value = data.id;
});
</script>
<style lang="less">
</style>
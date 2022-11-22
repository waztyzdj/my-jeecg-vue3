<template>
  <a-layout-header class="btn-bar">
    <slot></slot>
    <a-button v-if="$attrs.uploadJson" type="link" size="small" @click="$emit('uploadJson')">
      <span><SvgIcon icon="material-symbols:drive-folder-upload-outline-rounded" />导入JSON</span>
    </a-button>
    <a-button v-if="$attrs.clearable" type="link" size="small" @click="$emit('clearable')">
      <span><SvgIcon icon="material-symbols:delete-outline" /> 清空</span>
    </a-button>
    <a-button v-if="$attrs.preview" type="link" size="small" @click="$emit('preview')">
      <span><SvgIcon icon="icon-park-outline:preview-open" />预览</span>
    </a-button>
    <a-button v-if="$attrs.generateJson" type="link" size="small" @click="$emit('generateJson')">
      <span><SvgIcon icon="carbon:json-reference" /> 生成JSON</span>
    </a-button>
    <a-button v-if="$attrs.generateCode" type="link" size="small" @click="$emit('generateCode')">
      <span><SvgIcon icon="ph:file-vue-light" /> 生成代码</span>
    </a-button>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '/@/components/DesignForm/components/SvgIcon.vue';

export default defineComponent({
  name: 'AntdHeader',
  components: {
    SvgIcon,
  },
  emits: ['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode'],
});
</script>

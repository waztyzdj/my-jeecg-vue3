<template>
  <div class="flow-header-option">
    <div class="flow-header-option__tools">
      <span v-for="tool in tools" :key="tool.type">
        <a-tooltip :title="tool.nodeName" placement="right">
          <ant-button
            size="small"
            :type="currentTool.type === tool.type ? 'primary' : 'default'"
            @click="selectTool(tool.type)"
          >
            <template #icon>
              <component :is="tool.icon" />
            </template>
          </ant-button>
        </a-tooltip>
      </span>
    </div>

    <div class="flow-header-option__buttons">
      <a-tooltip title="生成流程图片" placement="bottom">
        <ant-button @click="emits('generateFlowImage')" class="flow-header-option__button" size="small">
          <template #icon>
            <component :is="'PictureOutlined'" />
          </template>
        </ant-button>
      </a-tooltip>

      <a-popconfirm
        title="确认要重新绘制吗？"
        placement="bottom"
        okText="确认"
        cancelText="取消"
        @confirm="emits('clear')"
      >
        <a-tooltip title="重新绘制" placement="bottom">
          <ant-button class="flow-header-option__button" size="small">
            <template #icon>
              <component :is="'DeleteOutlined'" />
            </template>
          </ant-button>
        </a-tooltip>
      </a-popconfirm>

      <a-tooltip :title="flowData.config.showGridText" placement="bottom">
        <ant-button @click="emits('toggleShowGrid')" class="flow-header-option__button" size="small">
          <component :is="flowData.config.showGridIcon" />
        </ant-button>
      </a-tooltip>

      <a-tooltip title="设置" placement="bottom">
        <ant-button @click="emits('setting')" class="flow-header-option__button" size="small">
          <template #icon>
            <component :is="'SettingOutlined'" />
          </template>
        </ant-button>
      </a-tooltip>

      <a-tooltip title="测试" placement="bottom">
        <ant-button @click="emits('openTest')" class="flow-header-option__button" size="small">
          <template #icon>
            <component :is="'ToolOutlined'" />
          </template>
        </ant-button>
      </a-tooltip>

      <a-tooltip title="快捷键大全" placement="bottom">
        <ant-button @click="emits('shortcutHelper')" class="flow-header-option__button" size="small">
          <template #icon>
            <component :is="'BookOutlined'" />
          </template>
        </ant-button>
      </a-tooltip>

      <a-tooltip title="保存流程" placement="bottom">
        <ant-button @click="emits('saveFlow')" class="flow-header-option__button" size="small">
          <template #icon>
            <component :is="'SaveOutlined'" />
          </template>
        </ant-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue';
  import { ITool } from '/@/type/flow/index';
  import { ToolsTypeEnum } from '/@/type/flow/enums';
  import { tools } from '/@/config/flow/tools';
  import { Button as AntButton } from 'ant-design-vue';
  defineProps({
    currentTool: {
      type: Object as PropType<ITool>,
      default: () => ({}),
    },
    flowData: {
      type: Object,
      default: () => ({}),
    },
  });

  const emits = defineEmits([
    'selectTool',
    'generateFlowImage',
    'clear',
    'toggleShowGrid',
    'setting',
    'openTest',
    'shortcutHelper',
    'saveFlow',
  ]);

  function selectTool(type: ToolsTypeEnum) {
    emits('selectTool', type);
  }
</script>
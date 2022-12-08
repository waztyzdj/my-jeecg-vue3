<template>
  <a-tabs size="small" :activeKey="activeKey">
    <!-- 流程属性 -->
    <a-tab-pane key="flow-attr">
      <template #tab>
        <span>
          <component :is="'ClusterOutlined'" />
          流程属性
        </span>
      </template>
      <a-form layout="vertical">
        <a-form-item label="流程名称">
          <a-input :value="flowData.attr.flowName" disabled />
        </a-form-item>
      </a-form>
    </a-tab-pane>
    <!-- 节点属性 -->
    <a-tab-pane key="node-attr">
      <template #tab>
        <span>
          <component :is="'ProfileOutlined'" />
          节点属性
        </span>
      </template>
      <a-form layout="vertical">
        <a-form-item label="类型">
          <a-tag color="purple">{{ currentSelect.type }}</a-tag>
        </a-form-item>
        <a-form-item label="名称" v-if="isAllowChange(currentSelect.type as NodesType)">
          <a-input
            placeholder="请输入节点名称"
            :value="(currentSelect as INode)?.nodeName"
            @change="nodeNameChange"
          />
        </a-form-item>
        <template v-if="currentSelect.type=='common'">
        <a-form-item label="流转类型" required>
          <a-select :value="(currentSelect as INode)?.flowType" 
            @change="flowTypeChange">
            <a-select-option value="parallel">并行</a-select-option>
            <a-select-option value="serial">串行</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="是否允许回退">
          <a-checkbox :checked="(currentSelect as INode)?.isBack" @change="isBackChange"/>
        </a-form-item>
        <a-form-item label="是否自我循环">
          <a-checkbox :checked="(currentSelect as INode)?.isLoop" @change="isLoopChange"/>
        </a-form-item>
        </template>
      </a-form>
    </a-tab-pane>
    <!-- 连线属性 -->
    <a-tab-pane key="link-attr">
      <template #tab>
        <span>
          <component :is="'BranchesOutlined'" />
          连线属性
        </span>
      </template>
      <a-form layout="vertical">
        <a-form-item label="源节点">
          <a-input :value="(currentSelect as ILink)?.sourceName" disabled />
        </a-form-item>
        <a-form-item label="目标节点">
          <a-input :value="(currentSelect as ILink)?.targetName" disabled />
        </a-form-item>
        <a-form-item label="文本">
          <a-input :value="(currentSelect as ILink)?.label" @change="linkLabelChange" />
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup>
  import { ChangeEvent } from 'ant-design-vue/lib/_util/EventInterface';
  import { ref, watch, unref, PropType } from 'vue';
  import { INode, ILink, NodesType } from '/@/type/flow/index';
  import { CommonNodeTypeEnum } from '/@/type/flow/enums';

  const props = defineProps({
    plumb: {
      type: Object,
      default: () => ({}),
    },
    flowData: {
      type: Object,
      default: () => ({}),
    },
    select: {
      type: Object as PropType<INode | ILink>,
      default: () => ({}),
    },
  });

  const emits = defineEmits(['update:select']);

  const currentSelect = ref<INode | ILink>(props.select);

  const activeKey = ref<string>('flow-attr');

  // 修改节点名称
  function nodeNameChange(e: ChangeEvent) {
    (currentSelect.value as INode).nodeName = e.target.value ?? '';
    // 同时修改连线的节点名称
    props.flowData.linkList.forEach((link: ILink) => {
      if(link.sourceId === currentSelect.value.id) {
        link.sourceName = e.target.value ?? '';
      }
      if(link.targetId === currentSelect.value.id) {
        link.targetName = e.target.value ?? '';
      }
    });
  }
  // 修改流转类型
  function flowTypeChange(value) {
    (currentSelect.value as INode).flowType = value ?? '';
  }
  // 修改是否允许回退
  function isBackChange(e) {
    (currentSelect.value as INode).isBack = e.target.checked ?? '';
  }
  // 修改是否自我循环
  function isLoopChange(e) {
    (currentSelect.value as INode).isLoop = e.target.checked ?? '';
  }

  // 是否可以修改节点名称
  function isAllowChange(type: NodesType) {
    return ![
      CommonNodeTypeEnum.START,
      CommonNodeTypeEnum.END,
      CommonNodeTypeEnum.GATEWAY,
      CommonNodeTypeEnum.EVENT,
    ].includes(type as CommonNodeTypeEnum);
  }

  // 修改连接文本
  function linkLabelChange(e: ChangeEvent) {
    let label = e.target.value ?? '';
    (currentSelect.value as ILink).label = label;
    let conn = props.plumb.getConnections({
      source: (unref(currentSelect) as ILink).sourceId,
      target: (unref(currentSelect) as ILink).targetId,
    })[0];
    let link_id = conn.canvas.id;
    let labelHandle = (e: Event) => {
      e.stopPropagation();
      currentSelect.value = props.flowData.linkList.find((l: ILink) => l.id === link_id);
    };

    if (label !== '') {
      conn.setLabel({
        label: label,
        cssClass: `linkLabel ${link_id}`,
      });
      // 添加label点击事件
      document.querySelector('.' + link_id)?.addEventListener('click', labelHandle);
    } else {
      // 移除label点击事件
      document.querySelector('.' + link_id)?.removeEventListener('click', labelHandle);

      let labelOverlay = conn.getLabelOverlay();
      if (labelOverlay) conn.removeOverlay(labelOverlay.id);
    }
  }

  watch(
    () => props.select,
    (val) => {
      currentSelect.value = val;
      if (!unref(currentSelect)?.type) {
        activeKey.value = 'flow-attr';
      } else if (unref(currentSelect)?.type === 'link') {
        activeKey.value = 'link-attr';
      } else {
        activeKey.value = 'node-attr';
      }
    },
    { deep: true },
  );

  watch(
    () => currentSelect.value,
    (currentSelect) => {
      emits('update:select', currentSelect);
    },
  );
</script>

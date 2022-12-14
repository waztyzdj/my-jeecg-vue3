<template>
  <div
    v-if="
      node.type === CommonNodeTypeEnum.START ||
      node.type === CommonNodeTypeEnum.END ||
      node.type === CommonNodeTypeEnum.EVENT
    "
    :id="node.id"
    class="common-circle-node"
    :class="{
      active: isActive(),
      isStart: node.type === CommonNodeTypeEnum.START,
      isEnd: node.type === CommonNodeTypeEnum.END,
    }"
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      cursor: setCursor(currentTool.type),
    }"
    @click.stop="selectNode"
    @contextmenu.stop="showNodeContextMenu"
  >
    {{ node.nodeName }}
  </div>

  <div
    v-else-if="
      node.type === CommonNodeTypeEnum.COMMON ||
      node.type === CommonNodeTypeEnum.FREEDOM ||
      node.type === HighNodeTypeEnum.CHILD_FLOW
    "
    :id="node.id"
    class="common-rectangle-node"
    :class="{ active: isActive() }"
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      cursor: setCursor(currentTool.type),
    }"
    @click.stop="selectNode"
    @contextmenu.stop="showNodeContextMenu"
  >
    <component :is="setIcon(node.type)" class="node-icon" />
    {{ node.nodeName }}
  </div>

  <div
    v-else-if="node.type === CommonNodeTypeEnum.GATEWAY"
    :id="node.id"
    class="common-diamond-node"
    :class="{ active: isActive() }"
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      cursor: setCursor(currentTool.type),
    }"
    @click.stop="selectNode"
    @contextmenu.stop="showNodeContextMenu"
  >
  </div>

  <div
    v-else-if="node.type === LaneNodeTypeEnum.X_LANE"
    :id="node.id"
    class="common-x_lane-node"
    :class="{ active: isActive() }"
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      height: node.height + 'px',
      width: node.width + 'px',
    }"
  >
    <div
      class="lane-text-div"
      :style="{ cursor: setCursor(currentTool.type) }"
      @click.stop="selectNode"
      @contextmenu.stop="showNodeContextMenu"
    >
      <span class="lane-text">{{ node.nodeName }}</span>
    </div>
  </div>

  <div
    v-else-if="node.type === LaneNodeTypeEnum.Y_LANE"
    :id="node.id"
    class="common-y_lane-node"
    :class="{ active: isActive() }"
    :style="{
      top: node.y + 'px',
      left: node.x + 'px',
      height: node.height + 'px',
      width: node.width + 'px',
    }"
  >
    <div
      class="lane-text-div"
      :style="{ cursor: setCursor(currentTool.type) }"
      @click.stop="selectNode"
      @contextmenu.stop="showNodeContextMenu"
    >
      <span class="lane-text">{{ node.nodeName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, unref, watch, onMounted, PropType, reactive } from 'vue';
  import { Resizable } from 'resizable-dom';
  import {
    CommonNodeTypeEnum,
    HighNodeTypeEnum,
    LaneNodeTypeEnum,
    ToolsTypeEnum,
  } from '/@/type/flow/enums';
  import { INode, ILink, ITool, NodesType } from '/@/type/flow/index';

  const props = defineProps({
    select: {
      type: Object as PropType<INode | ILink>,
      default: () => ({}),
    },
    selectGroup: {
      type: Array as PropType<INode[]>,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    node: {
      type: Object as PropType<INode>,
      default: () => ({}),
    },
    plumb: {
      type: Object,
      default: () => ({}),
    },
    currentTool: {
      type: Object as PropType<ITool>,
      default: () => ({}),
    },
  });

  const emits = defineEmits([
    'update:select',
    'update:selectGroup',
    'alignForLine',
    'updateNodePos',
    'hideAlignLine',
    'isMultiple',
    'showNodeContextMenu',
  ]);

  // ????????????
  const flowConfig = reactive(props.config);

  // ??????????????????
  const currentNode = reactive(props.node);

  // ?????????????????????
  const currentSelect = ref(props.select);

  // ????????????????????????
  const currentSelectGroup = ref(props.selectGroup);

  // ??????ICON
  function setIcon(type: NodesType) {
    switch (type) {
      case CommonNodeTypeEnum.COMMON:
        return 'UserOutlined';
      case CommonNodeTypeEnum.FREEDOM:
        return 'SyncOutlined';
      case HighNodeTypeEnum.CHILD_FLOW:
        return 'ApartmentOutlined';
      default:
        return 'ToolOutlined';
    }
  }

  // ??????????????????
  function setCursor(type: ToolsTypeEnum) {
    switch (type) {
      case 'drag':
        return 'move';
      case 'connection':
        return 'crosshair';
      default:
        return 'default';
    }
  }

  // ??????????????????
  function registerNode() {
    props?.plumb?.draggable(currentNode.id, {
      containment: 'parent',
      handle: (e, el: HTMLElement) => {
        // ??????????????????
        let possibles =
          el?.parentNode?.querySelectorAll(
            '.common-circle-node,.common-rectangle-node,.common-diamond-node,.lane-text-div',
          ) ?? [];

        for (let i = 0; i < possibles?.length; i++) {
          if (possibles[i] === el || e?.target?.className === 'lane-text') return true;
        }

        return false;
      },
      grid: flowConfig.defaultStyle.alignGridPX,
      drag: (e) => {
        if (flowConfig.defaultStyle.isOpenAuxiliaryLine) {
          emits('alignForLine', e);
        }
      },
      stop: (e) => {
        currentNode.x = e.pos[0];
        currentNode.y = e.pos[1];

        // ????????????
        if (currentSelectGroup.value.length > 1) {
          // ?????????????????????
          emits('updateNodePos');
        }
        // ???????????????
        emits('hideAlignLine');
      },
    });

    if (
      currentNode.type === LaneNodeTypeEnum.X_LANE ||
      currentNode.type === LaneNodeTypeEnum.Y_LANE
    ) {
      let node = document.querySelector('#' + currentNode.id) as HTMLElement;
      new Resizable(
        node,
        {
          handles: ['e', 'w', 'n', 's', 'nw', 'ne', 'sw', 'se'],
          initSize: {
            maxWidth: 1000,
            maxHeight: 1000,
            minWidth: 200,
            minHeight: 200,
          },
        },
        () => {
          currentNode.height = Math.ceil(parseInt(node.style.height));
          currentNode.width = Math.ceil(parseInt(node.style.width));
        },
      );
    }
    currentSelect.value = currentNode;
    currentSelectGroup.value = [];
  }

  // ????????????
  function selectNode() {
    currentSelect.value = currentNode;
    emits('isMultiple', (flag: boolean) => {
      if (!flag) {
        currentSelectGroup.value = [];
      } else {
        let f = unref(currentSelectGroup).find((s) => s.id === currentNode.id);
        if (f) {
          props.plumb.addToDragSelection(currentNode.id);
          currentSelectGroup.value.push(currentNode);
        }
      }
    });
  }
  // ????????????
  function showNodeContextMenu(e: MouseEvent) {
    emits('showNodeContextMenu', e);
    selectNode();
  }
  // ??????????????????
  function isActive() {
    if (!unref(currentSelect)) {
      return false;
    }
    if (unref(currentSelect).id === currentNode.id) return true;
    let f = unref(currentSelectGroup).find((n) => n.id === currentNode.id);
    return !!f;
  }

  watch(
    () => props.select,
    (val) => {
      currentSelect.value = val;
    },
    { deep: true },
  );

  watch(
    () => currentSelect.value,
    (currentSelect) => {
      emits('update:select', currentSelect);
    },
  );

  watch(
    () => props.selectGroup,
    (val) => {
      currentSelectGroup.value = val;
    },
  );

  watch(
    () => currentSelectGroup.value,
    (currentSelectGroup) => {
      emits('update:selectGroup', currentSelectGroup);
    },
  );

  onMounted(() => {
    registerNode();
  });
</script>

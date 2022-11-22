<template>
  <div class="widget-cate">{{ title }}</div>
  <Draggable tag="ul" item-key="type" ghostClass="ghost" :group="{ name: 'people', pull: 'clone', put: false }" :sort="false" :list="list">
    <template #item="{ element }">
      <li v-if="fields.includes(element.type)" class="form-edit-widget-label" :class="{ 'no-put': element.tpye === 'divider' }">
        <a>
          <Icon :icon="element.icon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
          <span>{{ element.label }}</span>
        </a>
      </li>
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Draggable from 'vuedraggable';
import Icon from '/@/components/Icon/index';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    Icon,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    fields: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    list: {
      required: true,
    },
  },
  setup(props) {
    const { prefixCls } = useDesign('basic-menu-item-content');

    return {
      prefixCls
    };
  },
});
</script>

<template>
  <span ref="elRef" :class="[svgClass, $attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']" :style="getWrapStyle" v-on="$attrs"></span>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch, nextTick, unref, CSSProperties } from 'vue';
import { isString } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';
import Iconify from '@purge-icons/generated';

const SVG_END_WITH_FLAG = '|svg';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    className: {
      type: String,
      default: '',
    },
    // icon name
    icon: propTypes.string,
    color: propTypes.string,
    // icon size
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
    spin: propTypes.bool.def(false),
    prefix: propTypes.string.def(''),
  },
  setup(props) {
    const elRef = ref<ElRef>(null);

    const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG));

    const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return 'svg-icon';
      }
    });

    const getWrapStyle = computed((): CSSProperties => {
      const { size, color } = props;
      let fs = size;
      if (isString(size)) {
        fs = parseInt(size, 10);
      }

      return {
        fontSize: `${fs}px`,
        color: color,
        display: 'inline-flex',
      };
    });

    const update = async () => {
      if (unref(isSvgIcon)) return;

      const el = unref(elRef);
      if (!el) return;

      await nextTick();
      const icon = unref(getIconRef);
      if (!icon) return;

      const svg = Iconify.renderSVG(icon, {});
      if (svg) {
        el.textContent = '';
        el.appendChild(svg);
      } else {
        const span = document.createElement('span');
        span.className = 'iconify';
        span.dataset.icon = icon;
        el.textContent = '';
        el.appendChild(span);
      }
    };
    watch(() => props.icon, update, { flush: 'post' });
    onMounted(update);
    return {
      elRef,
      svgClass,
      getWrapStyle,
    };
  },
});
</script>

<style lang="stylus" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>

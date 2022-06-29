<template>
  <div v-if="showTooltip">
    <Tooltip :placement="placement" :title="tooltipContent" trigger="hover">
      <div class="tooltip-content" :class="contentClass">
        <slot></slot>
      </div>
    </Tooltip>
  </div>
  <div v-else class="content" :class="contentClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from 'ant-design-vue';
import { computed } from 'vue';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: any;
  /** class类 */
  contentClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
});

const showTooltip = computed(() => Boolean(props.tooltipContent));
</script>
<style scoped lang="less">
.tooltip-content {
  @apply flex items-center justify-center h-full cursor-pointer hover:bg-gray-200 px-3;
}
.content {
  @apply flex items-center justify-center cursor-pointer hover:bg-gray-200;
}
</style>

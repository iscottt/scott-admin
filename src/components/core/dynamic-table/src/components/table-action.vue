<template>
  <template v-for="(actionItem, index) in actionFilters" :key="`${index}-${actionItem.label}`">
    <component
      :is="actionItem.popConfirm ? Popconfirm : 'span'"
      :title="actionItem.title"
      v-bind="actionItem.popConfirm"
    >
      <a-button type="link" class="!p-0" v-bind="actionItem">{{ actionItem.label }}</a-button>
    </component>
  </template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Popconfirm } from 'ant-design-vue';
import type { PropType } from 'vue';
import type { ActionItem } from '../types/tableAction';

const props = defineProps({
  actions: {
    // 表格行动作
    type: Array as PropType<ActionItem[]>,
    default: () => [],
  },
});

const actionFilters = computed(() => {
  return props.actions;
});
</script>

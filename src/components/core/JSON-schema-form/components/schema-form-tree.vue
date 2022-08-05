<template>
  <a-tree
    v-model:checkedKeys="modelValue"
    v-bind="formItem.props"
    :disabled="formItem.disabled"
    v-on="formItem.eventObject"
    :tree-data="formItem.options"
  />
</template>
<script lang="ts">
import { PropType } from 'vue';

export default defineComponent({
  name: 'SchemaFormTree',
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({}),
    },
    value: undefined as any, // 表单项值
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val),
    });

    return {
      modelValue,
    };
  },
});
</script>

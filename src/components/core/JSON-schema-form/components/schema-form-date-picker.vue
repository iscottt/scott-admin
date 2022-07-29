<template>
  <a-date-picker
    v-model:value="modelValue"
    v-bind="formItem.props"
    :disabled="formItem.disabled"
    v-on="formItem.eventObject"
  />
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { DatePicker } from 'ant-design-vue';

export default defineComponent({
  name: 'SchemaFormDatePicker',
  components: {
    [DatePicker.name]: DatePicker
  },
  props: {
    formItem: {
      // 表单项
      type: Object as PropType<FormItem>,
      default: () => ({})
    },
    value: undefined as any // 表单项值
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const modelValue = computed({
      get: () => props.value,
      set: (val) => emit('update:value', val)
    });

    return {
      modelValue
    };
  }
});
</script>

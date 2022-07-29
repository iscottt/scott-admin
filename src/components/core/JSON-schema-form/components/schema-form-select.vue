<template>
  <a-select
    v-model:value="modelValue"
    :disabled="formItem.disabled"
    v-bind="formItem.props"
    v-on="formItem.eventObject"
    placeholder="请选择"
  >
    <template v-for="option in formItem.options" :key="option.value">
      <Option :value="option.value">
        {{ option.label }}
      </Option>
    </template>
  </a-select>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Select } from 'ant-design-vue';
const { Option } = Select;

export default defineComponent({
  name: 'SchemaFormSelect',
  components: {
    [Select.name]: Select,
    Option,
  },
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

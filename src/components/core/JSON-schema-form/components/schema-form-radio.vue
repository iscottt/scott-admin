<template>
  <a-radio-group
    v-model:value="modelValue"
    :disabled="formItem.disabled"
    style="width: 280px"
    v-on="formItem.eventObject"
  >
    <template v-for="option in formItem.options" :key="option.value">
      <a-radio :value="option.value">
        {{ option.label }}
      </a-radio>
    </template>
  </a-radio-group>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Radio } from 'ant-design-vue';

export default defineComponent({
  name: 'SchemaFormRadio',
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group
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

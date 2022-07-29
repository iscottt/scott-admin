<template>
  <a-modal v-model:visible="visible" v-bind="$attrs" :confirm-loading="confirmLoading" :afterClose="remove" @ok="onOk">
    <schema-form ref="dynamicForm" :fields="fields" :form-schema="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { SchemaForm } from '@/components/core/JSON-schema-form/index';
const props = defineProps({
  remove: {
    // 移除模态框
    type: Function,
  },
  formSchema: {
    // 表单项
    type: Object as PropType<FormSchema>,
    default: () => ({}),
  },
  fields: {
    // 默认值，一般编辑时传入
    type: Object,
    default: () => ({}),
  },
  hiddenFields: {
    // 不需要显示的字段（表单项）
    type: Array,
    default: () => [],
  },
  handleOk: {
    // 点击确定
    type: Function,
  },
});
const dynamicForm = ref<any>(null);
const visible = ref<boolean>(true);
const confirmLoading = ref<boolean>(false);
const dynamicValidateForm = ref(props.formSchema);

props.hiddenFields.forEach(
  (field) => (dynamicValidateForm.value.formItem.find((item) => item.field == field)!.hidden = !!props.fields)
);

const onOk = () => {
  confirmLoading.value = true;
  dynamicForm.value
    .validate()
    .then(async () => {
      props.handleOk &&
        props
          .handleOk(dynamicForm.value.modelRef, { visible, confirmLoading, dynamicValidateForm })
          .then((res) => {
            res && (visible.value = false);
          })
          .finally(() => (confirmLoading.value = false));
    })
    .catch((err) => {
      console.log('error', err);
      confirmLoading.value = false;
    });
};
</script>

<style scoped></style>

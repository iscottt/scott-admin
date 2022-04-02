<template>
  <div>
    <Alert message="基础表单示例" type="info" show-icon style="margin-bottom: 12px">
      <template #description>
        <a
          class="text-blue-500"
          target="_blank"
          href="https://github.com/buqiyuan/vue3-antd-admin/blob/main/src/views/demos/form/basic-form/index.vue"
        >
          查看源码
        </a>
      </template>
    </Alert>
    <a-card>
      <SchemaForm @submit="handleSubmit">
        <template #selectA="{ formModel, field }">
          <Select
            v-model:value="formModel[field]"
            :options="optionsA"
            mode="multiple"
            allow-clear
            @change="valueSelectA = formModel[field]"
          />
        </template>
        <template #selectB="{ formModel, field }">
          <Select
            v-model:value="formModel[field]"
            :options="optionsB"
            mode="multiple"
            allow-clear
            @change="valueSelectB = formModel[field]"
          />
        </template>
      </SchemaForm>
    </a-card>
  </div>
</template>

<script lang="tsx" setup>
import { computed, ref, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { Alert, message, Select } from 'ant-design-vue';
import { schemas } from './form-schema';
import { useForm } from '@/components/core/schema-form';

defineOptions({
  name: 'DemosFormBasicForm',
});

const [SchemaForm] = useForm({
  labelWidth: 200,
  schemas,
  actionColOptions: {
    span: 24,
  },
});

const keyword = ref<string>('');

const valueSelectA = ref<string[]>([]);
const valueSelectB = ref<string[]>([]);
const options = ref<Recordable[]>([]);
for (let i = 1; i < 10; i++) options.value.push({ label: `选项${i}`, value: `${i}` });

const optionsA = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
    return op;
  });
});
const optionsB = computed(() => {
  return cloneDeep(unref(options)).map((op) => {
    op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
    return op;
  });
});

// 点击提交
function handleSubmit(values) {
  message.success(
    <div>
      验证通过！<pre class="text-left">{JSON.stringify(values, null, 2)}</pre>
    </div>,
    3
  );
}
</script>

<style lang="less" scoped>
.btn-rows {
  button {
    margin-right: 12px;
  }
}
</style>

<template>
  <div class="scott-container">
    <a-card class="!mb-4" ref="card">
      <a-form :model="formState" layout="inline">
        <a-form-item label="用户名：" :class="isMobile ? 'w-full' : 'w-200px'">
          <a-input v-model:value="formState.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="角色：" :class="isMobile ? 'w-full' : 'w-200px'">
          <a-input v-model:value="formState.userRole" placeholder="请输入角色" />
        </a-form-item>
        <a-form-item label="状态：" :class="isMobile ? 'w-full' : 'w-200px'">
          <a-select v-model:value="formState.status" placeholder="请选择状态">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <dynamic-table
        border
        ref="tableRef"
        :scroll="{ x: 1000 }"
        :columns="columns"
        :data-request="getUserByPage"
        rowKey="id"
      >
        <template #title>
          <a-button type="primary" class="mr-10px" @click="handleSearch"> 查询 </a-button>
          <a-tooltip>
            <template #title>刷新将会清除查询条件</template>
            <a-button type="primary" class="mr-10px" @click="handleRefresh"> 刷新 </a-button>
          </a-tooltip>
          <SButton type="success" @click="handleInsert"> 新增</SButton>
        </template>
      </dynamic-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { DynamicTable } from '@/components/core/dynamic-table';
import { columns } from './columns';
import { getUserByPage, insertUser } from '@/service';
import { useFormModal } from '@/hooks/business/useFormModal';
import { getFormSchema } from './form-schema';
import { useAppStore } from '@/store';
import { EnumDeviceType } from '@/enum';
const tableRef = ref<any>(null);
const formState = reactive({
  username: '',
  userRole: '',
  status: '',
});

const app = useAppStore();
// 获取设备终端判断
const isMobile = computed(() => {
  return app.device === EnumDeviceType.mobile;
});
// 查询
const handleSearch = () => {
  console.log('tableRef.value', tableRef.value);
  tableRef.value.queryTable({
    ...formState,
    current: 1,
    pageSize: 10,
  });
};

// 刷新
const handleRefresh = () => {
  formState.username = '';
  tableRef.value.reload();
};
// 新增
const handleInsert = () => {
  const formSchema = getFormSchema();
  formSchema.formItem.splice(2, 1);
  useFormModal({
    title: '编辑用户',
    formSchema,
    handleOk: async (modelRef) => {
      const params = {
        username: modelRef.username,
        email: modelRef.email,
        status: modelRef.status,
        userRole: modelRef.userRole,
      };
      const result = await insertUser(params);
      tableRef.value.reload();
      return result.retCode < 1;
    },
  });
};
</script>

<style scoped lang="less"></style>

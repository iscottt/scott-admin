<template>
  <div class="scott-container">
    <a-card class="!mb-4" ref="card">
      <a-form :model="formState" layout="inline">
        <a-form-item label="角色名称：" :class="isMobile ? 'w-full' : 'w-200px'">
          <a-input v-model:value="formState.roleName" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="状态：" :class="isMobile ? 'w-full' : 'w-200px'">
          <a-select v-model:value="formState.status" placeholder="请选择状态">
            <a-select-option value="1">有效</a-select-option>
            <a-select-option value="2">无效</a-select-option>
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
        :data-request="getRoleByPage"
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
import { getRoleByPage, insertRole } from '@/service';
import { useFormModal } from '@/hooks/business/useFormModal';
import { getFormSchema } from './form-schema';
import { useAppStore } from '@/store';
import { EnumDeviceType } from '@/enum';
const tableRef = ref<any>(null);
const formState = reactive({
  roleName: '',
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
  formState.roleName = '';
  tableRef.value.reload();
};
// 新增
const handleInsert = () => {
  const formSchema = getFormSchema();
  useFormModal({
    title: '新增角色',
    formSchema,
    handleOk: async (modelRef) => {
      const params = {
        roleName: modelRef.roleName,
        status: modelRef.status,
        menuIds: modelRef.menuIds.join(','),
      };
      const result = await insertRole(params);
      tableRef.value.reload();
      return result.retCode < 1;
    },
  });
};
</script>

<style scoped lang="less"></style>

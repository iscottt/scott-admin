<template>
  <dynamic-table rowKey="heroid" :columns="columns" :getListFunc="loadData" bordered />
</template>

<script lang="ts" setup>
import { columns, tableData } from './columns';
import { DynamicTable } from '@/components/core/dynamic-table';

const loadData = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        retCode: 0,
        retData: { current: 1, total: tableData.length, pageSize: 10, data: tableData },
        ...params,
      });
    }, 500);
  });
};
</script>

<style scoped></style>

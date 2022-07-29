<template>
  <div class="bg-white">
    <Table ref="tableRef" v-bind="getBindValues" :data-source="tableData" @change="handleTableChange">
      <template
        v-for="slotName in defaultSlots.filter((name) => Reflect.has($slots, name))"
        #[slotName]="slotData"
        :key="slotName"
      >
        <slot :name="slotName" v-bind="slotData"></slot>
      </template>

      <!-- 个性化单元格 start -->
      <template v-for="slotName in ['bodyCell', 'headerCell']" #[slotName]="slotData" :key="slotName">
        <slot :name="slotName" v-bind="slotData"></slot>
        <!-- 表格行操作start -->
        <template v-if="slotName === 'bodyCell' && getColumnKey(slotData.column) === '$action'">
          <div class="flex items-center justify-center">
            <TableAction :actions="slotData.column.actions({ instance, ...slotData })" />
          </div>
        </template>
        <!-- 表格行操作end -->
        <template
          v-for="slotItem in getBindValues.columns?.filter((item) => item[slotName])"
          :key="getColumnKey(slotItem)"
        >
          <component
            :is="getComponent(slotItem?.[slotName]?.(slotData))"
            v-if="getColumnKey(slotData.column) == getColumnKey(slotItem)"
          />
        </template>
      </template>
      <!-- 个性化单元格 end -->
    </Table>
  </div>
</template>

<script lang="tsx" setup>
import { useSlots } from 'vue';
import { Table } from 'ant-design-vue';
import { useTableMethods, createTableContext, useTableState } from './hooks';
import { dynamicTableProps, defaultSlots, dynamicTableEmits } from './dynamic-table';
import TableAction from './components/table-action.vue';

defineOptions({
  name: 'DynamicTable',
  inheritAttrs: false,
});

const props = defineProps(dynamicTableProps);
const emit = defineEmits(dynamicTableEmits);
const slots = useSlots();

// 表格内部状态
const tableState = useTableState({ props, slots });
const { tableData, getBindValues } = tableState;
// 表格内部方法
const tableMethods = useTableMethods({ state: tableState, props, emit });
const { getColumnKey, fetchData, handleTableChange, getComponent } = tableMethods;

// 当前组件所有的状态和方法
const instance = {
  ...props,
  ...tableState,
  ...tableMethods,
};

createTableContext(instance);

fetchData();

defineExpose(instance);
</script>

<style lang="less" scoped>
:deep(.ant-table-wrapper) {
  padding: 0 6px 6px 6px;
  .ant-table {
    .ant-table-title {
      display: flex;
      padding: 0 0 24px 0;
      .ant-btn {
        margin-right: 10px;
      }
    }

    .ant-image:hover {
      cursor: zoom-in;
    }
    .ant-btn {
      margin-right: 10px;
    }
  }
}

.actions > * {
  margin-right: 10px;
}
</style>

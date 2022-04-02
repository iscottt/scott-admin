import type { TableColumnType } from 'ant-design-vue';
import type { VNode } from 'vue';
import type { FormSchema } from '@/components/core/schema-form';
import type { ActionItem } from './tableAction';

export type ColumnParams<T = any> = {
  record: T;
  text: string;
  index: number;
  column: TableColumn<T>;
};

/**
 * 表格属性
 */
export interface TableColumn<T = Indexable> extends Omit<TableColumnType<T>, 'dataIndex' | 'key'> {
  title: string;
  dataIndex: keyof T | '$action';
  key?: keyof T | '$action';
  width?: number;
  /** 指定搜索的字段 */
  searchField?: string;
  /** 在查询表单中不展示此项 */
  hideInSearch?: boolean;
  /** 在 Table 中不展示此列 */
  hideInTable?: boolean;
  /** 传递给 Form.Item 的配置,可以配置 rules */
  formItemProps?: Partial<FormSchema<T>>;
  bodyCell?: (params: ColumnParams<T>) => VNode | string;
  headerCell?: (params: ColumnParams<T>) => VNode | string;
  actions?: (params: ColumnParams<T>) => ActionItem[];
}

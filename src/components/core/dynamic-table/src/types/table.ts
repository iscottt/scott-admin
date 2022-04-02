import type { TableProps } from 'ant-design-vue';

/**
 * 加载表格数据的参数
 */
export type LoadDataParams = {
  /** 根据自己业务需求定义页码 */
  page?: number;
  /** 根据自己业务需求定义页数据条数 */
  limit?: number;
};

/** 表格onChange事件回调参数 */
export type OnChangeCallbackParams = TableProps['onChange'];

export type TableActionType = {
  /** 刷新并清空,页码也会重置，不包括搜索表单 */
  reload: (resetPageIndex?: boolean) => Promise<void>;
  /** 获取远程数据 */
  fetchData: (params: Recordable) => Promise<any>;
};

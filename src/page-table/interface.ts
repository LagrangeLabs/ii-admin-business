import { ColumnProps } from 'antd/lib/table';
import { DataNode, TreeProps } from 'antd/lib/tree';

import { FilterItemProps } from '../filter-options/interface';

export interface IPageTableProps {
  /** 每页数据数 */
  pageSize?: number;
  /** 表单数据总数 */
  total?: number;
  /** 表单数据 */
  tableList?: Array<any>;
  /** 区分Key值 */
  uniqueKey?: string;
  /** 表单columns配置项 */
  columns: Array<ColumnProps<any>>;
  /** 表单页面标题 */
  pageTitle?: string;
  /** 表单筛选项 */
  filters?: Array<FilterItemProps>;
  /** 是否展示组织树 */
  showSearchTree?: boolean;
  /** 组织树取消选中是否触发请求 false */
  treeNoCancel?: boolean;
  /** 组织树选中节点作为搜索条件key值 */
  searchTreeKey?: string;
  /** 是否显示新增操作 */
  showCreate?: boolean;
  /** 是否显示导出操作 */
  needExport?: boolean;
  /** 是否显示批量删除 */
  needPatchDelete?: boolean;
  /** 新增按钮位置 */
  leftCreate?: boolean;
  /** 新增按钮图标 */
  createIcon?: React.ReactNode;
  /** 导出按钮图标 */
  downIcon?: React.ReactNode;
  /** 是否显示筛选 */
  needSelect?: boolean;
  /** 刷新数据标志 */
  needRefresh?: boolean;
  /** 是否回到第一页 默认值 false */
  resetFresh?: boolean;
  /** 新增按钮文字标题 */
  createTitle?: string;
  /** 删除按钮文字 */
  deleteTitle?: string;
  /** 页面水平、垂直滚动 */
  scroll?: object;

  /** treeProps属性 */
  treeExtra?: TreeProps;
  /** 树结构数据 */
  treeData?: DataNode[];
  /** 需要加工的title字段 */
  titleField?: string;
  /** 需要加工的key字段 */
  keyField?: string;
  /** 需要加工的children字段 */
  childrenField?: string;
  /** icon图标 */
  iconTag?: React.ReactNode;
  /** 是否显示搜索 */
  showSearch?: boolean;
  /** search tree 间距 */
  gap?: number;
  /** 排序key，默认值ordering */
  orderingKey?: string;
  /** tree节点选择回调 */
  onTreeSelect?: (params: any) => void;

  /** 默认搜索条件 */
  defaultCondtions?: { [key: string]: string };
  /** 获取表单数据接口 */
  getTableList: (params: any) => void;
  /** 新增操作回调 */
  createCallback?: (params: any) => void;
  /** 树状组织选择回调 */
  selectTreeCallback?: (params: any) => void;
  /** 选择回调 */
  selectCallback?: (params: any) => void;
  /** 排序、过滤字段处理 */
  getSortFilterParams?: (params: any) => object;
  /** 导出回调 */
  exportCallback?: (params: any) => void;
  /** 删除回调 */
  deleteCallback?: (params: any) => Promise<any>;
}

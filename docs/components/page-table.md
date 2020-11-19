---
title: PageTable 页面列表组件
---

# PageTable 页面列表组件

Demo:

```tsx
import React from 'react';
import { PageTable } from 'ii-admin-business';
import { PlusOutlined, FileOutlined } from '@ant-design/icons';
import { SearchTree } from 'ii-admin-base';

export default () => {
  const treeData = [
    {
      hhh: '0-0',
      lll: '0-0',
      kkk: [
        {
          hhh: 'name',
          lll: 'value',
          kkk: [
            { hhh: 'name-0', lll: 'value-0' },
            { hhh: 'name-1', lll: 'value-1' },
            { hhh: 'name-2', lll: 'value-2' },
          ],
        },
        {
          hhh: 'Suyana',
          lll: '0-0-1',
          kkk: [
            { hhh: '0-0-1-0', lll: '0-0-1-0' },
            { hhh: '0-0-1-1', lll: '0-0-1-1' },
            { hhh: '0-0-1-2', lll: '0-0-1-2' },
          ],
        },
        {
          hhh: '0-0-2',
          lll: '0-0-2',
        },
      ],
    },
    {
      hhh: '0-1',
      lll: '0-1',
      kkk: [
        { hhh: '0-1-0-0', lll: '0-1-0-0' },
        { hhh: '0-1-0-1', lll: '0-1-0-1' },
        { hhh: '0-1-0-2', lll: '0-1-0-2' },
      ],
    },
    {
      hhh: '0-2',
      lll: '0-2',
    },
  ];
  const filters = [
    {
      type: 'search',
      placeholder: '请输入项目名称',
      filter: 'name',
      width: '30%',
      className: 'testinput',
    },
    {
      type: 'rangepicker',
      placeholder: '',
      filter: ['startDate', 'endDate'],
      width: '40%',
    },
  ];
  const tableList = [
    { key: '名称', id: '1', value: 'ming' },
    { key: '名称2', id: '2', value: 'ming' },
    { key: '名称3', id: '3', value: 'ming' },
  ];
  const columns = [
    { dataIndex: 'serialNumber', title: '序号' },
    { dataIndex: 'key', title: '第一列' },
    { dataIndex: 'value', title: '第二列' },
  ];
  const deleteCallback = value => {
    console.log(value, 'sdfsdfsdf');
  };
  const createCallback = value => {
    console.log('value=======', value);
  };

  return (
    <div>
      <PageTable
        total={100}
        pageTitle="页面标题"
        tableList={tableList}
        getTableList={() => {}}
        columns={columns}
        filters={filters}
        showCreate={true}
        createTitle="新增"
        createCallback={() => {}}
        showSearchTree
        treeData={treeData}
        titleField="hhh"
        keyField="lll"
        childrenField="kkk"
        searchTreeKey="template_category"
        createIcon={<PlusOutlined />}
        showSearch
        leftCreate
        needPatchDelete
        needSelect
        iconTag={<PlusOutlined />}
        deleteCallback={deleteCallback}
        createCallback={createCallback}
      />
    </div>
  );
};
```

### PageTable 入参

| 属性                | 说明                  | 类型                                                            | 默认值 | 版本 |
| ------------------- | --------------------- | --------------------------------------------------------------- | ------ | ---- |
| total               | 表单数据总数          | number                                                          |        |      |
| tableList           | 表单数据              | Array                                                           |        |      |
| uniqueKey           | 区分 Key 值           | string                                                          |        |      |
| columns             | 表单 columns 配置项   | [ColumnProps](https://ant.design/components/table-cn/#Column)[] |        |      |
| pageTitle           | 表单页面标题          | string                                                          |        |      |
| filters             | 表单筛选项            | [FilterItemProps](/components/filter-options)[]                 |        |      |
| leftCreate          | 新增按钮位置          | boolean                                                         |        |
| createIcon          | 新增按钮图标          | React.ReactNode                                                 |        |
| downIcon            | 导出按钮图标          | React.ReactNode                                                 |        |
| showCreate          | 是否显示新增操作      | boolean                                                         |        |      |
| needExport          | 是否显示导出操作      | boolean                                                         |        |      |
| needPatchDelete     | 是否显示批量删除      | boolean                                                         |        |      |
| deleteTitle         | 删除按钮文字          | string                                                          |        |      |
| deleteCallback      | 删除回调              | (params: any) => void                                           |        |      |
| needSelect          | 是否显示筛选          | boolean                                                         |        |      |
| needRefresh         | 刷新数据标志          | boolean                                                         |        |      |
| resetFresh          | 是否回到第一页 默认值 | boolean                                                         | false  |      |
| createTitle         | 新增按钮文字标题      | string                                                          |        |      |
| scroll              | 页面水平、垂直滚动    | object                                                          |        |      |
| gap                 | search tree 间距      | number                                                          |        |      |
| onTreeSelect        | tree 节点选择回调     | (params: any) => void                                           |        |      |
| defaultCondtions    | 默认搜索条件          | {[key: string]: string}                                         |        |      |
| getTableList        | 获取表单数据接口      | (params: any) => void                                           |        |      |
| createCallback      | 新增操作回调          | (params: any) => void                                           |        |      |
| selectCallback      | 列表复选框 选择回调   | (params: any) => void                                           |        |      |
| getSortFilterParams | 排序、过滤字段处理    | (params: any) => object                                         |        |      |
| exportCallback      | 导出回调              | (params: any) => void                                           |        |      |

### 有组织树时配置

| 属性           | 说明                              | 类型            | 默认值 | 版本 |
| -------------- | --------------------------------- | --------------- | ------ | ---- |
| showSearchTree | 是否展示组织树                    | boolean         |        |      |
| searchTreeKey  | 组织树选中节点作为搜索条件 key 值 | string          |        |      |
| treeData       | 树结构数据                        | DataNode[]      |        |      |
| titleField     | 需要加工的 title 字段             | string          |        |      |
| keyField       | 需要加工的 key 字段               | string          |        |      |
| childrenField  | 需要加工的 children 字段          | string          |        |      |
| iconTag        | icon 图标                         | React.ReactNode |        |      |
| showSearch     | 是否显示搜索                      | boolean         |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

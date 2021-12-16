---
title: PageTable 页面列表组件
---

# PageTable 页面列表组件

Demo:

```tsx
import React, { useState } from 'react';
import { Switch } from 'antd';
import { PageTable } from 'ii-admin-business';
import { PlusOutlined, FileOutlined } from '@ant-design/icons';
import { SearchTree } from 'ii-admin-base';

export default () => {
  const [checkObj, setCheckObj] = useState({
    showSearchTree: true,
    showSearch: true,
    showCreate: true,
    leftCreate: true,
    needPatchDelete: true,
    needSelect: true,
  });
  const treeData = [
    {
      hhh: '0-0',
      lll: '0-0',
      selectable: false,
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
    { dataIndex: 'key', title: '第一列', sorter: true },
    { dataIndex: 'value', title: '第二列', sorter: true },
  ];
  const deleteCallback = value => {
    console.log(value, 'sdfsdfsdf');
  };
  const createCallback = value => {
    console.log('value=======', value);
  };
  const onChange = (type, value) => {
    console.log(type, value, 'sdfsfsdf');
    setCheckObj({
      ...checkObj,
      [type]: value,
    });
  };

  return (
    <div>
      <div>
        是否展示组织树：
        <Switch
          checked={checkObj.showSearchTree || false}
          onChange={onChange.bind(null, 'showSearchTree')}
        />
        <br />
        是否展示组织树搜索框：
        <Switch
          checked={checkObj.showSearch || false}
          onChange={onChange.bind(null, 'showSearch')}
        />
        <br />
        是否新增按钮：
        <Switch
          checked={checkObj.showCreate || false}
          onChange={onChange.bind(null, 'showCreate')}
        />
        <br />
        新增按钮位置左边（默认右边）：
        <Switch
          checked={checkObj.leftCreate || false}
          onChange={onChange.bind(null, 'leftCreate')}
        />
        <br />
        是否批量删除：
        <Switch
          checked={checkObj.needPatchDelete || false}
          onChange={onChange.bind(null, 'needPatchDelete')}
        />
        <br />
        是否有列表复选框：
        <Switch
          checked={checkObj.needSelect || false}
          onChange={onChange.bind(null, 'needSelect')}
        />
        <br />
      </div>
      <PageTable
        total={100}
        pageTitle="页面标题"
        tableList={tableList}
        getTableList={() => {
          console.log('get data');
        }}
        columns={columns}
        filters={filters}
        createTitle="新增"
        createCallback={() => {}}
        treeData={treeData}
        titleField="hhh"
        keyField="lll"
        childrenField="kkk"
        searchTreeKey="template_category"
        createIcon={<PlusOutlined />}
        showSearchTree={checkObj.showSearchTree}
        showSearch={checkObj.showSearch}
        showCreate={checkObj.showCreate}
        leftCreate={checkObj.leftCreate}
        needPatchDelete={checkObj.needPatchDelete}
        needSelect={checkObj.needSelect}
        iconTag={<PlusOutlined />}
        deleteCallback={deleteCallback}
        createCallback={createCallback}
        treeNoCancel
        treeExtra={{
          defaultExpandedKeys: ['0-0', '0-1'],
          selectable: true,
        }}
        rowSelection={{
          getCheckboxProps: record => ({
            disabled: record.id === '1', // Column configuration not to be checked
          }),
        }}
      />
    </div>
  );
};
```

### PageTable 入参

| 属性                | 说明                      | 类型                                                            | 默认值      | 是否必传 | 版本 |
| ------------------- | ------------------------- | --------------------------------------------------------------- | ----------- | -------- | ---- |
| total               | 表单数据总数              | number                                                          |             | 否       |      |
| tableList           | 表单数据                  | Array                                                           |             | 否       |      |
| uniqueKey           | 区分 Key 值               | string                                                          | id          | 否       |      |
| columns             | 表单 columns 配置项       | [ColumnProps](https://ant.design/components/table-cn/#Column)[] |             | 否       |      |
| pageTitle           | 表单页面标题              | string                                                          |             | 否       |      |
| filters             | 表单筛选项                | [FilterItemProps](/components/filter-options)[]                 |             | 否       |      |
| createIcon          | 新增按钮图标              | React.ReactNode                                                 | 否          |          |
| downIcon            | 导出按钮图标              | React.ReactNode                                                 | 否          |          |
| leftCreate          | 新增按钮位置              | boolean                                                         | 否          |          |
| showCreate          | 是否显示新增操作          | boolean                                                         | false       | 否       |      |
| needExport          | 是否显示导出操作          | boolean                                                         | false       | 否       |      |
| needPatchDelete     | 是否显示批量删除          | boolean                                                         | false       | 否       |      |
| needSelect          | 是否显示筛选              | boolean                                                         | false       | 否       |      |
| needRefresh         | 刷新数据标志              | boolean                                                         | false       | 否       |      |
| resetFresh          | 是否回到第一页 默认值     | boolean                                                         | false       | 否       |      |
| deleteTitle         | 删除按钮文字              | string                                                          | 批量删除    | 否       |      |
| deleteCallback      | 删除回调                  | (params: any) => void                                           |             | 否       |      |
| createTitle         | 新增按钮文字标题          | string                                                          | 新增        | 否       |      |
| scroll              | 页面水平、垂直滚动        | object                                                          | { x: 1132 } | 否       |      |
| gap                 | search tree 间距          | number                                                          | 12          | 否       |      |
| orderingKey         | 排序 key，默认值 ordering | string                                                          | ordering    | 否       |      |
| defaultCondtions    | 默认搜索条件              | {[key: string]: string}                                         |             | 否       |      |
| onTreeSelect        | tree 节点选择回调         | (params: any) => void                                           |             | 否       |      |
| getTableList        | 获取表单数据接口          | (params: any) => void                                           |             | 否       |      |
| createCallback      | 新增操作回调              | (params: any) => void                                           |             | 否       |      |
| selectCallback      | 列表复选框 选择回调       | (params: any) => void                                           |             | 否       |      |
| getSortFilterParams | 排序、过滤字段处理        | (params: any) => object                                         |             | 否       |      |
| exportCallback      | 导出回调                  | (params: any) => void                                           |             | 否       |      |

### 有组织树时配置

| 属性           | 说明                              | 类型                                                           | 默认值   | 是否必传 | 版本 |
| -------------- | --------------------------------- | -------------------------------------------------------------- | -------- | -------- | ---- |
| treeNoCancel   | 组织树取消选中是否触发请求        | boolean                                                        | false    | 否       |      |
| showSearchTree | 是否展示组织树                    | boolean                                                        | false    | 否       |      |
| searchTreeKey  | 组织树选中节点作为搜索条件 key 值 | string                                                         |          | 否       |      |
| treeExtra      | antd tree 配置项                  | [treeProps](https://ant.design/components/tree-cn/#Tree-props) |          | 否       |      |
| treeData       | 树结构数据                        | DataNode[]                                                     |          | 否       |      |
| titleField     | 需要加工的 title 字段             | string                                                         | name     | 否       |      |
| keyField       | 需要加工的 key 字段               | string                                                         | id       | 否       |      |
| childrenField  | 需要加工的 children 字段          | string                                                         | children | 否       |      |
| iconTag        | icon 图标                         | React.ReactNode                                                |          | 否       |      |
| showSearch     | 是否显示搜索                      | boolean                                                        | true     | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

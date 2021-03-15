---
title: FilterOptions 搜索条件组件
---

# FilterOptions 搜索条件组件

Demo:

```tsx
import React, { useState } from 'react';
import { FilterOptions } from 'ii-admin-business';

export default () => {
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
    {
      type: 'cascader',
      placeholder: '职位类型',
      filter: ['positionType', 'parent'],
      width: '20%',
      getFilters: options => {
        console.log(options, 'sdfsdfsf');
        return {};
      },
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const [filterValue, setFilterValue] = useState({});
  return <FilterOptions filters={filters} setFilterOpts={setFilterValue} />;
};
```

### FilterOptions 入参

| 属性             | 说明                     | 类型                                                             | 默认值 | 是否必传 | 版本 |
| ---------------- | ------------------------ | ---------------------------------------------------------------- | ------ | -------- | ---- |
| filters          | FilterItemProps[]        | 搜索条件数组配置 [FilterItemProps](/components/filter-options)[] |        | 是       |      |
| setFilterOpts    | (params: object) => void | 搜索条件改变回调 入参：当前改变值                                |        | 否       |      |
| defaultCondtions | {[key: string]: string}  | 各个搜索条件默认值                                               |        | 否       |      |

### FilterItemProps

| 属性        | 说明                               | 类型                                                                                                   | 默认值     | 是否必传 | 版本 |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------- | -------- | ---- |
| type        | 筛选项类型                         | FilterType: 'search'\| 'input'\| 'select'\| 'datepicker'\| 'rangepicker'\| 'cascader'\| 'inputNumber'; |            | 否       |      |
| allowClear  | 是否允许清除                       | boolean                                                                                                | true       | 否       |      |
| placeholder | 占位符                             | string                                                                                                 |            | 否       |      |
| filter      | 筛选项字段：可以是字符、字符数组   | string \| string[]                                                                                     |            | 是       |      |
| filterType  | 筛选项字段最终要拼装的数据格式类型 | 'string' \| 'array'                                                                                    |            | 否       |      |
| format      | 日期格式化                         | Date                                                                                                   | YYYY-MM-DD | 否       |      |
| options     | 选择项数组                         | [OptionProps & CascaderDataProps](/components/filter-options) []                                       |            | 否       |      |
| width       | 宽度                               | number \| string                                                                                       |            | 否       |      |
| mode        | selector 单选还是多选              | "multiple" \| "tags"                                                                                   |            | 否       |      |
| className   | 类名                               | string                                                                                                 |            | 否       |      |
| extraProps  | 额外配置条件                       | [SelectProps](https://ant.design/components/select-cn/#Select-props)                                   |            | 否       |      |

### OptionProps

| 属性  | 说明     | 类型          | 默认值 | 是否必传 | 版本 |
| ----- | -------- | ------------- | ------ | -------- | ---- |
| key   | 展示字段 | string        |        | 是       |      |
| value |          | string\number |        | 是       |      |

### CascaderDataProps

| 属性     | 说明     | 类型                | 是否必传 | 默认值 | 版本 |
| -------- | -------- | ------------------- | -------- | ------ | ---- |
| label    | 展示字段 | React.ReactNode     |          | 是     |      |
| value    |          | string\number       |          | 是     |      |
| children |          | CascaderDataProps[] |          | 否     |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

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
    },
    {
      type: 'rangepicker',
      placeholder: '',
      filter: ['startDate', 'endDate'],
      width: '40%',
    },
  ];
  const [filterValue, setFilterValue] = useState({});
  return <FilterOptions filters={filters} setFilterOpts={setFilterValue} />;
};
```

### FilterOptions 入参

| 属性             | 说明                     | 类型                               | 默认值 | 版本 |
| ---------------- | ------------------------ | ---------------------------------- | ------ | ---- |
| filters          | FilterItemProps[]        | 搜索条件数组配置 FilterItemProps[] |        |      |
| setFilterOpts    | (params: object) => void | 搜索条件改变回调 入参：当前改变值  |        |      |
| defaultCondtions | {[key: string]: string}  | 各个搜索条件默认值                 |        |      |

#### FilterItemProps

| 属性        | 说明                               | 类型                               | 默认值 | 版本 |
| ----------- | ---------------------------------- | ---------------------------------- | ------ | ---- |
| type        | 筛选项类型                         | FilterType                         |        |      |
| placeholder | 占位符                             | string                             |        |      |
| filter      | 筛选项字段：可以是字符、字符数组   | string \| string[]                 |        |      |
| filterType  | 筛选项字段最终要拼装的数据格式类型 | 'string' \| 'array'                |        |      |
| format      | 日期格式化                         | Date                               |        |      |
| options     | 选择项数组                         | OptionProps & CascaderDataProps [] |        |      |
| width       | 宽度                               | number \| string                   |        |      |
| mode        | selector 单选还是多选              | "multiple" \| "tags"               |        |      |
| className   | 类名                               | string                             |        |      |
| extraProps  | 额外配置条件                       | SelectProps                        |        |      |

#### OptionProps

| 属性  | 说明     | 类型          | 默认值 | 版本 |
| ----- | -------- | ------------- | ------ | ---- |
| key   | 展示字段 | string        |        |      |
| value |          | string\number |        |      |

#### CascaderDataProps

| 属性     | 说明     | 类型                | 默认值 | 版本 |
| -------- | -------- | ------------------- | ------ | ---- |
| label    | 展示字段 | React.ReactNode     |        |      |
| value    |          | string\number       |        |      |
| children |          | CascaderDataProps[] |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

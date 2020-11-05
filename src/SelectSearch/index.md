## SelectSearch

Demo:

```tsx
import React from 'react';
import { SelectSearch } from 'ii-admin-business';

export default () => (
  <SelectSearch
    placeholder="请输入搜索关键字"
    itemStyle={{ width: '400px' }}
    getOption={data => {
      return data.map((item: any) => ({ key: item, value: item }));
    }}
    fetchOption={() => {
      return new Promise(resolve => {
        resolve(['searchData1', 'searchData2']);
      });
    }}
    getParams={value => value}
  />
);
```

## 何时使用

- 搜索下拉框，当搜索结果较多时，需要根据关键字进行搜索

## API

| 参数        | 说明                       | 类型                                      | 默认值 |
| ----------- | -------------------------- | ----------------------------------------- | ------ |
| fetchOption | 搜索方法                   | (params: any) => Promise                  | -      |
| getParams   | 请求参数处理方法           | (params: any) => any                      | -      |
| getOption   | 返回结果处理方法，默认展示 | (params: any) => [{key: any, value: any}] | -      |
| onChange    | 选择后回调函数             | (params: {key: any, value: any) => void   | -      |
| mode        | select 参数 mode           | 'multiple' 'tags' undefined               | -      |
| placeholder | 提示信息                   | string                                    | -      |
| itemStyle   | select 参数 style          | CSSProperties                             | -      |
| defaultKey  | 默认搜索关键字             | string                                    | -      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

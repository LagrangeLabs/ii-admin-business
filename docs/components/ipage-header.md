---
title: IPageHeader 页面标题
---

# IPageHeader 标题栏

极简:

```tsx
import React, { Fragment } from 'react';
import { IPageHeader } from 'ii-admin-business';

export default () => {
  return (
    <Fragment>
      <IPageHeader title="我是标题1" />
      <IPageHeader title={<span>我是标题2</span>} />
    </Fragment>
  );
};
```

右边操作区:

```tsx
import React, { Fragment } from 'react';
import { IPageHeader } from 'ii-admin-business';
import { Button, Form, Input } from 'antd';

export default () => {
  return (
    <Fragment>
      <IPageHeader
        title="我是标题1"
        extra={<Button type="primary">点我新增</Button>}
      />
    </Fragment>
  );
};
```

title 下增加内容:

```tsx
import React, { Fragment } from 'react';
import { IPageHeader } from 'ii-admin-business';
import { Button, Form, Input } from 'antd';

export default () => {
  return (
    <Fragment>
      <IPageHeader
        title="我是标题2"
        extra={<Button type="primary">点我新增</Button>}
      >
        <Form layout="inline">
          <Form.Item>
            <Input placeholder="请输入姓名搜索" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="请输入编号搜索" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">搜索</Button>
          </Form.Item>
        </Form>
      </IPageHeader>
    </Fragment>
  );
};
```

### IPageHeader 页面标题

| 属性      | 说明                     | 类型                    | 默认值    | 是否必传 | 版本 |
| --------- | ------------------------ | ----------------------- | --------- | -------- | ---- |
| title     | 自定义标题文字           | `string` \| `ReactNode` | -         | 是       |      |
| style     | 自定义外层样式           | `React.CSSProperties`   | -         | 否       |      |
| extra     | 右侧操作区               | `ReactNode`             | -         | 否       |
| className | 自定义 header 最外层类名 | `string`                | -         | 否       |      |
| buoyColor | 浮标颜色                 | `string`                | `#0085ff` | 否       |      |
| buoySpace | 浮标距右侧间距           | `string`                | 24px      | 否       |      |

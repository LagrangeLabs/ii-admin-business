---
title: UpStatus 状态提升组件
---

# UpStatus 状态提升组件

```javascript
const Demo = () => {
  return (
    <UpStatus status={[{ initValue: 1 }]}>
      <A />
      <B />
    </UpStatus>
  );
};
```

```tsx
import React from 'react';
import { UpStatus } from 'ii-admin-business';

const A = props => {
  const { upStatus } = props;
  const [[state, setState]] = upStatus;

  return (
    <div>
      {state}
      <button onClick={() => setState(state + 1)}>状态+1</button>
    </div>
  );
};

const B = props => {
  const { upStatus } = props;
  const [[state, setState]] = upStatus;

  return (
    <div>
      {state}
      <button onClick={() => setState(state + 1)}>状态+1</button>
    </div>
  );
};

const Demo = () => {
  return (
    <UpStatus status={[{ initValue: 1 }]}>
      <A />
      <B />
    </UpStatus>
  );
};

export default Demo;
```

### RichText props

| 属性     | 说明                   | 类型                                                 | 默认值 | 版本 |
| -------- | ---------------------- | ---------------------------------------------------- | ------ | ---- |
| status   | 传递给子元素的状态列表 | { initValue: any, onChange: (state: any) => void }[] | []     |      |
| children | 子元素                 | ReactElement \| ReactElement[]                       |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

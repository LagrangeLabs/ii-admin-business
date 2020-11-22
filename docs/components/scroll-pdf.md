---
title: ScrollPdf 无限滚动
---

# ScrollPdf 无限滚动

Demo:

```tsx
import React, { useState, useEffect } from 'react';
import { Upload, Button, Pagination } from 'antd';
import { ScrollPdf } from 'ii-admin-business';

export default () => {
  const [files, setFiles] = useState(null);
  const [markInfoOrigin, setMarkInfo] = useState();
  const [pages, setPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const [base64File, setBase64File] = useState(null);
  const props = {
    beforeUpload: file => {
      setFiles(file);
      return false;
    },
    files,
  };
  useEffect(() => {
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = () => {
        const base64Str = fileReader.result;
        setBase64File(base64Str);
      };
    }
  }, [files]);
  const getPages = (pages: number, current: number) => {
    setPages(pages);
    if (current) {
      setCurrent(current);
    }
  };
  const onChange = (page: number) => {
    setCurrent(page);
    setMarkInfo({
      page: page - 1,
      width: 1000,
      height: 1000,
    });
  };

  return (
    <div>
      <Upload {...props}>
        <Button>Select File</Button>
      </Upload>
      <Pagination
        style={{ margin: '20px 0' }}
        current={current}
        defaultPageSize={1}
        hideOnSinglePage
        total={pages}
        onChange={onChange}
      />
      <ScrollPdf
        markInfoOrigin={markInfoOrigin}
        onChangePages={getPages}
        pdfFile={base64File}
      />
    </div>
  );
};
```

### ScrollPdf 无限滚动

| 属性           | 说明                              | 类型                                      | 默认值 | 是否必传 | 版本 |
| -------------- | --------------------------------- | ----------------------------------------- | ------ | -------- | ---- |
| bgColor        | 背景色                            | string                                    | #eee   | 否       |      |
| showItem       | 一次展示页数                      | number                                    | 4      | 否       |      |
| pdfFile        | pdf 地址或者 base64 字符串        | string                                    |        | 是       |      |
| markInfoOrigin | 标记信息                          | MarkInfo                                  |        | 否       |      |
| onChangePages  | 当 pdf 滚动展示页数发生变化时回调 | (pages: number, curret?: number) => void; |        | 否       |      |

#### MarkInfo pdf 标记信息

| 属性      | 说明                        | 类型     | 默认值 | 是否必传 | 版本 |
| --------- | --------------------------- | -------- | ------ | -------- | ---- |
| width     | 服务端计算位置时 pdf 的宽度 | number   |        | 是       |      |
| height    | 服务端计算位置时 pdf 的高度 | number   |        | 是       |      |
| locations | 要标记的位置信息            | number[] |        | 是       |      |
| page      | 第几页 pdf                  | number   |        | 是       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

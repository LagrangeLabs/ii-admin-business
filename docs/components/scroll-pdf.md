---
title: ScrollPdf 无限滚动
---

# ScrollPdf 无限滚动

注意事项：
scrollpdf 组件高度为 100%，因此需要指定父级高度

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
  const [size, setSize] = useState(false);
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
      page: page,
      width: 1000,
      height: 1000,
    });
  };
  const getScaleInfo = params => {
    params.ref.scrollTop = 1800 * 1;
  };
  const changeSize = params => {
    setSize(true);
    setTimeout(() => {
      setSize(false);
    }, 1000);
  };

  return (
    <div>
      <Upload {...props}>
        <Button>选择pdf文件</Button>
      </Upload>
      <Button type="primary" style={{ marginTop: 10 }} onClick={changeSize}>
        更改页面大小
      </Button>
      <Pagination
        style={{ margin: '20px 0' }}
        current={current}
        defaultPageSize={1}
        hideOnSinglePage
        total={pages}
        onChange={onChange}
      />
      <div style={{ height: '50vh' }}>
        <ScrollPdf
          resize={size}
          markInfoOrigin={markInfoOrigin}
          onChangePages={getPages}
          pdfFile={base64File}
          getScaleInfo={getScaleInfo}
        />
      </div>
    </div>
  );
};
```

### ScrollPdf 无限滚动

| 属性           | 说明                              | 类型                                      | 默认值 | 是否必传 | 版本 |
| -------------- | --------------------------------- | ----------------------------------------- | ------ | -------- | ---- |
| bgColor        | 背景色                            | string                                    | #eee   | 否       |      |
| markStyle      | markinfo style                    | CSSProperties                             |        | 否       |      |
| showItem       | 一次展示页数                      | number                                    | 5      | 否       |      |
| resize         | 页面大小发生变化                  | boolean                                   |        | 否       |      |
| itemGap        | canvas item 间距                  | number                                    | 10     | 否       |      |
| pdfFile        | pdf 地址或者 base64 字符串        | string                                    |        | 是       |      |
| markInfoOrigin | 标记信息                          | MarkInfo                                  |        | 否       |      |
| canvasIdPrefix | canvas id 前缀，默认值 canvas     | string                                    | canvas | 否       |      |
| onChangePages  | 当 pdf 滚动展示页数发生变化时回调 | (pages: number, curret?: number) => void; |        | 否       |      |
| onScroll       | 当 pdf 滚动展示页数发生变化时回调 | (params: any) => void                     |        | 否       |      |
| getScaleInfo   | 获取 canvas scaleInfo 信息        | (params: any) => void                     |        | 否       |      |

#### MarkInfo pdf 标记信息

| 属性           | 说明                             | 类型       | 默认值 | 是否必传 | 版本 |
| -------------- | -------------------------------- | ---------- | ------ | -------- | ---- |
| width          | 服务端计算位置时 pdf 的宽度      | number     |        | 是       |      |
| height         | 服务端计算位置时 pdf 的高度      | number     |        | 是       |      |
| locations      | 要标记的位置信息                 | number[][] |        | 是       |      |
| page           | 第几页 pdf                       | number     |        | 是       |      |
| scrollToMiddle | 标记更新时是否自动滚动页面到中部 | boolean    | true   | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

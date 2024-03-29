---
title: RichText 富文本组件
---

# RichText 富文本组件

Demo:

```tsx
import React, { useState } from 'react';
import { RichText } from 'ii-admin-business';
import { Switch } from 'antd';

export default () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  return (
    <>
      <p>
        可编辑状态：
        <Switch defaultChecked={disabled} onChange={setDisabled} />
      </p>
      <RichText
        customData={{ source: 'rpa-mall', for: 'pc' }}
        disabled={disabled}
      />
    </>
  );
};
```

### RichText props

| 属性        | 说明                                               | 类型                          | 默认值                                                                                      | 是否必传 | 版本 |
| ----------- | -------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- | -------- | ---- |
| tinymceSrc  | tinymce js 文件地址                                | string                        | https://cdn-static-resources.ai-indeed.com/ii-fed-lib/ii-components-richtext/tinymce.min.js | 否       |      |
| value       | richtext 值                                        | string                        |                                                                                             | 否       |      |
| fileKey     | formData 上传文件时 key 值，                       | string                        | file                                                                                        | 否       |      |
| customData  | formData 上传文件时增加的自定义信息，              | Record<string, unknown>       | {}                                                                                          | 否       |      |
| height      | 富文本高度                                         | number                        | 500                                                                                         | 否       |      |
| onChange    | 富文本内容改变回调                                 | (params: string) => void      |                                                                                             | 否       |      |
| callBack    | 图片上传成功回调函数，用于解析返回结果中的图片地址 | (params: any) => void         | (res) => res.data.file_url                                                                  | 否       |      |
| uploadImage | 图片上传方法                                       | (params: FormData) => Promise |                                                                                             | 否       |      |
| disabled    | 富文本可编辑状态                                   | boolean                       | false                                                                                       | 否       |      |

### FAQ：tinymceSrc 有没有本地资源

若使用 umi 脚手架开发的项目，可以将包解压后的文件放在 public 文件夹下，根据具体发布域名来访问即可

本地 tinymce 文件：[lib.zip](https://lagrangelabs.github.io/ii-admin-business/lib.zip)

### FAQ：tinymceSrc 有没有属于实在智能的 CDN 资源（目前语言显示：en（默认的），zh_CN）

实在 tinymce CDN 地址：[https://cdn-static-resources.ai-indeed.com/ii-fed-lib/ii-components-richtext/tinymce.min.js](https://cdn-static-resources.ai-indeed.com/ii-fed-lib/ii-components-richtext/tinymce.min.js)

More skills for writing demo: https://d.umijs.org/guide/demo-principle

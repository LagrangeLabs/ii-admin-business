---
title: RichText 富文本组件
---

# RichText 富文本组件

Demo:

```tsx
import React from 'react';
import { RichText } from 'ii-admin-business';

export default () => <RichText />;
```

### RichText props

| 属性        | 说明                                               | 类型                          | 默认值                                                         | 是否必传 | 版本 |
| ----------- | -------------------------------------------------- | ----------------------------- | -------------------------------------------------------------- | -------- | ---- |
| tinymceSrc  | tinymce js 文件地址                                | string                        | https://cdn.bootcdn.net/ajax/libs/tinymce/5.5.1/tinymce.min.js | 否       |      |
| value       | richtext 值                                        | string                        |                                                                | 是       |      |
| fileKey     | formData 上传文件时 key 值，                       | string                        | file                                                           | 否       |      |
| height      | 富文本高度                                         | number                        | 500                                                            | 否       |      |
| onChange    | 富文本内容改变回调                                 | (params: string) => void      |                                                                | 是       |      |
| callBack    | 图片上传成功回调函数，用于解析返回结果中的图片地址 | (params: any) => void         | (res) => res.data.file_url                                     | 否       |      |
| uploadImage | 图片上传方法                                       | (params: FormData) => Promise |                                                                | 否       |      |

### FAQ：tinymceSrc 有没有本地资源

若使用 umi 脚手架开发的项目，可以将包放在 public 文件夹下，根据具体发布域名来访问即可

[lib.zip](https://lagrangelabs.github.io/ii-admin-business/lib.zip)

More skills for writing demo: https://d.umijs.org/guide/demo-principle

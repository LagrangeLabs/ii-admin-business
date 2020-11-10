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

| 属性        | 说明                                               | 类型                     | 默认值                                                         | 版本 |
| ----------- | -------------------------------------------------- | ------------------------ | -------------------------------------------------------------- | ---- |
| tinymceSrc  | tinymce js 文件地址                                | string                   | https://cdn.bootcdn.net/ajax/libs/tinymce/5.5.1/tinymce.min.js |      |
| value       | richtext 值                                        | string                   |                                                                |      |
| fileKey     | formData 上传文件时 key 值，                       | string                   | file                                                           |      |
| height      | 富文本高度                                         | number                   | 500                                                            |      |
| onChange    | 富文本内容改变回调                                 | (params: any) => void    |                                                                |      |
| callBack    | 图片上传成功回调函数，用于解析返回结果中的图片地址 | (params: any) => void    | (res) => res.file_url                                          |      |
| uploadImage | 图片上传方法                                       | (params: any) => Promise |                                                                |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

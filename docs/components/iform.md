---
title: IForm form表单
---

# form 表单 常用封装

Demo:

```tsx
import React from 'react';
import { IForm } from 'ii-admin-business';
import { Form, Button, Row, Col, Input } from 'antd';

const treeData = [
  {
    title: '大部门1',
    id: '0-1',
    child: [
      { title: '小部门1', id: '0-1-0-0' },
      { title: '小部门2', id: '0-1-0-1' },
      { title: '小部门3', id: '0-1-0-2' },
    ],
  },
  {
    title: '大部门2',
    id: '0-2',
  },
];

const DEMO_FORM = [
  {
    type: 'select',
    placeholder: '请选择企业规模',
    label: '企业规模',
    option: [
      { key: '1-50人', value: '1-50人' },
      { key: '50-100人', value: '50-100人' },
      { key: '101-150人', value: '101-150人' },
    ],
    name: 'select',
  },
  {
    type: 'multiselect',
    placeholder: '请选择企业规模复选',
    label: '企业规模复选',
    option: [
      { key: '1-50人', value: '1-50人' },
      { key: '50-100人', value: '50-100人' },
      { key: '101-150人', value: '101-150人' },
    ],
    name: 'multiselect',
  },
  {
    type: 'selectSearch',
    placeholder: '输入关键字',
    label: '远程搜索复选框',
    option: [],
    name: 'selectSearch',
    getOption: data => {
      return data.map((item: any) => ({ key: item, value: item }));
    },
    fetchOption: () => {
      return new Promise(resolve => {
        resolve(['searchData1', 'searchData2']);
      });
    },
    getParams: value => value,
  },
  {
    type: 'select',
    label: '关联父级',
    name: 'parentCode',
    childName: 'childCode',
    option: [
      { key: '选项一', value: '1' },
      { key: '选项二', value: '2' },
    ],
  },
  {
    type: 'select',
    label: '关联子级',
    name: 'childCode',
    parentName: 'parentCode',
    originOption: {
      '1': [
        { key: '子选项一', value: '子1' },
        { key: '子选项二', value: '子2' },
      ],
      '2': [
        { key: '子选项三', value: '子3' },
        { key: '子选项四', value: '子4' },
      ],
    },
    option: [],
  },
  {
    type: 'phone',
    placeholder: '获取验证码',
    label: '验证码',
    name: 'code',
  },
  {
    type: 'input',
    placeholder: '隐藏该字段，默认传参值',
    hidden: true,
    value: '默认传参',
    label: '企业资质',
    name: 'input',
  },
  {
    type: 'date',
    placeholder: '输入日期',
    label: '日期',
    name: 'date',
  },
  {
    type: 'number',
    placeholder: '输入数字',
    label: '数字',
    name: 'number',
  },
  {
    type: 'textarea',
    placeholder: '多行文本',
    label: '多行文本',
    name: 'textarea',
    showCount: true,
    maxLength: 1000,
  },
  {
    type: 'selectTree',
    label: '下拉组织树',
    name: 'selectTree',
    treeData,
    titleField: 'title',
    keyField: 'id',
    childrenField: 'child',
  },
  {
    type: 'upload',
    label: '上传附件',
    name: 'upload',
    extra: ['支持扩展名：.word .pdf', '建议上传30M以内大小的PDF文件'],
    describe: '点击或将PDF拖拽到这里上传',
    itemStyle: { width: '300px', height: '150px', background: '#fbfdff' },
    rules: [],
  },
  {
    type: 'cronInput',
    label: 'cron表达式',
    name: 'cronInput',
    itemStyle: { width: '600px' },
    rules: [],
  },
  {
    type: '',
    label: 'renderItem',
    name: 'renderItem',
    itemStyle: { width: '600px' },
    rules: [],
    shouldUpdate: (prevValues, currentValues) => {
      return prevValues.select !== currentValues.select;
    },
    renderItem: ({ getFieldValue }) => {
      if (!getFieldValue) {
        return null;
      }
      const value = getFieldValue('select');
      return value ? (
        <Form.Item
          name="renderItemchild"
          label="renderItem"
          rules={[{ required: true }]}
        >
          <Input placeholder={value} />
        </Form.Item>
      ) : null;
    },
  },
];

export default () => {
  const [form] = Form.useForm();
  const getFormValues = () => {
    form
      .validateFields()
      .then((values: any) => {
        console.log(values, 'sdfsdf');
      })
      .catch(_info => {
        // console.log(info, 'sdfsfsdf');
      });
  };

  return (
    <div>
      <IForm
        formItemLayout={{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        form={form}
        list={DEMO_FORM}
      />
      <Row>
        <Col offset={6}>
          <Button type="primary" onClick={getFormValues}>
            提交
          </Button>
          <Button style={{ marginLeft: '8px' }}>取消</Button>
        </Col>
      </Row>
    </div>
  );
};
```

<!-- <API src='../../src/IForm/V4/index.tsx'></API> -->

### From props 说明

继承自[FormProps](https://ant.design/components/form-cn/#API)

| 属性                 | 说明                       | 类型                                                                                                                                     | 默认值 | 是否必传 | 版本 |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- | ---- |
| list                 | list form 各个 item 配置   | ([FormItem](/components/iform) & [SearchProps](https://lagrangelabs.github.io/ii-admin-base/#/ii-admin-base/components/select-search))[] |        | 是       |      |
| form                 | form 表单实例              | [FormInstance](https://ant.design/components/form-cn/#FormInstance)                                                                      |        | 否       |      |
| formItemLayout       | form 布局配置              | { labelCol: { span: number }; wrapperCol: { span: number } }                                                                             |        | 否       |      |
| initialValues        |                            | object                                                                                                                                   |        | 否       |      |
| initialRelatedValues | 关联数据初始化值           | object                                                                                                                                   |        | 否       |      |
| showCol              | item 一行是否展示多个 item | boolean                                                                                                                                  | false  | 否       |      |

### FormItem 类型说明

继承 https://ant.design/components/form-cn/#Form.Item

| 属性        | 说明                                            | 类型                                       | 默认值 | 是否必选 | 版本 |
| ----------- | ----------------------------------------------- | ------------------------------------------ | ------ | -------- | ---- |
| type        | item 类型                                       | 详见 type 分类说明                         |        | 是       |      |
| inputType   | input 类型 password、text、file 等              | string                                     |        | 否       |      |
| itemStyle   | item style                                      | CSSProperties                              |        | 否       |      |
| label       | label formitem label 文案                       | React.ReactNode \| string                  |        | 否       |      |
| name        | name 提交值的 key                               | string                                     |        | 否       |      |
| placeholder | placeholder                                     | string                                     |        | 否       |      |
| option      | option select 等的选项                          | { key: string; value: string \| number }[] |        | 否       |      |
| rules       | rules 校验规则                                  | any[]                                      |        | 否       |      |
| showSearch  | 是否可以搜索                                    | boolean                                    | false  | 否       |      |
| allowClear  | allowClear 是否允许清楚已选项                   | boolean                                    | false  | 否       |      |
| hidden      | 是否隐藏字段（依然会收集和校验字段）            | boolean                                    | false  | 否       |      |
| span        | form item col 占几部分                          | number                                     |        | 否       |      |
| renderItem  | renderItem 自定义 FormItem children render 方法 | (item: any) => React.ReactNode             |        | 否       |      |

#### type 分类

| 属性         | 说明         |
| ------------ | ------------ |
| text         | 文本展示     |
| phone        | 录入验证码   |
| select       | 单选下拉框   |
| multiselect  | 多选下拉框   |
| selectTree   | 组织树下拉框 |
| selectSearch | 搜索下拉框   |
| upload       | 文件上传     |
| richtext     | 富文本       |
| input        | 文本录入框   |
| checkbox     | 多选         |
| number       | 数字录入框   |
| textarea     | 多行文本     |
| date         | 时间选择器   |

#### type 为 text

| 属性  | 说明                          | 类型   | 默认值 | 是否必传 | 版本 |
| ----- | ----------------------------- | ------ | ------ | -------- | ---- |
| value | value type 为 text 时的展示值 | string |        | 是       |      |

#### type 为 upload

| 属性     | 说明                                | 类型                              | 默认值 | 是否必传 | 版本 |
| -------- | ----------------------------------- | --------------------------------- | ------ | -------- | ---- |
| describe | describe type 为 upload 的描述文案  | string \| (string \| ReactNode)[] |        | 否       |      |
| extra    | extra type 为 upload 的额外描述文案 | string \| (string \| ReactNode)[] |        | 否       |      |

#### type 为 richtext

| 属性        | 说明                     | 类型                          | 默认值                                                         | 是否必传 | 版本 |
| ----------- | ------------------------ | ----------------------------- | -------------------------------------------------------------- | -------- | ---- |
| tinymceSrc  | tinymce js 文件地址      | string                        | https://cdn.bootcdn.net/ajax/libs/tinymce/5.5.1/tinymce.min.js | 否       |      |
| uploadImage | uploadImage 上传图片方法 | (params: FormData) => Promise |                                                                | 否       |      |

#### type 为 phone

| 属性          | 说明                         | 类型          | 默认值 | 是否必传 | 版本 |
| ------------- | ---------------------------- | ------------- | ------ | -------- | ---- |
| getVerifyCode | getVerifyCode 获取验证码方法 | () => void    |        | 是       |      |
| checkPhone    | checkPhone 校验手机号方法    | () => boolean |        | 否       |      |

#### type 为 date

| 属性         | 说明                            | 类型                          | 默认值     | 是否必传 | 版本 |
| ------------ | ------------------------------- | ----------------------------- | ---------- | -------- | ---- |
| dateFormat   | dateFormat 时间选择器格式       | string                        | YYYY-MM-DD | 否       |      |
| showTime     | showTime 时间选择器是否可以时间 | boolean                       | false      | 否       |      |
| disabledDate | disabledDate 不可选时间         | (currentDate: any) => boolean |            | 否       |      |

#### type 为 selectTree

| 属性          | 说明                     | 类型   | 默认值   | 是否必传 | 版本 |
| ------------- | ------------------------ | ------ | -------- | -------- | ---- |
| treeData      | 树结构数据               | any    |          | 是       |      |
| titleField    | 需要加工的 title 字段    | string | name     | 否       |      |
| keyField      | 需要加工的 key 字段      | string | id       | 否       |      |
| childrenField | 需要加工的 children 字段 | string | children | 否       |      |

#### 表单项有联动

| 属性         | 说明            | 类型                   | 默认值 | 是否必传 | 版本 |
| ------------ | --------------- | ---------------------- | ------ | -------- | ---- |
| childName    | 关联选项        | string                 |        | 是       |      |
| parentName   | 关联选项 父级   | string                 |        | 是       |      |
| originOption | 关联选项 子选项 | { [T: string]: any[] } |        | 是       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

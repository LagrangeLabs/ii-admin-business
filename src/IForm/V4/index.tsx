/* eslint-disable no-param-reassign */
import React, { CSSProperties, useState } from 'react';
// import className from 'classnames';
import {
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  // Switch,
  // Radio,
  // Slider,
  // Button,
  // Upload,
  // Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { InputVerify, SelectSearch, IUpload, ISelectTree } from 'ii-admin-base';
import { FormInstance } from 'antd/lib/form';
import { SearchProps } from 'ii-admin-base/dist/SelectSearch';

import RichText from '../../RichText';
import { FormItem } from './interface';

import { getLayoutItem, handleExtraProps } from './util';

const { Option } = Select;
const { TextArea } = Input;

/**
 * form 配置信息
 */
export interface FormProps {
  /** list form各个item配置 */
  list: (FormItem & SearchProps)[];
  /** form 表单实例 */
  form?: FormInstance;
  /** form 布局配置  */
  formItemLayout?: { labelCol: { span: number }; wrapperCol: { span: number } };
  initialValues?: object;
  /** 关联数据初始化值 */
  initialRelatedValues?: object;
  /** item 一行是否展示多个item */
  showCol?: boolean;
}
const formItemLayoutDefault = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const nopop = function nopop() {};

function getFormItem(item: FormItem & SearchProps) {
  const {
    type,
    inputType,
    itemStyle,
    label,
    value,
    option,
    dateFormat,
    showSearch = false,
    getVerifyCode = nopop,
    getOption,
    getParams,
    fetchOption,
    allowClear = false,
    disabledDate,
    extra,
    describe,
    uploadImage,
    showTime,
    tinymceSrc,

    /** 树结构数据 */
    treeData = [],
    /** 需要加工的title字段 */
    titleField = 'name',
    /** 需要加工的key字段 */
    keyField = 'id',
    /** 需要加工的children字段 */
    childrenField = 'children',
    ...rest
  } = item;
  let { placeholder } = item;
  if (!placeholder) {
    placeholder = `请输入${label}`;
    if (type === 'select' || type === 'multiselect') {
      placeholder = `请选择${label}`;
    }
  }

  switch (type) {
    case 'text':
      return <span className="ant-form-text">{value}</span>;
    case 'number':
      return (
        <InputNumber style={{ width: '100%' }} placeholder={placeholder} />
      );
    case 'date':
      return (
        <DatePicker
          format={dateFormat || 'YYYY-MM-DD'}
          style={{ width: '100%' }}
          showTime={showTime}
          disabledDate={disabledDate}
        />
      );
    case 'input':
      return (
        <Input type={inputType} style={itemStyle} placeholder={placeholder} />
      );
    case 'upload':
      return (
        <IUpload
          style={itemStyle}
          extra={extra}
          describe={describe}
          {...rest}
        />
      );
    case 'selectTree':
      return (
        <ISelectTree
          treeData={treeData}
          titleField={titleField}
          keyField={keyField}
          childrenField={childrenField}
        />
      );
    case 'richtext':
      return <RichText uploadImage={uploadImage} tinymceSrc={tinymceSrc} />;
    case 'textarea':
      return <TextArea style={itemStyle} placeholder={placeholder} />;
    case 'phone':
      return (
        <InputVerify
          placeholder={placeholder}
          checkPhone={item.checkPhone}
          sendCode={getVerifyCode}
        />
      );
    case 'selectSearch':
      return (
        <SelectSearch
          itemStyle={itemStyle}
          placeholder={placeholder}
          fetchOption={fetchOption}
          getOption={getOption}
          getParams={getParams}
        />
      );
    case 'checkbox':
      return (
        <Checkbox.Group>
          {option &&
            option.map((item: any) => {
              return (
                <Checkbox key={item.value || item} value={item.value || item}>
                  {item.key || item}
                </Checkbox>
              );
            })}
        </Checkbox.Group>
      );
    case 'select':
    case 'multiselect':
      // eslint-disable-next-line no-case-declarations
      const mode = type === 'multiselect' ? 'multiple' : undefined;
      return (
        <Select
          allowClear={allowClear}
          showSearch={showSearch}
          mode={mode}
          placeholder={placeholder}
        >
          {option &&
            // eslint-disable-next-line no-shadow
            option.map((item: any) => {
              return (
                <Option key={item.value || item} value={item.value || item}>
                  {item.key || item}
                </Option>
              );
            })}
        </Select>
      );
    default:
      return <div />;
  }
}

/**
 * 表单props
 * @param props formProps
 */
function MyFormV4(props: FormProps) {
  let preSpan = 0;
  const {
    list,
    form: formProps,
    formItemLayout = formItemLayoutDefault,
    initialValues = {},
    initialRelatedValues,
    showCol = false,
  } = props;
  const initObj: any = {};
  const [relatedValue, setRelatedValue] = useState(
    initialRelatedValues || initObj,
  );
  const [formG] = Form.useForm();
  let formResult = formProps;
  if (!formResult) {
    formResult = formG;
  }

  // 对于多选中含有以上均无等选项特殊处理
  const handleMultiValue = (value: any[], name: string) => {
    const index = value.indexOf('以上均无');
    if (index === 0 && value.length > 1) {
      value.shift();
      formResult?.setFieldsValue({
        [name]: value,
      });
    } else if (index > 0) {
      formResult?.setFieldsValue({
        [name]: ['以上均无'],
      });
    }
  };
  // 级联选项处理
  const handleRelatedValue = (value: any, name: string, childName: string) => {
    setRelatedValue({
      ...relatedValue,
      [name]: value,
    });
    formResult?.setFieldsValue({
      [childName]: undefined,
    });
  };

  const handleValue = (values: any) => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0, len = list.length; index < len; index++) {
      const element = list[index];
      const { type, name, childName } = element;
      const value = values[name];
      if (type === 'multiselect' && value) {
        // 处理有 ‘以上均无’的复选情况
        handleMultiValue(value, name);
      }
      if (childName && value) {
        // 关联选型  父级值发生变化
        handleRelatedValue(value, name, childName);
      }
    }
  };

  return (
    <div>
      <Form
        onValuesChange={handleValue}
        form={formResult}
        {...formItemLayout}
        initialValues={initialValues}
      >
        <Row>
          {list.map((item: FormItem) => {
            // 级联选项处理
            if (item.parentName) {
              // eslint-disable-next-line no-param-reassign
              item.option = relatedValue[item.parentName]
                ? item.originOption![relatedValue[item.parentName]]
                : [];
            }

            // item 布局处理
            const { name, label, rules, hidden = false } = item;
            const span = item.span === 24 || !showCol ? 24 : 12;
            let formLayoutCopy;
            if (showCol) {
              [formLayoutCopy, preSpan] = getLayoutItem(
                formItemLayout,
                preSpan,
                span,
              );
            }

            // handleExtraProps 处理需额外添加属性的情况
            let initProps: any = {};
            const extraProps = handleExtraProps(initProps, item.type);

            return (
              <Col span={span} key={name}>
                <Form.Item
                  style={{ width: '100%' }}
                  label={label}
                  name={name}
                  rules={rules}
                  hidden={hidden}
                  {...formLayoutCopy}
                  {...extraProps}
                >
                  {getFormItem(item)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      </Form>
    </div>
  );
}

export default MyFormV4;

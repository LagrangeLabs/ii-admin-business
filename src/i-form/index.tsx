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
  Radio,
  // Slider,
  // Button,
  // Upload,
  // Rate,
  Space,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  InputVerify,
  SelectSearch,
  IUpload,
  ISelectTree,
  CronInput,
} from 'ii-admin-base';
import { FormInstance, FormProps as OriginFormProps } from 'antd/lib/form';
import { SearchProps } from 'ii-admin-base/dist/SelectSearch';

import RichText from '../rich-text';
import { FormItem } from './interface';

import { getLayoutItem, handleExtraProps } from './util';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

/**
 * form 配置信息
 */
export interface FormProps extends OriginFormProps {
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

const getShowTime = (dateFormat: string) => {
  const index = dateFormat.indexOf(' ');
  if (index !== -1) {
    return {
      format: dateFormat.substring(index + 1),
    };
  }
  return false;
};

export function getFormItem(item: FormItem & SearchProps) {
  const {
    name,
    label,
    rules,
    hidden = false,
    disable = false,
    shouldUpdate = false,
    type,
    inputType,
    itemStyle,
    value,
    option,
    dateFormat,
    showSearch = false,
    allowClear = false,
    extra,
    describe,
    showTime,
    tinymceSrc,
    direction = 'horizontal',
    /** 树结构数据 */
    treeData = [],
    /** 需要加工的title字段 */
    titleField = 'name',
    /** 需要加工的key字段 */
    keyField = 'id',
    /** 需要加工的children字段 */
    childrenField = 'children',
    uploadImage,
    getVerifyCode = nopop,
    getOption,
    getParams,
    fetchOption,
    disabledDate,
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
        <InputNumber
          disabled={disable}
          style={{ width: '100%', ...itemStyle }}
          placeholder={placeholder}
          {...rest}
        />
      );
    case 'date':
    case 'rangeDate':
      const format = dateFormat || 'YYYY-MM-DD';
      const showTimeR = showTime || getShowTime(format);
      const DateE = type === 'date' ? DatePicker : RangePicker;
      return (
        <DateE
          disabled={disable}
          format={format}
          style={{ width: '100%', ...itemStyle }}
          showTime={showTimeR}
          disabledDate={disabledDate}
        />
      );
    case 'input':
      return (
        <Input
          disabled={disable}
          type={inputType}
          style={itemStyle}
          placeholder={placeholder}
        />
      );
    case 'upload':
      return (
        <IUpload
          // @ts-ignore
          disabled={disable}
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
      return (
        <RichText uploadImage={uploadImage} tinymceSrc={tinymceSrc} {...rest} />
      );
    case 'textarea':
      return (
        <TextArea
          disabled={disable}
          style={itemStyle}
          placeholder={placeholder}
          {...rest}
        />
      );
    case 'phone':
      return (
        <InputVerify
          placeholder={placeholder}
          disabled={disable}
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
    case 'radio':
      return (
        <Radio.Group disabled={disable}>
          <Space direction={direction}>
            {option &&
              option.map((item: any) => {
                let key = item.key;
                let value = item.value;
                if (typeof item === 'string') {
                  key = item;
                  value = item;
                }
                return (
                  <Radio key={value} value={value}>
                    {key}
                  </Radio>
                );
              })}
          </Space>
        </Radio.Group>
      );
    case 'checkbox':
      return (
        <Checkbox.Group disabled={disable}>
          <Space direction={direction}>
            {option &&
              option.map((item: any) => {
                let key = item.key;
                let value = item.value;
                if (typeof item === 'string') {
                  key = item;
                  value = item;
                }
                return (
                  <Checkbox key={value} value={value}>
                    {key}
                  </Checkbox>
                );
              })}
          </Space>
        </Checkbox.Group>
      );
    case 'select':
    case 'multiselect':
      // eslint-disable-next-line no-case-declarations
      const mode = type === 'multiselect' ? 'multiple' : undefined;
      return (
        <Select
          disabled={disable}
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
    case 'cronInput':
      return <CronInput style={itemStyle} />;
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
    ...restForm
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
        {...restForm}
      >
        <Row>
          {list.map(item => {
            // 级联选项处理
            if (item.parentName) {
              // eslint-disable-next-line no-param-reassign
              item.option = relatedValue[item.parentName]
                ? item.originOption![relatedValue[item.parentName]]
                : [];
            }

            // item 布局处理
            const {
              name,
              label,
              rules,
              hidden = false,
              disable = false,
              shouldUpdate = false,
              type,
              inputType,
              itemStyle,
              value,
              option,
              dateFormat,
              showSearch = false,
              allowClear = false,
              extra,
              describe,
              showTime,
              tinymceSrc,
              direction = 'horizontal',
              /** 树结构数据 */
              treeData = [],
              /** 需要加工的title字段 */
              titleField = 'name',
              /** 需要加工的key字段 */
              keyField = 'id',
              /** 需要加工的children字段 */
              childrenField = 'children',
              uploadImage,
              getVerifyCode = nopop,
              getOption,
              getParams,
              fetchOption,
              disabledDate,
              renderItem,

              ...rest
            } = item;
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

            return shouldUpdate ? (
              <Form.Item noStyle={!!renderItem} shouldUpdate={shouldUpdate}>
                {renderItem}
              </Form.Item>
            ) : (
              <Col span={span} key={name}>
                <Form.Item
                  {...rest}
                  style={{ width: '100%' }}
                  label={label}
                  name={name}
                  rules={rules}
                  hidden={hidden}
                  {...formLayoutCopy}
                  {...extraProps}
                >
                  {renderItem || getFormItem(item)}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
      </Form>
    </div>
  );
}
MyFormV4.getFormItem = getFormItem;

export default MyFormV4;

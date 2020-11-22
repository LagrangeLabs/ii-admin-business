import React, { CSSProperties, Fragment, useEffect, useState } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';
import { RadioChangeEvent } from 'antd/lib/radio';
import {
  DATE_FORMAT_DAY,
  START_TIME,
  END_TIME,
  getDayFlag,
  countDays,
} from '@/utils/time';

import { KeyValueObj } from '../interface';

const { RangePicker } = DatePicker;
interface propsI {
  /** pickerStyle picker 样式 */
  pickerStyle?: CSSProperties;
  /** radioGroup 样式 */
  radioStyle?: CSSProperties;
  /** 快捷时间选项的值 */
  radioValue?: string;
  /** format 时间格式 */
  format?: string;
  /** disabledDate 不可选时间 */
  disabledDate?: any;
  /** startTime 开始时间 */
  startTime?: string;
  /** endTime 结束时间 */
  endTime?: string;
  /** radioRight 选项是否放置右边，默认值false  */
  radioRight?: boolean;
  /** datepicker 是否允许清楚，默认值false */
  allowClear?: boolean;
  /** radioOptions radio选项 */
  radioOptions?: KeyValueObj[];
  /** radio.option 的key字段，默认为key */
  optionKey?: string;
  /** radio.option 的value字段，默认为value */
  optionValue?: string;
  /** radio 值修改回调 */
  handleRadioChange?: (params: any) => void;
  /** 日期选择回调 */
  changeRangeDate?: (params: any) => void;
}

const DEFAULT_OPTION = [
  { key: '最近7天', value: '6' },
  { key: '最近30天', value: '29' },
];

export default function MonthDate(props: propsI) {
  const {
    radioValue,
    disabledDate,
    startTime,
    endTime,
    radioRight = false,
    allowClear = false,
    radioOptions = DEFAULT_OPTION,
    optionKey = 'key',
    optionValue = 'value',
    format = DATE_FORMAT_DAY,
    pickerStyle,
    radioStyle,
    changeRangeDate,
    handleRadioChange,
  } = props;
  const dayFlag = getDayFlag(format);
  const [radioValueResult, setRadioValueResult] = useState(radioValue);
  const [startTimeResult, setStartTimeResult] = useState(startTime);
  const [endTimeResult, setEndTimeResult] = useState(endTime);

  useEffect(() => {
    if (radioValue) {
      updateRadio(radioValue);
    }
  }, [radioValue]);

  useEffect(() => {
    if (startTime) {
      setStartTimeResult(startTime);
      setEndTimeResult(endTime);
    }
  }, [startTime, endTime]);

  const changeF = (startTime: string, endTime: string, value: string) => {
    setRadioValueResult(value);
    setStartTimeResult(startTime);
    setEndTimeResult(endTime);

    if (handleRadioChange) {
      handleRadioChange(value);
    }
    if (changeRangeDate) {
      changeRangeDate({
        startTime,
        endTime,
      });
    }
  };

  const updateRadio = (event: RadioChangeEvent | string) => {
    const value = typeof event === 'string' ? event : event.target.value;
    const startTime = countDays(parseInt(value));
    const endTime = countDays(0);
    changeF(startTime, endTime, value);
  };

  const getTimeObj = (_: any, datesString: [string, string]) => {
    if (datesString.length > 0) {
      const [startDay, endDay] = datesString;
      const startTime = dayFlag ? `${startDay}${START_TIME}` : startDay;
      const endTime = dayFlag ? `${endDay}${END_TIME}` : endDay;
      changeF(startTime, endTime, '');
    }
  };

  const DEFAULT_STYLE = !radioRight
    ? { marginRight: '10px' }
    : { marginLeft: '10px' };
  const RADIO_PART = (
    <Radio.Group
      style={{ ...DEFAULT_STYLE, ...radioStyle }}
      onChange={updateRadio}
      value={radioValueResult}
    >
      {radioOptions.map((item: KeyValueObj) => (
        <Radio.Button key={item[optionValue]} value={item[optionValue]}>
          {item[optionKey]}
        </Radio.Button>
      ))}
    </Radio.Group>
  );

  return (
    <Fragment>
      {!radioRight && RADIO_PART}
      <RangePicker
        format={format}
        style={pickerStyle}
        allowClear={allowClear}
        disabledDate={disabledDate}
        value={[moment(startTimeResult), moment(endTimeResult)]}
        onChange={getTimeObj}
      />
      {radioRight && RADIO_PART}
    </Fragment>
  );
}

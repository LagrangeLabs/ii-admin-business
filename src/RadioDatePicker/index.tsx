import React, { CSSProperties, Fragment, useEffect, useState } from 'react';
import { Radio, DatePicker } from 'antd';
import moment from 'moment';
import { RadioChangeEvent } from 'antd/lib/radio';

const { RangePicker } = DatePicker;

interface propsI {
  /** pickerStyle picker 样式 */
  pickerStyle?: CSSProperties;
  /** radioGroup 样式 */
  radioStyle?: CSSProperties;
  /** radioValue */
  radioValue?: string;
  /** radio 值修改回调 */
  handleRadioChange?: (params: any) => void;
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
  /** radioOption radio选项 */
  radioOption?: [{ key: string; value: string }];
  /** 日期选择回调 */
  changeRangeDate?: (params: any) => void;
}

const DEFAULT_OPTION = [
  { key: '最近7天', value: '6' },
  { key: '最近30天', value: '29' },
];
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT_DAY = 'YYYY-MM-DD';
const START_TIME = ' 00:00:00';
const END_TIME = ' 23:59:59';

const getDayFlag = (format: string) => format.indexOf('HH:mm') === -1;

const countDays = (value: number, format: string = DATE_FORMAT_DAY) => {
  const dayFlag = getDayFlag(format);
  const timeInfo = value > 0 ? START_TIME : END_TIME;
  const startDay = moment()
    .subtract(value, 'days')
    .format(format);
  return dayFlag ? `${startDay}${timeInfo}` : startDay;
};

export default function MonthDate(props: propsI) {
  const {
    radioValue,
    disabledDate,
    startTime,
    endTime,
    radioRight = false,
    allowClear = false,
    radioOption = DEFAULT_OPTION,
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

  return (
    <Fragment>
      {!radioRight && (
        <Radio.Group
          style={{ marginRight: '10px', ...radioStyle }}
          onChange={updateRadio}
          value={radioValueResult}
        >
          {radioOption.map((item: any) => (
            <Radio.Button key={item.value} value={item.value}>
              {item.key}
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
      <RangePicker
        format={format}
        style={pickerStyle}
        allowClear={allowClear}
        disabledDate={disabledDate}
        value={[moment(startTimeResult), moment(endTimeResult)]}
        onChange={getTimeObj}
      />
      {radioRight && (
        <Radio.Group
          style={{ marginLeft: '10px', ...radioStyle }}
          onChange={updateRadio}
          value={radioValueResult}
        >
          {radioOption.map((item: any) => (
            <Radio.Button key={item.value} value={item.value}>
              {item.key}
            </Radio.Button>
          ))}
        </Radio.Group>
      )}
    </Fragment>
  );
}

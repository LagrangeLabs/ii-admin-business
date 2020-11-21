---
title: RadioDatePicker组件
---

# RadioDatePicker 组件

Demo:

```tsx
import React, { useState } from 'react';
import { RadioDatePicker } from 'ii-admin-business';

export default () => {
  const radioOptions = [
    { key: '2天内', value: '1' },
    { key: '10天内', value: '9' },
  ];
  const [timeInfo, setTimeInfo] = useState({});
  const [time2Info, setTime2Info] = useState({});
  const changeRangeDate = (timeInfo: {
    startTime: string;
    endTime: string;
  }) => {
    const { startTime, endTime } = timeInfo;
    setTimeInfo({ startTime, endTime });
  };
  const changeRange2Date = (timeInfo: {
    startTime: string;
    endTime: string;
  }) => {
    const { startTime, endTime } = timeInfo;
    setTime2Info({ startTime, endTime });
  };

  return (
    <div>
      <div>
        结果： {timeInfo.startTime} -- {timeInfo.endTime}
      </div>
      <br />
      <RadioDatePicker
        radioValue="6"
        changeRangeDate={changeRangeDate}
        radioRight
        pickerStyle={{ marginRight: '100px', width: '300px' }}
        radioStyle={{ marginLeft: '50px', padding: '0 5px' }}
      />
      <br /> <br />
      <div>
        结果2： {time2Info.startTime} -- {time2Info.endTime}
      </div>
      <br />
      <RadioDatePicker
        radioOptions={radioOptions}
        changeRangeDate={changeRange2Date}
      />
    </div>
  );
};
```

### RadioDatePicker 组件 入参

| 属性              | 说明                        | 类型                               | 默认值                                                                 | 是否必选 | 版本 |
| ----------------- | --------------------------- | ---------------------------------- | ---------------------------------------------------------------------- | -------- | ---- |
| pickerStyle       | pickerStyle picker 样式     | CSSProperties                      |                                                                        | 否       |      |
| radioStyle        | radioGroup 样式             | CSSProperties                      |                                                                        | 否       |      |
| radioValue        | 快捷时间选项的值            | string                             |                                                                        | 否       |      |
| format            | format 时间格式             | string                             | YYYY-MM-DD                                                             | 否       |      |
| disabledDate      | disabledDate 不可选时间     | (currentDate: moment) => boolean   |                                                                        | 否       |      |
| startTime         | startTime 开始时间          | string                             |                                                                        | 否       |      |
| endTime           | endTime 结束时间            | string                             |                                                                        | 否       |      |
| radioRight        | radioRight 选项是否放置右边 | boolean                            | false                                                                  | 否       |      |
| allowClear        | datepicker 是否允许清除     | boolean                            | false                                                                  | 否       |      |
| radioOptions      | radioOptions radio 选项     | {[key: string\]: string\|number}[] | [{ key: '最近 7 天', value: '6' }, { key: '最近 30 天', value: '29' }] | 否       |      |
| optionKey         | radio.option 的 key 字段    | string                             | key                                                                    | 否       |      |
| optionValue       | radio.option 的 value 字段  | string                             | value                                                                  | 否       |      |
| handleRadioChange | radio 值修改回调            | (params: any) => void              |                                                                        | 否       |      |
| changeRangeDate   | 日期选择回调                | (params: any) => void              |                                                                        | 否       |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

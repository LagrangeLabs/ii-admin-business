---
title: RadioDatePicker组件
---

# RadioDatePicker 组件

Demo:

```tsx
import React, { useState } from 'react';
import { RadioDatePicker } from 'ii-admin-business';

export default () => {
  const radioOption = [
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
        radioOption={radioOption}
        changeRangeDate={changeRange2Date}
      />
    </div>
  );
};
```

### RadioDatePicker 组件 入参

| 属性              | 说明                        | 类型                           | 默认值 | 版本 |
| ----------------- | --------------------------- | ------------------------------ | ------ | ---- |
| pickerStyle       | pickerStyle picker 样式     | CSSProperties                  |        |      |
| radioStyle        | radioGroup 样式             | CSSProperties                  |        |      |
| radioValue        | radioValue                  | string                         |        |      |
| handleRadioChange | radio 值修改回调            | (params: any) => void          |        |      |
| format            | format 时间格式             | string                         |        |      |
| disabledDate      | disabledDate 不可选时间     | any                            |        |      |
| startTime         | startTime 开始时间          | string                         |        |      |
| endTime           | endTime 结束时间            | string                         |        |      |
| radioRight        | radioRight 选项是否放置右边 | boolean                        | false  |      |
| allowClear        | datepicker 是否允许清除     | boolean                        | false  |      |
| radioOption       | radioOption radio 选项      | [{key: string, value: string}] |        |      |
| changeRangeDate   | 日期选择回调                | (params: any) => void          |        |      |

More skills for writing demo: https://d.umijs.org/guide/demo-principle

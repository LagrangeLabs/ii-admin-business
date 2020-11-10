/* eslint-disable no-plusplus */

export type InputType =
  | 'text'
  | 'phone'
  | 'select'
  | 'multiselect'
  | 'selectSearch'
  | 'upload'
  | 'richtext'
  | 'input'
  | 'checkbox'
  | 'number'
  | 'textarea'
  | 'date';

export const getType = (item: any): InputType => {
  if (item.valueType === 'NUMBER') {
    return 'number';
  }
  if (item.valueType === 'DATE') {
    return 'date';
  }
  if (item.type === 'INPUT_RADIO') {
    return 'select';
  }
  if (item.type === 'INPUT_CHECKBOX') {
    return 'multiselect';
  }
  return 'input';
};

export const getListItem = (item: any) => {
  const type = getType(item);
  const { key, option, required, span } = item;
  return {
    type,
    label: key,
    name: key,
    option,
    span,
    rules: [{ required, message: `${key}不能为空` }],
  };
};

/**
 * getVideoTime  获取视频时长的分秒表述 如06：30
 * @returns string 秒的分秒表述
 * @param time 秒数
 */
export const getVideoTime = (time: number): string => {
  const timeInt = Math.ceil(time);
  const minute = ('0' + Math.floor(timeInt / 60)).substr(-2);
  const second = ('0' + (timeInt % 60)).substr(-2);
  return `${minute}:${second}`;
};

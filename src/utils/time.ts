import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_DAY = 'YYYY-MM-DD';
export const START_TIME = ' 00:00:00';
export const END_TIME = ' 23:59:59';

export const getDayFlag = (format: string) => format.indexOf('HH:mm') === -1;

export const countDays = (value: number, format: string = DATE_FORMAT_DAY) => {
  const dayFlag = getDayFlag(format);
  const timeInfo = value > 0 ? START_TIME : END_TIME;
  const startDay = moment()
    .subtract(value, 'days')
    .format(format);
  return dayFlag ? `${startDay}${timeInfo}` : startDay;
};

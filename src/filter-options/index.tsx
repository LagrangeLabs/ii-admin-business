import React, { FC } from 'react';
import { Input, InputNumber, DatePicker, Select, Cascader } from 'antd';
import moment from 'moment';

import debounce from 'lodash/debounce';

import { CascaderOptionType } from 'antd/lib/cascader';

import './index.less';
import { FilterItemProps } from './interface';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DFT_DATE_FORMAT = 'YYYY-MM-DD';

interface FilterOptionProps {
  /** 搜索条件数组配置 FilterItemProps[] */
  filters: Array<FilterItemProps>;
  /** 搜索条件改变回调 入参：当前改变值 */
  setFilterOpts: (params: object) => void;
  /** 各个搜索条件默认值 */
  defaultCondtions: { [key: string]: string };
  /** 各个搜索条件值 */
  searchConditons?: Record<string, any>;
}

const FilterOptions: FC<FilterOptionProps> = props => {
  const {
    setFilterOpts,
    filters = [],
    defaultCondtions = {},
    searchConditons,
  } = props;

  const changeRangeDate = (dates: Date[], filters: Array<string>) => {
    if (dates && dates.length > 0) {
      setFilterOpts({
        [`${filters[0]}`]:
          moment(dates[0]).format(DFT_DATE_FORMAT) + ' 00:00:00',
        [`${filters[1]}`]:
          moment(dates[1]).format(DFT_DATE_FORMAT) + ' 23:59:59',
      });
    } else {
      setFilterOpts({
        [`${filters[0]}`]: '',
        [`${filters[1]}`]: '',
      });
    }
  };

  const changeDate = (dates: moment.Moment | null, filters: string) => {
    if (dates) {
      setFilterOpts({
        [filters]: moment(dates).format(DFT_DATE_FORMAT) + ' 00:00:00',
      });
    } else {
      setFilterOpts({
        [filters]: '',
      });
    }
  };

  const handleCascaderChange = (
    filters: string[],
    options?: CascaderOptionType[],
    getFilters?: (options: CascaderOptionType[]) => object,
  ) => {
    if (options && options.length > 0) {
      if (getFilters) {
        const cascader = getFilters(options);
        setFilterOpts(cascader);
      } else {
        setFilterOpts({
          [`${filters[0]}`]: options[1].value,
          [`${filters[1]}`]: options[1].label,
        });
      }
    } else {
      setFilterOpts({
        [`${filters[0]}`]: '',
        [`${filters[1]}`]: '',
      });
    }
  };

  const handleValueChange = (
    value: string | undefined,
    filter: string,
    filterType = 'string',
  ) => {
    const nValue = typeof value === 'string' ? value.trim() : value;

    if (filterType === 'array') {
      setFilterOpts({ [`${filter}`]: nValue ? [nValue] : [] });
    } else {
      setFilterOpts({ [`${filter}`]: nValue });
    }
  };
  const changeInput = debounce((value, filters) => {
    handleValueChange(value, filters);
  }, 300);

  const renderFilterItem = (item: FilterItemProps, index: number) => {
    // const cls = cx(styles.ii-ui-business-filter, item.className);
    const extraProps = item.extraProps ? item.extraProps : {};
    const filter: string = item.filter as string;
    const { allowClear = true } = item;
    const valueProps: any = {};
    if (searchConditons && searchConditons[filter]) {
      valueProps.value = searchConditons[filter];
    }
    switch (item.type) {
      case 'input':
        return (
          <Input
            {...valueProps}
            key={`filter-${index}`}
            allowClear={allowClear}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            placeholder={item.placeholder}
            defaultValue={
              defaultCondtions ? defaultCondtions[filter] || '' : ''
            }
            onPressEnter={(e: any) => handleValueChange(e.target.value, filter)}
          />
        );
      case 'inputNumber':
        return (
          <InputNumber
            {...valueProps}
            key={`filter-${index}`}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            placeholder={item.placeholder}
            defaultValue={parseInt(defaultCondtions[filter])}
            onChange={(value?: string | number) => {
              changeInput(value, filter);
            }}
            onPressEnter={(e: any) => handleValueChange(e.target.value, filter)}
          />
        );
      case 'search':
        return (
          <Search
            {...valueProps}
            key={`filter-${index}`}
            allowClear={allowClear}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            placeholder={item.placeholder}
            defaultValue={
              defaultCondtions ? defaultCondtions[filter] || '' : ''
            }
            onSearch={value => handleValueChange(value, filter)}
            onPressEnter={(e: any) => handleValueChange(e.target.value, filter)}
          />
        );
      case 'select':
        return (
          <Select
            {...valueProps}
            mode={item.mode}
            allowClear={allowClear}
            key={`filter-${index}`}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            placeholder={item.placeholder}
            {...extraProps}
            onChange={(value: any) =>
              handleValueChange(value, filter, item.filterType)
            }
          >
            {item.options!.map((opt: any) => (
              <Option value={opt.value} key={opt.value}>
                {opt.key}
              </Option>
            ))}
          </Select>
        );
      case 'cascader':
        return (
          <Cascader
            className={`${item.className} ii-ui-business-filter`}
            key={`filter-${index}`}
            options={item.options}
            placeholder={item.placeholder as string}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            onChange={(value, options) =>
              handleCascaderChange(
                (filter as unknown) as string[],
                options,
                item.getFilters,
              )
            }
          />
        );
      case 'datepicker':
        return (
          <DatePicker
            key={`filter-${index}`}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            placeholder={item.placeholder as string}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={(dates: moment.Moment | null) =>
              changeDate(dates, filter)
            }
          />
        );
      case 'rangepicker':
        return (
          <RangePicker
            key={`filter-${index}`}
            className={`${item.className} ii-ui-business-filter`}
            style={{ width: item.width || 150, marginBottom: '20px' }}
            format={DFT_DATE_FORMAT}
            placeholder={item.placeholder as [string, string]}
            onChange={(dates: any) =>
              changeRangeDate(dates, (filter as unknown) as string[])
            }
          />
        );
      default:
        return;
    }
  };

  return (
    <div>
      {filters.map((item, index: number) => renderFilterItem(item, index))}
    </div>
  );
};

export default FilterOptions;

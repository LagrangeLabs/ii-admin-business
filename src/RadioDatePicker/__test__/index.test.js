import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import RadioDatePicker from '../index';

const testSelfProps = {
  radioOption: [
    { key: '2天内', value: '1' },
    { key: '10天内', value: '9' },
  ],
  // changeRangeDate: (timeInfo) => {
  //   const {startTime, endTime} = timeInfo
  //   console.log({startTime, endTime})
  // },
  radioValue: '1',
};

describe("Test RadioDatePicker component on the self's props", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have the ant-radio-button-wrapper-checked class', () => {
    const wrapper = mount(<RadioDatePicker {...testSelfProps} />);
    // const highlightElement = wrapper.find('卡片标题').instance().getComponent();
    // expect(wrapper).toBeInTheDocument(); // 判断元素是否在HTML文档中
    expect(wrapper.text()).toContain('2天内10天内');
    expect(wrapper.find('.ant-radio-button-wrapper-checked').text()).toContain(
      '2天内',
    ); // 判断有没有对应的class
  });

  it('should callback changeRangeDate function', () => {
    const changeRangeDate = jest.fn();
    const wrapper = mount(
      <RadioDatePicker {...testSelfProps} changeRangeDate={changeRangeDate} />,
    );

    expect(changeRangeDate).toHaveBeenCalled();
  });
});

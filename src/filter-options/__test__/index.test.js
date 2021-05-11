import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import FilterOptions from '../index';

const testSelfProps = {
  filters: [
    {
      type: 'search',
      placeholder: '请输入项目名称',
      filter: 'name',
      width: '30%',
    },
    {
      type: 'rangepicker',
      placeholder: '',
      filter: ['startDate', 'endDate'],
      width: '40%',
    },
  ],
  defaultCondtions: {},
  // setFilterOpts: (values) => {
  //   console.log(values)
  // }
};

describe("Test FilterOptions component on the self's props", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have the ii-ui-business-filter class', () => {
    const wrapper = mount(<FilterOptions {...testSelfProps} />);
    expect(wrapper.find('.ii-ui-business-filter').length).toBeTruthy(); // 判断有没有对应的class
    wrapper.unmount();
  });

  // todo
  // it('should callback setFilterOpts function', () => {
  //   const setFilterOpts = jest.fn()
  //   testSelfProps.filters[0].className = 'testinput'
  //   const wrapper = mount(
  //     <FilterOptions {...testSelfProps} setFilterOpts= {setFilterOpts} />
  //   );
  //   wrapper.find('.testinput input').simulate('change')

  //   expect(setFilterOpts).toHaveBeenCalled();
  //   wrapper.unmount();
  // });
});

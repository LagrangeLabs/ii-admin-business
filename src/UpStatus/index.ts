import React, { ReactElement, useEffect, useState } from 'react';

const _hook = (initValue, onChange) => {
  const [state, setState] = useState(initValue);

  useEffect(() => {
    if (state !== initValue) onChange(state);
  }, [state, initValue, onChange]);

  return [state, setState];
};

// 状态提升组件 传入status参数
// 下一层的所有子组件的props中会多一个upStatus字段
interface UpStatusProps {
  status: {
    initValue: any;
    onChange: (state: any) => {};
  }[];
  children: ReactElement | ReactElement[];
}

const UpStatus = (props: UpStatusProps) => {
  const { status = [], children } = props;

  const upStatus = status.map(({ initValue, onChange = () => {} }) =>
    _hook(initValue, onChange),
  );

  const newChildren = (Array.isArray(children) ? children : [children]).map(
    (ele, index) => {
      const key = ele.key || index;

      const newEle = React.cloneElement(ele, { upStatus, key });

      return newEle;
    },
  );

  return newChildren;
};

export default UpStatus;

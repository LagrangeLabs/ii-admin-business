import React from 'react';
import './index.less';

export interface IPageHeaderProps {
  title: string | React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  buoyColor?: string;
  buoySpace?: number;
}

const perfixCls = `ii-title`;

// 渲染title
const renderTitle = (
  perfixCls: string,
  title: string | React.ReactNode,
  buoyColor?: string,
  buoySpace?: number,
  extra?: React.ReactNode,
) => {
  return (
    <div className={`${perfixCls}`}>
      <span className={`${perfixCls}__text`}>{title}</span>
      <span
        className={`${perfixCls}__buoy`}
        style={{ backgroundColor: buoyColor, right: `${buoySpace}px` }}
      />
      <div className={`${perfixCls}__extra`}>{extra}</div>
    </div>
  );
};

// 渲染内容
const renderContent = (perfixCls: string, children?: React.ReactNode) => {
  return <div className={`${perfixCls}`}>{children}</div>;
};

const IPageHeader = (props: IPageHeaderProps) => {
  const {
    title,
    style = {},
    children,
    extra,
    className = '',
    buoyColor,
    buoySpace,
  } = props;

  return (
    <div className={`${perfixCls} ${className}`} style={style}>
      {renderTitle(`${perfixCls}-head`, title, buoyColor, buoySpace, extra)}
      {renderContent(`${perfixCls}-content`, children)}
    </div>
  );
};

export default IPageHeader;

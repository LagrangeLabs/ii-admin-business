// 栅格布局时计算每个item的layout
export const getLayoutItem = (
  formItemLayout: { labelCol: { span: number }; wrapperCol: { span: number } },
  preSpan: number,
  span: number,
) => {
  // 防止修改原对象的值
  const formLayoutCopy = JSON.parse(JSON.stringify(formItemLayout));
  // 连续两个都为12 的选项，增加offset
  if (preSpan === 12 && span === 12) {
    formLayoutCopy.labelCol.offset = 2;
    preSpan = 0;
  } else {
    preSpan = span || 0;
  }
  if (span === 24) {
    formLayoutCopy.labelCol.span = Math.ceil(
      (formLayoutCopy.labelCol.span * 12) / span,
    );
    formLayoutCopy.wrapperCol.span = 24 - formLayoutCopy.labelCol.span;
  }
  return [formLayoutCopy, preSpan];
};

const handleUploadExtra = (extraProps: any) => {
  extraProps.valuePropName = 'fileList';
  extraProps.getValueFromEvent = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
};

const defaultExtra = (_params: any) => {};

const handleExtraMap = new Map([
  ['upload', handleUploadExtra],
  ['default', defaultExtra],
]);

export const handleExtraProps = (extraProps: any, type: string) => {
  const handleF = handleExtraMap.get(type) || handleExtraMap.get('default');
  if (handleF) {
    handleF(extraProps);
  }

  return extraProps;
};

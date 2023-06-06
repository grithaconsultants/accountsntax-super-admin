import React from 'react';
import { Tooltip } from 'antd';

const CustomTooltip = (props: any) => {

  const { title, children, placement = "top" } = props;

  return (
    <Tooltip placement={placement} title={title} > {children} </Tooltip>
  );
}

export default CustomTooltip;
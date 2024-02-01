import React from 'react';
import { Tag } from 'antd';

const TagCustom = (props: any) => {
  const { color, title } = props;
  return (
    <Tag color={color}>{title}</Tag>
  )
}

export default TagCustom;
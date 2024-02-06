import React from 'react';
import { Tag } from 'antd';

const TagCustom = (props: any) => {
  const { color, title, classNames } = props;
  return (
    <Tag className={classNames !== '' ? classNames : ''} color={color}>{title}</Tag>
  )
}

export default TagCustom;
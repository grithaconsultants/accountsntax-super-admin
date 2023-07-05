import React from 'react';
import { Button } from 'antd';

const IconBox = (props: any) => {

  const { icon, type, loading, onClickEvent } = props;

  return (
    <Button
      type={type}
      icon={icon}
      loading={loading}
      className='d-flex align-items-center justify-content-center'
      onClick={onClickEvent}
    />
  );

}

export default IconBox;
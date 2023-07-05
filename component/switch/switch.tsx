import React from 'react';
import { Switch } from 'antd';

const SwitchComponent = (props: any): any => {

  const { defaultChecked, label, onChangeEvent } = props;

  const onChange = (checked: boolean) => {
    // console.log(`switch to ${checked}`);
    onChangeEvent(checked);
  };

  return (
    <div className='d-flex align-items-center' >
      <div className='me-5' >{label}</div>
      <Switch
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
    </div>
  )
};

export default SwitchComponent;
import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';


const CustomCheckbox = (props: any) => {

  const { title, checked = false, disabled = false } = props;

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  

  return(
    <Checkbox
      onChange={onChange}
      checked={checked}
      disabled={disabled}
    >{title}</Checkbox>
  )
};

export default CustomCheckbox;
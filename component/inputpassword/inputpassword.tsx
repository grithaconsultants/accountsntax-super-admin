import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const InputPassword = (props: any) => {
  
  const { label, placeholder = "", id, name, type, disabled = false, maxLength, asterisk = false, onChangeEvent } = props;

  return (

    <div className="simple-input" >
      <label className="input-label" >{label} {asterisk === true ? <big><sup>*</sup></big>  : "" } </label>
      <div className="input-sec" >
        <Input.Password
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChangeEvent}
        />
      </div>
    </div>

  );
}

export default InputPassword;
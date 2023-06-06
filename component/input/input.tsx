import React from 'react';
import { Input } from 'antd';

const CustomInput = (props: any) => {

  const { label, placeholder = "", id, name, type, disabled = false, maxLength, asterisk = false, onChangeEvent, defaultValue = undefined } = props;

  return (
    <div className="simple-input" >
      <label className="input-label" >{label} {asterisk === true ? <big><sup>*</sup></big> : ""} </label>
      <div className="input-sec" >
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChangeEvent}
          defaultValue={ defaultValue ? defaultValue : "" }
        />
      </div>
    </div>
  );
}

export default CustomInput;
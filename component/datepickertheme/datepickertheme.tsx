import React from 'react';
import { DatePicker } from 'antd';


const DatePickerTheme = (props: any) => {

  const { label, onChangeEvent, tag = "none", disabled = false, placeholder, defaultValue = null } = props;

  const onChange = (date: any, dateString: any) => {
    // console.log(date, dateString);
    onChangeEvent(dateString);
  };

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <div className="" >
        {defaultValue === null ?
          <DatePicker
            onChange={onChange}
            picker="date"
            inputReadOnly={true}
            disabled={disabled}
            placeholder={placeholder}
          />
          :
          <DatePicker
            onChange={onChange}
            picker="date"
            inputReadOnly={true}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />}
      </div>
      <div className={` mt-1 input-tag ${tag === "none" ? ' d-none ' : ' d-block '} `} >{tag}</div>
    </div>
  );
}

export default DatePickerTheme;
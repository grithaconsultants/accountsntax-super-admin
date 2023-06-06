import React from 'react';
import { DatePicker } from 'antd';


const DatePickerTheme = (props: any) => {

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  const { label, tag = "none" } = props;

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <div className="" >
        <DatePicker onChange={onChange} picker="date" />
      </div>
      <div className={` mt-1 input-tag ${ tag === "none" ? ' d-none ' : ' d-block ' } `} >{tag}</div>
    </div>
  );
}

export default DatePickerTheme;
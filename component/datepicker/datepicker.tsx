import React from 'react';
import { DatePicker } from 'antd';


const DatePickerComp = () => {

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  return (
    <DatePicker onChange= { onChange } picker = "date" />
  );
}

export default DatePickerComp;
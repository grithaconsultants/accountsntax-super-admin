import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const DateRange = (props: any) => {

  // const { disabled, disabledDate, defaultValue } = props;

  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  // const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };

  // *****for extra configuration of range https://ant.design/components/date-picker

  return (
    <div className="date-range-wrapper" >
      <label className="dr-label" > Select Duration </label>
      <RangePicker
        {...props}
      />
    </div>
  );
}

export default DateRange;
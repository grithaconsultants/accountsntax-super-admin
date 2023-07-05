import React from 'react';
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import moment from 'moment-timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const momentTime: any = moment().tz("Asia/Calcutta");


const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current <= dayjs().startOf('day');
  // return current && current <= dayjs().endOf('day');
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(0, momentTime.hour()),
  disabledMinutes: () => range(0, momentTime.minute() + 1)
  // disabledMinutes: () => range(momentTime.minute() + 1, 60),
  // disabledSeconds: () => [55, 56],
});



// const DateTimeOnly: React.FC = (props: any) => {
const DateTimeOnly = (props: any) => {

  const { label, onChangeEvent } = props;

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
    onChangeEvent(dateString);
  };

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <div className="" >
        <Space direction="vertical" size={12}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm') }}
            onChange={onChange}
          />
        </Space>
      </div>
    </div>
  );
}

export default DateTimeOnly;

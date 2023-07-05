import React from 'react';
import { Select } from 'antd';

const SimpleSelect = (props: any) => {

  const { from, option, selected, onChangeEvent } = props;

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    // console.log(value);
    onChangeEvent(value);
  };

  return (
    <Select
      labelInValue
      defaultValue={selected}
      onChange={handleChange}
      options={option}
      className={from ? from : ""}
    />
  );


};

export default SimpleSelect;
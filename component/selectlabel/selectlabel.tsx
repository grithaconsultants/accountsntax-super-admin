import React from 'react';
import { Select } from 'antd';

const SimpleSelectLabel = (props: any) => {

  const { option, selected, label, tag = "none", onChangeEvent, disabled = false, id } = props;

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    onChangeEvent(value);
  };

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <Select
        labelInValue
        defaultValue={selected}
        onChange={handleChange}
        id={id}
        options={option}
        className="from-global"
        disabled={disabled}
      />
      <div className={` input-tag ${ tag === "none" ? ' d-none ' : ' d-block ' } `} >{tag}</div>
    </div>
  );


};

export default SimpleSelectLabel;
import React from 'react';
import { Select } from 'antd';

const MultiSelectLabel = (props: any) => {

  const { option, selected, label, tag = "none", onChangeEvent, disabled = false, id } = props;

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    onChangeEvent(value);
  };

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <Select
        labelInValue
        mode="multiple"
        defaultValue={selected}
        onChange={handleChange}
        id={id}
        options={option}
        className="from-global"
        disabled={disabled}
      />

{/* <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={setSelectedItems}
      style={{ width: '100%' }}
      options={filteredOptions.map((item) => ({
        value: item,
        label: item,
      }))}
    /> */}

      <div className={` input-tag ${ tag === "none" ? ' d-none ' : ' d-block ' } `} >{tag}</div>
    </div>
  );


};

export default MultiSelectLabel;
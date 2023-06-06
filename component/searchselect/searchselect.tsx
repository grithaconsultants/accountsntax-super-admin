import React from 'react';
import { Select } from 'antd';

const SearchSelect = (props: any) => {

  const { option, placeholder, label, tag = "none", onChangeEvent, disabled = false, loading = false, selected = "", id } = props;

  const onChange = (value: string, label: any) => {
    // onChangeEvent({ value: value, label: label });
    onChangeEvent(label);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <Select
        showSearch
        optionFilterProp="children"
        className="from-global"
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        onChange={onChange}
        options={option}
        defaultValue={selected}
        loading={loading}
        filterOption={(input, option: any) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
      <div className={` input-tag ${tag === "none" ? ' d-none ' : ' d-block '} `} >{tag}</div>
    </div>
  );


};

export default SearchSelect;
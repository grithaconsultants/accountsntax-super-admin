import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

const InputRadio = (props: any) => {

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const { label, options } = props;

  return (
    <div className="sl-wr" >
      <label className="sl-label" >{label}</label>
      <div>
        <Radio.Group onChange={onChange} value={value}>
          {options.map((item: { value: string, label: string }, index: number) => {
            return (
              <Radio value={item.value}>{item.label}</Radio>
            )
          })}
        </Radio.Group>
      </div>
    </div>
  );

}

export default InputRadio;
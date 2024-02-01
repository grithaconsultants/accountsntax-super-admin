import React from 'react';
import { InputNumber } from 'antd';

const CustomInputNumber = (props: any) => {

  let dyprops: any = {};

  const { label, placeholder = "", id, name, disabled = false, maxValue, minValue = 0, asterisk = false, onChangeEvent, value, defaultValue = undefined } = props;

  Object.assign(dyprops, { id: id });
  Object.assign(dyprops, { name: name });
  Object.assign(dyprops, { placeholder: placeholder });
  Object.assign(dyprops, { max: maxValue });
  Object.assign(dyprops, { min: minValue });
  Object.assign(dyprops, { onChange: onChangeEvent });
  Object.assign(dyprops, { defaultValue: defaultValue !== undefined ? defaultValue : "" });

  if (value) { Object.assign(dyprops, { value: value }) }
  if (disabled) { Object.assign(dyprops, { disabled: disabled }) }

  return (
    <div className='d-flex align-items-center' >
      <>
        {label !== undefined ?
          <div className='me-5' >{label}</div>
          : ""
        }
        <InputNumber {...dyprops} />
      </>

    </div>
  );
}

export default CustomInputNumber;
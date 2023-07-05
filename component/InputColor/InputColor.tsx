import React from 'react';

const InputColor = (props: any) => {

  const { label, id, name, disabled = false, asterisk = false, onChangeEvent, defaultValue } = props;

  return (
    <div className="simple-input" >
      <label className="input-label" >{label} {asterisk === true ? <big><sup>*</sup></big> : ""} </label>
      <div className="input-sec" >
        <input
          id={id}
          name={name}
          type="color"
          disabled={disabled}
          onChange={onChangeEvent}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

export default InputColor;
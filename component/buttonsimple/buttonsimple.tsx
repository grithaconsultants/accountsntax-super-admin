import React from 'react';

const ButtonSimple = (props: any) => {

  const { type, title, onClickEvent, disabled = false } = props;

  function tempTo(){}

  return (
    <button
      type="submit"
      onClick={disabled === true ? tempTo : onClickEvent}
      className={` btn-sm ${type} ${disabled === true ? " disable " : " enable "} `}
    >{title}</button>
  );
}

export default ButtonSimple;
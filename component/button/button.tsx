import React from 'react';

const ThemeButton = (props: any) => {

  const { type, title } = props;

  return (
    <button type="button" className={`theme-btn px-3 py-2  ${type} `} >{title}</button>
  );
}

export default ThemeButton;
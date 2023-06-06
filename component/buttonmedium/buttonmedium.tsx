import React from 'react';

const ThemeButtonMD = (props: any) => {

  const { type, title } = props;

  return (
    <button type="button" className={`theme-btn px-4 py-2  ${type} `} >{title}</button>
  );
}

export default ThemeButtonMD;
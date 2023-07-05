import React from 'react';
import Image from 'next/image';
import { close } from '@/utils/image';

const IconButton = (props: any) => {

  const { imgSrc, onClickCall } = props;

  return (
    <button type="button" className="ib-self" onClick={onClickCall} >
      <Image src={imgSrc} alt="close icon" width={24} height={24} />
    </button>
  )
}

export default IconButton;
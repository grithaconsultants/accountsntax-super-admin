import React from 'react';
import Image from 'next/image';

const CardHeader = (props: any) => {

  const { imgSrc, title } = props;

  return (

    <div className="cardHeader">

      <div className="iconBox" >
        <Image src={imgSrc} alt="dashboard icon" width={24} height={24} priority />
      </div>
      <span>{title}</span>

    </div>

  );

};


export default CardHeader;
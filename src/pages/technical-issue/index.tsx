import React, { useEffect } from 'react';
import Image from 'next/image';
import { techIssue } from '@/utils/image';

const TechnicalIssue = () => {

  useEffect(() => {
    localStorage.clear();
  }, [0]);

  return (
    <div className="vw-100 d-flex justify-content-center align-items-center vh-100" >
      <div className="" >
        <div className='d-flex mb-3 align-items-baseline' ><h1 className="  pe-2 " >Technical Issue </h1> contact at <label className='ms-2 text-primary curso-pointer ' >support@accountntax.com</label></div>
        <Image src={techIssue} alt="tech icon" width={752} height={564} />
      </div>
    </div>
  );
}

export default TechnicalIssue;
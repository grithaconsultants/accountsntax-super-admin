import React from 'react';

const BreadCrumb = () => {

  return (
    <div className="breadcrumb-wrapper" >
      <div className="br-left" >
        <span className="subTlt" >Welcome</span>
        <span className="orgTlt" >Akash Enterprises</span>
      </div>
      <div className="br-right" >
        <div className="br-one" >Company: <b>5</b> </div>
        <div className="br-two" >Active Users: <b>5</b></div>
      </div>

    </div>
  );

};

export default BreadCrumb;
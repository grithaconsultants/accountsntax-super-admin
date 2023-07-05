import React from 'react';
import CustomTooltip from '@/component/tooltip/tooltip';

const DueDateCard = (props: any) => {

  const { title, date, status, type } = props;

  return (
    <div className="due-wrapper px-3">
      <div className={`due-title-area  ${type}`} >
        <CustomTooltip title={title} >{title}</CustomTooltip>
      </div>

      <div className="due-cont-area" >
        <div className="due-date" >
          <CustomTooltip title={`Date: ${date}`} >Date: {date}</CustomTooltip>
        </div>
        <div className="due-status" >
          <CustomTooltip title={`Status: ${status}`} >Status: {status}</CustomTooltip>
        </div>
      </div>
    </div>
  );

};


export default DueDateCard;
import React from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';


const QuickLinks = () => {
  return (
    <>
      <div className="q-body px-2 pb-3" >
        <ul className='p-0 m-0'>
          <li className="py-3 my-3" >
            <CustomTooltip title="GST Retrun For month Jan 2023" > GST Retrun For month Jan 2023 </CustomTooltip>
          </li>
          <li className="py-3 my-3" >
            <CustomTooltip title="GST Retrun For month Jan 2023" > GST Retrun For month Jan 2023 </CustomTooltip>
          </li>
          <li className="py-3 mt-3 mb-0" >
            <CustomTooltip title="GST Retrun For month Jan 2023" > GST Retrun For month Jan 2023 </CustomTooltip>
          </li>
        </ul>
      </div>
    </>

  );
}

export default QuickLinks;
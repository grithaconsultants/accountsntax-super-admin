import React from 'react';
import Image from 'next/image';

import CustomTooltip from '@/component/tooltip/tooltip';

import { buisnessProfilePic } from '@/utils/image';

const BuisnessProfileCard = () => {
  return (
    <div className="d-flex">
      <div className="bp-card-pic" >
        <Image src={buisnessProfilePic} alt="buisness profile picture" width={68} height={68} />
      </div>
      <div className="bp-card-data ps-3 pt-3" >
        <h1>Khatu Shyam Traders</h1>
        <div className="bp-det pb-3" >
          <ul className="mx-0 my-0 px-0 pt-3" >
            <li className="" >
              <span className="dataTlt" >Address</span><br />
              <span className="dataInfo" >
                <CustomTooltip placement="top" title="111B GULABI NAGAR BHANKROTA" > 111B GULABI NAGAR BHANKROTA </CustomTooltip>
              </span>
            </li>
            <li className="mt-2" >
              <span className="dataTlt" >Email</span><br />
              <span className="dataInfo" >
                <CustomTooltip placement="top" title="xyzgoogle.com" > xyzgoogle.com </CustomTooltip>
              </span>
            </li>

            <li className="mt-2" >
              <span className="dataTlt" >Pan No.</span><br />
              <span className="dataInfo" >
                <CustomTooltip placement="top" title="08CVYPG6177K1ZL" > 08CVYPG6177K1ZL </CustomTooltip>
              </span>
            </li>

            <li className="mt-2" >
              <span className="dataTlt" >GST No.</span><br />
              <span className="dataInfo" >
                <CustomTooltip placement="top" title="08CVYPG6177K1ZL" > 08CVYPG6177K1ZL </CustomTooltip>
              </span>
            </li>

            <li className="mt-2" >
              <span className="dataTlt" >Mobile Number</span><br />
              <span className="dataInfo" >
                <CustomTooltip placement="top" title="+91-9876543210" > +91-9876543210 </CustomTooltip>
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

export default BuisnessProfileCard; 
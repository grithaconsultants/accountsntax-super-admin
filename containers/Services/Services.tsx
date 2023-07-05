import React from 'react';
import Image from 'next/image';

import { registration, tally, call, calendar } from '@/utils/image';

import CustomTooltip from '@/component/tooltip/tooltip';


const ServicesCard = () => {
  return (
    <>
      <div className="service-block d-lg-flex d-md-flex d-block pt-4" >

        <div className="col-xl-6 col-lg-6 col-md-6 col-12 pe-md-2">
          <div className="service-card">
            <div className="s-header px-2 d-flex align-items-center py-2" >
              <div className="iconBox" >
                <Image src={registration} alt="registration icon" width={24} height={24} priority />
              </div>
              <div className="s-h-tlt ms-1" >Registration Services </div>
            </div>

            <div className="s-body px-3 pb-3" >
              <ul className='p-0 m-0'>
                <li className="py-2" >
                  <CustomTooltip title="IEC Registration IEC Registration" > IEC Registration IEC Registration </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="IEC Registration" > IEC Registration </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Shop Act Registration" > Shop Act Registration </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Shop Act Registration" > Shop Act Registration </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Shop Act Registration" > Shop Act Registration </CustomTooltip>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-12 ps-md-2 mt-md-0 mt-3">
          <div className="service-card">
            <div className="s-header px-2 d-flex align-items-center py-2" >
              <div className="iconBox" >
                <Image src={tally} alt="registration icon" width={24} height={24} priority />
              </div>
              <div className="s-h-tlt ms-1" >Tally </div>
            </div>

            <div className="s-body px-3 pb-3" >
              <ul className='p-0 m-0'>
                <li className="py-2" >
                  <CustomTooltip title="Tally Installer" > Tally Installer </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Tally Renewal/Buy" > Tally Renewal/Buy </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Tally Training Program" > Tally Training Program </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Tally Training Program" > Tally Training Program </CustomTooltip>
                </li>
                <li className="py-2" >
                  <CustomTooltip title="Tally Training Program" > Tally Training Program </CustomTooltip>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      <div className="service-block d-lg-flex d-md-flex d-block mt-4" >
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 pe-md-2">
          <div className=" service-card py-4">
            <div className="d-flex justify-content-center w-100" >
              <Image src={call} alt="call icon" width={40} height={40} priority />
            </div>
            <div className="action-title w-100 text-center mt-2" >Schedule a Call</div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-12 ps-md-2 mt-md-0 mt-3">
          <div className=" service-card py-4">
            <div className="d-flex justify-content-center w-100" >
              <Image src={calendar} alt="call icon" width={40} height={40} priority />
            </div>
            <div className="action-title w-100 text-center mt-2" >Know your work status</div>
          </div>
        </div>

      </div>
    </>

  );
}

export default ServicesCard;
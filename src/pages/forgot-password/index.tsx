import React, { useState } from 'react';
import Image from 'next/image';

import ForgotPassword from '@/containers/ForgotPassword/ForgotPassword';

import { authCard, logo776x120 } from '@/utils/image';

export default function ForgotPwd() {

  const [fromState, setState] = useState<string>("inprocess");

  return (
    <section id="loginWrapper" >

      <div className="row" >

        <div className="col-lg-6 col-12 p-0" >
          <div className="col-12 p-0 auth-car-card " >
            <Image src={authCard} alt="gst icon" width={412} height={382} />
          </div>
        </div>
        <div className="col-lg-6 col-12 auth-form px-5 pt-5 mb-lg-0 mb-md-5 mb-5" >
          <div className="col-xl-9 col-lg-9 col-md-12 col-12" >
            <div className="a-t-h" >
              <Image src={logo776x120} alt="gst icon" width={232} height={36} />
            </div>

            <ForgotPassword />

          </div>
        </div>

      </div>

    </section>
  );
}
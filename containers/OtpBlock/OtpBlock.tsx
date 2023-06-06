import React, { useState } from 'react';
import OtpInput from 'react18-otp-input';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { authCard, logo776x120 } from '@/utils/image';

const OtpBlock = () => {

  const [otpVal, setOtpVal] = useState<string>("");


  return (
    <>

      <div className="pt-5 a-title" >Enter 6-digit OTP </div>
      <div className="pt-2 a-title-sub" >We’ve sent the OTP at +91-0987654321. <span>Change</span> </div>

      <div className="pt-5 a-input-wrapper" >
        
        <div className="" >
          <OtpInput
            inputStyle="inputStyle me-3 otp-input"
            numInputs={6}
            onChange={(value: any) => setOtpVal(value)}
            separator={<span></span>}
            isInputNum={true}
            shouldAutoFocus
            value={otpVal}
          />
        </div>

        <div className="mt-5" >
          <ButtonSimple title="Verify & Login" type="voilet w-100" />
        </div>

        <div className="mt-4 text-center" >
          <span className="new-ac" >Resent OTP</span>
        </div>

      </div>
    </>
  );
}

export default OtpBlock;
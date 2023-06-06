import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import { otpSentSvg } from '@/utils/image';

const OtpSent = () => {

  const router = useRouter();

  const toLogin = () => {
    router.push('/login');
  }

  return (
    <>

      <div className="otp-sent d-flex justify-content-center mt-5" >
        <div className="" >
          <div className="img-block d-flex justify-content-center mt-5" >
            <Image src={otpSentSvg} alt="gst icon" width={124} height={124} />
          </div>
          <div className="check text-center mt-4" >Check your phone</div>
          <div className="check-sm text-center mt-2" >Password Reset Link has been sent on <b>+91-9876543210</b></div>
        </div>
      </div>

      <div className="pt-5 a-input-wrapper" >
        <div className="mt-5 pt-5" >
          <ButtonSimple title="Back to Log in" type="voilet w-100" onClickEvent={toLogin} />
        </div>

      </div>
    </>
  );
}

export default OtpSent;
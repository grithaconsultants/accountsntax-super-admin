import React from 'react';
import Link from 'next/link'

import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

const ForgotPassword = (props: any) => {

  const { setState } = props;

  const toNext = () => {
    setState("otp-sent");
  }

  return (
    <>
 
      <div className="pt-5 a-title" >Forgot Password? </div>

      <div className="pt-5 a-input-wrapper" >
        <div className=" mb-3" >
          <CustomInput
            label="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            placeholder="Mobile Number"
            type="text"
            disabled={false}
            maxLength={1000}
          />
        </div>

        <div className="mt-5" >
          <ButtonSimple title="Send reset link" type="voilet w-100" onClickEvent={toNext} />
        </div>

        <div className="mt-4 text-center" >
          <span className="new-ac" > <Link href="/login" > Back to Log in </Link> </span>
        </div>

      </div>
    </>
  );
}

export default ForgotPassword;
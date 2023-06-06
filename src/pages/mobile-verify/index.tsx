import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import OtpInput from 'react18-otp-input';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import CustomInput from '@/component/input/input';
import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import Countdown from '@/component/countdown/countdown';

import { authCard, logo776x120 } from '@/utils/image';
import { mobileSchema } from '@/utils/schema';
import { isEmpty, wait } from '@/utils/helper';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "MobileVerification: ";
const MobileVerification = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [otpStatus, setOtpStatus] = useState<boolean>(true);
  const [otpVal, setOtpVal] = useState<string>("");

  const [userData, setUserData] = useState<any>({
    otpId: "fdfewfsdfawefafsdfaew",
    _id: "fdfewfsdfawefafsdfaew",
    mobile: "7062019342",
  });

  const [resendState, setResendState] = useState<boolean>(false);
  const [countState, setCountState] = useState<boolean>(true);

  const initialValues: any = { mobile: '' };

  // useEffect(() => {
  //   const tobeitem: any = localStorage.getItem('otpmobile');
  //   if (isEmpty(tobeitem)) {
  //     router.push('/login');
  //     callSendOtp();
  //   } else {

  //     setOtpStatus(true);
  //     localStorage.clear();
  //     setUserData(JSON.parse(tobeitem));
  //   }

  // }, [0]);

  async function callSendOtp() {
    setLoading(true);
    // await wait(2000);
    ToastComponent("Otp sent");
    setLoading(false);
    setOtpStatus(true);
  }

  const backToState = () => {
    setOtpStatus(false);
  };

  const callForOtp = async () => {

    setLoading(true);
    // await wait(2000);
    // ToastComponent("Contact Number Verified");
    // setLoading(false);

    // console.log('otp submitted ', userData);

    const verifyObj = {
      _id: userData?.otpId,
      userId: userData?._id,
      type: "mobile",
      value: userData?.mobile,
      otp: Number(otpVal),
      role: "client"
    }

    // console.log('otp verify object ', verifyObj);
    // verifyOtpApiCall(verifyObj);
  }


  async function verifyOtpApiCall(json: any): Promise<void> {
    NetworkOps.makePostRequest(endPoints.verifyOtp, json, false)
      .then(async (response: any) => {
        // console.log(TAG, ' api response ', response);
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          router.push(`/login`);
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }

  const resendOtpApi = () => {

    // setLoading(true);
    // console.log(TAG, ' resend request got hit ');

    const callJson = {
      role: "client",
      type: "mobile",
      value: userData?.mobile
    }

    // console.log(TAG, ' callJson ', callJson);
    // callResend(callJson);

  }



  async function callResend(json: any): Promise<void> {
    NetworkOps.makePostRequest(endPoints.resendOTPApi, json, false)
      .then(async (response: any) => {
        console.log(TAG, ' api response ', response);
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {

          ToastComponent(response?.data?.msg);
          setUserData(response?.data?.data);
          setResendState(false);
          setCountState(true);

        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  const onCountdownCirculate = () => {
    setResendState(true);
    setCountState(false);
  }



  // console.log('got this ', userData);

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

            {otpStatus === false ?

              <div className="mt-5" >
                <Formik
                  initialValues={initialValues}
                  validationSchema={mobileSchema}
                  onSubmit={values => {
                    // console.log('hi all ', values);
                    callSendOtp();
                  }}
                >

                  {({ errors, values, touched, handleChange }) => (

                    <Form className="w-100">

                      <div className="col-lg-6 col-12" >
                        <CustomInput
                          label="Contact Number"
                          id="mobile"
                          name="mobile"
                          placeholder="Contact Number"
                          type="number"
                          disabled={true}
                          maxLength={10}
                          defaultValue={userData?.mobile}
                          asterisk={true}
                          onChangeEvent={handleChange('mobile')}
                        />
                        {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
                      </div>

                      <div className="mt-5" >
                        {loading === true ?
                          <Loader /> :
                          <ButtonSimple title="Send Otp" type="voilet w-100" />
                        }
                      </div>

                    </Form>
                  )}

                </Formik>
              </div>
              :
              <>
                <div className="pt-5 a-title" >Enter 6-digit OTP </div>
                <div className="pt-2 a-title-sub" >We’ve sent the OTP at {userData?.mobile} <span className='d-none' onClick={backToState} >Change</span> </div>

                <div className="pt-5 a-input-wrapper" >

                  <div className="" >
                    <OtpInput
                      inputStyle="inputStyle me-3 otp-input"
                      numInputs={6}
                      onChange={(value: any) => setOtpVal(value)}
                      separator={<span></span>}
                      isInputNum={true}
                      shouldAutoFocus
                      isDisabled={loading}
                      value={otpVal}
                    />
                  </div>

                  <div className="mt-5" >
                    {loading === true ?
                      <Loader /> :
                      <ButtonSimple
                        title="Verify"
                        type="voilet w-100"
                        disabled={otpVal.length > 5 ? false : true}
                        onClickEvent={callForOtp}
                      />
                    }
                  </div>



                  {countState === true ?
                    <div className="mt-4 text-center d-flex align-items-center" >
                      You can resend otp in - <Countdown onCompleteEvent={onCountdownCirculate} />
                    </div>
                    : ""}


                  {resendState === true ?
                    <div className="mt-4 text-center" >
                      <span className="new-ac" onClick={resendOtpApi} >Resent OTP</span>
                    </div>
                    : ""}

                </div>
              </>
            }

          </div>
        </div>

      </div>

    </section>
  );
}

export default MobileVerification;
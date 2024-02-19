import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import CustomInput from '@/component/input/input';
import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import InputPassword from '@/component/inputpassword/inputpassword';

import { authCard, logo776x120 } from '@/utils/image';
import { resetPWD } from '@/utils/schema';
import { isEmpty, wait } from '@/utils/helper';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "ResetPassword: ";
const ResetPassword = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>(null);

  const initialValues: any = {
    otp: '',
    password: '',
    confirmPassword: '',
  };

  useEffect(() => {
    const tobeitem: any = localStorage.getItem('otpmobile');
    if (isEmpty(tobeitem)) {
      verifyCalled();
    } else {
      localStorage.clear();
      setUserData(JSON.parse(tobeitem));
    }
  }, [0]);



  async function verifyCalled() {
    ToastComponent(" Link is not directly accessible. ");
    await wait(1000);
    router.push('/login');
  }


  function callSync(val: any) {

    const verifyObj = {
      _id: userData?._id,
      role: "super",
      email: userData?.email,
      otp: val?.otp,
      password: val?.password,
      confirmPassword: val?.confirmPassword
    }

    console.log(TAG + ' otp verify object ', verifyObj);
    resetPasswordCall(verifyObj);
  }


  async function resetPasswordCall(json: any): Promise<void> {
    setLoading(true);
    NetworkOps.makePostRequest(endPoints.resetPassword, json, false)
      .then(async (response: any) => {
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


  // console.log(TAG + ' got this ', userData);

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

            <div className="mt-5" >
              <Formik
                initialValues={initialValues}
                validationSchema={resetPWD}
                onSubmit={(values: any) => {
                  // console.log('hi all ', values);
                  callSync(values);
                }}
              >

                {({ errors, values, touched, handleChange }) => (

                  <Form className="w-100">

                    <div className="p-0 col-12" >
                      <CustomInput
                        label="OTP"
                        id="otpID"
                        name="otpID"
                        placeholder="OTP"
                        type="number"
                        disabled={loading}
                        maxLength={6}
                        asterisk={true}
                        onChangeEvent={handleChange('otp')}
                      />
                      {errors.otp && touched.otp ? (<div className="in-error">{`${errors.otp}`}</div>) : null}
                    </div>

                    <div className="p-0 col-12" >
                      <InputPassword
                        label="Password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        disabled={loading}
                        maxLength={100}
                        asterisk={true}
                        onChangeEvent={handleChange('password')}
                      />
                      {errors.password && touched.password ? (<div className="in-error">{`${errors.password}`}</div>) : null}
                    </div>

                    <div className="p-0 col-12" >
                      <InputPassword
                        label="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        disabled={loading}
                        maxLength={100}
                        asterisk={true}
                        onChangeEvent={handleChange('confirmPassword')}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (<div className="in-error">{`${errors.confirmPassword}`}</div>) : null}
                    </div>


                    <div className="mt-5" >
                      {loading === true ?
                        <Loader /> :
                        <ButtonSimple title="Reset Password" type="voilet w-100" />
                      }
                    </div>

                  </Form>
                )}

              </Formik>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
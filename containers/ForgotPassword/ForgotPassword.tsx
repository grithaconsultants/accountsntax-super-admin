import React, { useState } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';


import CustomInput from '@/component/input/input';
import ToastComponent from '@/component/Toast/Toast';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import Loader from '@/component/loader/loader';

import { mobileSchema } from '@/utils/schema';
import { wait } from '@/utils/helper';




const TAG = "ForgotPassword: ";
const ForgotPassword = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    mobile: ""
  }

  function callAsync(val: any) {

    console.log(TAG + ' ', val);

    const payload = {
      type: "mobile",
      value: `+91${val.mobile}`,
      role: "client"
    }

    registerCall(payload);
    setLoading(true);
  }


  async function registerCall(addJson: any): Promise<void> {
    NetworkOps.makePostRequest(endPoints.forgotPassword, addJson, false)
      .then(async (response: any) => {
        setLoading(false);
        // console.log(TAG, ' api ', response);

        if (response?.status == 200 && response?.data?.success == true) {

          ToastComponent(response?.data?.msg);
          localStorage.setItem('otpmobile', JSON.stringify(response?.data?.data));
          await wait(200);
          router.push(`/reset-password`);

        }

      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }

  return (
    <>

      <div className="pt-5 a-title" >Forgot Password? </div>

      <div className="pt-5 a-input-wrapper" >

        <Formik
          initialValues={initialValues}
          validationSchema={mobileSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >

          {({ errors, values, touched, handleChange }) => (

            <Form className="w-100">

              <div className=" mb-3" >
                <CustomInput
                  label="Contact Number"
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Contact Number"
                  type="text"
                  disabled={false}
                  maxLength={100}
                  onChangeEvent={handleChange('mobile')}
                />
                {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
              </div>

              <div className="mt-5" >

                {loading === true ?
                  <Loader /> :
                  <ButtonSimple title="Send OTP" type="voilet w-100" />
                }

              </div>

            </Form>
          )}

        </Formik>

        <div className="mt-4 text-center" >
          <span className="new-ac" > <Link href="/login" > Back to Log in </Link> </span>
        </div>

      </div>
    </>
  );
}

export default ForgotPassword;
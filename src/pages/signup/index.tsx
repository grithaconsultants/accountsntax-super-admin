import React, { useState, useRef, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router';

import CustomInput from '@/component/input/input';
import InputPassword from '@/component/inputpassword/inputpassword';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { Formik, Form } from 'formik';

import { signupSchema } from '@/utils/schema';
import { authCard, logo776x120 } from '@/utils/image';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';


const TAG = "Signup: ";
const Signup = () => {

  const router = useRouter();
  const [fromState, setState] = useState<string>("login");
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    adminCode: "",
    password: "",
    confirmPassword: ""
  }

  async function callAsync(formValues: any) {

    const onlyApiData = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      mobile: `+91${formValues.mobile}`,
      password: formValues.password
    }

    ToastComponent("Register successfully.");
    router.push('/login');
    console.log(TAG, ' error got in else ', onlyApiData);
    // registerCall(onlyApiData);

  }

  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);
    NetworkOps.makePostRequest(endPoints.signup, addJson, false)
      .then(async (response: any) => {
        console.log(TAG, ' api response ', response);
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {

          ToastComponent(response?.data?.msg);
          localStorage.setItem('otpmobile', JSON.stringify(response?.data?.data));
          router.push(`/mobile-verify`);

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



  return (
    <section id="loginWrapper" >

      <div className="row" >

        <div className="col-lg-6 col-12 p-0" >
          <div className="col-12 p-0 auth-car-card " >
            <Image src={authCard} alt="gst icon" width={412} height={382} />
          </div>
        </div>
        <div className="col-lg-6 col-12 auth-form px-5 pt-5 pb-5" >
          <div className="col-xl-9 col-lg-9 col-md-12 col-12" >
            <div className="a-t-h" >
              <Image src={logo776x120} alt="gst icon" width={232} height={36} />
            </div>

            <div className="pt-5 a-title" >Sign Up </div>

            <div className="pt-5 a-input-wrapper" >
              <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={values => {
                  callAsync(values);
                }}
              >

                {({ errors, values, touched, handleChange }) => (

                  <Form className="w-100">

                    <div className="row gy-2 gx-3" >

                      <div className="col-lg-6 col-12" >
                        <CustomInput
                          label="First Name"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                          disabled={loading}
                          maxLength={250}
                          asterisk={true}
                          onChangeEvent={handleChange('firstName')}
                        />
                        {errors.firstName && touched.firstName ? (<div className="in-error">{`${errors.firstName}`}</div>) : null}
                      </div>

                      <div className="col-lg-6 col-12" >
                        <CustomInput
                          label="Last Name"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          type="text"
                          disabled={loading}
                          asterisk={true}
                          maxLength={250}
                          onChangeEvent={handleChange('lastName')}
                        />
                        {errors.lastName && touched.lastName ? (<div className="in-error">{`${errors.lastName}`}</div>) : null}
                      </div>



                      <div className="col-lg-6 col-12" >
                        <CustomInput
                          label="Contact Number"
                          id="mobile"
                          name="mobile"
                          placeholder="Contact Number"
                          type="number"
                          disabled={loading}
                          maxLength={10}
                          asterisk={true}
                          onChangeEvent={handleChange('mobile')}
                        />
                        {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
                      </div>

                      <div className="col-lg-6 col-12" >
                        <CustomInput
                          label="Email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          type="email"
                          disabled={loading}
                          maxLength={250}
                          asterisk={true}
                          onChangeEvent={handleChange('email')}
                        />
                        {errors.email && touched.email ? (<div className="in-error">{`${errors.email}`}</div>) : null}
                      </div>

                      <div className="col-lg-6 col-12" >
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

                      <div className="col-lg-6 col-12" >
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

                    </div>

                    <div className="mt-4" >
                      {loading === true ?
                        <Loader /> :
                        <ButtonSimple title="Continue" type="voilet w-100" />}
                    </div>

                  </Form>

                )}

              </Formik>

              <div className="mt-4 text-center" >
                <span className="dont-acc" > {"Already a member?"} </span> <Link href="login" > <span className="new-ac" >Login</span> </Link>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}

export default Signup;
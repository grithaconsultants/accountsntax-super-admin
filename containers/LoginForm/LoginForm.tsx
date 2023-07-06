import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import CustomInput from '@/component/input/input';
import CustomCheckbox from '@/component/checkbox/checkbox';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import InputPassword from '@/component/inputpassword/inputpassword';

import { loginSchema } from '@/utils/schema';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "Login: ";

const LoginForm = (props: any) => {

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    role: "client",
    email: "",
    password: ""
  }

  async function callAsync(formValues: any) {
    // console.log(TAG, ' values for login ', formValues);
    setLoading(true);
    registerCall(formValues);
  }

  async function registerCall(addJson: any): Promise<void> {
    NetworkOps.makePostRequest(endPoints.login, addJson, false)
      .then(async (response: any) => {
        console.log(TAG, ' login response ', response);
        if (response?.status == 200 && response?.data?.success == true) {

          ToastComponent(response?.data?.msg);
          console.log("pushed to home ")
          router.push('/home');

          const sessionData = {};
          Object.assign(sessionData, { cookie: response?.data?.data?.cookie });
          Object.assign(sessionData, { loginData: response?.data?.data?.userInfo });
          Object.assign(sessionData, { token: response?.data?.data?.tokenData?.token });

          localStorage.setItem('userData', JSON.stringify(sessionData));
          // getCompanies();


        } else if (response?.status == 200 && response?.data?.success == false) {

          setLoading(false);
          localStorage.setItem('otpmobile', JSON.stringify(response?.data?.data));
          ToastComponent(response?.data?.msg);
          router.push(`/mobile-verify`);

        } else {
          setLoading(false);
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



  // async function getCompanies(): Promise<void> {
  //   NetworkOps.makeGetRequest(endPoints.getCompanies, true)
  //     .then(async (response: any) => {
  //       // console.log(TAG, ' api response ', response);
  //       setLoading(false);
  //       if (response?.status == 200 && response?.data?.status == true) {

  //         callValidator(response);

  //       } else {
  //         ToastComponent(response?.data?.msg);
  //         console.log(TAG, ' error got in else ');
  //       }
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
  //       console.log(TAG, ' error i got in catch ', error);
  //       router.push(`/technical-issue`);
  //     });
  // }

  // function callValidator(response: any) {

  //   if (response?.data && response?.data?.data !== undefined) {

  //     if (response?.data?.data.length == 0) {
  //       router.push(`/add-company`);
  //       return;
  //     } else {

  //       const empArr: any = [];
  //       response?.data?.data.map((item: any, index: any) => {
  //         empArr.push({
  //           value: item._id,
  //           label: item.name,
  //         });
  //       });

  //       //for dropdown header selection
  //       localStorage.setItem('companies', JSON.stringify(empArr));

  //       //for selected company
  //       localStorage.setItem('company', JSON.stringify({ _id: empArr[0]?.value, name: empArr[0]?.label }));

  //       //for companies full information
  //       localStorage.setItem('companiesData', JSON.stringify(response?.data?.data));


  //       getUOMCall({ _id: empArr[0]?.value, name: empArr[0]?.label });

  //     }
  //   } else {
  //     router.push(`/technical-issue`);
  //   }

  // }

  // async function getUOMCall(apiData: any): Promise<void> {

  //   NetworkOps.makeGetRequest(`${endPoints.getuoms}?company=${apiData?._id}`, true)
  //     .then(async (response: any) => {
  //       console.log(TAG, ' api response ', response);
  //       setLoading(false);
  //       if (response?.status == 200 && response?.data?.status == true) {
  //         callValidatorUom(response, apiData);
  //       } else {
  //         ToastComponent(response?.data?.msg);
  //         console.log(TAG, ' error got in else ');
  //       }
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
  //       console.log(TAG, ' error i got in catch ', error);
  //       router.push(`/technical-issue`);
  //     });

  // }



  // function callValidatorUom(response: any, apiData: any) {

  //   if (response?.data?.data && response?.data?.data.length > 0) {
  //     localStorage.setItem('uom', JSON.stringify(response?.data?.data));
  //     getLedgers(apiData);
  //   } else {
  //     router.push(`/technical-issue`);
  //   }

  // }



  // async function getLedgers(apiData: any): Promise<void> {

  //   NetworkOps.makeGetRequest(`${endPoints.getLedgers}?company=${apiData?._id}`, true)
  //     .then(async (response: any) => {
  //       console.log(TAG, ' api response ', response);
  //       setLoading(false);
  //       if (response?.status == 200 && response?.data?.status == true) {

  //         validateLedgers(response);

  //       } else {
  //         ToastComponent(response?.data?.msg);
  //         console.log(TAG, ' error got in else ');
  //       }
  //     })
  //     .catch((error: any) => {
  //       setLoading(false);
  //       error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
  //       console.log(TAG, ' error i got in catch ', error);
  //       router.push(`/technical-issue`);
  //     });

  // }

  // function validateLedgers(response: any) {

  //   if (response?.data && response?.data?.data.length) {
  //     localStorage.setItem('ledgers', JSON.stringify(response?.data?.data));
  //     router.push(`/home`);
  //   } else {
  //     router.push(`/technical-issue`);
  //   }

  // }



  return (
    <>

      <div className="pt-5 a-title" >Login </div>

      <div className="pt-5 a-input-wrapper" >

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >

          {({ errors, values, touched, handleChange }) => (

            <Form className="w-100">

              <div className="mt-3" >
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

              <div className="mt-3" >
                <InputPassword
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  disabled={loading}
                  maxLength={16}
                  asterisk={true}
                  onChangeEvent={handleChange('password')}
                />
                {errors.password && touched.password ? (<div className="in-error">{`${errors.password}`}</div>) : null}
              </div>


              <div className="mt-4 d-flex justify-content-between" >
                <div className="w-auto" >
                  {/* <CustomCheckbox title="Remember me" /> */}
                </div>
                <div className="w-auto" >
                  <span className="forgot" > <Link href="forgot-password" > Forgot Password ? </Link> </span>
                </div>
              </div>

              <div className="mt-4" >

                {loading === true ?
                  <Loader /> :
                  <ButtonSimple title="Continue" type="voilet w-100" />
                }

              </div>

            </Form>
          )}

        </Formik>

        {/* <div className="mt-4 text-center" >
          <span className="dont-acc" > {"Don’t have an account?"} </span>  <span className="new-ac" > <Link href="/signup" > Create new account </Link></span>
        </div> */}

      </div>
    </>
  );
}

export default LoginForm;
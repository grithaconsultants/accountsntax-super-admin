import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import InputPassword from '@/component/inputpassword/inputpassword';

import { SET_ADMIN_DATA } from '@/redux/constant';
import { loginSchema } from '@/utils/schema';
import { CommonService } from '@/utils/apiCallServices/common.api.services';


const TAG = "Login Page: ";

const LoginForm = (props: any) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    role: "client",
    email: "", 
    password: ""
  }

  async function callAsync(formValues: any) {
    setLoading(true);

    const { response, status }: any = await CommonService.loginRegister(formValues, false);

    if (!status) {
      setLoading(false);
      ToastComponent(response?.data.msg);
      return;
    };

    setLoading(false);

    const sessionData = {
      cookie: response?.data?.data?.cookie ?? null,
      loginData: response?.data?.data?.userInfo ?? null,
      token: response?.data?.data?.tokenData?.token ?? null
    };

    localStorage.setItem('userToken', String(response?.data?.data?.tokenData?.token));

    // Object.assign(sessionData, { cookie: response?.data?.data?.cookie });
    // Object.assign(sessionData, { loginData: response?.data?.data?.userInfo });
    // Object.assign(sessionData, { token: response?.data?.data?.tokenData?.token });

    router.push('/clients');

    dispatch({ type: SET_ADMIN_DATA, payload: sessionData });
  }

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

              <div className="mt-4" >
                {loading === true ?
                  <Loader /> :
                  <ButtonSimple title="Continue" type="voilet w-100" />
                }
              </div>

            </Form>
          )}

        </Formik>
      </div>
    </>
  );
}

export default LoginForm;
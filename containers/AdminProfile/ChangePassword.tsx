import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

import IconButton from '@/component/iconbutton/iconbutton';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import InputPassword from '@/component/inputpassword/inputpassword';

import { changePassword } from '@/utils/schema';
import { logoutProcess } from '@/utils/helper';

import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';


const TAG = "ChangePassword: ";
const ChangePassword = (props: any) => {

  const router = useRouter();
  const { modalBool, setModal, setReFetchAction } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    oldPassword: "",
    newPassword: ""
  }

  const fallbackModal = () => {
    setModal(false);
  }

  const logoutFun = () => {
    logoutProcess(router);
  }

  const callOtpSender = async (formValues: any) => {

    setLoading(true);
    console.log('otp submitted ', formValues);

    const verifyObj = {
      oldPassword: formValues?.oldPassword,
      newPassword: formValues?.newPassword,
    }

    console.log('otp verify object ', verifyObj);
    changePasswordCall(verifyObj);
  }

  async function changePasswordCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePostRequest(`${endPoints.changePassword}`, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          fallbackModal();
          logoutFun();
        } else {
          fallbackModal();
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        fallbackModal();
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });

  }


  // console.log(TAG, ' bankList ', bankList);
  // console.log(TAG, ' current selected bank ', modalBool);
  // console.log(TAG, ' passed data ', company);


  return (
    <Modal
      centered
      open={modalBool}
      width={500}
    >
      <div className="modal-wrapper" >

        <div className="m-tlt" >
          <div className="m-tlt-sec" >Change Password</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <div className="mt-5" >

          <Formik
            initialValues={initialValues}
            validationSchema={changePassword}
            onSubmit={values => {
              callOtpSender(values);
            }}
          >
            {({ errors, touched, setFieldValue }) => (

              <Form className="w-100">

                <div className="customer-modal-body mt-0" >

                  <div className="col-lg-6 col-12" >
                    <InputPassword
                      label="Old Password"
                      id="oldPassword"
                      name="oldPassword"
                      placeholder="Old Password"
                      type="password"
                      disabled={loading}
                      maxLength={100}
                      asterisk={true}
                      onChangeEvent={(val: any) => { setFieldValue("oldPassword", val.target.value) }}
                    />
                    {errors.oldPassword && touched.oldPassword ? (<div className="in-error">{`${errors.oldPassword}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputPassword
                      label="New Password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password"
                      type="password"
                      disabled={loading}
                      maxLength={100}
                      asterisk={true}
                      onChangeEvent={(val: any) => { setFieldValue("newPassword", val.target.value) }}
                    />
                    {errors.newPassword && touched.newPassword ? (<div className="in-error">{`${errors.newPassword}`}</div>) : null}
                  </div>

                  <div className="mt-3 d-flex justify-content-end " >
                    {loading === true ?
                      <Loader /> :
                      <ButtonSimple title="Submit" type="voilet" disabled={loading} />
                    }
                  </div>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}

export default ChangePassword;
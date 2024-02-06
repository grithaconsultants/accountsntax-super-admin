import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { emailOnlySchema } from '@/utils/schema';
import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';


const TAG = "UpdateUserEmail: ";
const UpdateUserEmail = (props: any) => {

  const { modalBool, setModal, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    email: ""
  }

  const fallbackModal = () => {
    setModal(false);
  }

  const callSync = (formValues: any) => {
    console.log(TAG, ' formValues ', formValues);
    const verifyObj = {
      email: formValues?.email
    }
    updateEmail(verifyObj);
  }

  async function updateEmail(addJson: any): Promise<void> {
    setLoading(true);
    NetworkOps.makePutRequest(`${endPoints.updateClient}`, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          fallbackModal();
          ToastComponent(response?.data?.msg);
          setReFetchAction(true);
        } else {
          fallbackModal();
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        fallbackModal();
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  // console.log(TAG, ' bankList ', bankList);
  // console.log(TAG, ' passed data ', company);


  return (
    <Modal
      centered
      open={modalBool}
      width={500}
    >
      <div className="modal-wrapper" >

        <div className="m-tlt" >
          <div className="m-tlt-sec" >Edit Profile Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <div className="" >
          <Formik
            initialValues={initialValues}
            validationSchema={emailOnlySchema}
            onSubmit={values => {
              callSync(values);
            }}
          >
            {({ errors, values, touched, handleChange }) => (
              <Form className="w-100">
                <div className="customer-modal-body mt-3" >
                  <div className="col-12" >
                    <CustomInput
                      label="Email Address"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      disabled={loading}
                      maxLength={250}
                      defaultValue={values?.email}
                      onChangeEvent={handleChange('email')}
                    />
                    {errors.email && touched.email ? (<div className="in-error">{`${errors.email}`}</div>) : null}
                  </div>
                  <div className="mt-2 d-flex justify-content-end" >
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

export default UpdateUserEmail;
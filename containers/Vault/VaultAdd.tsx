import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import InputPassword from '@/component/inputpassword/inputpassword';
import DatePickerTheme from '@/component/datepickertheme/datepickertheme';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import InputFile from '@/component/inputfile/inputfile';

import { vaultAddSchema } from '@/utils/schema';
import { back } from '@/utils/image';
import { typeOfRegistration, selectedRegistrationType, registrationLinks, ALLOWED_IMG_AND_FILE } from '@/utils/constants';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { removeplus91, removeDateRest } from '../../utils/helper';

const TAG = "VaultAdd: ";
const VaultAdd = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [fileStats, setFileStats] = useState<any>(null);

  const initialValues: any = {
    username: "",
    password: "",
    typeOfregistration: "INCOMETAX",
    registrationNo: "",
    expiryDate: "",
    registrationLink: "www.temp.com"
  }

  const fallbackModal = () => {
    setModal(false);
  }

  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues formValues ', formValues);

    const formData = {
      company: company?._id,
      username: formValues?.username,
      password: formValues?.password,
      typeOfregistration: formValues?.typeOfregistration,
      registrationNo: formValues?.registrationNo,
      expiryDate: formValues?.expiryDate,
      setReminder: "3",
      portalLink: formValues?.typeOfregistration == "OTHER" ? formValues.registrationLink : registrationLinks[formValues?.typeOfregistration],
      uploadCertificate: fileStats ? fileStats : "",
    }

    console.log(TAG, ' formData formData ', formData);
    registerCall(formData);

  }

  function reflectAction(uploadedFile: string) {
    setFileStats(uploadedFile);
  }



  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePostRequest(endPoints.addPasswordVault, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        // console.log(TAG, ' error got in else ', response);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          setModal(false);
          setReFetchAction(true);
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

  // console.log(TAG, ' custom error ', customError);

  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Add Vault</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={vaultAddSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange, setFieldValue }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2" >
                  <div className="col-lg-6 col-12 " >
                    <SimpleSelectLabel
                      option={typeOfRegistration}
                      selected={selectedRegistrationType}
                      onChangeEvent={(val: any) => {
                        setFieldValue('typeOfregistration', val.value);
                        if (val.value == "OTHER") { setFieldValue('registrationLink', ""); }
                      }}
                      disabled={loading}
                      id="typeOfregistration"
                      label="Type of Registration"
                    />
                    {errors.typeOfregistration && touched.typeOfregistration ? (<div className="in-error">{`${errors.typeOfregistration}`}</div>) : null}
                  </div>


                  {values.typeOfregistration === "OTHER" && (
                    <div className="col-lg-6 col-12" >
                      <CustomInput
                        label="Registration Link"
                        id="registrationLink"
                        name="registrationLink"
                        placeholder="Registration Link"
                        type="text"
                        disabled={loading}
                        onChangeEvent={handleChange('registrationLink')}
                      />
                      {errors.registrationLink && touched.registrationLink ? (<div className="in-error">{`${errors.registrationLink}`}</div>) : null}
                    </div>
                  )}


                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Registration Number"
                      id="registrationNo"
                      name="registrationNo"
                      placeholder="Registration Number"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('registrationNo')}
                    />
                    {errors.registrationNo && touched.registrationNo ? (<div className="in-error">{`${errors.registrationNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Username"
                      id="username"
                      name="username"
                      placeholder="Username"
                      type="username"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('username')}
                    />
                    {errors.username && touched.username ? (<div className="in-error">{`${errors.username}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputPassword
                      label="Password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      disabled={loading}
                      maxLength={16}
                      asterisk={false}
                      onChangeEvent={handleChange('password')}
                    />
                    {errors.password && touched.password ? (<div className="in-error">{`${errors.password}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <DatePickerTheme
                      label="Expiry Date"
                      onChangeEvent={(retVal: any) => setFieldValue('expiryDate', retVal)}
                      disabled={false}
                      placeholder="Expiry Date"
                    />
                    {errors.expiryDate && touched.expiryDate ? (<div className="in-error">{`${errors.expiryDate}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="Certificate"
                      id="certificateFile"
                      name="certificateFile"
                      placeholder="Certificate"
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}
                      defaultValue={modalBool?.uploadCertificate ? modalBool?.uploadCertificate : ""}

                      accept={ALLOWED_IMG_AND_FILE}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={reflectAction}
                    />
                  </div>

                </div>

                <div className="mt-3" >
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
    </Modal>
  );
}

export default VaultAdd;
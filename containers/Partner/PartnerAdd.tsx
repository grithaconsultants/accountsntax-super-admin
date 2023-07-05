import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import DatePickerTheme from '@/component/datepickertheme/datepickertheme';
import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import InputFile from '@/component/inputfile/inputfile';

import Country from '@/containers/Country/Country';
import State from '@/containers/State/State';
import City from '@/containers/City/City';

import { partnerAddSchema } from '@/utils/schema';
import { back } from '@/utils/image';
import { companyType, ALLOWED_IMG_AND_FILE } from '@/utils/constants';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "PartnerAdd: ";
const PartnerAdd = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [countryList, setCountryList] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "IN", label: "India" });

  const [stateList, setStateList] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [cityList, setCityList] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const initialValues: any = {
    company: company?._id,
    name: "",
    email: "",
    mobile: "",
    dob: "",
    panNo: "",
    dinNo: "",
    aadhaarNo: "",
    digitalPassword: "",
    digitalExpiryDate: "",
    addLine1: "",
    addLine2: "",
    country: "IN",
    state: "",
    city: "",
    zipCode: "",
  }

  const fallbackModal = () => {
    setModal(false);
    // fetchAllCountry();
  }

  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues formValues ', formValues);

    const formData = {

      company: formValues?.company,
      name: formValues?.name,
      email: formValues?.email,
      mobile: `+91${formValues?.mobile}`,
      dob: formValues?.dob,
      pan: {
        panNo: formValues?.panNo,
      },
      din: {
        dinNo: formValues?.dinNo,
      },
      aadhaar: {
        aadhaarNo: formValues?.aadhaarNo,
      },
      digitalSignature: {
        password: formValues?.digitalPassword,
        expiryDate: formValues?.digitalExpiryDate
      },
      address: {
        addLine1: formValues?.addLine1,
        addLine2: formValues?.addLine2,
        city: formValues?.city,
        state: formValues?.state,
        pincode: formValues?.zipCode,
        country: formValues?.country,
      }

    }


    if (files.length) {
      for (let item of files) {
        if (item.label == "aadhaarCard") { Object.assign(formData.aadhaar, { aadhaarCard: item.value }) }
        if (item.label == "din") { Object.assign(formData.din, { din: item.value }) }
        if (item.label == "panCard") { Object.assign(formData.pan, { panCard: item.value }) }
        if (item.label == "photo") { Object.assign(formData, { photo: item.value }) }
      }
    }

    // console.log(TAG, ' form data api way ', formData);
    registerCall(formData);

  }

  function profileReflect(fileUploadedName: string) {
    setFiles([...files, { label: "photo", value: fileUploadedName }]);
  }

  function panReflect(fileUploadedName: string) {
    setFiles([...files, { label: "panCard", value: fileUploadedName }]);
  }

  function dinReflect(fileUploadedName: string) {
    setFiles([...files, { label: "din", value: fileUploadedName }]);
  }

  function aadharReflect(fileUploadedName: string) {
    setFiles([...files, { label: "aadhaarCard", value: fileUploadedName }]);
  }


  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePostRequest(endPoints.addPartner, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          setReFetchAction(true);
          setModal(false);
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
  console.log(TAG, ' selected files ', files);

  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Add Partner</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={partnerAddSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange, setFieldValue }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2" >

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Name"
                      id="name"
                      name="name"
                      placeholder="Name"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('name')}
                    />
                    {errors.name && touched.name ? (<div className="in-error">{`${errors.name}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Email Address"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('email')}
                    />
                    {errors.email && touched.email ? (<div className="in-error">{`${errors.email}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Contact Number"
                      id="mobile"
                      name="mobile"
                      placeholder="Contact Number"
                      type="number"
                      disabled={loading}
                      maxLength={10}
                      onChangeEvent={handleChange('mobile')}
                    />
                    {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <DatePickerTheme
                      label="DOB"
                      placeholder="DOB"
                      disabled={false}
                      onChangeEvent={(retVal: any) => setFieldValue('dob', retVal)}
                    />
                    {errors.dob && touched.dob ? (<div className="in-error">{`${errors.dob}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="PAN"
                      id="panNo"
                      name="panNo"
                      placeholder="PAN"
                      type="text"
                      disabled={loading}
                      onChangeEvent={handleChange('panNo')}
                    />
                    {errors.panNo && touched.panNo ? (<div className="in-error">{`${errors.panNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Aadhaar Number"
                      id="aadhaarNo"
                      name="aadhaarNo"
                      placeholder="Aadhaar Number"
                      type="text"
                      disabled={loading}
                      maxLength={12}
                      onChangeEvent={handleChange('aadhaarNo')}
                    />
                    {errors.aadhaarNo && touched.aadhaarNo ? (<div className="in-error">{`${errors.aadhaarNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="DIN"
                      id="dinNo"
                      name="dinNo"
                      placeholder="DIN"
                      type="text"
                      disabled={loading}
                      onChangeEvent={handleChange('dinNo')}
                    />
                    {errors.dinNo && touched.dinNo ? (<div className="in-error">{`${errors.dinNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Digital Signature Password"
                      id="digitalPassword"
                      name="digitalPassword"
                      placeholder="Digital Signature Password"
                      type="text"
                      disabled={loading}
                      maxLength={12}
                      onChangeEvent={handleChange('digitalPassword')}
                    />
                    {errors.digitalPassword && touched.digitalPassword ? (<div className="in-error">{`${errors.digitalPassword}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <DatePickerTheme
                      label="Digital Signature Expiry"
                      placeholder="Digital Signature Expiry"
                      onChangeEvent={(retVal: any) => setFieldValue('digitalExpiryDate', retVal)}
                      disabled={false}
                    />
                    {errors.digitalExpiryDate && touched.digitalExpiryDate ? (<div className="in-error">{`${errors.digitalExpiryDate}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Address Line 1"
                      id="addLine1"
                      name="addLine1"
                      placeholder="Address Line 1"
                      type="text"
                      disabled={loading}
                      maxLength={500}
                      onChangeEvent={handleChange('addLine1')}
                    />
                    {errors.addLine1 && touched.addLine1 ? (<div className="in-error">{`${errors.addLine1}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Address Line 2"
                      id="addLine2"
                      name="addLine2"
                      placeholder="Address Line 2"
                      type="text"
                      disabled={loading}
                      maxLength={500}
                      onChangeEvent={handleChange('addLine2')}
                    />
                    {errors.addLine2 && touched.addLine2 ? (<div className="in-error">{`${errors.addLine2}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Zip Code"
                      id="zipCode"
                      name="zipCode"
                      placeholder="Zip Code"
                      type="text"
                      disabled={loading}
                      maxLength={6}
                      onChangeEvent={handleChange('zipCode')}
                    />
                    {errors.zipCode && touched.zipCode ? (<div className="in-error">{`${errors.zipCode}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <Country
                      loading={loading}
                      setLoading={setLoading}
                      countryList={countryList}
                      setCountryList={setCountryList}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                      setFieldValue={setFieldValue}
                    />
                    {errors.country && touched.country ? (<div className="in-error">{`${errors.country}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <State
                      loading={loading}
                      setLoading={setLoading}
                      selectedCountry={selectedCountry}
                      stateList={stateList}
                      setStateList={setStateList}
                      selectedState={selectedState}
                      setSelectedState={setSelectedState}
                      setFieldValue={setFieldValue}
                    />
                    {errors.state && touched.state ? (<div className="in-error">{`${errors.state}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <City
                      loading={loading}
                      setLoading={setLoading}
                      selectedCountry={selectedCountry}
                      selectedState={selectedState}
                      cityList={cityList}
                      setCityList={setCityList}
                      setSelectedCity={setSelectedCity}
                      setFieldValue={setFieldValue}
                    />
                    {errors.city && touched.city ? (<div className="in-error">{`${errors.city}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="Profile Picture"
                      id="photoFile"
                      name="photoFile"
                      placeholder="Profile Picture"
                      defaultValue=""
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

                      accept={ALLOWED_IMG_AND_FILE}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={profileReflect}
                    />
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="PAN File"
                      id="panFile"
                      name="panFile"
                      placeholder="PAN File"
                      defaultValue=""
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

                      accept={ALLOWED_IMG_AND_FILE}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={panReflect}
                    />
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="DIN File"
                      id="dinFile"
                      name="dinFile"
                      placeholder="DIN File"
                      defaultValue=""
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

                      accept={ALLOWED_IMG_AND_FILE}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={dinReflect}
                    />
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="Aadhaar File"
                      id="aadhaarFile"
                      name="aadhaarFile"
                      placeholder="Aadhaar File"
                      defaultValue=""
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

                      accept={ALLOWED_IMG_AND_FILE}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={aadharReflect}
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

export default PartnerAdd;
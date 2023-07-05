import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';

import Country from '@/containers/Country/Country';
import State from '@/containers/State/State';
import City from '@/containers/City/City';

import { addressOnly } from '@/utils/schema';
import { back } from '@/utils/image';
import { addressType } from '@/utils/constants';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "EditAddressC: ";
const EditAddressC = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [countryList, setCountryList] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "IN", label: "India" });

  const [stateList, setStateList] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [cityList, setCityList] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const initialValues: any = {
    _id: modalBool?._id,
    zipCode: modalBool?.pincode,
    addresOne: modalBool?.addLine1,
    addresTwo: modalBool?.addLine2,
    country: "IN",
    state: "",
    city: "",
    addressType: modalBool?.type
  }

  console.log(TAG, ' initialValues ', initialValues);

  const fallbackModal = () => {
    setModal(null);
  }

  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues ', formValues);

    const formData = {
      addLine1: formValues.addresOne,
      addLine2: formValues.addresOne,
      city: formValues?.city,
      state: formValues?.state,
      country: formValues?.country,
      pincode: formValues.zipCode,
      type: formValues.addressType
    }
    console.log(TAG, ' formatted data ', formData);

    let orgAdd = company.address;
    let clonedArr = [...orgAdd];
    console.log(TAG, ' cloned address ', clonedArr);
    const indexOfObject = clonedArr.findIndex((object: any) => { return object._id === formValues?._id; });
    clonedArr.splice(indexOfObject, 1);
    console.log(TAG, ' after delete ', clonedArr);
    clonedArr.push(formData);
    console.log(TAG, ' added new address ', clonedArr);

    const formatted = {
      address: clonedArr
    }

    registerCall(formatted);

  }


  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePutRequest(`${endPoints.updateCompany}/${company?._id}`, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          setModal(null);
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



  // console.log(TAG, ' current selected address ', modalBool);
  // console.log(TAG, ' passed data ', company);


  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Edit Address</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={addressOnly}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange, setFieldValue }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2" >

                  <div className="col-lg-4 col-12 " >
                    <SimpleSelectLabel
                      option={addressType}
                      selected={addressType[addressType.findIndex((x: any) => x.value === values?.addressType)]}
                      onChangeEvent={(val: any) => setFieldValue('addressType', val.value)}
                      disabled={loading}
                      id="addressType"
                      label="Type of Address"
                    />
                    {errors.type && touched.type ? (<div className="in-error">{`${errors.type}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Address Line 1"
                      id="addresOne"
                      name="addresOne"
                      placeholder="Address Line 1"
                      type="text"
                      disabled={loading}
                      maxLength={500}
                      defaultValue={values?.addresOne}
                      onChangeEvent={handleChange('addresOne')}
                    />
                    {errors.addresOne && touched.addresOne ? (<div className="in-error">{`${errors.addresOne}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    <CustomInput
                      label="Address Line 2"
                      id="addresTwo"
                      name="addresTwo"
                      placeholder="Address Line 2"
                      type="text"
                      disabled={loading}
                      maxLength={500}
                      defaultValue={values?.addresTwo}
                      onChangeEvent={handleChange('addresTwo')}
                    />
                    {errors.addresTwo && touched.addresTwo ? (<div className="in-error">{`${errors.addresTwo}`}</div>) : null}
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
                      defaultValue={values?.zipCode}
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

                </div>

                <div className="mt-3" >
                  {loading === true ?
                    <Loader /> :
                    <ButtonSimple title="Update" type="voilet" disabled={loading} />
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

export default EditAddressC;
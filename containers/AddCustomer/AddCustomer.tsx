import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import SearchSelect from '@/component/searchselect/searchselect';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { customerSchema } from '@/utils/schema';
import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { filterAllCountry, filterAllState, filterAllCity, getLedgers, isEmpty } from '../../utils/helper';

import { fieldRequired } from "@/utils/message";

const TAG = "AddCustomer: ";
const AddCustomer = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [ledgerOptions, setLedgerOptions] = useState<any>([]);
  const [selectedLedger, setSelectedLedger] = useState<any>(null);

  const [countryList, setCountryList] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "IN", label: "India" });

  const [stateList, setStateList] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [cityList, setCityList] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const [customError, setCustomError] = useState<any>({ target: "none", msg: "no msg" });


  const initialValues: any = {
    partyName: "",
    GSTIN_UIN: "",
    nameGSTIN: "",
    addresOne: "",
    addresTwo: "",
    zipCode: "",
    ledgerGroup: "",
    mobile: "",
    email: ""
  }

  useEffect(() => {
    fetchAllCountry();

    const ledgers = getLedgers();
    // console.log(TAG, ' ledgers ', ledgers);
    let empArr: any = [];
    ledgers.map((item: any, index: any) => {
      empArr.push({
        value: item.parent,
        label: item.parent,
      });
    });
    setLedgerOptions(empArr);

  }, [0]);


  useEffect(() => {
    if (selectedCountry !== null) {

      setStateList([]);
      setSelectedState(null);

      setCityList([]);
      setSelectedCity(null);

      fetchState();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState !== null) {
      setCityList([]);
      setSelectedCity(null);
      fetchCity();
    }
  }, [selectedState]);

  const fallbackModal = () => {
    setModal(false);
    // fetchAllCountry();
  }

  async function callAsync(formValues: any) {

    // console.log(TAG, ' selectedCountry ', selectedCountry);
    // console.log(TAG, ' selectedState ', selectedState);
    // console.log(TAG, ' selectedCity ', selectedCity);
    // console.log(TAG, ' selected ledger ', selectedLedger);

    if (isEmpty(selectedCountry)) {
      setCustomError({ target: "country", msg: fieldRequired.replace("%key%", "Country") });
      return;
    }

    if (isEmpty(selectedState)) {
      setCustomError({ target: "state", msg: fieldRequired.replace("%key%", "State") });
      return;
    }

    if (isEmpty(selectedCity)) {
      setCustomError({ target: "city", msg: fieldRequired.replace("%key%", "City") });
      return;
    }

    if (isEmpty(selectedLedger)) {
      setCustomError({ target: "ledgergroup", msg: fieldRequired.replace("%key%", "Ledger") });
      return;
    }

    setCustomError({ target: "none", msg: "no msg" });

    const formData = {
      partyName: formValues.partyName,
      gstin: formValues.GSTIN_UIN,
      name_as_per_gstin: formValues.nameGSTIN,
      mobile: `+91${formValues.mobile}`,
      email: formValues.email,
      company: company,
      ledgerGroup: selectedLedger?.label,
      address: {
        address: formValues.addresOne,
        city: selectedCity?.label,
        state: selectedState?.label,
        country: selectedCountry?.label,
        pinCode: formValues.zipCode
      }
    }

    // console.log(TAG, ' form data api way ', formData);
    registerCall(formData);

  }


  async function fetchAllCountry(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(endPoints.getAllCountry, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setCountryList(filterAllCountry(response?.data?.data?.country));
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  async function fetchState(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(`${endPoints.getStates}?countryCode=${selectedCountry?.value}`, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setStateList(filterAllState(response?.data?.data?.state));
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
      });
  }

  async function fetchCity(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(`${endPoints.getCities}?countryCode=${selectedCountry?.value}&stateCode=${selectedState?.value}`, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setCityList(filterAllCity(response?.data?.data?.city));
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePostRequest(endPoints.addCustomerApi, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        // console.log(TAG, ' error got in else ', response);
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

  // console.log(TAG, ' countryList ', countryList);
  // console.log(TAG, ' cityList ', cityList);
  // console.log(TAG, ' selectedCountry ', selectedCountry);
  // console.log(TAG, ' selectedState ', selectedState);
  // console.log(TAG, ' selectedCity ', selectedCity);
  console.log(TAG, ' ledgerOptions ', ledgerOptions);
  // console.log(TAG, ' selected ledger ', selectedLedger);
  // console.log(TAG, ' custom error ', customError);

  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Add New Customer</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={customerSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >

                <div className="gx-3 row gy-2" >
                  <div className="" >
                    <CustomInput
                      label="Party Name"
                      id="partyName"
                      name="partyName"
                      placeholder="Basic usage"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('partyName')}
                    />
                    {errors.partyName && touched.partyName ? (<div className="in-error">{`${errors.partyName}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="GSTIN"
                      id="GSTIN_UIN"
                      name="GSTIN_UIN"
                      placeholder="GSTIN"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('GSTIN_UIN')}
                    />
                    {errors.GSTIN_UIN && touched.GSTIN_UIN ? (<div className="in-error">{`${errors.GSTIN_UIN}`}</div>) : null}
                  </div>
                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="Name as Per GSTIN"
                      id="nameGSTIN"
                      name="nameGSTIN"
                      placeholder="Name as Per GSTIN"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('nameGSTIN')}
                    />
                    {errors.nameGSTIN && touched.nameGSTIN ? (<div className="in-error">{`${errors.nameGSTIN}`}</div>) : null}
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
                      onChangeEvent={handleChange('zipCode')}
                    />
                    {errors.zipCode && touched.zipCode ? (<div className="in-error">{`${errors.zipCode}`}</div>) : null}
                  </div>

                  <div className="col-lg-3 col-12" >
                    <SearchSelect
                      option={countryList}
                      label="Country"
                      disabled={loading}
                      placeholder="Select Country"
                      id="country"
                      selected={selectedCountry}
                      onChangeEvent={(value: any) => { setSelectedCountry(value); }}
                    />
                    {customError.target === "country" ? (<div className="in-error">{`${customError.msg}`}</div>) : null}
                  </div>

                  <div className="col-lg-3 col-12" >
                    <SearchSelect
                      option={stateList}
                      label="State"
                      disabled={loading}
                      id="state"
                      placeholder="Select State"
                      selected={selectedState}
                      onChangeEvent={(value: any) => { setSelectedState(value); }}
                    />
                    {customError.target === "state" ? (<div className="in-error">{`${customError.msg}`}</div>) : null}
                  </div>

                  <div className="col-lg-3 col-12" >
                    <SearchSelect
                      option={cityList}
                      label="City"
                      id="city"
                      disabled={loading}
                      placeholder="Select City"
                      onChangeEvent={(value: any) => { setSelectedCity(value); }}
                    />
                    {customError.target === "city" ? (<div className="in-error">{`${customError.msg}`}</div>) : null}
                  </div>

                  <div className="col-lg-3 col-12" >
                    <SearchSelect
                      option={ledgerOptions}
                      label="Ledger Group"
                      id="ledgerGroup"
                      disabled={loading}
                      placeholder="Ledger Group"
                      onChangeEvent={(value: any) => { setSelectedLedger(value); }}
                    />
                    {customError.target === "ledgergroup" ? (<div className="in-error">{`${customError.msg}`}</div>) : null}
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
                      onChangeEvent={handleChange('mobile')}
                    />
                    {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
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

export default AddCustomer;
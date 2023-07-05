import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import TextAreaComp from '@/component/textarea/textarea';
import DateTimeOnly from '@/component/datetime/datetime';
import MultiSelectLabel from '@/component/multiselect/multiselect';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import DatePickerTheme from '@/component/datepickertheme/datepickertheme';
import InputColor from '@/component/InputColor/InputColor';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { addMeetingSchema } from '@/utils/schema';
import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { queryTarget, queryTargetSelected } from '@/utils/constants';

const TAG = "MeetingAdd: ";
const MeetingAdd = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction, token, profileData } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const initialValues: any = {
    company: company,
    currentUser: profileData?._id,
    title: "",
    description: "",
    audience: "",
    eventDate: "",
  }


  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const fallbackModal = () => {
    setModal(false);
  }

  async function callAsync(formValues: any) {

    if (formValues?.category == "custom" && formValues?.customCategory == "") {
      ToastComponent("Custom Name is required.");
      return;
    }

    console.log(TAG, ' form data api way ', formValues);
    setLoading(true);

    // registerCall(formValues);
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

  // console.log(TAG + " company id ", company);

  // console.log(TAG, ' countryList ', countryList);
  // console.log(TAG, ' cityList ', cityList);
  // console.log(TAG, ' selectedCountry ', selectedCountry);
  // console.log(TAG, ' selectedState ', selectedState);
  // console.log(TAG, ' selectedCity ', selectedCity);
  // console.log(TAG, ' ledgerOptions ', ledgerOptions);
  // console.log(TAG, ' selected ledger ', selectedLedger);
  // console.log(TAG, ' custom error ', customError);

  return (
    <>
      {domLoaded && (
        <Modal
          centered
          open={modalBool}
          width={1000}
        >
          <div className="modal-wrapper" >
            <div className="m-tlt" >
              <div className="m-tlt-sec" >Schedule Meeting</div>
              {!loading && (
                <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
              )}
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={addMeetingSchema}
              onSubmit={values => {
                callAsync(values);
              }}
            >
              {({ errors, values, touched, handleChange, setFieldValue }) => (

                <Form className="w-100">

                  <div className="customer-modal-body mt-3" >

                    <div className="gx-3 row gy-2" >
                      {/* <div>{JSON.stringify(errors)}</div> */}
                      <div className="" >
                        <CustomInput
                          label="Title"
                          id="title"
                          name="title"
                          placeholder="Title"
                          type="text"
                          disabled={loading}
                          onChangeEvent={handleChange('title')}
                        />
                        {errors.title && touched.title ? (<div className="in-error">{`${errors.title}`}</div>) : null}
                      </div>

                      <div className="" >
                        <MultiSelectLabel
                          option={queryTarget}
                          selected={queryTargetSelected}
                          onChangeEvent={(retVal: any) => setFieldValue('target', retVal.value)}
                          disabled={loading}
                          label="Participant"
                        />
                        {errors.target && touched.target ? (<div className="in-error">{`${errors.target}`}</div>) : null}
                      </div>

                      <div>
                        <DateTimeOnly
                          label="Date"
                          onChangeEvent={(retVal: any) => setFieldValue('eventDate', retVal)}
                        />
                        {errors.eventDate && touched.eventDate ? (<div className="in-error">{`${errors.eventDate}`}</div>) : null}
                      </div>

                      <div className="col-12" >
                        <TextAreaComp
                          label="Description"
                          id="description"
                          name="description"
                          placeholder="Description"
                          disabled={loading}
                          onChangeEvent={handleChange('description')}
                          rows={4}
                        />
                        {errors.description && touched.description ? (<div className="in-error">{`${errors.description}`}</div>) : null}
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
      )}
    </>
  );
}

export default MeetingAdd;
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import InputColor from '@/component/InputColor/InputColor';
import DatePickerTheme from '@/component/datepickertheme/datepickertheme';
import TextAreaComp from '@/component/textarea/textarea';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { dueDateSchema } from '@/utils/schema';
import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { dueDateCategory, selectedDueDateCategory, dueDatePriority, selectedDueDatePriority } from '@/utils/constants';

const TAG = "DueDateAdd: ";
const DueDateAdd = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction, token, profileData } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const initialValues: any = {
    company: company,
    currentUser: profileData?._id,
    title: "",
    description: "",
    priority: selectedDueDatePriority[0].value,
    category: selectedDueDateCategory[0].value,
    customCategory: "",
    eventDate: "",
    color: "#c4c4c4",
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
              <div className="m-tlt-sec" >Add New Event</div>
              {!loading && (
                <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
              )}
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={dueDateSchema}
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


                      <div className="col-lg-6 col-12 " >
                        <SimpleSelectLabel
                          option={dueDatePriority}
                          selected={selectedDueDatePriority}
                          onChangeEvent={(retVal: any) => setFieldValue('priority', retVal.value)}
                          disabled={loading}
                          label="Priority"
                        />
                        {errors.priority && touched.priority ? (<div className="in-error">{`${errors.priority}`}</div>) : null}
                      </div>

                      <div className="col-lg-6 col-12 " >
                        <SimpleSelectLabel
                          option={dueDateCategory}
                          selected={selectedDueDateCategory}
                          onChangeEvent={(retVal: any) => setFieldValue('category', retVal.value)}
                          disabled={loading}
                          label="Category"
                        />
                        {errors.category && touched.category ? (<div className="in-error">{`${errors.category}`}</div>) : null}
                      </div>


                      {values.category === "custom" && (
                        <>

                          <div className="col-lg-6 col-12" >
                            <CustomInput
                              label="Custom Name"
                              id="customCategory"
                              name="customCategory"
                              placeholder="Custom Name"
                              type="text"
                              disabled={loading}
                              onChangeEvent={handleChange('customCategory')}
                            />
                            {errors.customCategory && touched.customCategory ? (<div className="in-error">{`${errors.customCategory}`}</div>) : null}
                          </div>

                          <div className="col-lg-6 col-12 " >
                            <InputColor
                              label="Color"
                              id="color"
                              name="color"
                              defaultValue="#c4c4c4"
                              disabled={loading}
                              onChangeEvent={(retVal: any) => setFieldValue('color', retVal.target.value)}
                            />
                            {errors.color && touched.color ? (<div className="in-error">{`${errors.color}`}</div>) : null}
                          </div>

                        </>
                      )}

                      <div>
                        <DatePickerTheme
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

export default DueDateAdd;
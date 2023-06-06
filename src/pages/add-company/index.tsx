import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import { authCard, logo776x120 } from '@/utils/image';


import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import CustomInput from '@/component/input/input';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { getToken } from '@/utils/helper';

import { companyType, selectedCompanyType } from '@/utils/constants';
import { companySchema } from '@/utils/schema';

const TAG = "AddCompany: ";
const AddCompany = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    companyName: "",
    noOfPartners: "",
    nameAsPerPan: "",
    tan: "",
    pan_card: "",
    type: "individual"
  }

  // useEffect(() => {
  //   getToken();
  // }, [0]);

  async function callAsync(val: any) {

    setLoading(true);

    console.log(' i got this  ', val);

    const formData = {
      name: val?.companyName,
      noOfPartners: val?.noOfPartners,
      nameAsPerPan: val?.nameAsPerPan,
      address: "",
      tan: val?.tan,
      pan_card: val?.pan_card,
      type: val?.type,
    }

    console.log(' form values  ', formData);

    registerCall(formData);


  }


  async function registerCall(addJson: any): Promise<void> {

    NetworkOps.makePostRequest(endPoints.addCompany, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        // console.log(TAG, ' error got in else ', response);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          router.push('/login');
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

  // console.log('localstorage ', localStorage.getItem('userData'));
  // const checking = localStorage.getItem('userData');
  // if( !isEmpty(checking) ){
  //   router.push('/home');
  // }

  return (
    <section id="loginWrapper" >

      <div className="row" >

        <div className="col-lg-6 col-12 p-0" >
          <div className="col-12 p-0 auth-car-card " >
            <Image src={authCard} alt="gst icon" width={412} height={382} priority />
          </div>
        </div>

        <div className="col-lg-6 col-12 auth-form px-5 pt-5 mb-lg-0 mb-md-5 mb-5" >
          <div className="col-xl-9 col-lg-9 col-md-12 col-12" >
            <div className="a-t-h" >
              <Image src={logo776x120} alt="gst icon" width={232} height={36} />
            </div>

            <div className="pt-5 a-title" >Add Company </div>

            <div className="" >

              <Formik
                initialValues={initialValues}
                validationSchema={companySchema}
                onSubmit={values => {
                  callAsync(values);
                }}
              >
                {({ errors, values, touched, handleChange, setFieldValue }) => (

                  <Form className="w-100">

                    <div className="customer-modal-body mt-3" >
                      <div className="gx-3 row gy-2">
                        {/* {JSON.stringify(errors)} */}

                        <div className="col-12" >
                          <CustomInput
                            label="Company Name"
                            id="companyName"
                            name="companyName"
                            placeholder="Company Name"
                            type="text"
                            disabled={loading}
                            maxLength={501}
                            onChangeEvent={handleChange('companyName')}
                          />
                          {errors.companyName && touched.companyName ? (<div className="in-error">{`${errors.companyName}`}</div>) : null}
                        </div>

                        <div className="col-12" >
                          <CustomInput
                            label="Number Of Partners"
                            id="noOfPartners"
                            name="noOfPartners"
                            placeholder="Number Of Partners"
                            type="number"
                            disabled={loading}
                            onChangeEvent={handleChange('noOfPartners')}
                          />
                          {errors.noOfPartners && touched.noOfPartners ? (<div className="in-error">{`${errors.noOfPartners}`}</div>) : null}
                        </div>

                        <div className="col-12" >
                          <CustomInput
                            label="Name As On Pancard"
                            id="nameAsPerPan"
                            name="nameAsPerPan"
                            placeholder="Name As On Pancard"
                            type="text"
                            maxLength={251}
                            disabled={loading}
                            onChangeEvent={handleChange('nameAsPerPan')}
                          />
                          {errors.nameAsPerPan && touched.nameAsPerPan ? (<div className="in-error">{`${errors.nameAsPerPan}`}</div>) : null}
                        </div>

                        <div className="col-12" >
                          <CustomInput
                            label="Tan"
                            id="tan"
                            name="tan"
                            placeholder="Tan"
                            type="text"
                            disabled={loading}
                            maxLength={10}
                            onChangeEvent={handleChange('tan')}
                          />
                          {errors.tan && touched.tan ? (<div className="in-error">{`${errors.tan}`}</div>) : null}
                        </div>

                        <div className="col-12 " >
                          <CustomInput
                            label="Pancard"
                            id="pan_card"
                            name="pan_card"
                            placeholder="Pancard"
                            type="text"
                            disabled={loading}
                            maxLength={10}
                            onChangeEvent={handleChange('pan_card')}
                          />
                          {errors.pan_card && touched.pan_card ? (<div className="in-error">{`${errors.pan_card}`}</div>) : null}
                        </div>

                        <div className="col-12 " >
                          <SimpleSelectLabel
                            option={companyType}
                            selected={selectedCompanyType}
                            onChangeEvent={(val: any) => setFieldValue('type', val.value)}
                            disabled={loading}
                            id="companyType"
                            label="Type"
                          />
                          {errors.type && touched.type ? (<div className="in-error">{`${errors.type}`}</div>) : null}
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

          </div>
        </div>

      </div>

    </section>
  );
}

export default AddCompany;
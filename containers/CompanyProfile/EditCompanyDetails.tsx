import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import ImageViewer from '@/component/imageviewer/imageviewer';
import InputFile from '@/component/inputfile/inputfile';

import { companyDetials } from '@/utils/schema';
import { back, companyJPG } from '@/utils/image';
import { removeplus91 } from '@/utils/helper';

import { companyType, ALLOWED_IMG } from '@/utils/constants';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';



import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';

const TAG = "EditCompanyDetails: ";
const EditCompanyDetails = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    _id: company?._id,
    type: company?.type,
    name: company?.name,
    email: company?.email,
    mobile: removeplus91(company?.mobile ? company?.mobile : ""),
    tan: company?.tan,
  }

  const fallbackModal = () => {
    setModal(false);
  }


  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues ', formValues);

    const formData = {
      _id: formValues?._id,
      type: formValues?.type,
      name: formValues?.name,
      email: formValues?.email,
      mobile: `+91${formValues?.mobile}`,
      tan: formValues?.tan
    }

    console.log(TAG, ' formatted data ', formData);

    registerCall(formData);

  }

  async function imgReflect(fileUploadedName: string){
    const json = {
      logo: fileUploadedName
    }

    registerCall(json);
  }

  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePutRequest(`${endPoints.updateCompany}/${company?._id}`, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
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


  // console.log(TAG, ' bankList ', bankList);
  // console.log(TAG, ' current selected bank ', modalBool);
  // console.log(TAG, ' passed data ', company);


  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Edit Company Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>


        <div className='d-flex mb-5'>

          <div className='d-flex justify-content-center'>
            <ImageViewer
              width={100}
              height="auto"
              preview={false}
              imageFileName={company?.logo}
              placeholderWidth={100}
              placeholderImage={companyJPG}
            />
          </div>

        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={companyDetials}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange, setFieldValue }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2">

                  <div className="col-lg-6 col-12 " >
                    <SimpleSelectLabel
                      option={companyType}
                      selected={companyType[companyType.findIndex((x: any) => x.value === values?.type)]}
                      onChangeEvent={(val: any) => setFieldValue('type', val.value)}
                      disabled={loading}
                      id="companyType"
                      label="Company Type"
                    />
                    {errors.type && touched.type ? (<div className="in-error">{`${errors.type}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Company Name"
                      id="name"
                      name="name"
                      placeholder="Company Name"
                      type="text"
                      disabled={loading}
                      maxLength={501}
                      defaultValue={values?.name}
                      onChangeEvent={handleChange('name')}
                    />
                    {errors.name && touched.name ? (<div className="in-error">{`${errors.name}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Contact Number"
                      id="mobile"
                      name="mobile"
                      placeholder="Contact Number"
                      type="number"
                      disabled={loading}
                      defaultValue={values?.mobile}
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
                      defaultValue={values?.email}
                      onChangeEvent={handleChange('email')}
                    />
                    {errors.email && touched.email ? (<div className="in-error">{`${errors.email}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="TAN"
                      id="tan"
                      name="tan"
                      placeholder="TAN"
                      type="text"
                      disabled={loading}
                      maxLength={10}
                      defaultValue={values?.tan}
                      onChangeEvent={handleChange('tan')}
                    />
                    {errors.tan && touched.tan ? (<div className="in-error">{`${errors.tan}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="Logo"
                      id="companyLogo"
                      name="companyLogo"
                      placeholder="Company Logo"
                      defaultValue={company?.logo}
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

                      accept={ALLOWED_IMG}
                      allowedSize={1000000}
                      sizeText="1mb"
                      reflectAction={imgReflect}

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

export default EditCompanyDetails;
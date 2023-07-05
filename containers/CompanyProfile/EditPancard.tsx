import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';
import dayjs from 'dayjs';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import DatePickerTheme from '@/component/datepickertheme/datepickertheme';
import SwitchComponent from '@/component/switch/switch';
import InputFile from '@/component/inputfile/inputfile';

import { pancardOnly } from '@/utils/schema';
import { back } from '@/utils/image';
import { removeDateRest } from '@/utils/helper';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { companyType, ALLOWED_IMG_AND_FILE } from '@/utils/constants';

const TAG = "EditPancardC: ";
const EditPancardC = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: any = {
    aaddharLink: company?.panDetail?.aaddharLink ? company?.panDetail?.aaddharLink : false,
    dob: company?.panDetail?.dob ? company?.panDetail?.dob : "",
    fatherName: company?.panDetail?.fatherName ? company?.panDetail?.fatherName : "",
    nameAsPerPan: company?.panDetail?.nameAsPerPan ? company?.panDetail?.nameAsPerPan : "",
    panNo: company?.panDetail?.panNo ? company?.panDetail?.panNo : "",
  }

  const fallbackModal = () => {
    setModal(null);
  }

  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues ', formValues);

    const formData = {
      aaddharLink: formValues?.aaddharLink,
      dob: formValues?.dob,
      fatherName: formValues?.fatherName,
      nameAsPerPan: formValues?.nameAsPerPan,
      panNo: formValues?.panNo,
      panCard: company?.panDetail?.panCard
    }

    console.log(TAG, ' formatted data ', formData);

    const formatted = {
      panDetail: formData
    }

    registerCall(formatted);

  }

  async function reflectAction(fileUploadedName: string) {
    const formatted = {
      panDetail : {
        aaddharLink: company?.panDetail?.aaddharLink,
        dob: company?.panDetail?.dob,
        fatherName: company?.panDetail?.fatherName,
        nameAsPerPan: company?.panDetail?.nameAsPerPan,
        panNo: company?.panDetail?.panNo,
        panCard: fileUploadedName
      }
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
          <div className="m-tlt-sec" >Edit Pancard</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={pancardOnly}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange, setFieldValue }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2" >

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="PAN"
                      id="panNo"
                      name="panNo"
                      placeholder="PAN"
                      type="text"
                      disabled={loading}
                      maxLength={10}
                      defaultValue={values.panNo}
                      onChangeEvent={handleChange('panNo')}
                    />
                    {errors.panNo && touched.panNo ? (<div className="in-error">{`${errors.panNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="Name as Per Pan"
                      id="nameAsPerPan"
                      name="nameAsPerPan"
                      placeholder="Name as Per Pan"
                      type="text"
                      disabled={loading}
                      defaultValue={values?.nameAsPerPan}
                      maxLength={250}
                      onChangeEvent={handleChange('nameAsPerPan')}
                    />
                    {errors.nameAsPerPan && touched.nameAsPerPan ? (<div className="in-error">{`${errors.nameAsPerPan}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="Father Name"
                      id="fatherName"
                      name="fatherName"
                      placeholder="Father Name"
                      type="text"
                      disabled={loading}
                      defaultValue={values.fatherName}
                      maxLength={250}
                      onChangeEvent={handleChange('fatherName')}
                    />
                    {errors.fatherName && touched.fatherName ? (<div className="in-error">{`${errors.fatherName}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <DatePickerTheme
                      label="DOB"
                      onChangeEvent={(retVal: any) => setFieldValue('dob', retVal)}
                      disabled={true}
                      placeholder="DOB"
                      defaultValue={dayjs(removeDateRest(values.dob), 'YYYY-MM-DD')}
                    />
                    {errors.dob && touched.dob ? (<div className="in-error">{`${errors.dob}`}</div>) : null}
                  </div>

                  <div className="col-12 mt-3" >
                    <SwitchComponent
                      defaultChecked={values?.aaddharLink}
                      label="Linked with Aadhar"
                      onChangeEvent={(value: any) => { setFieldValue('aaddharLink', value); }}
                    />
                  </div>


                  <div className="col-lg-6 col-12" >
                    <InputFile
                      label="PAN File"
                      id="panFile"
                      name="panFile"
                      placeholder="PAN File"
                      defaultValue={company?.panDetail?.panCard}
                      companyId={company?._id}
                      deleteRight={true}
                      uploadRight={true}

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

export default EditPancardC;
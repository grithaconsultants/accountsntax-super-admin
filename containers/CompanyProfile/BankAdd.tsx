import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import SearchSelect from '@/component/searchselect/searchselect';

import { filterAllBanks } from '../../utils/helper';
import { bankDetailsOnly } from '@/utils/schema';
import { back } from '@/utils/image';
import { accountType, selectedAccountType } from '@/utils/constants';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "BankAdd: ";
const BankAdd = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [bankList, setBankList] = useState<any>(null);

  const initialValues: any = {
    bankName: "",
    accountNo: "",
    ifscCode: "",
    typeOfAccount: "current",
    beniFiciaryName: "",
  }

  const fallbackModal = () => {
    setModal(false);
  }

  useEffect(() => {
    getAllBanks();
  }, [0]);

  async function callAsync(formValues: any) {

    console.log(TAG, ' formValues ', formValues);

    const formData = {
      bankName: formValues?.bankName,
      accountNo: formValues?.accountNo,
      ifscCode: formValues?.ifscCode,
      typeOfAccount: formValues?.typeOfAccount,
      beniFiciaryName: formValues?.beniFiciaryName,
    }

    console.log(TAG, ' formatted data ', formData);

    let orgAdd = company.bankDetail;
    let clonedArr = [...orgAdd];
    clonedArr.push(formData);
    console.log(TAG, ' updated address ', clonedArr);

    const formatted = {
      bankDetail: clonedArr
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

  async function getAllBanks(): Promise<void> {
    setLoading(true);
    NetworkOps.makeGetRequest(endPoints.getBanks, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200) {
          setBankList(filterAllBanks(response?.data?.data));
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
          <div className="m-tlt-sec" >Add Bank</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={bankDetailsOnly}
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
                      option={accountType}
                      selected={selectedAccountType}
                      onChangeEvent={(val: any) => setFieldValue('typeOfAccount', val.value)}
                      disabled={loading}
                      id="typeOfAccount"
                      label="Type of Account"
                    />
                    {errors.typeOfAccount && touched.typeOfAccount ? (<div className="in-error">{`${errors.typeOfAccount}`}</div>) : null}
                  </div>

                  <div className="col-lg-4 col-12" >
                    {bankList !== null ?
                      <>
                        <SearchSelect
                          option={bankList}
                          label="Bank Name"
                          disabled={loading}
                          placeholder="Select Country"
                          id="bankName"
                          selected={bankList[bankList.findIndex((x: any) => x.value === values?.bankName)]}
                          onChangeEvent={(value: any) => { setFieldValue('bankName', value.label) }}
                        />
                        {errors.bankName && touched.bankName ? (<div className="in-error">{`${errors.bankName}`}</div>) : null}
                      </> : <Loader />
                    }
                  </div>

                  <div className="col-lg-4 col-12 " >
                    <CustomInput
                      label="Beneficiary Name"
                      id="beniFiciaryName"
                      name="beniFiciaryName"
                      placeholder="Beneficiary Name"
                      type="text"
                      disabled={loading}
                      maxLength={1000}
                      onChangeEvent={handleChange('beniFiciaryName')}
                    />
                    {errors.beniFiciaryName && touched.beniFiciaryName ? (<div className="in-error">{`${errors.beniFiciaryName}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Account Number"
                      id="accountNo"
                      name="accountNo"
                      placeholder="Account Number"
                      type="number"
                      disabled={loading}
                      maxLength={100}
                      onChangeEvent={handleChange('accountNo')}
                    />
                    {errors.accountNo && touched.accountNo ? (<div className="in-error">{`${errors.accountNo}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="IFSC Code"
                      id="ifscCode"
                      name="ifscCode"
                      placeholder="IFSC Code"
                      type="text"
                      disabled={loading}
                      maxLength={11}
                      onChangeEvent={handleChange('ifscCode')}
                    />
                    {errors.ifscCode && touched.ifscCode ? (<div className="in-error">{`${errors.ifscCode}`}</div>) : null}
                  </div>

                </div>

                <div className="mt-3" >
                  {loading === true ?
                    <Loader /> :
                    <ButtonSimple title="Add" type="voilet" disabled={loading} />
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

export default BankAdd;
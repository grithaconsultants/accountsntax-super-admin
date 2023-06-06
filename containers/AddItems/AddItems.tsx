import React, { useState, useEffect } from 'react';

import { Modal } from 'antd';
import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import SearchSelect from '@/component/searchselect/searchselect';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import { back } from '@/utils/image';

import { Formik, Form } from 'formik';

import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';

import { itemSchema } from '@/utils/schema';

import endPoints from '@/ApiHandler/AppConfig';
import { customers, customersSelected } from '@/utils/constants';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { getUOM, isEmpty } from '../../utils/helper';

const TAG = "AddItem: ";
const AddItem = (props: any) => {

  const { modalBool, setModal, company, token, setReFetchAction } = props;
  const [loading, setLoading] = useState<boolean>(false);


  const [customError, setCustomError] = useState<any>({ target: "none", msg: "no msg" });
  const [uomOptions, setUOMOptions] = useState<any>([]);
  const [selectedUom, setSelectedUOM] = useState<any>(null);


  const initialValues: any = {
    itemName: "",
    hsn: "",
    unit: "",
    rate: "",
    openingBalance: "",
    openingRate: "",
    openingValue: "",
    uom: "",
    description: "",
    company: company
  }

  useEffect(() => {
    const uomList = getUOM();
    let empArr: any = [];
    uomList.map((item: any, index: any) => {
      empArr.push({
        value: item._id,
        label: item.name,
      });
    });
    setUOMOptions(empArr);
  }, [0]);



  const fallbackModal = () => {
    setModal(false);
  }

  async function callAsync(formValues: any) {
    console.log('hi all ', formValues);
    console.log('hi all ', selectedUom);

    const formData = {
        itemName: formValues?.itemName,
        hsn: formValues?.hsn,
        unit: formValues?.unit,
        rate: formValues?.rate,
        uom: selectedUom ? selectedUom?.label : "",
        openingBalance: formValues?.openingBalance,
        openingRate: formValues?.openingRate,
        openingValue: formValues?.openingValue,
        description: formValues?.description,
        company: formValues?.company
    }

    console.log('hi all ', formData);

    setLoading(true);
    registerCall(formData);

  }

  async function registerCall(addJson: any): Promise<void> {
    NetworkOps.makePostRequest(endPoints.addItems, addJson, token)
      .then(async (response: any) => {
        setLoading(false);
        console.log(TAG, ' error got in else ', response);
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

  console.log(TAG, ' uom list ', uomOptions);
  console.log(TAG, ' uom selected ', selectedUom);


  return (
    <Modal
      centered
      open={modalBool}
      width={600}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Add New Item</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={itemSchema}
          onSubmit={values => {
            callAsync(values);
          }}
        >
          {({ errors, values, touched, handleChange }) => (

            <Form className="w-100">

              <div className="customer-modal-body mt-3" >
                <div className="gx-3 row gy-2">
                  {/* {JSON.stringify(errors)} */}
                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Name of item"
                      id="itemName"
                      name="itemName"
                      placeholder="Name of item"
                      type="text"
                      disabled={loading}
                      maxLength={250}
                      onChangeEvent={handleChange('itemName')}
                    />
                    {errors.itemName && touched.itemName ? (<div className="in-error">{`${errors.itemName}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="HSN/SAC"
                      id="hsn"
                      name="hsn"
                      placeholder="HSN/SAC"
                      type="text"
                      disabled={loading}
                      maxLength={1001}
                      onChangeEvent={handleChange('hsn')}
                    />
                    {errors.hsn && touched.hsn ? (<div className="in-error">{`${errors.hsn}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Unit"
                      id="unit"
                      name="unit"
                      placeholder="Unit"
                      type="number"
                      disabled={loading}
                      onChangeEvent={handleChange('unit')}
                    />
                    {errors.unit && touched.unit ? (<div className="in-error">{`${errors.unit}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12" >
                    <CustomInput
                      label="Rate"
                      id="rate"
                      name="rate"
                      placeholder="Rate"
                      type="number"
                      disabled={loading}
                      onChangeEvent={handleChange('rate')}
                    />
                    {errors.rate && touched.rate ? (<div className="in-error">{`${errors.rate}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="Opening Balance"
                      id="openingBalance"
                      name="openingBalance"
                      placeholder="Opening Balance"
                      type="text"
                      disabled={loading}
                      maxLength={1001}
                      onChangeEvent={handleChange('openingBalance')}
                    />
                    {errors.openingBalance && touched.openingBalance ? (<div className="in-error">{`${errors.openingBalance}`}</div>) : null}
                  </div>

                  <div className="col-lg-6 col-12 " >
                    <CustomInput
                      label="Opening Rate"
                      id="openingRate"
                      name="openingRate"
                      placeholder="Opening Rate"
                      type="text"
                      disabled={loading}
                      maxLength={1001}
                      onChangeEvent={handleChange('openingRate')}
                    />
                    {errors.openingRate && touched.openingRate ? (<div className="in-error">{`${errors.openingRate}`}</div>) : null}
                  </div>

                  <div className="col-12" >
                    <SearchSelect
                      option={uomOptions}
                      label="UOM"
                      disabled={loading}
                      placeholder="Select UOM"
                      id="uom"
                      onChangeEvent={(value: any) => { setSelectedUOM(value); }}
                    />
                    {customError.target === "uom" ? (<div className="in-error">{`${customError.msg}`}</div>) : null}
                  </div>

                  <div className="col-12" >
                    <CustomInput
                      label="Description"
                      id="description"
                      name="description"
                      placeholder="Description"
                      type="text"
                      disabled={loading}
                      maxLength={5001}
                      onChangeEvent={handleChange('description')}
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
  );
}

export default AddItem;
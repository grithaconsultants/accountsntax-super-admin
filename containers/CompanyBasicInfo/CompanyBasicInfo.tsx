
import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Popconfirm } from 'antd';
import { FaPlusCircle, FaRegEdit, FaTrash } from "react-icons/fa";

import InformationCard from '@/component/informationcard/InformationCard';
import IconBox from '@/component/iconbox/iconbox';
import CustomTooltip from '@/component/tooltip/tooltip';
import ToastComponent from '@/component/Toast/Toast';
import FileViewer from '@/component/fileviewer/fileviewer';

import { ALLOWED_IMG } from '@/utils/constants';
import { isEmpty, removeDateRest } from '@/utils/helper';
import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "CompanyBasicInfo: ";
const CompanyBasicInfo = (props: any) => {

  const { data, setReFetchAction, reFetchAction } = props;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [modalBool, setModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>(null);
  const [panEditData, setPanEditData] = useState<any>(null);
  const [bankEditData, setBankEditData] = useState<any>(null);
  const [bankAddData, setBankAddData] = useState<any>(false);

  const [uploadedFileName, setUploadedFileName] = useState<any>(null);

  const AddressUpdateCompany = dynamic(() => import('../CompanyProfile/CompanyAddressUpdate'), { suspense: true });
  const EditAddress = dynamic(() => import('../CompanyProfile/EditAddress'), { suspense: true });
  const EditPancard = dynamic(() => import('../CompanyProfile/EditPancard'), { suspense: true });
  const BankEdit = dynamic(() => import('../CompanyProfile/BankEdit'), { suspense: true });
  const BankAdd = dynamic(() => import('../CompanyProfile/BankAdd'), { suspense: true });

  const basicData = [
    {
      title: '_id',
      value: data?._id
    },
    {
      title: 'GST',
      value: data?.gstDetail?.gstNo ? data?.gstDetail?.gstNo : "_"
    },
    {
      title: 'Contact Number',
      value: data?.mobile ? data?.mobile : "_"
    },
    {
      title: 'Email',
      value: data?.email ? data?.email : "_"
    },
    {
      title: 'Admin',
      value: data?.admin
    },
    {
      title: 'Client',
      value: data?.client
    },
    {
      title: 'Status',
      value: data?.status == true ? "TRUE" : "FALSE"
    },
  ];

  const pancardData: any = [
    {
      title: 'PAN',
      value: data?.panDetail?.panNo ? data?.panDetail?.panNo : "_"
    },
    {
      title: 'Name as Per Pan',
      value: data?.panDetail?.nameAsPerPan ? data?.panDetail?.nameAsPerPan : "_"
    },
    {
      title: 'Father Name',
      value: data?.panDetail?.fatherName ? data?.panDetail?.fatherName : "_"
    },
    {
      title: 'DOB',
      value: data?.panDetail?.dob ? removeDateRest(data?.panDetail?.dob) : "_"
    },
    {
      title: 'Linked With Aadhar',
      value: data?.panDetail?.aaddharLink == true ? "TRUE" : "FALSE"
    }
  ];

  if (!isEmpty(data?.panDetail?.panCard)) {
    pancardData.push({
      file: true,
      title: 'PAN File',
      value: data?.panDetail?.panCard
    })
  }

  function callDeleteAddress(withData: any) {
    console.log(TAG + " delete got called ", withData);

    let orgAdd = data.address;
    let clonedArr = [...orgAdd];
    console.log(TAG, ' cloned address ', clonedArr);
    const indexOfObject = clonedArr.findIndex((object: any) => { return object._id === withData?._id; });
    clonedArr.splice(indexOfObject, 1);
    console.log(TAG, ' after delete ', clonedArr);

    const formatted = {
      address: clonedArr
    }

    registerCall(formatted);

  }

  function callDeleteBank(withData: any) {
    console.log(TAG + " delete got called ", withData);

    let orgAdd = data.bankDetail;
    let clonedArr = [...orgAdd];
    console.log(TAG, ' cloned bankDetail ', clonedArr);
    const indexOfObject = clonedArr.findIndex((object: any) => { return object._id === withData?._id; });
    clonedArr.splice(indexOfObject, 1);
    console.log(TAG, ' after delete ', clonedArr);

    const formatted = {
      bankDetail: clonedArr
    }

    registerCall(formatted);

  }



  async function registerCall(addJson: any): Promise<void> {
    setLoading(true);

    NetworkOps.makePutRequest(`${endPoints.updateCompany}/${data?._id}`, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
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

  console.log(TAG, ' called page with ', data);

  return (
    <div>

      {/* <InformationCard renderData={basicData} /> */}

      {/* <FileViewer
        dowloadAction={true}
        uploadAction={true}
        deleteAction={true}

        fileUrl={data.logo}

        title="Company Logo"
        accept={ALLOWED_IMG}
        allowedSize={1000000}
        sizeText="1mb"
        setUploadedFileName={setUploadedFileName}

      /> */}




      <div className='mt-3'>
        <div className='' ><span className='tx-v fs-20 ff-m bb-o' >Buisness Details</span></div>
        <div className='mt-2 bx-5 bx-11 bg-lo p-2 br-5 position-relative' >
          <div className='d-flex justify-content-end position-absolute end-0 top-0 '>
            <IconBox
              type="text"
              icon={<FaRegEdit color="#673275" />}
              loading={false}
              onClickEvent={() => setPanEditData(data?.panDetail)}
            />
          </div>
          <InformationCard renderData={pancardData} />
        </div>
      </div>

      <div className='mt-3'>
        <div className='d-flex mt-4 align-items-center' >
          <span className='tx-v fs-20 ff-m bb-o' >Address</span>
          <IconBox
            type="text"
            icon={<FaPlusCircle color="#673275" />}
            loading={false}
            onClickEvent={() => setModal(true)}
          />
        </div>
        {/* {data?.address?.length &&
          <> */}
            {data?.address?.map((item: any, index: any) => {
              const prop = [
                {
                  title: 'Type',
                  value: item?.type ? item?.type : "_"
                },
                {
                  title: 'Address Line 1',
                  value: item?.addLine1 ? item?.addLine1 : "_"
                },
                {
                  title: 'Address Line 2',
                  value: item?.addLine2 ? item?.addLine2 : "_"
                },
                {
                  title: 'Pincode',
                  value: item?.pincode ? item?.pincode : "_"
                },
                {
                  title: 'City',
                  value: item?.city ? item?.city : "_"
                },
                {
                  title: 'State',
                  value: item?.state ? item?.state : "_"
                },
                {
                  title: 'Country',
                  value: item?.country ? item?.country : "_"
                },

              ];

              return (
                <div className='mt-2 bx-5 bx-11 bg-lo p-2 br-5 position-relative' key={index} >
                  <div className='d-flex justify-content-end position-absolute end-0 top-0 '>
                    <IconBox
                      type="text"
                      icon={<FaRegEdit color="#673275" />}
                      loading={false}
                      onClickEvent={() => setEditData(item)}
                    />

                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete ?"
                      onConfirm={callDeleteAddress.bind('', item)}
                      onCancel={() => { }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className='bg-transparent border-0' >
                        {/* <IconBox
                      type="text"
                      icon={<FaTrash color="#673275" />}
                      loading={false}
                      onClickEvent={() => { }}
                    /> */}
                      </button>
                    </Popconfirm>

                  </div>
                  <InformationCard renderData={prop} />
                </div>
              )
            })}
          {/* </>
        } */}
      </div>

      <div className='mt-3'>
        <div className='d-flex mt-4 align-items-center' >
          <span className='tx-v fs-20 ff-m bb-o' >Bank Details</span>
          <IconBox
            type="text"
            icon={<FaPlusCircle color="#673275" />}
            loading={false}
            onClickEvent={() => setBankAddData(true)}
          />
        </div>
        {data?.bankDetail?.map((item: any, index: any) => {
          const prop = [
            {
              title: 'Bank Name',
              value: item?.bankName ? item?.bankName : "_"
            },
            {
              title: 'Account Number',
              value: item?.accountNo ? item?.accountNo : "_"
            },
            {
              title: 'Benificiary Name',
              value: item?.beniFiciaryName ? item?.beniFiciaryName : "_"
            },
            {
              title: 'IFSC Code',
              value: item?.ifscCode ? item?.ifscCode : "_"
            },
            {
              title: 'Type of Account',
              value: item?.typeOfAccount ? item?.typeOfAccount : "_"
            }
          ];

          return (
            <div className='mt-2 bx-5 bx-11 bg-lo p-2 br-5 position-relative' key={index} >
              <div className='d-flex justify-content-end position-absolute end-0 top-0 '>
                <IconBox
                  type="text"
                  icon={<FaRegEdit color="#673275" />}
                  loading={false}
                  onClickEvent={() => setBankEditData(item)}
                />

                <Popconfirm
                  title="Delete"
                  description="Are you sure to delete ?"
                  onConfirm={callDeleteBank.bind('', item)}
                  onCancel={() => { }}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className='bg-transparent border-0' >
                    {/* <IconBox
                      type="text"
                      icon={<FaTrash color="#673275" />}
                      loading={false}
                      onClickEvent={() => { }}
                    /> */}
                  </button>
                </Popconfirm>

              </div>

              <InformationCard renderData={prop} />
            </div>
          )
        })}
      </div>



      {modalBool === true ?
        <div>
          <Suspense fallback={`Loading...`}>
            <AddressUpdateCompany
              modalBool={modalBool}
              setModal={setModal}
              setReFetchAction={setReFetchAction}
              data={data.address}
              company={data}
            />
          </Suspense>
        </div>
        : ""}


      {editData !== null ?
        <div>
          <Suspense fallback={`Loading...`}>
            <EditAddress
              modalBool={editData}
              setModal={setEditData}
              setReFetchAction={setReFetchAction}
              company={data}
            />
          </Suspense>
        </div>
        : ""}

      {panEditData !== null ?
        <div>
          <Suspense fallback={`Loading...`}>
            <EditPancard
              modalBool={panEditData}
              setModal={setPanEditData}
              setReFetchAction={setReFetchAction}
              company={data}
            />
          </Suspense>
        </div>
        : ""}

      {bankEditData !== null ?
        <div>
          <Suspense fallback={`Loading...`}>
            <BankEdit
              modalBool={bankEditData}
              setModal={setBankEditData}
              setReFetchAction={setReFetchAction}
              company={data}
            />
          </Suspense>
        </div>
        : ""}

      {bankAddData === true ?
        <div>
          <Suspense fallback={`Loading...`}>
            <BankAdd
              modalBool={bankAddData}
              setModal={setBankAddData}
              setReFetchAction={setReFetchAction}
              company={data}
            />
          </Suspense>
        </div>
        : ""}

    </div>
  );
}

export default CompanyBasicInfo;
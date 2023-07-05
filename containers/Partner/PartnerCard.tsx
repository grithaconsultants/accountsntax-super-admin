import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FiEdit2, FiEye } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { Popconfirm } from 'antd';

import IconBox from '@/component/iconbox/iconbox';
import ToastComponent from '@/component/Toast/Toast';

import { userPNG } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "PartnerCard: ";
const PartnerCard = (props: any) => {

  const { users, company, setReFetchAction }: any = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [partnerModalView, setPartnerView] = useState<any>(null);
  const [editPartner, setEditPartner] = useState<any>(null);

  const PartnerUpdate = dynamic(() => import('@/containers/Partner/PartnerUpdate'), { suspense: true });
  const PartnerDisplay = dynamic(() => import('@/containers/Partner/PartnerDisplay'), { suspense: true });

  function displayFullView(callwith: any) {
    console.log(TAG + " displayFullView called with ", callwith);
    setPartnerView(callwith);
  }

  function editPartnerCalled(callwith: any) {
    console.log(TAG + " edit called with ", callwith);
    setEditPartner(callwith);
  }


  function callDeletePartner(withData: any) {
    console.log(TAG + " delete got called ", withData);
    registerCall(withData?._id);
  }

  async function registerCall(_id: any): Promise<void> {
    setLoading(true);
    NetworkOps.makeDeleteRequest(`${endPoints.deletePartner}/${_id}`, true)
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

  return (

    <div className='row gx-3 gy-3' >

      {users.map((item: any, index: any) => {
        return (
          <div className='col-xl-4 col-lg-4 col-md-6 col-12 ' key={index} >
            <div className='bg-white br-5 oh bx-11 py-3' >
              <div className='d-flex justify-content-center' >
                <Image src={userPNG} alt="receivable" width={100} height={100} />
              </div>
              <div className='fs-18 tx-v ff-m text-center mt-3' >{item?.name}</div>
              <div className='fs-14  ff-m text-center mt-3' >Email: <span className='tx-v' >{item?.email}</span>  </div>
              <div className='d-flex justify-content-center mt-3' >

                <IconBox
                  type="text"
                  icon={<FiEye color="#673275" />}
                  color=""
                  loading={false}
                  onClickEvent={displayFullView.bind('', item)}
                />

                <IconBox
                  type="text"
                  icon={<FiEdit2 color="#673275" />}
                  loading={false}
                  onClickEvent={editPartnerCalled.bind('', item)}
                />

                {/* <IconBox
                  type="text"
                  icon={<FaTrash color="#673275" />}
                  loading={false}
                  onClickEvent={editPartnerCalled.bind('', item)}
                /> */}

                <Popconfirm
                  title="Delete"
                  description="Are you sure to delete ?"
                  onConfirm={callDeletePartner.bind('', item)}
                  onCancel={() => { }}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className='bg-transparent border-0' >
                    <IconBox
                      type="text"
                      icon={<FaTrash color="#673275" />}
                      loading={false}
                      onClickEvent={() => { }}
                    />
                  </button>
                </Popconfirm>

              </div>
            </div>
          </div>
        );
      })}

      {partnerModalView !== null ?
        <div>
          <Suspense fallback={`Loading...`}>
            <PartnerDisplay
              modalBool={partnerModalView}
              setModal={setPartnerView}
              company={company}
              setReFetchAction={setReFetchAction}
            />
          </Suspense>
        </div>
        : ""}

      {editPartner !== null ?
        <div>
          <Suspense fallback={`Loading...`}>
            <PartnerUpdate
              modalBool={editPartner}
              setModal={setEditPartner}
              company={company}
              setReFetchAction={setReFetchAction}
            />
          </Suspense>
        </div>
        : ""}

    </div>

  );
}

export default PartnerCard;
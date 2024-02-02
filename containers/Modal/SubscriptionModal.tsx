import React, { useEffect, useState } from 'react';
import { Modal } from "antd";

import IconButton from "@/component/iconbutton/iconbutton";
import Informationcard from "@/component/informationcard/InformationsCard";

import { back } from "@/utils/image";
import { removeDateRest, ret_ifEmpty } from '@/utils/helper';
import EmptyComp from '@/component/emptycomp/emptycomp';

const TAG = 'Subscription Modal :';

const SubscriptionModal = (props: any) => {

  const { openModal, setOpenModal, SubscriptionData } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [dataToDis, setDataToDis] = useState<any>([]);

  useEffect(() => {
    if (SubscriptionData !== null) {
      const dataToDis = [
        {
          title: 'Start Date',
          value: ret_ifEmpty(removeDateRest(SubscriptionData?.startDate))
        },
        {
          title: 'Expiry Date',
          value: ret_ifEmpty(removeDateRest(SubscriptionData?.endDate))
        },
        {
          title: 'Remaining Days',
          value: ret_ifEmpty(SubscriptionData?.remainingDays)
        }
      ]

      setDataToDis(dataToDis);
    }

  }, [SubscriptionData]);

  function fallback() {
    setOpenModal(false);
  }

  function submitAction() {
    console.log(TAG, " Submit Action is calling.... ");
    fallback();
  };


  return (
    <Modal
      centered
      open={openModal == true}
      width={700}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec tx-v" >Subscription Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={() => { fallback(); }} /> </div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-lg-12 col-12">
              { dataToDis.length > 0 ?
                <Informationcard renderData={dataToDis} />
                :
                <EmptyComp/>
              }
              
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SubscriptionModal;
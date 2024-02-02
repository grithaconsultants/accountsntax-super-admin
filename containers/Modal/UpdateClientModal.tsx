import React, { useState } from 'react';
import { Modal } from "antd";

import SwitchComponent from "@/component/switch/switch";
import IconButton from "@/component/iconbutton/iconbutton";

import { back } from "@/utils/image";
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

const TAG = 'Update Client Details Modal :';

const UpdateClientModal = (props: any) => {

  const { openModal, setOpenModal, clientData, setClientData } = props;

  const [loading, setLoading] = useState<boolean>(false);

  function fallback() {
    setOpenModal(false);
  }

  function submitAction() {
    console.log(TAG, " Submit Action is calling.... ");
    fallback();
  };

  function updateStatusActiopn(val: any) {
    setClientData((pre: any) => ({ ...pre, status: val }));
  }



  return (
    <Modal
      centered
      open={openModal == true}
      width={700}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec tx-v" >Edit Status</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={() => { fallback(); }} /> </div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-lg-12 col-12">
            <div className='d-flex flex-column h-100' >
              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v'>
                <div className='d-flex justify-content-end w-60'>
                  <span>Update Status</span>
                </div>
                <div className='d-flex justify-content-start w-40'>
                  <SwitchComponent
                    defaultChecked={clientData?.status ?? false}
                    label=""
                    onChangeEvent={(val: any) => { updateStatusActiopn(val); }}
                  />
                </div>
              </div>

              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mt-5'>
                <ButtonSimple
                  title="Submit"
                  type="voilet"
                  onClickEvent={() => { submitAction(); }}
                  disabled={loading}
                />

              </div>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default UpdateClientModal;
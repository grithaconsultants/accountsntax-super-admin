import React, { useState } from 'react';
import { Modal } from "antd";

import SwitchComponent from "@/component/switch/switch";
import IconButton from "@/component/iconbutton/iconbutton";

import { back } from "@/utils/image";
import CustomInputNumber from '@/component/inputnumber/inputnumber';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

const TAG = 'TOC Modal :';

const TOCModal = (props: any) => {

  const { openModal, setOpenModal, tallyOnCloud, setTallyOnCloud, totalTOCuser, setTotalTOCusers, totalDays, setTotalDays } = props;

  const [loading, setLoading] = useState<boolean>(false);

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
          <div className="m-tlt-sec tx-v" >Edit Tally on cloud</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={() => { fallback(); }} /> </div>
        </div>

        <div className="row mt-3 mb-2">
          <div className="col-lg-12 col-12">
            <div className='d-flex flex-column h-100' >
              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v'>
                <div className='d-flex justify-content-end w-60'>
                  <span>Update the Status of Tally On Cloud</span>
                </div>
                <div className='d-flex justify-content-start w-40'>
                  <SwitchComponent
                    defaultChecked={tallyOnCloud}
                    label=""
                    onChangeEvent={(val: any) => { setTallyOnCloud(val); }}
                  />
                </div>
              </div>

              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mt-2'>
                <div className='d-flex justify-content-end w-60'>
                  <span>Update the Number of Users</span>
                </div>
                <div className='d-flex justify-content-start w-40'>
                  <CustomInputNumber
                    defaultValue={totalTOCuser}
                    label=""
                    onChangeEvent={(val: any) => { setTotalTOCusers(val); }}
                  />
                </div>
              </div>

              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mt-2'>
                <div className='d-flex justify-content-end w-60'>
                  <span>Update the Number of Days</span>
                </div>
                <div className='d-flex justify-content-start w-40'>
                  <CustomInputNumber
                    defaultValue={totalDays}
                    label=""
                    onChangeEvent={(val: any) => { setTotalDays(val) }}
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

export default TOCModal;
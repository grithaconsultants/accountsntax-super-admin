import React, { useState } from 'react';
import { Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import SwitchComponent from "@/component/switch/switch";
import IconButton from "@/component/iconbutton/iconbutton";
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import CustomInputNumber from '@/component/inputnumber/inputnumber';

import { fetchClientDetails } from '@/redux/actions/clientAction';

import { back } from "@/utils/image";
import { ClientsService } from '@/utils/apiCallServices/client.api.services';


const TAG = 'TOC Modal :';

const TOCModal = (props: any) => {
  const { openModal, setOpenModal, tallyOnCloud, setTallyOnCloud, totalTOCuser, setTotalTOCusers, licenseId } = props;

  const dispatch = useDispatch();
  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(false);

  function fallback() {
    setOpenModal(false);
  }

  async function submitAction() {

    if (licenseId !== null) {
      const payload = {
        clientID: clientID,
        clientsList: clientsList,
        clientDetails: clientDetails,
        metaData: metaData
      };

      const apiData = {
        tallyCloud: tallyOnCloud,
        toc_users: totalTOCuser
      };

      setLoading(true);
      const { response, status }: any = await ClientsService.updateLicenseById(licenseId, apiData);
      setLoading(false);

      if (!status) {
        ToastComponent(response?.data?.msg);
        return;
      }

      if (response?.data?.msg == 'Success') {
        fetchClientDetails(dispatch, payload);
      }

    }
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
                  <span>Update the Number of TOC Users</span>
                </div>
                <div className='d-flex justify-content-start w-40'>
                  <CustomInputNumber
                    defaultValue={totalTOCuser}
                    label=""
                    onChangeEvent={(val: any) => { setTotalTOCusers(val); }}
                  />
                </div>
              </div>

              <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mt-5'>

                {loading == false ?
                  <ButtonSimple
                    title="Submit"
                    type="voilet"
                    onClickEvent={() => { submitAction(); }}
                    disabled={loading}
                  />
                  :
                  <Loader />
                }

              </div>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TOCModal;
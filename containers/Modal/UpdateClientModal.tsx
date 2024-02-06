import React, { useEffect, useState } from 'react';
import { Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import SwitchComponent from "@/component/switch/switch";
import IconButton from "@/component/iconbutton/iconbutton";
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { fetchClientDetails } from '@/redux/actions/clientAction';

import { back } from "@/utils/image";
import { ClientsService } from '@/utils/apiCallServices/client.api.services';

const TAG = 'Update Client Details Modal :';

const UpdateClientModal = (props: any) => {

  const { openModal, setOpenModal, clientData, setClientData } = props;

  const dispatch = useDispatch();
  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(false);
  const [clientStatus, setClientStatus] = useState<any>();

  useEffect(() => {
    setClientStatus(clientData?.status);
  }, [clientData]);

  function fallback() {
    setOpenModal(false);
  }

  async function submitAction() {
    const payload = {
      clientID: clientID,
      clientsList: clientsList,
      clientDetails: clientDetails,
      metaData: metaData
    };

    const apiData = {
      status: clientStatus
    };

    setLoading(true);
    const { response, status }: any = await ClientsService.updateClientById(clientID, apiData);
    setLoading(false);

    if (!status) {
      ToastComponent(response?.data?.msg);
      return;
    };

    if (response?.data?.data && response?.data?.data.length > 0) {
      fetchClientDetails(dispatch, payload);
    }

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
                {
                  loading == false ?
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

export default UpdateClientModal;
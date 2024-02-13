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
import { isEmpty } from '@/utils/helper';

const TAG = 'Update Client Details Modal :';

const UpdateClientModal = (props: any) => {

  const { openModal, setOpenModal, clientData, setClientData } = props;

  const dispatch = useDispatch();
  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(false);
  const [clientStatus, setClientStatus] = useState<boolean>(false);

  useEffect(() => {
    setClientStatus(clientData?.status);
  }, [clientDetails]);

  function fallback() {
    setOpenModal(false);
  }

  async function submitAction() {

    try {
      let isUpdateStatus: boolean = false;
      const payload = {
        clientID: clientID,
        clientsList: clientsList,
        clientDetails: clientDetails,
        metaData: metaData
      };

      if (clientStatus !== clientDetails?.status) {
        isUpdateStatus = true;
      }

      if (isUpdateStatus && clientID !== null) {

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

        if (!isEmpty(response?.data?.data)) {
          fetchClientDetails(dispatch, payload);
        }

      }

    } catch (error: any) {
      ToastComponent(error.message ? error.message : "Something went wrong");
    }

    fallback();

  };

  function updateStatusActiopn(val: any) {
    setClientStatus(val);
    // setClientData((pre: any) => ({ ...pre, status: val }));
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
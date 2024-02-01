import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "antd";

import ToastComponent from "@/component/Toast/Toast";
import IconButton from "@/component/iconbutton/iconbutton";
import SwitchComponent from "@/component/switch/switch";

import HomeLayout from "@/containers/Layout/Layout";
import UserCard from "@/containers/Cards/UserCard";
import TallyCloud from "@/containers/Cards/TallyCloud";
import CompaniesCard from "@/containers/Cards/CompaniesCard";

import { CLIENT_DETAILS_UPDATE } from "@/redux/constant";

import { isEmpty } from "@/utils/helper";
import { ClientsService } from "@/utils/apiCallServices/client.api.services";
import { back } from "@/utils/image";

const TAG = "Client Details Page: ";

const ClientDetails = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(true);
  const [tocModal, setTocModal] = useState<boolean>(false);
  const [tallyOnCloud, settallyOnCloud] = useState<boolean>(false);

  useEffect(() => {
    if (clientDetails !== null) {
      settallyOnCloud(clientDetails?.accessTallyCloud ?? false);
    }
  }, [clientDetails]);

  // useEffect(() => {
  //   if (clientID !== "") {
  //     ApicallForClientDetails(clientID);
  //   }
  // }, [clientID]);


  // async function ApicallForClientDetails(clientId: any): Promise<void> {
  //   setLoading(true);

  //   const { response, status }: any = await ClientsService.getClientDetailsById(clientId);

  //   setLoading(false);

  //   if (!status) {
  //     ToastComponent(response.data.msg);
  //     return;
  //   }
  //   const resData = response?.data?.data ?? null;
  //   if (!isEmpty(resData)) {
  //     const payLoad = {
  //       clientID: clientId,
  //       clientsList: clientsList,
  //       clientDetails: resData,
  //       metaData: metaData
  //     }

  //     dispatch({ type: CLIENT_DETAILS_UPDATE, payload: payLoad });
  //   }
  // }


  function fallback() {
    setTocModal(false);
  }


  console.log(TAG, " clientID ", clientID);
  console.log(TAG, " clientDetails ", clientDetails);

  return (
    <HomeLayout>
      <section id="contentSection">
        <div className="layout-contWrapper">
          <div className="breadcrumb-wrapper">
            <div className="br-left">
              <span className="br-light-tlt">Client Details</span>
            </div>
            <div className="br-right"></div>
          </div>

          <div className='' >
            <div className='row gx-4 gy-3' >
              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <UserCard
                  usersdata={clientDetails?.users ?? []}
                />
              </div>

              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <TallyCloud
                  tallyOnCloud={tallyOnCloud}
                  seTocModal={setTocModal}
                />
              </div>

              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <CompaniesCard
                  companiesData={clientDetails?.companies ?? []}
                />
              </div>

            </div>
          </div>

          <div className="layout-cardArea">
            <div className="bu-section" >
              <div className="bu-body px-3 pt-4" >

              </div>
            </div>
          </div>
        </div>

        <>
          <Modal
            centered
            open={tocModal == true}
            width={700}
          >
            <div className="modal-wrapper" >
              <div className="m-tlt" >
                <div className="m-tlt-sec tx-v" >Tally on Cloud</div>
                <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={() => { fallback(); }} /> </div>
              </div>

              <div className="row mt-3 mb-5">
                <div className="col-lg-12 col-12">
                  <div className='d-flex justify-content-center h-100' >
                    <span className='d-flex justify-content-center h-100 align-items-center fs-18 ff-m text-center tx-v'>
                      Update the Status of Tally On Cloud
                      <SwitchComponent
                        defaultChecked={clientDetails?.accessTallyCloud}
                        label=""
                        onChangeEvent={(val: any) => settallyOnCloud(val)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      </section>
    </HomeLayout>
  );
};

export default ClientDetails;

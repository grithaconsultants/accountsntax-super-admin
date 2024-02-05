import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import ToastComponent from "@/component/Toast/Toast";
import ButtonSimple from "@/component/buttonsimple/buttonsimple";
import Informationcard from "@/component/informationcard/InformationsCard";

import HomeLayout from "@/containers/Layout/Layout";
import UserCard from "@/containers/Cards/UserCard";
import TallyCloudCard from "@/containers/Cards/TallyCloudCard";
import CompaniesCard from "@/containers/Cards/CompaniesCard";
import SubscriptionCard from "@/containers/Cards/SubscriptionCard";
import TOCModal from "@/containers/Modal/TOCModal";
import SubscriptionModal from "@/containers/Modal/SubscriptionModal";
import UpdateClientModal from "@/containers/Modal/UpdateClientModal";

import { CLIENT_DETAILS_UPDATE } from "@/redux/constant";
import { ClientsService } from "@/utils/apiCallServices/client.api.services";
import { formateMobileNo, isEmpty, removeDateRest, ret_ifEmpty } from "@/utils/helper";
import Loader from "@/component/loader/loader";

const TAG = "Client Details Page: ";

const ClientDetails = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(true);
  const [tocModal, setTocModal] = useState<boolean>(false);
  const [upDateClientModal, setUpDateClientModal] = useState<boolean>(false);
  const [subscriptionMpdal, setSubscriptionModal] = useState<boolean>(false);
  const [tallyOnCloud, setTallyOnCloud] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [noOfusers, setNoOfUsers] = useState<number>(0);
  const [totalTOCuser, setTotalTOCusers] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [noOfAssignedCompanies, setNoOfAssignedCompanies] = useState<number>(0);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [dataToDis, setDataToDis] = useState<any>([]);
  const [clientData, setClientData] = useState<any>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>({
    startDate: dayjs(dayjs(), 'DD-MM-YYYY').format('DD-MM-YYYY'),
    remainingDays: 10
  });


  useEffect(() => {
    if (clientDetails !== null) {
      setClientData(clientDetails);
      setTallyOnCloud(clientDetails?.accessTallyCloud ?? false);
      setNoOfUsers(clientDetails?.users ? clientDetails?.users.length : 0);
      setNoOfAssignedCompanies(clientDetails?.companies ? clientDetails?.companies.length : 0);
      if (clientDetails?.permissions && clientDetails?.permissions?.length > 0) {
        const filterPermissionUser = clientDetails?.permissions.filter((permission: any) => permission.feature == "total_user");
        const filterPermissionTOC = clientDetails?.permissions.filter((permission: any) => permission.feature == "toc_user");
        const filterPermissionTotalComp = clientDetails?.permissions.filter((permission: any) => permission.feature == "total_company");
        if (!isEmpty(filterPermissionUser)) {
          setTotalUsers(filterPermissionUser[0]?.value);
        }

        if (!isEmpty(filterPermissionTOC)) {
          setTotalTOCusers(filterPermissionTOC[0]?.value);
        }

        if (!isEmpty(filterPermissionTotalComp)) {
          setTotalCompanies(filterPermissionTotalComp[0]?.value);
        }

      }

      if (clientDetails?.subscription) {
        const newSubscriptionData = {
          startDate: clientDetails?.subscription?.startDate ? clientDetails?.subscription?.startDate : dayjs(dayjs(), 'DD-MM-YYYY').format('DD-MM-YYYY'),
          endDate: clientDetails?.subscription?.endDate ? clientDetails?.subscription?.endDate : dayjs().add(7, 'day').format('DD-MM-YYYY'),
          remainingDays: clientDetails?.subscription?.remainingDays ? clientDetails?.subscription?.remainingDays : 10
        }
        setSubscriptionData(newSubscriptionData);
      }

    }

  }, [clientDetails]);


  useEffect(() => {
    if (clientData !== null) {

      const dataToDis = [
        {
          title: 'First Name',
          value: ret_ifEmpty(clientData?.firstName)
        },
        {
          title: 'Last Name',
          value: ret_ifEmpty(clientData?.lastName)
        },
        {
          title: 'Gender',
          value: ret_ifEmpty(clientData?.gender)
        },
        {
          title: 'Mobile Number',
          value: formateMobileNo(ret_ifEmpty(clientData?.mobile))
        },
        {
          title: `Mobile Verified`,
          value: clientData?.isMobileVerified == true ? "Yes" : "No"
        },
        {
          title: `Email`,
          value: ret_ifEmpty(clientData?.email)
        },
        {
          title: `Email Verified`,
          value: clientData?.isEmailVerified == true ? "Yes" : "No"
        },
        {
          title: `Guacamole Username`,
          value: ret_ifEmpty(clientData?.guacamoleUser)
        },
        {
          title: 'ID',
          value: ret_ifEmpty(clientData?._id)
        },
        {
          title: `Has TallyLicense`,
          value: clientData?.hasTallyLicense == true ? "Yes" : "No"
        },
        {
          title: `InstanceType`,
          value: ret_ifEmpty(clientData?.instanceType)
        },
        {
          title: `Server ID`,
          value: ret_ifEmpty(clientData?.server)
        },
        {
          title: 'VNC Port',
          value: ret_ifEmpty(clientData?.vnc_port)
        },

        {
          title: 'VNC Session Number',
          value: ret_ifEmpty(clientData?.vnc_session_number)
        },
        {
          title: `Status`,
          value: clientData?.status == true ? "Active" : "InActive"
        },
        {
          title: 'Created At',
          value: ret_ifEmpty(removeDateRest(clientData?.createdAt))
        },
        {
          title: 'Last Updated At',
          value: ret_ifEmpty(removeDateRest(clientData?.updatedAt))
        },
      ]

      setDataToDis(dataToDis);
    }
  }, [clientData]);


  function fallback() {
    setTocModal(false);
  }

  function upateStatus() {
    setUpDateClientModal(true);
  }

  console.log(TAG, " clientID ", clientID);
  console.log(TAG, " clientDetails ", clientDetails);

  return (
    <HomeLayout>
      <section id="contentSection">
        <div className="layout-contWrapper">
          <div className="breadcrumb-wrapper">
            <div className="br-left">
              <span className="br-light-tlt">{`${clientDetails?.firstName} ${clientDetails?.lastName}`}</span>
            </div>
            <div className="br-right"></div>
          </div>

          <div className='' >
            <div className='row gx-4 gy-3' >
              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <UserCard
                  totalUsers={totalUsers}
                  noOfUsers={noOfusers}
                />
              </div>

              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <TallyCloudCard
                  tallyOnCloud={tallyOnCloud}
                  seTOCModal={setTocModal}
                  totalTOCuser={totalTOCuser}
                  totalDays={totalDays}
                />
              </div>

              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <CompaniesCard
                  noOfCompanies={noOfAssignedCompanies}
                />
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <SubscriptionCard
                  setSubscriptionModal={setSubscriptionModal}
                  totalRemainingDays={subscriptionData?.remainingDays}
                />
              </div>

            </div>
          </div>

          <div className="layout-cardArea">
            <div className="bu-section" >
              <div className="bu-body p-5" >
                <div className="col-12 p-0" >
                  {dataToDis.length > 0 ?
                    <Informationcard renderData={dataToDis} />
                    :
                    <Loader />
                  }
                </div>

                <div className="col-12 p-0 d-flex justify-content-end mt-4" >
                  <div className="" >
                    <ButtonSimple
                      title="Update Status"
                      type="voilet"
                      disabled={false}
                      onClickEvent={() => { upateStatus(); }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <>
          {
            tocModal !== false ?
              <TOCModal
                defaultChecked={tallyOnCloud}
                openModal={tocModal}
                setOpenModal={setTocModal}
                tallyOnCloud={tallyOnCloud}
                setTallyOnCloud={setTallyOnCloud}
                totalTOCuser={totalTOCuser}
                setTotalTOCusers={setTotalTOCusers}
                totalDays={totalDays}
                setTotalDays={setTotalDays}
              />
              : ""
          }

          {
            upDateClientModal !== false ?
              <UpdateClientModal
                openModal={upDateClientModal}
                setOpenModal={setUpDateClientModal}
                clientData={clientData}
                setClientData={setClientData}
              />
              : ""
          }

          {
            subscriptionMpdal !== false ?
              <SubscriptionModal
                openModal={subscriptionMpdal}
                setOpenModal={setSubscriptionModal}
                subscriptionData={subscriptionData}
              />
              : ""
          }
        </>
      </section>
    </HomeLayout>
  );
};

export default ClientDetails;

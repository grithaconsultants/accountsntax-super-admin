import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "antd";

import ToastComponent from "@/component/Toast/Toast";
import IconButton from "@/component/iconbutton/iconbutton";
import SwitchComponent from "@/component/switch/switch";

import HomeLayout from "@/containers/Layout/Layout";
import UserCard from "@/containers/Cards/UserCard";
import TallyCloudCard from "@/containers/Cards/TallyCloudCard";
import CompaniesCard from "@/containers/Cards/CompaniesCard";
import Informationcard from "@/component/informationcard/InformationsCard";

import { CLIENT_DETAILS_UPDATE } from "@/redux/constant";

import { formateMobileNo, isEmpty, removeDateRest, ret_ifEmpty } from "@/utils/helper";
import { ClientsService } from "@/utils/apiCallServices/client.api.services";
import { back } from "@/utils/image";
import TOCModal from "@/containers/Modal/TOCModal";


const TAG = "Client Details Page: ";

const ClientDetails = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(true);
  const [tocModal, setTocModal] = useState<boolean>(false);
  const [tallyOnCloud, setTallyOnCloud] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [noOfusers, setNoOfUsers] = useState<number>(0);
  const [totalTOCuser, setTotalTOCusers] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [noOfAssignedCompanies, setNoOfAssignedCompanies] = useState<number>(0);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [dataToDis, setDataToDis] = useState<any>([]);

  useEffect(() => {
    if (clientDetails !== null) {
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



      const dataToDis = [
        {
          title: 'First Name',
          value: ret_ifEmpty(clientDetails?.firstName)
        },
        {
          title: 'Last Name',
          value: ret_ifEmpty(clientDetails?.lastName)
        },
        {
          title: 'Gender',
          value: ret_ifEmpty(clientDetails?.gender)
        },
        {
          title: 'Mobile Number',
          value: formateMobileNo(ret_ifEmpty(clientDetails?.mobile))
        },
        {
          title: `Mobile Verified`,
          value: clientDetails?.isMobileVerified == true ? "Yes" : "No"
        },
        {
          title: `Email`,
          value: ret_ifEmpty(clientDetails?.email)
        },
        {
          title: `Email Verified`,
          value: clientDetails?.isEmailVerified == true ? "Yes" : "No"
        },
        {
          title: `Guacamole Username`,
          value: ret_ifEmpty(clientDetails?.guacamoleUser)
        },
        {
          title: 'ID',
          value: ret_ifEmpty(clientDetails?._id)
        },
        {
          title: `Has TallyLicense`,
          value: clientDetails?.hasTallyLicense == true ? "Yes" : "No"
        },
        {
          title: `InstanceType`,
          value: ret_ifEmpty(clientDetails?.instanceType)
        },
        {
          title: `Server ID`,
          value: ret_ifEmpty(clientDetails?.server)
        },
        {
          title: 'VNC Port',
          value: ret_ifEmpty(clientDetails?.vnc_port)
        },

        {
          title: 'VNC Session Number',
          value: ret_ifEmpty(clientDetails?.vnc_session_number)
        },
        {
          title: `Status`,
          value: clientDetails?.status == true ? "Active" : "InActive"
        },
        {
          title: 'Created At',
          value: ret_ifEmpty(removeDateRest(clientDetails?.createdAt))
        },
        {
          title: 'Last Updated At',
          value: ret_ifEmpty(removeDateRest(clientDetails?.updatedAt))
        },
      ]

      setDataToDis(dataToDis);
    }
  }, [clientDetails]);


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
                  totalCompanies={totalCompanies}
                />
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                <CompaniesCard
                  noOfCompanies={noOfAssignedCompanies}
                  totalCompanies={totalCompanies}
                />
              </div>

            </div>
          </div>

          <div className="layout-cardArea">
            <div className="bu-section" >
              <div className="bu-body p-5" >
                <div className="col-12 p-0" >
                  <Informationcard renderData={dataToDis} />
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
        </>
      </section>
    </HomeLayout>
  );
};

export default ClientDetails;

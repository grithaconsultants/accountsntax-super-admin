import React, { useState, Suspense, useEffect } from "react";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { DownOutlined } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import dynamic from "next/dynamic";

import CompanyBasicInfo from "@/containers/CompanyBasicInfo/CompanyBasicInfo";
import VaultSection from "@/containers/Vault/VaultSection";
import PartnerSection from "@/containers/Partner/PartnerSection";
import ToastComponent from "@/component/Toast/Toast";
import IconInformationCard from "@/component/IconInformationCard/IconInformationCard";
import Loader from "@/component/loader/loader";
import ImageViewer from "@/component/imageviewer/imageviewer";
import IconBox from "@/component/iconbox/iconbox";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps from "@/ApiHandler/NetworkOps";

import HomeLayout from "@/containers/Layout/Layout";
import { back, clientJPG } from "@/utils/image";

import { getSelectedClient } from "@/utils/helper";

const TAG = "ProfileDetails: ";
const ProfileDetails = () => {
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cDataLeft, setcDataLeft] = useState<any>(null);
  const [reFetchAction, setReFetchAction] = useState<boolean>(true);

  const [editCompany, setEditClient] = useState<any>(false);
  const EditCompanyDetails = dynamic(
    () => import("@/containers/CompanyProfile/EditCompanyDetails"),
    { suspense: true }
  );

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Basic Details`,
      children: client ? (
        <CompanyBasicInfo
          data={client}
          setReFetchAction={setReFetchAction}
          reFetchAction={reFetchAction}
        />
      ) : (
        <Loader />
      ),
    },
    // {
    //   key: '2',
    //   label: `Partners`,
    //   children: company ? <PartnerSection data={company} setReFetchAction={setReFetchAction} reFetchAction={reFetchAction} /> : <Loader />,
    // },
    // {
    //   key: '3',
    //   label: `Vaults`,
    //   children: company ? <VaultSection data={company} setReFetchAction={setReFetchAction} /> : <Loader />,
    // }
  ];

  useEffect(() => {
    if (reFetchAction == true) {
      callDataKeeper();
      setReFetchAction(false);
    }
  }, [reFetchAction]);

  useEffect(() => {
    if (client !== null) {
      setcDataLeft([
        {
          title: "Client First Name",
          value: client?.firstName,
          IMGBLOCK: <DownOutlined rev="" />,
        },

        {
          title: "Client Last Name",
          value: client?.lastName,
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "Email",
          value: client?.email ? client?.email : "_",
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "Contact Number",
          value: client?.mobile ? client?.mobile : "_",
          IMGBLOCK: <DownOutlined rev="" />,
        },
      ]);
    }
  }, [client]);

  async function callDataKeeper() {
    console.log("Data keeper function is callinng");
    const getSelectedC: any = await getSelectedClient();
    console.log("get company data from localstorage", getSelectedC);
    getClientDetails(getSelectedC._id);
    console.log(
      "API calling for get full company detail by ID",
      getSelectedC._id
    );
  }

  async function getClientDetails(clientId: any): Promise<void> {
    setClient(null);
    NetworkOps.makeGetRequest(`${endPoints.getClientById}/${clientId}`, true)
      .then(async (response: any) => {
        setLoading(false);
        console.log("response from getCientbyId API", response);
        if (response?.status == 200 && response?.data?.success == true) {
          setClient(response?.data?.data);
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, " error got in else ");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, " error i got in catch ", error);
        router.push(`/technical-issue`);
      });
  }

  // console.log(TAG, ' company data ', company);

  return (
    <HomeLayout>
      <section id="profileSection">
        <div className="layout-contWrapper">
          <div className="breadcrumb-wrapper">
            <div className="br-left">
              <span className="br-light-tlt">Client Profile Details</span>
            </div>
            <div className="br-right"></div>
          </div>

          <div className="layout-cardArea bg-lo br-10 p-3">
            <div className="pr-section">
              <div className="row gx-2 gy-3">
                <div className="col-xl-3 col-lg-3 col-12 ">
                  <div className="detail-card bg-white ">
                    <div className="py-5 bb-o">
                      <div className="pic-area">
                        {client ? (
                          <ImageViewer
                            width={170}
                            height="auto"
                            preview={false}
                            imageFileName={client?.profileImage}
                            placeholderWidth={200}
                            placeholderImage={clientJPG}
                          />
                        ) : (
                          <Loader />
                        )}
                      </div>
                      <p className="text-center fs-20 mt-2 tx-d ">
                        {client?.firstName + " " + client?.lastName}
                      </p>
                    </div>

                    <div className="detail-area">
                      <div className="p-3">
                        {cDataLeft !== null ? (
                          <div className="">
                            <IconInformationCard renderData={cDataLeft} />
                            {/* <div className="d-flex justify-content-center" >
                              <IconBox
                                type="text"
                                icon={<FaRegEdit color="#673275" />}
                                loading={false}
                                // onClickEvent={() => { setEditCompany(true) }}
                              />
                            </div> */}
                          </div>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-9 col-lg-9 col-12  ">
                  <div className=" bg-white br-5 oh p-3">
                    <div className="header">
                      Client Basic Details
                      {/* <Tabs defaultActiveKey="1" items={items} /> */}
                    </div>

                    <div className="content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {editCompany === true ?
        <div>
          <Suspense fallback={`Loading...`}>
            <EditCompanyDetails
              modalBool={editCompany}
              setModal={setEditCompany}
              setReFetchAction={setReFetchAction}
              company={company}
            />
          </Suspense>
        </div>
        : ""} */}
    </HomeLayout>
  );
};

export default ProfileDetails;

import React, { useState, useEffect } from "react";
import type { TabsProps } from "antd";
import { useRouter } from "next/router";


import ToastComponent from "@/component/Toast/Toast";
import Loader from "@/component/loader/loader";
import ImageViewer from "@/component/imageviewer/imageviewer";
import IconInformationCard from "@/component/IconInformationCard/IconInformationCard";

import HomeLayout from "@/containers/Layout/Layout";
import CompanyBasicInfo from "@/containers/CompanyBasicInfo/CompanyBasicInfo";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps from "@/ApiHandler/NetworkOps";

import { ICDownOutlined } from "@/utils/icons";

const TAG = "ProfileDetails: ";
const ProfileDetails = () => {
  const router = useRouter();

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cDataLeft, setcDataLeft] = useState<any>(null);
  const [reFetchAction, setReFetchAction] = useState<boolean>(true);


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
  ];

  useEffect(() => {
    if (client !== null) {
      setcDataLeft([
        {
          title: "Client First Name",
          value: client?.firstName,
          IMGBLOCK: <ICDownOutlined />,
        },

        {
          title: "Client Last Name",
          value: client?.lastName,
          IMGBLOCK: <ICDownOutlined />,
        },
        {
          title: "Email",
          value: client?.email ? client?.email : "_",
          IMGBLOCK: <ICDownOutlined />,
        },
        {
          title: "Contact Number",
          value: client?.mobile ? client?.mobile : "_",
          IMGBLOCK: <ICDownOutlined />,
        },
      ]);
    }
  }, [client]);



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
                        {/* {client ? (
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
                        )} */}
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
                    </div>

                    <div className="content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default ProfileDetails;

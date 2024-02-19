import React, { useState, Suspense, useEffect } from "react";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import { DownOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

import ToastComponent from "@/component/Toast/Toast";
import IconInformationCard from "@/component/IconInformationCard/IconInformationCard";
import Loader from "@/component/loader/loader";
import ImageViewer from "@/component/imageviewer/imageviewer";

import CompanyBasicInfo from "@/containers/CompanyBasicInfo/CompanyBasicInfo";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps from "@/ApiHandler/NetworkOps";

import HomeLayout from "@/containers/Layout/Layout";
import { back, companyJPG } from "@/utils/image";


const TAG = "ProfileDetails: ";

const ProfileDetails = () => {
  const router = useRouter();

  const EditCompanyDetails = dynamic(() => import("@/containers/CompanyProfile/EditCompanyDetails"), { suspense: true });

  const [companyId, setCompanyId] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cDataLeft, setcDataLeft] = useState<any>(null);
  const [reFetchAction, setReFetchAction] = useState<boolean>(true);
  const [editCompany, setEditCompany] = useState<any>(false);

  useEffect(() => {
    const { companyId } = router.query;
    if (companyId !== "") {
      setCompanyId(companyId);
    }
  }, [0]);


  useEffect(() => {
    if (reFetchAction == true) {
      callDataKeeper2(companyId);
      setReFetchAction(false);
    }
  }, [reFetchAction]);


  useEffect(() => {
    if (company !== null) {
      setcDataLeft([
        {
          title: "Company Name",
          value: company?.name,
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "Type",
          value: company?.type,
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "PAN",
          value: company?.panDetail?.panNo,
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "TAN",
          value: company?.tan,
          IMGBLOCK: <DownOutlined rev="" />,
        },
        {
          title: "Contact Number",
          value: company?.mobile ? company?.mobile : "_",
        },
        {
          title: "Email",
          value: company?.email ? company?.email : "_",
        },
      ]);
    }
  }, [company]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Basic Details`,
      children: company ? (
        <CompanyBasicInfo
          data={company}
          setReFetchAction={setReFetchAction}
          reFetchAction={reFetchAction}
        />
      ) : (
        <Loader />
      ),
    },
  ];

  async function callDataKeeper2(companyId: any) {
    if (companyId !== null) {
      getCompanyDetails(companyId);
    } else {
      ToastComponent("Company Id is Required");
    }
  }

  async function getCompanyDetails(companyId: any): Promise<void> {
    setCompany(null);
    NetworkOps.makeGetRequest(`${endPoints.getCompanyById}/${companyId}`, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          setCompany(response?.data?.data);
        } else {
          ToastComponent(response?.data?.msg);
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
              <span className="br-light-tlt">Company Profile Details</span>
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
                        {company ? (
                          <ImageViewer
                            width={170}
                            height="auto"
                            preview={false}
                            imageFileName={company?.logo}
                            placeholderWidth={200}
                            placeholderImage={companyJPG}
                          />
                        ) : (
                          <Loader />
                        )}
                      </div>
                      <p className="text-center fs-20 mt-2 tx-d ">
                        {company?.name}
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
                      <Tabs defaultActiveKey="1" items={items} />
                    </div>

                    <div className="content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {editCompany === true ? (
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
      ) : (
        ""
      )}
    </HomeLayout>
  );
};

export default ProfileDetails;

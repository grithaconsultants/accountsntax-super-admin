import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import IconTitleButton from "@/component/icontitlebutton/icontitlebutton";
import CustomInput from "@/component/input/input";
import Loader from "@/component/loader/loader";
import ToastComponent from "@/component/Toast/Toast";
import EmptyComp from "@/component/emptycomp/emptycomp";
import PaginationComponent from "@/component/pagination/pagination";

import HomeLayout from '@/containers/Layout/Layout';
import CompaniesListTable from "@/containers/CompaniesList/CompaniesListTable";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps from "@/ApiHandler/NetworkOps";

import { isEmpty } from "@/utils/helper";
import { filterIcon } from "@/utils/image";

const TAG = "Companies: ";

const Companies = () => {

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);

  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    ApicallForData(defaultCurrent, defaultPageSize, "");
  }, []);

  const callPaginationAction = (page: number, limit: number) => {
    ApicallForData(page, limit, searchString);
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  };

  function onFilterClick() {
    const docElement: any = document.getElementById("searchCompaniesList");
    const searchItem: any = docElement.value.trim();

    if (searchItem === "") {
      ApicallForData(1, 10, "");
      setSearchString("");
    } else {
      ApicallForData(1, 10, searchItem);
      setSearchString(searchItem);
    }

    setDefaultCurrent(1);
    setDefaultPageSize(10);
  }

  async function ApicallForData(page: any, limit: any, search: any ): Promise<void> {
    setLoading(true);
    let apiUrl;
    if (isEmpty(search)) {
      apiUrl = `${endPoints.getCompanies}?page=${page}&limit=${limit}`;
    } else {
      apiUrl = `${endPoints.getCompanies}?search=${search}&page=${page}&limit=${limit}`;
    }

    NetworkOps.makeGetRequest(apiUrl, true)
      .then(async (response: any) => {
        setLoading(false);
        console.log("get companies rsponse new", response);
        if (response?.status == 200 && response?.data?.success == true) {
          console.log(
            "get companies Data list ",
            response?.data?.data?.companies
          );
          setDataList(
            response?.data?.data ? response?.data?.data?.companies : []
          );

          setMeta(
            response?.data?.data?.meta ? response?.data?.data?.meta : null
          );
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, " error got in else " + "companies");
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(TAG, " error i got in catch ", error);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        router.push(`/technical-issue`);
      });
  }


  return (
    <HomeLayout>
      <section id="contentSection">
        <div className="layout-contWrapper" >
          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >Companies List</span>
            </div>
            <div className="br-right" >
            </div>

          </div>

          <div className="layout-cardArea" >
            <div className="cardBody px-0 mt-0 pb-4">
              <div className="w-100 bg-lo p-3 oh br-5 bx-11">

                <div className="d-flex justify-content-between pb-5 align-items-end">                  
                  <div className=""></div>

                  <div className="d-flex">
                    <div className="w-250 me-2 ">
                      <CustomInput
                        label="Search"
                        id="searchCompaniesList"
                        name="searchCompanies"
                        placeholder="Search"
                        type="text"
                        disabled={loading}
                        maxLength={100}
                      />
                    </div>

                    <div className="ms-3 d-flex align-items-end ">
                      <IconTitleButton
                        imgSrc={filterIcon}
                        title="Filter"
                        onClickCall={onFilterClick}
                      />
                    </div>

                  </div>
                </div>

                <div className="">
                  {loading === true ? (
                    <Loader />
                  ) : (
                    <>
                      {dataList.length > 0 ? (
                        <>
                          <CompaniesListTable
                            rowsDataList={dataList}
                            defaultCurrent={defaultCurrent}
                            defaultPageSize={defaultPageSize}
                          />

                          <div className="pagination-component mt-3">
                            <PaginationComponent
                              total={meta.total}
                              defaultPageSize={defaultPageSize}
                              defaultCurrent={defaultCurrent}
                              onChangeCall={callPaginationAction}
                              onShowSizeChange={callPaginationAction}
                            />
                          </div>
                        </>
                      ) : (
                        <h1>
                          <EmptyComp />
                        </h1>
                      )}
                    </>
                  )}
                </div>

              </div>
            </div>
          </div> 

        </div>
      </section>
    </HomeLayout>
  );
}

export default Companies;
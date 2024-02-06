import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import Loader from "@/component/loader/loader";
import EmptyComp from "@/component/emptycomp/emptycomp";
import PaginationComponent from "@/component/pagination/pagination";

import CompaniesListTable from "@/containers/ClientList/CompaniesListTable";
import HomeLayout from "@/containers/Layout/Layout";

import { isEmpty } from "@/utils/helper";

const TAG = "Companies Page : ";

const Companies = () => {

  const { clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string>("firstName");
  const [sortType, setSortType] = useState<string>("asc");

  useEffect(() => {

    if (!isEmpty(clientDetails) && clientDetails?.companies && clientDetails?.companies.length > 0) {
      setDataList(clientDetails?.companies);
      setMeta({
        "total": clientDetails?.companies.length,
        "limit": 10,
        "page": 1,
        "pages": 100
      });
    }
  }, [clientDetails]);


  const callPaginationAction = (page: number, limit: number) => {
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  };


  console.log(TAG, " clientDetails ", clientDetails);
  console.log(TAG, " Companies List ", dataList);
  console.log(TAG, " meta ", meta);

  return (
    <HomeLayout>
      <section id="contentSection">
        <div className="layout-contWrapper">
          <div className="breadcrumb-wrapper">
            <div className="br-left">
              <span className="br-light-tlt">Companies </span>
            </div>
            <div className="br-right"></div>
          </div>

          <div className="layout-cardArea">
            <div className="cardBody px-0 mt-0 pb-4">
              <div className="w-100 bg-lo p-3 oh br-5 bx-11">
                {/* <div className="d-flex justify-content-between pb-5 align-items-end">
                  <div className="">  </div>

                  <div className="d-flex">
                    <div className="w-250 me-2 ">
                      <CustomInput
                        label="Search"
                        id="searchClientsList"
                        name="searchClients"
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
                        onClickCall={() => { }}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="table-reponsive">
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
                            sortKey={sortKey}
                            setSortKey={setSortKey}
                            sortType={sortType}
                            setSortType={setSortType}
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
};

export default Companies;

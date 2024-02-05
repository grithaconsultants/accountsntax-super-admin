import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';

import IconTitleButton from "@/component/icontitlebutton/icontitlebutton";
import CustomInput from "@/component/input/input";
import Loader from "@/component/loader/loader";
import EmptyComp from "@/component/emptycomp/emptycomp";
import PaginationComponent from "@/component/pagination/pagination";

import ClientListTable from "@/containers/ClientList/ClientListTable";
import HomeLayout from "@/containers/Layout/Layout";

import endPoints from "@/ApiHandler/AppConfig";

import { filterIcon } from "@/utils/image";
import { isEmpty } from "@/utils/helper";
import { fetchAllClients } from "@/redux/actions/clientAction";

const TAG = "Clients Page: ";

const Clients = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientID, clientDetails, clientsList, metaData, }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("firstName");
  const [sortType, setSortType] = useState<string>("asc");

  useEffect(() => {
    ApicallForData(defaultCurrent, defaultPageSize, sortKey, sortType, searchString);
  }, [0]);

  useEffect(() => {
    if (!isEmpty(clientsList) && clientsList.length > 0) {
      setDataList(clientsList);
      setMeta(metaData);
    }
  }, [clientsList, metaData]);


  const callPaginationAction = (page: number, limit: number) => {
    ApicallForData(page, limit, sortKey, sortType, searchString);
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  };


  function onFilterClick() {
    const docElement: any = document.getElementById("searchClientsList");
    const searchItem: any = docElement.value.trim();

    if (searchItem === "") {
      ApicallForData(1, 10, sortKey, sortType);
      setSearchString("");
    } else {
      ApicallForData(1, 10, sortKey, sortType, searchItem);
      setSearchString(searchItem);
    }

    setDefaultCurrent(1);
    setDefaultPageSize(10);
  }


  async function ApicallForData(
    page: any,
    limit: any,
    sortKeyP: string = sortKey,
    sortTypeP: string = sortType,
    search: string = "",
  ): Promise<void> {

    setLoading(true);
    let apiUrl;
    if (isEmpty(search)) {
      apiUrl = `${endPoints.getClients}?page=${page}&limit=${limit}&sortKey=${sortKeyP}&sortType=${sortTypeP}`;
    } else {
      apiUrl = `${endPoints.getClients}?search=${search}&page=${page}&limit=${limit}&sortKey=${sortKeyP}&sortType=${sortTypeP}`;
    }

    fetchAllClients(dispatch, apiUrl);
    setLoading(false);
  }

  console.log(TAG, " clientsList from reducer ", clientsList);
  console.log(TAG, " metaData from reducer ", metaData);


  return (
    <HomeLayout>
      <section id="contentSection">
        <div className="layout-contWrapper">
          <div className="breadcrumb-wrapper">
            <div className="br-left">
              <span className="br-light-tlt">Client List</span>
            </div>
            <div className="br-right"></div>
          </div>

          <div className="layout-cardArea">
            <div className="cardBody px-0 mt-0 pb-4">
              <div className="w-100 bg-lo p-3 oh br-5 bx-11">
                <div className="d-flex justify-content-between pb-5 align-items-end">
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
                        onClickCall={onFilterClick}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-reponsive">
                  {loading === true ? (
                    <Loader />
                  ) : (
                    <>
                      {dataList.length > 0 ? (
                        <>
                          <ClientListTable
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

export default Clients;

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


import HomeLayout from '@/containers/Layout/Layout';
import SupplierTable from '@/containers/SupplierTable/SupplierTable';


import Loader from '@/component/loader/loader';
import CustomInput from '@/component/input/input';
import PaginationComponent from '@/component/pagination/pagination';
import ToastComponent from '@/component/Toast/Toast';
import IconTitleButton from '@/component/icontitlebutton/icontitlebutton';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import CustomTooltip from '@/component/tooltip/tooltip';

const AddSupplier = dynamic(() => import('@/containers/AddSupplier/AddSupplier'), { suspense: true });

import { add, download } from '@/utils/image';
import { debounce, getSelectedCompanyId } from '@/utils/helper';



import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "Suppliers: ";
const Suppliers = () => {

  const router = useRouter();

  const [modalBool, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [dataList, setDataList] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);

  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);
  const [company, setCompany] = useState<any>(null);
  const [sortKey, setSortKey] = useState<string>("partyName");
  const [sortType, setSortType] = useState<string>("asc");
  const [searchString, setSearchString] = useState<any>("");
  const [reFetchAction, setReFetchAction] = useState<boolean>(false);

  const callForModal = () => {
    setModal(true);
  }

  function routeChange() {
    // router.push('/home');
  }

  useEffect(() => {
    setCompany(getSelectedCompanyId());
  }, [0]);

  const getDownSup = () => {
    ApicallForCustData(defaultCurrent, company, sortKey, sortType, undefined);
  }

  useEffect(() => {
    if (company !== null) {
      ApicallForCustData(defaultCurrent, company, sortKey, sortType, undefined);
    }
  }, [sortKey, sortType, company]);


  const hitSearch = (element: any) => {
    setLoading(true);

    const searchItem: any = element.target.value.trim();

    if (searchItem === "") {
      ApicallForCustData(1, company, sortKey, sortType, undefined);
      setSearchString("");
      setDefaultCurrent(1);
    } else {
      ApicallForCustData(1, company, sortKey, sortType, searchItem);
      setSearchString(searchItem);
      setDefaultCurrent(1);
    }

  }

  const searchOp: any = debounce(hitSearch, 500);

  const callPaginationAction = (page: number, limit: number) => {
    ApicallForCustData(page, company, sortKey, sortType, searchString);
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  }

  useEffect(() => {
    if (reFetchAction === true) {
      setSearchString("");
      ApicallForCustData(1, company, sortKey, sortType, "");
      setReFetchAction(false);
      setDefaultCurrent(1);
      const valObj: HTMLInputElement | any = document.getElementById("searchText");
      valObj.value = null;
    }
  }, [reFetchAction]);

  async function ApicallForCustData(
    page = defaultCurrent,
    companyP = company,
    sortKeyP = sortKey,
    sortTypeP = sortType,
    search = ""
  ): Promise<void> {
    setDataList([]);
    setLoading(true);

    let apiUrl;
    if (search !== "") {
      apiUrl = `${endPoints.getSupplier}?company=${companyP}&sortKey=${sortKeyP}&sortType=${sortTypeP}&page=${page}&search=${search}`;
    } else {
      apiUrl = `${endPoints.getSupplier}?company=${companyP}&sortKey=${sortKeyP}&sortType=${sortTypeP}&page=${page}`;
    }

    NetworkOps.makeGetRequest(apiUrl, true)
      .then(async (response: any) => {
        console.log(TAG, ' api response ', response);
        setLoading(false);
        if (response?.status == 200 && response?.data?.status == true) {

          setDataList(response?.data?.data?.suppliers);
          setMeta(response?.data?.data?.meta);

        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
      });
  }

  // console.log(' customer list ', dataList);
  // console.log(' search string ', searchString);

  return (
    <>



      <HomeLayout>

        <section id="costomerSection">
          <div className="layout-contWrapper" >

            <div className="breadcrumb-wrapper" >
              <div className="br-left" >
                <span className="br-light-tlt" >Suppliers</span>
              </div>
              <div className="br-right" >
                <div className="me-3" >
                  <IconTitleButton imgSrc={download} title="Download" onClick={getDownSup} />
                </div>
                <div className="" >
                  <IconTitleButton imgSrc={add} title="Add new suppliers" onClickCall={callForModal} />
                </div>
              </div>

            </div>

            <div className="layout-cardArea" >

              <div className="cs-section" >

                <div className="search-block mb-3 col-12 p-0  " >
                  <CustomInput
                    label="Search Key"
                    id="searchText"
                    name="searchCustomer"
                    placeholder="Search Key"
                    type="text"
                    disabled={loading}
                    maxLength={100}
                    onChangeEvent={searchOp}
                  />
                </div>

                {loading === true ?
                  <Loader /> :
                  <>
                    {dataList.length > 0 ?
                      <>
                        <SupplierTable
                          rowsDataList={dataList}
                          setReFetchAction={setReFetchAction}
                          sortKey={sortKey}
                          setSortKey={setSortKey}
                          sortType={sortType}
                          setSortType={setSortType}
                        // setSortFrom={setSortFrom}
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

                      :
                      <h1>no data</h1>
                    }
                  </>
                }
              </div>

            </div>


          </div>
        </section>

      </HomeLayout>
      {modalBool === true ?
        <Suspense fallback={`Loading...`}>
          <AddSupplier
            modalBool={modalBool}
            setModal={setModal}
            company={company}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : ""}

    </>
  );
}

export default Suppliers;
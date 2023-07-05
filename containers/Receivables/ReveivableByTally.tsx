import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

import CustomInput from '@/component/input/input';
import IconDropdown from '@/component/IconDropdown/IconDropdown';
import DateRange from '@/component/daterange/daterange';
import IconTitleButton from '@/component/icontitlebutton/icontitlebutton';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import EmptyComp from '@/component/emptycomp/emptycomp';
import PaginationComponent from '@/component/pagination/pagination';

import ReceivableByTallyTable from '@/containers/Receivables/ReceivableByTallyTable';

import { durationType, durationFilter, selectedDurationFilter } from '@/utils/constants';
import { filterIcon } from '@/utils/image';
import { getSelectedCompanyId, durationFilterHelper, isEmpty } from '@/utils/helper';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "ReceivableByTally: ";
const ReceivableByTally = (props: any) => {

  const { ledgerTarget } = props;
  const [loading, setLoading] = useState<boolean>(true);

  const [dataList, setDataList] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);

  const [company, setCompany] = useState<any>(null);
  const [defaultPageSize, setDefaultPageSize] = useState<number>(10);
  const [defaultCurrent, setDefaultCurrent] = useState<number>(1);
  const [sortKey, setSortKey] = useState<string>("itemName");  // need to implement
  const [sortType, setSortType] = useState<string>("desc");  // need to implement
  const [searchString, setSearchString] = useState<string>("");
  const [reFetchAction, setReFetchAction] = useState<boolean>(false);



  const momentTime: any = moment().tz("Asia/Calcutta");
  const dateOneOfCurrentMonth = momentTime.format('YYYY-MM-01');
  const lastDateOfCurrentMonth = momentTime.endOf('month').format('YYYY-MM-DD');

  const [filterType, setFilterType] = useState<string>(durationType[1]);
  const [initialPoint, setInitialPoint] = useState<string | null>(dateOneOfCurrentMonth);
  const [endPoint, setEndPoint] = useState<string | null>(lastDateOfCurrentMonth);

  useEffect(() => {
    setCompany(getSelectedCompanyId());
  }, [0]);

  useEffect(() => {
    if (company !== null) {
      ApicallForData(defaultCurrent, defaultPageSize, company, sortKey, sortType, initialPoint, endPoint, "");
    }
  }, [sortKey, sortType, company]);

  const callPaginationAction = (page: number, limit: number) => {
    ApicallForData(page, limit, company, sortKey, sortType, initialPoint, endPoint, searchString);
    setDefaultCurrent(page);
    setDefaultPageSize(limit);
  }


  function durationFilterOP(value: string) {

    setFilterType(value);

    if (value !== "customRange") {
      const { dateOne, dateTwo }: any = durationFilterHelper(value);

      setInitialPoint(dateOne);
      setEndPoint(dateTwo);

    } else {
      setInitialPoint(null);
      setEndPoint(null);
    }

  }

  function onFilterClick() {

    if (initialPoint === endPoint) {
      ToastComponent("Start date and end date cannot be the same.");
    } else if (initialPoint == null || endPoint == null) {
      ToastComponent("Please select dates.");
    } else {

      // setLoading(true);
      const docElement: any = document.getElementById("searchText010");
      const searchItem: any = docElement.value.trim();

      if (searchItem === "") {
        ApicallForData(1, 10, company, sortKey, sortType, initialPoint, endPoint, "");
        setSearchString("");
      } else {
        ApicallForData(1, 10, company, sortKey, sortType, initialPoint, endPoint, searchItem);
        setSearchString(searchItem);
      }

      setDefaultCurrent(1);
      setDefaultPageSize(10);
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current < dayjs().endOf('day');
  };

  function changeDate(value: any) {
    if (value !== null) {
      setInitialPoint(dayjs(value[0]).format('YYYY-MM-DD'));
      setEndPoint(dayjs(value[1]).format('YYYY-MM-DD'));
    } else {
      setInitialPoint(null);
      setEndPoint(null);
    }
  }


  async function ApicallForData(page: any, limit: any, company: any, sortKey: any, sortType: any, startDate: any, endDate: any, search: any): Promise<void> {

    // let { page, company, sortKey, sortType, startDate, endDate, search } = props;

    setDataList([]);
    setLoading(true);

    startDate = `${startDate}T00:00:00.000Z`;
    endDate = `${endDate}T00:00:00.000Z`;

    let apiUrl;

    if (isEmpty(search)) {
      apiUrl = `${endPoints.receivableByTally}?company=${company}&ledger=${ledgerTarget}&fromDate=${startDate}&toDate=${endDate}&page=${page}&limit=${limit}`;
    } else {
      apiUrl = `${endPoints.receivableByTally}?company=${company}&&ledger=${ledgerTarget}&search=${search}&fromDate=${startDate}&toDate=${endDate}&page=${page}&limit=${limit}`;
    }

    NetworkOps.makeGetRequest(apiUrl, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200) {
          setDataList(response?.data?.data[0]?.sales ? response?.data?.data[0]?.sales : []);
          setMeta(response?.data?.data[0]?.meta ? response?.data?.data[0]?.meta : null);
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


  // console.log(' company data ', company);
  // console.log(' customer list ', dataList);
  // console.log(' customer meta data ', meta);
  // console.log(' search string ', searchString);
  // console.log(' date initial Point ', initialPoint);
  // console.log(' date end Point ', endPoint);



  return (
    <div className="w-100 bg-lo p-3 oh br-5 bx-11" >

      <div className="d-flex justify-content-between pb-5 align-items-end" >

        <div className="" >
          {/* <div className="fs-20 tx-v ff-m " > Sales Data </div>
          <div className="fs-12 tx-b ff-r " > </div> */}
        </div>

        <div className='d-flex' >

          <div className="w-250 me-2" >
            <CustomInput
              label="Search"
              id="searchText010"
              name="searchCustomer"
              placeholder="Search"
              type="text"
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div className='me-2' >
            <SimpleSelectLabel
              option={durationFilter}
              selected={selectedDurationFilter}
              onChangeEvent={(val: any) => durationFilterOP(val.value)}
              disabled={loading}
              id="dateFilter"
              label="Filter Type"
            />
          </div>

          <div className="input-con w-250" >
            {filterType === "customRange" ?
              <DateRange
                disabled={false}
                // disabledDate={disabledDate}
                onChange={(edata: any) => changeDate(edata)}
              />
              :
              <DateRange
                disabled={true}
                // disabledDate={disabledDate}
                value={[dayjs(endPoint), dayjs(initialPoint)]}
              />
            }
          </div>

          <div className="ms-3 d-flex mb-2 align-items-end pb-1 " >
            <IconTitleButton imgSrc={filterIcon} title="Filter" onClickCall={onFilterClick} />
          </div>

          {/* {dataList.length ?
            <div className="ms-3 d-flex mb-2 align-items-end pb-1 " >
              <IconDropdown />
            </div>
            : null} */}

        </div>

      </div>

      <div className="" >

        {loading === true ?
          <Loader /> :
          <>
            {dataList.length > 0 ?
              <>
                <ReceivableByTallyTable
                  rowsDataList={dataList}
                  setReFetchAction={setReFetchAction}
                  sortKey={sortKey}
                  setSortKey={setSortKey}
                  sortType={sortType}
                  setSortType={setSortType}
                  defaultCurrent={defaultCurrent}
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
              <h1>
                <EmptyComp />
              </h1>
            }
          </>
        }

      </div>


    </div>
  );
}

export default ReceivableByTally;
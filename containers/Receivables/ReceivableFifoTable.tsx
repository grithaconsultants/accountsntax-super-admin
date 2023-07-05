import React, { useState } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';

import { SrPageNumber, decimalTwo, dateDiffInDays } from '@/utils/helper';

const TAG = "ReceivableFifoTable: ";
const ReceivableFifoTable = (props: any) => {

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, defaultCurrent } = props;

  function editOpration(toOprate: any) {
    setRowToUpdate(toOprate);
  }

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }

  // console.log('got hit', rowsDataList);
  // console.log('sortKey', sortKey);
  // console.log('moment moment moment', moment().tz("Asia/Calcutta").format('DD-MM-YYYY'));


  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" > Sr. No.</th>
            <th>Party Name</th>
            <th>Outstanding Amount (₹)</th>
            <th>Outstanding By Days</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td>
     
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.party_name} > {item?.party_name}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.due)} > {decimalTwo(item?.due)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={dateDiffInDays(item?.date)} > {dateDiffInDays(item?.date)}</CustomTooltip>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ReceivableFifoTable;
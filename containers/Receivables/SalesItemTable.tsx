import React, { useState } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';

import { removeDateRest, decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "SalesItemTable: ";
const SalesItemTable = (props: any) => {

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
  // console.log('sortType', sortType);


  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" > Sr. No. </th>
            <th className="" >Invoice No</th>
            <th className='' >Date</th>
            <th className='w-100px text-end pe-3' >Amount (₹)</th>
            <th className="" >Type</th>
            <th className="" >Narration</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.voucher_number} >
                    <span className='tx-o cp' >
                      {item?.voucher_number}
                    </span>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.date)} > {removeDateRest(item?.date)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 ps-1 pe-3 text-end pe-3 w-100px" >
                  <CustomTooltip placement="topLeft" title={decimalTwo((item?.netSale))} > {decimalTwo((item?.netSale))}</CustomTooltip>
                </td>


                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.partyGroup} > {item?.partyGroup}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.narration} > {item?.narration}</CustomTooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesItemTable;
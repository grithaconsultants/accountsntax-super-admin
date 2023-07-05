import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import { removeDateRest, decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "SalesItemwiseTable: ";
const SalesItemwiseTable = (props: any) => {

  const router = useRouter();

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);
  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, defaultCurrent } = props;

  function editOpration(toOprate: any) {
    setRowToUpdate(toOprate);
  }

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }


  const directTo = () => {
    router.push('/sales-details');
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
            <th>Date</th>
            <th>Rate</th>
            <th>Amount (₹)</th>
            <th>Quantity</th>
            <th>Average Order</th>
            <th>% Sales</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.date)} > {removeDateRest(item?.date)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.rate)} > {decimalTwo(item?.rate)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.amount)} > {decimalTwo(item?.amount)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.quantity * -1} > {item?.quantity * -1}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.amount / (item?.quantity * -1))} > {decimalTwo(item?.amount / (item?.quantity * -1))}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.avg_sale)} > {decimalTwo(item?.avg_sale)}</CustomTooltip>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalesItemwiseTable;
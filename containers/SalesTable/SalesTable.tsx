import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import { decimalTwo, wait, SrPageNumber } from '@/utils/helper';


const TAG = "SalesTable: ";
const SalesTable = (props: any) => {

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

  async function toReceivable(item: any) {
    // console.log( TAG + ' got hit ', item);
    localStorage.setItem('receivableParty', item);
    await wait(200);
    router.push(`/receivables`);
  }

  // console.log('got hit', rowsDataList);
  // console.log('sortKey', sortKey);
  // console.log('sortType', sortType);


  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" > Sr. No.</th>
            <th>Customer Name</th>
            <th>Customer Group</th>
            <th>Type</th>
            <th>Amount (₹)</th>
            <th>No of orders</th>
            <th>Average Order</th>
            <th>% Sales</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 w-100px" >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.party_name} >
                    <span className='tx-o cp' onClick={toReceivable.bind('', item?.party_name)} > {item?.party_name} </span>
                  </CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title="_" > _</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.primaryGroup} > {item?.primaryGroup}</CustomTooltip>
                </td>
      

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.amount)} > {decimalTwo(item?.amount)} </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.no_of_orders} > {item?.no_of_orders}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.avg_order)} > {decimalTwo(item?.avg_order)}</CustomTooltip>
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

export default SalesTable;
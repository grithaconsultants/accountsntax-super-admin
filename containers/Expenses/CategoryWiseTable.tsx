import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';
import ReceiptExpenses from '@/containers/Receivables/ReceiptExpenses';

import { removeDateRest, decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "CategoryWiseTable: ";
const CategoryWiseTable = (props: any) => {

  const router = useRouter();

  const [modalBool, setModal] = useState<any>(null);
  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, defaultCurrent } = props;

  function editOpration(toOprate: any) {
    setRowToUpdate(toOprate);
  }

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }

  const showExpenses = (detailsExpenses: any) => {
    // console.log('sortType', detailsExpenses);
    setModal(detailsExpenses);
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
            <th>No of Orders</th>
            <th>Amount (₹)</th>
            <th>Average Order</th>
            <th>Average Sale</th>
            <th>Voucher Date</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " > {SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.no_of_orders} > {item?.no_of_orders}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.amount)} > {decimalTwo(item?.amount)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.avg_order)} > {decimalTwo(item?.avg_order)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.avg_sale)} > {decimalTwo(item?.avg_sale)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.vouchers_date)} > {removeDateRest(item?.vouchers_date)}</CustomTooltip>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {modalBool !== null ?
        <Suspense fallback={`Loading...`}>
          <ReceiptExpenses
            modalBool={modalBool}
            setModal={setModal}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : ""}

    </>
  );
}

export default CategoryWiseTable;
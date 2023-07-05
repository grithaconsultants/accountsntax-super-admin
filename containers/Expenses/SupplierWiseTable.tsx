import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';
import ReceiptExpenses from '@/containers/Receivables/ReceiptExpenses';

import { decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "SupplierWiseTable: ";
const SupplierWiseTable = (props: any) => {

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
            <th>Expense Name</th>
            <th>Expense Group</th>
            {/* <th>Expense Nature</th> */}
            <th>Amount (₹)</th>
            <th>No of Order</th>
            <th>Avg Order</th>
            <th>% Expense</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.mst_ledger_name} > {item?.mst_ledger_name}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.primaryGroup} > {item?.primaryGroup}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.amount * -1)} > {decimalTwo(item?.amount * -1)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.no_of_orders} > {item?.no_of_orders}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(item?.avg_order * -1)} > {decimalTwo(item?.avg_order * -1)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={`${decimalTwo(item?.avg_sale)}%`} > {`${decimalTwo(item?.avg_sale)}%`}</CustomTooltip>
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

export default SupplierWiseTable;
import React, { useState, Suspense } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';
import VoucherDetails from '@/containers/VoucherDetails/VoucherDetails';

import { removeDateRest, decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "ExpensesTable: ";
const ExpensesTable = (props: any) => {


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

  const showVoucherDetails = (detailsVoucher: any) => {
    setModal(detailsVoucher);
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
            <th>Name</th>
            <th>VCH No</th>
            <th>Date</th>
            <th>Amount (₹)</th>
            <th>Group</th>
            <th>Narration</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.trn_vouchers?.party_name} > {item?.trn_vouchers?.party_name}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.trn_vouchers?.voucher_number} >
                    {/* <span className='cp tx-o' > {item?.trn_vouchers?.voucher_number} </span> */}
                    <span className='tx-o cp' onClick={() => showVoucherDetails(item?.guid)} > {item?.trn_vouchers?.voucher_number} </span>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.trn_vouchers?.date)} > {removeDateRest(item?.trn_vouchers?.date)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={decimalTwo((item?.amount * -1))} > {decimalTwo((item?.amount * -1))}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.mst_groups?.primary_group} > {item?.mst_ledgers?.mst_groups?.primary_group}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.trn_vouchers?.narration} > {item?.trn_vouchers?.narration}</CustomTooltip>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {modalBool !== null ?
        <Suspense fallback={`Loading...`}>
          <VoucherDetails
            modalBool={modalBool}
            setModal={setModal}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : ""}

    </>
  );
}

export default ExpensesTable;
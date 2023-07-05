import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router';
import { FaEye } from "react-icons/fa";

import CustomTooltip from '@/component/tooltip/tooltip';
import IconBox from '@/component/iconbox/iconbox';
import ReceiptExpenses from '@/containers/Receivables/ReceiptExpenses';
import VoucherDetails from '@/containers/VoucherDetails/VoucherDetails';

import { SrPageNumber } from '@/utils/helper';

const TAG = "PaymentsTable: ";
const PaymentsTable = (props: any) => {

  const router = useRouter();

  const [modalBool, setModal] = useState<any>(null);
  const [voucherView, setVoucherView] = useState<any>(null);
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
    setModal(detailsExpenses);
  }

  const showVoucherDetails = (detailsVoucher: any) => {
    setVoucherView(detailsVoucher);
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
            <th>VCH Number</th>
            <th>VCH Type</th>
            <th>Amount (₹)</th>
            <th>Bills</th>
            <th>Narration</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.trn_vouchers?.voucher_number} >
                    <span className='tx-o cp' onClick={() => showVoucherDetails(item?.guid)} > {item?.trn_vouchers?.voucher_number} </span>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.trn_vouchers?.voucher_number} > {item?.trn_vouchers?.voucher_number}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.amount} > {item?.amount}</CustomTooltip>
                </td>


                <td className="tb-text tb-mw-150 px-1" >
                  <td className="tb-text tb-mw-150 px-1" >
                    <IconBox
                      type="text"
                      icon={<FaEye color="#673275" />}
                      loading={false}
                      onClickEvent={() => { showExpenses(item) }}
                    />
                  </td>
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
          <ReceiptExpenses
            modalBool={modalBool}
            setModal={setModal}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : ""}

      {voucherView !== null ?
        <Suspense fallback={`Loading...`}>
          <VoucherDetails
            modalBool={voucherView}
            setModal={setVoucherView}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : ""}


    </>
  );
}

export default PaymentsTable;
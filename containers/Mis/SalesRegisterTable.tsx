import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import CustomTooltip from '@/component/tooltip/tooltip';
import VoucherDetails from '@/containers/VoucherDetails/VoucherDetails';

import { removeDateRest, SrPageNumber } from '@/utils/helper';

const TAG = "SalesRegisterTable: ";
const SalesRegisterTable = (props: any) => {

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

  const directTo = () => {
    router.push('/sales-details');
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
            <th>Invoice No</th>
            <th>Invoice Date</th>
            <th>Party Name</th>
            <th>Party Group</th>
            <th>Amount (₹)</th>
            <th>Narration</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 w-100px " >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1 w-100px" >
                  <CustomTooltip placement="topLeft" title={item?.voucher_number}  >
                    <span className='tx-o cp' onClick={() => showVoucherDetails(item?._id)} > {item?.voucher_number} </span>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.date)} > {removeDateRest(item?.date)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.party_name} >
                    <Link target='_blank' href="" className='tx-o' > {item?.party_name} </Link>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.partyGroup} > {item?.partyGroup}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.netSale} > {item?.netSale}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.narration} > {item?.narration}</CustomTooltip>
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

export default SalesRegisterTable;
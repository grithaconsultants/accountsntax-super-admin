import React, { useState, Suspense } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';
import VoucherDetails from '@/containers/VoucherDetails/VoucherDetails';

import { removeDateRest, decimalTwo, closingDrOrCr, toDebit, toCredit } from '@/utils/helper';

const TAG = "LedgerTable: ";
const LedgerTable = (props: any) => {

  const [modalBool, setModal] = useState<any>(null);
  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, defaultCurrent, paginationData } = props;

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
  console.log('paginationData', paginationData);


  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            {/* <th className="ps-4" > Sr. No.</th> */}
            <th className="ps-4" >Date</th>
            <th>VCH No</th>
            <th>VCH Type</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Closing Balance</th>
            <th>Narration</th>
          </tr>
        </thead>
        <tbody>

          {paginationData == null ?
            <>
              <tr className='' >
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-d" >Opening Balance</td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-d" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(rowsDataList[0]?.opening_balance)} >
                    {decimalTwo(rowsDataList[0]?.opening_balance)}
                  </CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              </tr>
              <tr className='' >
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-d" >Closing Balance</td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-d" >
                  <CustomTooltip placement="topLeft" title={decimalTwo(rowsDataList[0]?.closing_balance)} >
                    {decimalTwo(rowsDataList[0]?.opening_balance)}
                  </CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
                <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              </tr>
            </>
            : ""}

          {paginationData?.page === 1 ?
            <tr className='bg-o' >
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" >Opening Balance</td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" >
                <CustomTooltip placement="topLeft" title={decimalTwo(rowsDataList[0]?.opening_balance)} >
                  {decimalTwo(rowsDataList[0]?.opening_balance)}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
            </tr>
            : ""}


          {paginationData !== null && rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 ps-4" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.date)} > {removeDateRest(item?.date)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.voucher_number} >
                    <span className='tx-o cp' onClick={() => showVoucherDetails(item?.guid)} > {item?.voucher_number} </span>
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.voucher_type} >{item?.voucher_type}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={toDebit(item?.amount)} >
                    {toDebit(item?.amount)}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={toCredit(item?.amount)} >
                    {toCredit(item?.amount)}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={closingDrOrCr(decimalTwo(item?.closing_balance))} > {closingDrOrCr(decimalTwo(item?.closing_balance))}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.narration} > {item?.narration}</CustomTooltip>
                </td>

              </tr>
            );
          })}

          {paginationData !== null && paginationData?.page === paginationData?.pages ?
            <tr className='bg-o' >
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" >Closing Balance</td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" >
                <CustomTooltip placement="topLeft" title={decimalTwo(rowsDataList[rowsDataList?.length - 1]?.closing_balance)} >
                  {decimalTwo(rowsDataList[rowsDataList?.length - 1]?.closing_balance)}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
              <td className="tb-text tb-mw-150 px-1 tx-w" ></td>
            </tr>
            : ""}

        </tbody>
      </table >


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

export default LedgerTable;
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import { yyyymmTommmYY, decimalTwo, SrPageNumber } from '@/utils/helper';

const TAG = "VendorWiseTable: ";
const VendorWiseTable = (props: any) => {

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
            <th>Month</th>
            <th>Total Expenses</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>


          {rowsDataList.map((item: any, index: number) => {

            const sum = rowsDataList.reduce((accumulator: any, object: any) => {
              return accumulator + (object.total_expenses * -1);
            }, 0);

            if ((index + 1) == rowsDataList.length) {
              return (
                <>
                  <tr key={index} >

                    <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{SrPageNumber(defaultCurrent, index)} </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={yyyymmTommmYY(item?._id)} > {yyyymmTommmYY(item?._id)}</CustomTooltip>
                    </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={decimalTwo(item?.total_expenses * -1)} > {decimalTwo(item?.total_expenses * -1)}</CustomTooltip>
                    </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={item?.count} > {item?.count}</CustomTooltip>
                    </td>

                  </tr>

                  <tr key={index + 1} className='bg-o'  >

                    <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " ></td>


                    <td className="tb-text tb-mw-150 px-1 tx-w ff-m " >Total</td>

                    <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
                      <CustomTooltip placement="topLeft" title={decimalTwo(sum)} > {decimalTwo(sum)}</CustomTooltip>
                    </td>
                    <td className="tb-text tb-mw-150 px-1" > </td>

                  </tr>

                </>
              );
            } else {
              return (
                <tr key={index} >

                  <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{SrPageNumber(defaultCurrent, index)} </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={yyyymmTommmYY(item?._id)} > {yyyymmTommmYY(item?._id)}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={decimalTwo(item?.total_expenses * -1) } > {decimalTwo(item?.total_expenses * -1) }</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={item?.count} > {item?.count}</CustomTooltip>
                  </td>

                </tr>
              );
            }

          })}


        </tbody>
      </table>

    </>
  );
}

export default VendorWiseTable;
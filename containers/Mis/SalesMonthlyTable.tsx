import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import { decimalTwo, yyyymmTommmYY, SrPageNumber } from '@/utils/helper';


const TAG = "SalesMonthlyTable: ";
const SalesMonthlyTable = (props: any) => {

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
            <th className="ps-4" > Sr. No.</th>
            <th>Month</th>
            <th>Total Sales</th>
            <th>No. Of Invoices</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {

            const sum = rowsDataList.reduce((accumulator: any, object: any) => {
              return accumulator + object.total_sales;
            }, 0);

            if ((index + 1) == rowsDataList.length) {
              return (
                <>
                  <tr key={index} >

                    <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{SrPageNumber(defaultCurrent, index)} </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={yyyymmTommmYY(item?.monthYear)} > {yyyymmTommmYY(item?.monthYear)}</CustomTooltip>
                    </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={decimalTwo(item?.total_sales)} > {decimalTwo(item?.total_sales)}</CustomTooltip>
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
                    <CustomTooltip placement="topLeft" title={yyyymmTommmYY(item?.monthYear)} > {yyyymmTommmYY(item?.monthYear)}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={decimalTwo(item?.total_sales)} > {decimalTwo(item?.total_sales)}</CustomTooltip>
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

export default SalesMonthlyTable;
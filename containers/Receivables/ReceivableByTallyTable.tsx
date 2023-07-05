import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import { removeDateRest, SrPageNumber } from '@/utils/helper';

const TAG = "ReceivableByTallyTable: ";
const ReceivableByTallyTable = (props: any) => {

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
            <th>Bill Type</th>
            <th>Bill Date</th>
            <th>Name</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >

                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.billtype} > {item?.billtype}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={removeDateRest(item?.billdate)} > {removeDateRest(item?.billdate)}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.name} > {item?.name}</CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.amount} > {item?.amount}</CustomTooltip>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ReceivableByTallyTable;
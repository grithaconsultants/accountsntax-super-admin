import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';


// const UpdateDWHClientConn = dynamic(() => import('../UpdateDWHClientConn/UpdateDWHClientConn'), { suspense: true });
import CustomTooltip from '@/component/tooltip/tooltip';
import { upar, downar, uparin, downarin } from '@/utils/image';

const TAG = "ItemTable: ";

const ItemTable = (props: any) => {

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, setSortFrom } = props;

  function editOpration(toOprate: any) {
    setRowToUpdate(toOprate);
  }

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }

  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" >
              Name
              {/* <Image src={sortKey === "name" && sortType == "asc" ? upar : uparin} alt="table arrow" width={15} height={20} onClick={filterTable.bind('', 'name', 'asc')} />
              <Image src={sortKey === "name" && sortType == "desc" ? downar : downarin} alt="table arrow" width={15} height={20} onClick={filterTable.bind('', 'name', 'dsc')} /> */}
            </th>
            <th>HSN/SAC</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {rowsDataList.map((item: any, index: number) => {
            return (
              <tr key={index} >
                {/* <td className="ps-4 tb-text tb-mw-150 drop-mw" >
                  <CustomTooltip placement="topLeft" title={index + 1} > {index + 1}</CustomTooltip>
                </td> */}
                <td className="tb-text tb-mw-150 pe-1 ps-4" >
                  <CustomTooltip placement="topLeft" title={item?.name} > {item?.name}</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.gst_hsn_code} > {item?.gst_hsn_code}</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1 tb-w-max" >
                  <CustomTooltip placement="topLeft" title="09876543210" > 09876543210</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.opening_rate} > {item?.opening_rate}</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150" >
                  <div className="d-flex align-items-center">
                    <div className="pe-2 action-border-end ">
                      <CustomTooltip placement="topLeft" title="Edit" > Edit</CustomTooltip>
                    </div>
                    <div className='ps-2'>
                      <CustomTooltip placement="topLeft" title="Delete" > Delete</CustomTooltip>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


      {/* {rowToUpdate !== null ?
        <div className="modal-wrapper">
          <div className="onboard-update">
            <Suspense fallback={`Loading...`}>
              <UpdateDWHClientConn setRowToUpdate={setRowToUpdate} rowToUpdate={rowToUpdate} setReFetchAction={setReFetchAction} />
            </Suspense>
          </div>
        </div>
        : null} */}

    </>
  );
}

export default ItemTable;
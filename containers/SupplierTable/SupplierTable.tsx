import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';


// const UpdateDWHClientConn = dynamic(() => import('../UpdateDWHClientConn/UpdateDWHClientConn'), { suspense: true });
import CustomTooltip from '@/component/tooltip/tooltip';
import { upar, downar, uparin, downarin } from '@/utils/image';

const TAG = "SupplierTable: ";

const SupplierTable = (props: any) => {

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
            {/* <th className="ps-4" >Sr. No</th> */}
            {/* onClick={filterTable.bind('', 'client_dwh_connection_id', 'ASC', undefined)} */}
            <th className="ps-4" >
              Name
              <Image src={sortKey === "partyName" && sortType == "asc" ? upar : uparin} alt="table arrow" width={15} height={20} onClick={filterTable.bind('', 'partyName', 'asc')} />
              <Image src={sortKey === "partyName" && sortType == "desc" ? downar : downarin} alt="table arrow" width={15} height={20} onClick={filterTable.bind('', 'partyName', 'dsc')} />
            </th>
            <th>GSTIN/UIN </th>
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
                  <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.name} > {item?.mst_ledgers?.name}</CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1" >
                  <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.gstn} > {item?.mst_ledgers?.gstn}</CustomTooltip>
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

export default SupplierTable;
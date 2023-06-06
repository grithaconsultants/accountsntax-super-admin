import React, { useState } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';

const TAG = "HsnTable: ";

const HsnTable = (props: any) => {

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, setSortFrom } = props;

  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" > HSN/SAC</th>
            <th>Taxable value</th>
            <th className='fs-12 text-center' >Central tax<br /> Rate | Amount</th>
            <th className='fs-12 text-center' >State tax<br /> Rate | Amount</th>
            <th>Total Tax Amount</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >
              <CustomTooltip placement="topLeft" title="248747" > 248747</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹19,740" > ₹19,740</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1 text-center" >9% &nbsp;  &nbsp; ₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1 text-center" >9% &nbsp;  &nbsp; ₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹3,555.50" > ₹3,555.50</CustomTooltip>
            </td>
          </tr>

          <tr>
            <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >
              <CustomTooltip placement="topLeft" title="248747" > 248747</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹19,740" > ₹19,740</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1 text-center" >9% &nbsp;  &nbsp; ₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1 text-center" >9% &nbsp;  &nbsp; ₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹3,555.50" > ₹3,555.50</CustomTooltip>
            </td>
          </tr>

          <tr className="bg-o" >
            <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 tx-w ff-m" >
              <CustomTooltip placement="topLeft" title="Total" > Total</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
              <CustomTooltip placement="topLeft" title="₹19,740" > ₹39,740</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1 text-center tx-w ff-m" >₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1 text-center tx-w ff-m" >₹1.777.50</td>
            <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
              <CustomTooltip placement="topLeft" title="₹3,555.50" > ₹3,555.50</CustomTooltip>
            </td>
          </tr>


        </tbody>
      </table>
    </>
  );
}

export default HsnTable;
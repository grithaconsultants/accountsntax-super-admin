import React, { useState } from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';

const TAG = "ParticularTable: ";

const ParticularTable = (props: any) => {

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);

  const { rowsDataList, setReFetchAction, sortKey, setSortKey, sortType, setSortType, setSortFrom } = props;

  return (
    <>
      <table className="table-wrapper" >
        <thead>
          <tr>
            <th className="ps-4" > Sr. No</th>
            <th>Item(s)</th>
            <th>HSN</th>
            <th>Qunatity</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Discount</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>

          <tr>

            <td className="tb-text tb-mw-150 pe-1 ps-4" >01</td>
            <td className="tb-text tb-mw-150 px-1" >
              {/* <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.gstn} > {item?.mst_ledgers?.gstn}</CustomTooltip> */}
            </td>
            <td className="tb-text tb-mw-150 px-1 tb-w-max" >
              <CustomTooltip placement="topLeft" title="248747" > 248747</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25" > 25</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25.75" > 25.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="18%" > 18%</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="-₹5.75" > -₹5.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹20.00" > ₹20.00</CustomTooltip>
            </td>
          </tr>


          <tr>

            <td className="tb-text tb-mw-150 pe-1 ps-4" >01</td>
            <td className="tb-text tb-mw-150 px-1" >
              {/* <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.gstn} > {item?.mst_ledgers?.gstn}</CustomTooltip> */}
            </td>
            <td className="tb-text tb-mw-150 px-1 tb-w-max" >
              <CustomTooltip placement="topLeft" title="248747" > 248747</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25" > 25</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25.75" > 25.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="18%" > 18%</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="-₹5.75" > -₹5.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹20.00" > ₹20.00</CustomTooltip>
            </td>
          </tr>

          <tr>

            <td className="tb-text tb-mw-150 pe-1 ps-4" >01</td>
            <td className="tb-text tb-mw-150 px-1" >
              {/* <CustomTooltip placement="topLeft" title={item?.mst_ledgers?.gstn} > {item?.mst_ledgers?.gstn}</CustomTooltip> */}
            </td>
            <td className="tb-text tb-mw-150 px-1 tb-w-max" >
              <CustomTooltip placement="topLeft" title="248747" > 248747</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25" > 25</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="25.75" > 25.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="18%" > 18%</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="-₹5.75" > -₹5.75</CustomTooltip>
            </td>
            <td className="tb-text tb-mw-150 px-1" >
              <CustomTooltip placement="topLeft" title="₹20.00" > ₹20.00</CustomTooltip>
            </td>
          </tr>

        </tbody>
      </table>
    </>
  );
}

export default ParticularTable;
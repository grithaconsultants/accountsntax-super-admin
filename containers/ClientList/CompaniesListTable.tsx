import React, { useState } from "react";

import CustomTooltip from "@/component/tooltip/tooltip";

import { SrPageNumber } from "@/utils/helper";

const TAG = "Companies List Table: ";

const CompaniesListTable = (props: any) => {

  const { rowsDataList, defaultCurrent, defaultPageSize } = props;

  return (
    <>
      <div className="table-wrapper" >
        <table >
          <thead>
            <tr>
              <th className="ps-4">Sr. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>PAN No.</th>
              <th>Name as Per PAN</th>
              <th>Father Name</th>
              <th>D.O.B.</th>
            </tr>
          </thead>
          <tbody>
            {rowsDataList.map((item: any, index: number) => (
              <tr key={item?._id}>
                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4">
                  {SrPageNumber(defaultCurrent, defaultPageSize, index)}
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.name ? item?.name : "-"}>
                    {item?.name ? item?.name : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.email ? item?.email : "-"}>
                    {item?.email ? item?.email : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.mobile ? item?.mobile : "-"}>
                    {item?.mobile ? item?.mobile : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.panDetail?.nameAsPerPan ? item?.panDetail?.nameAsPerPan : "-"}>
                    {item?.panDetail?.nameAsPerPan ? item?.panDetail?.nameAsPerPan : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.panDetail?.panNo ? item?.panDetail?.panNo : "-"}>
                    {item?.panDetail?.panNo ? item?.panDetail?.panNo : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.panDetail?.fatherName ? item?.panDetail?.fatherName : "-"}>
                    {item?.panDetail?.fatherName ? item?.panDetail?.fatherName : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.panDetail?.dob ? item?.panDetail?.dob : "-"}>
                    {item?.panDetail?.dob ? item?.panDetail?.dob : "-"}
                  </CustomTooltip>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompaniesListTable;

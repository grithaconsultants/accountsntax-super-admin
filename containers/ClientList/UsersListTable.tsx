import React, { useState } from "react";

import CustomTooltip from "@/component/tooltip/tooltip";
import TagCustom from "@/component/tags/tags";

import { SrPageNumber } from "@/utils/helper";

const TAG = "Users List Table: ";

const UsersListTable = (props: any) => {

  const { rowsDataList, defaultCurrent, defaultPageSize } = props;

  return (
    <>
      <div className="table-wrapper" >
        <table >
          <thead>
            <tr>
              <th className="ps-4">Sr. No.</th>
              <th className="text-center">ID</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>GuacaMole UserName</th>
              <th>Instance Type</th>
              <th>Tally On Cloud</th>
              <th>VNC port</th>
              <th>VNC Session Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rowsDataList.map((item: any, index: number) => (
              <tr key={item?._id}>
                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4">
                  {SrPageNumber(defaultCurrent, defaultPageSize, index)}
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?._id ? item?._id : "-"}>
                    {item?._id ? item?._id : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.firstName ? item?.firstName : "-"}>
                    {item?.firstName ? item?.firstName : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.lastName ? item?.lastName : "-"}>
                    {item?.lastName ? item?.lastName : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.email ? item?.email : "-"}>
                    {item?.email ? item?.email : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.guacamoleUsername ? item?.guacamoleUsername : "-"}>
                    {item?.guacamoleUsername ? item?.guacamoleUsername : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.instanceType ?? "-"}>
                    {item?.instanceType ?? item?.instanceType}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.tallyCloud ? 'true ' : "false"}>
                    {item?.tallyCloud ? "Yes" : "No"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.vnc_port ? item?.vnc_port : "-"}>
                    {item?.vnc_port ? item?.vnc_port : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.vnc_session_number ? item?.vnc_session_number : "-"}>
                    {item?.vnc_session_number ? item?.vnc_session_number : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  {item?.userDetails?.status === true ? <TagCustom color="green" title="Active" /> : <TagCustom color="volcano" title="Inactive" />}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersListTable;

import React, { useState } from "react";
import { useRouter } from "next/router";

import CustomTooltip from "@/component/tooltip/tooltip";

import { removeplus91, SrPageNumber } from "@/utils/helper";

const TAG = "ClientListTable: ";
const ClientListTable = (props: any) => {
  const router = useRouter();

  const { rowsDataList, defaultCurrent } = props;
  console.log("Row data List in Client Table  List ", rowsDataList);

  const directToTarget = (target1: string, target2: string) => {
    console.log(" Routing Page ", target1);
    console.log(" Client ID", target2);
    localStorage.setItem("client", JSON.stringify(target2));
    console.log(" Client data saved in Local Storage", target2);
    router.push(target1);
    console.log("Page is Routing on Client-detail");
  };

  return (
    <>
      <table className="table-wrapper">
        <thead>
          <tr>
            <th className="ps-4" rowSpan={2}>
              Sr. No.
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Address</th>
            {/* <th>Action</th> */}
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => (
            <tr key={index}>
              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 ">
                {SrPageNumber(defaultCurrent, index)}
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.firstName}>
                  {item?.firstName}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.lastName}>
                  {item?.lastName}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.email}>
                  {item?.email}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.mobile}>
                  {removeplus91(item?.mobile)}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.gender}>
                  {item?.gender ? item?.gender : "None"}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-50 px-1">
                <CustomTooltip placement="topLeft" title={"Basic Address"}>
                  {item?.address?.addLine1 || item?.address?.addLine2
                    ? item?.address?.addLine1 + " " + item?.address?.addLine2
                    : "First Floor Cybercity"}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={"city"}>
                  {item?.address?.city ? item?.address?.city : "Jaipur"}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={"state"}>
                  {item?.address?.state ? item?.address?.state : "Rajasthan"}
                </CustomTooltip>
              </td>

              {/* <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.name}>
                  <a onClick={() => directToTarget("client-profiles", item)}>
                    View
                  </a>
                </CustomTooltip>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClientListTable;

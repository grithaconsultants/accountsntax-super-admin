import React, { useState } from "react";
import { useRouter } from "next/router";

import CustomTooltip from "@/component/tooltip/tooltip";

import { removeplus91, SrPageNumber } from "@/utils/helper";

const TAG = "CompaniesListTable: ";
const CompaniesListTable = (props: any) => {
  const router = useRouter();


  const { rowsDataList,  defaultCurrent } = props;
  console.log("Row data List in Companies Table  List " , rowsDataList)


  return (
    <>
      <table className="table-wrapper">
        <thead>
          <tr>
            <th className="ps-4"> Sr. No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Tan</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => (
            <tr key={index}>
              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 ">{SrPageNumber(defaultCurrent, index)}</td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.name}>{item.name}</CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.type}>{item.type}</CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.email}>{item.email}</CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.mobile}>{item.mobile && removeplus91(item.mobile)}</CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item.tan}>{item.tan}</CustomTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompaniesListTable;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import CustomTooltip from "@/component/tooltip/tooltip";
import IconBox from "@/component/iconbox/iconbox";

import { removeplus91, SrPageNumber } from "@/utils/helper";
import { view_account } from "@/utils/image";

const TAG = "CompaniesListTable: ";
const CompaniesListTable = (props: any) => {
  const router = useRouter();

  const { rowsDataList, defaultCurrent } = props;
  console.log("Row data List in Companies Table  List ", rowsDataList);

  // const directToTarget = (target1: string, target2: string) => {
  //   console.log(" Routing Page ", target1);
  //   console.log(" Comapny ID", target2);
  //   localStorage.setItem("company", JSON.stringify(target2));
  //   console.log(" Comapny data saved in Local Storage", target2);
  //   router.push(target1);
  //   console.log("Page is Routing on profile-detail");
  // };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => (
            <tr key={index}>
              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 ">
                {SrPageNumber(defaultCurrent, index)}
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.name}>
                  {item?.name}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.type}>
                  {item?.type}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.email}>
                  {item?.email}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.mobile}>
                  {item?.mobile && removeplus91(item?.mobile)}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.tan}>
                  {item?.tan}
                </CustomTooltip>
              </td>

              {/* <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.name}>
                  <a onClick={() => directToTarget("company-profiles", item)}>
                    View
                  </a>
                </CustomTooltip>
              </td> */}

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.name}>
                  <Link href={`/company-profiles/${item?._id}`}>
                    <div className="d-flex justify-content-center">
                      <Image
                        src={view_account}
                        alt="Create icon"
                        width={25}
                        height={25}
                        priority
                      />
                    </div>
                  </Link>
                </CustomTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CompaniesListTable;

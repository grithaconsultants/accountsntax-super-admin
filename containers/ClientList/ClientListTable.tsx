import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { WhatsAppOutlined } from '@ant-design/icons';
import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

import CustomTooltip from "@/component/tooltip/tooltip";
import SortUi from '@/component/sortui/sortui';

import { handleSenEMail, removeDateRest, removeplus91, SrPageNumber } from "@/utils/helper";
import { whatsapp } from "@/utils/image";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps3 from "@/ApiHandler/NetworkOps3";

const TAG = "ClientListTable: ";

const ClientListTable = (props: any) => {

  const { rowsDataList, defaultCurrent, defaultPageSize, sortKey, setSortKey, sortType, setSortType } = props;

  const router = useRouter();

  const [message, setMessage] = useState<string>("Welcome to Account-n-tax");
  const [loading, setLoading] = useState<boolean>(false);

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }

  const formateAddress = (address: any) => {
    let newAddress: string = address?.addLine1 ? `${address?.addLine1},` : "" + address?.addLine2 ? address?.addLine2 : "";
    return newAddress
  }


  return (
    <>
      <table className="table-wrapper">
        <thead>
          <tr>
            <th className="ps-4" rowSpan={2}>
              Sr. No.
            </th>
            <th>
              <SortUi callTo={filterTable} keyToCall="firstName" typeSort={sortType} activeSortKey={sortKey} />
              First Name
            </th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>
              <SortUi callTo={filterTable} keyToCall="email" typeSort={sortType} activeSortKey={sortKey} />
              Email
            </th>
            <th>
              <SortUi callTo={filterTable} keyToCall="mobile" typeSort={sortType} activeSortKey={sortKey} />
              Mobile
            </th>

            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>
              <SortUi callTo={filterTable} keyToCall="createdAt" typeSort={sortType} activeSortKey={sortKey} />
              Created At
            </th>

          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => (
            <tr key={item?._id}>
              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 ">
                {SrPageNumber(defaultCurrent, defaultPageSize, index)}
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
                <CustomTooltip placement="topLeft" title={item?.gender ? item?.gender : "-"}>
                  {item?.gender ? item?.gender : "-"}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.email ? item?.email : "-"}>
                  {item?.email ? item?.email : "-"}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.mobile ? removeplus91(item?.mobile) : "-"}>
                  {item?.mobile ? removeplus91(item?.mobile) : "-"}
                </CustomTooltip>
              </td>


              <td className="tb-text tb-mw-50 px-1">
                <CustomTooltip placement="topLeft" title={formateAddress(item?.address)}>
                  {formateAddress(item?.address)}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.address?.city ? item?.address?.city : "-"}>
                  {item?.address?.city ? item?.address?.city : "-"}
                </CustomTooltip>
              </td>
              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.address?.state ? item?.address?.state : '-'}>
                  {item?.address?.state ? item?.address?.state : '-'}
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={item?.createdAt ? removeDateRest(item?.createdAt) : "-"}>
                  {item?.createdAt ? removeDateRest(item?.createdAt) : "-"}
                </CustomTooltip>
              </td>

              {/* <td className="tb-text tb-mw-150 px-1 text-center">
                <CustomTooltip placement="topLeft" title={"Whatsapp"}>
                  <a onClick={() => NetworkOps3.sendMessage(item?.mobile)}>
                    <WhatsAppOutlined style={{ fontSize: '24px', color: '#25D366' }} />
                  </a>
                </CustomTooltip>
              </td> */}

              {/* <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={"Email"}>
                  <a onClick={() => handleSenEMail()}>
                    <AiOutlineMail />
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

import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { WhatsAppOutlined } from '@ant-design/icons';
import { AiOutlineMail, AiOutlineWhatsApp } from "react-icons/ai";

import CustomTooltip from "@/component/tooltip/tooltip";
import SortUi from '@/component/sortui/sortui';
import IconBox from "@/component/iconbox/iconbox";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps3 from "@/ApiHandler/NetworkOps3";

import { useDispatch, useSelector } from 'react-redux';
import { CLIENT_DETAILS_UPDATE } from "@/redux/constant";

import { whatsapp } from "@/utils/image";
import { ICFBsBoxArrowInUpRight } from '@/utils/icons';
import { handleSenEMail, isEmpty, removeDateRest, removeplus91, SrPageNumber } from "@/utils/helper";
import { ClientsService } from "@/utils/apiCallServices/client.api.services";
import ToastComponent from "@/component/Toast/Toast";

const TAG = "ClientListTable: ";

const ClientListTable = (props: any) => {

  const { rowsDataList, defaultCurrent, defaultPageSize, sortKey, setSortKey, sortType, setSortType } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientID, clientDetails, clientsList, metaData, }: any = useSelector((state: any) => state.clientsData);

  const [message, setMessage] = useState<string>("Welcome to Account-n-tax");
  const [loading, setLoading] = useState<boolean>(false);

  function filterTable(column: string, type: string) {
    setSortKey(column);
    setSortType(type);
  }

  const formateAddress = (address: any) => {
    let newAddress: string = address?.addLine1 ? `${address?.addLine1},` : "" + address?.addLine2 ? address?.addLine2 : "";
    return newAddress;
  }


  async function redirectToClientDetails(clientId: any) {
    setLoading(true);
    const { response, status }: any = await ClientsService.getClientDetailsById(clientId);
    setLoading(false);

    if (!status) {
      ToastComponent(response.data.msg);
      return;
    }

    const resData = response?.data?.data ? response?.data?.data : null;
    if (!isEmpty(resData)) {
      const payLoad = {
        clientID: clientId,
        clientsList: clientsList,
        clientDetails: resData,
        metaData: metaData
      }
      dispatch({ type: CLIENT_DETAILS_UPDATE, payload: payLoad });
      router.push('/clients/details');
    } else {
      ToastComponent("Client Details Not Found");
    }
  }

  return (
    <>
      <div className="table-wrapper" >
        <table >
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
              <th>
                <SortUi callTo={filterTable} keyToCall="email" typeSort={sortType} activeSortKey={sortKey} />
                Email
              </th>
              <th>
                <SortUi callTo={filterTable} keyToCall="mobile" typeSort={sortType} activeSortKey={sortKey} />
                Mobile
              </th>

              <th>Address</th>
              <th>
                <SortUi callTo={filterTable} keyToCall="city" typeSort={sortType} activeSortKey={sortKey} />
                City
              </th>
              <th>
                <SortUi callTo={filterTable} keyToCall="state" typeSort={sortType} activeSortKey={sortKey} />
                State
              </th>
              <th className="text-center">
                <SortUi callTo={filterTable} keyToCall="createdAt" typeSort={sortType} activeSortKey={sortKey} />
                Created At
              </th>

              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {rowsDataList.map((item: any, index: number) => (
              <tr key={item?._id}>
                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4">
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
                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.address?.city ? item?.address?.city : "-"}>
                    {item?.address?.city ? item?.address?.city : "-"}
                  </CustomTooltip>
                </td>
                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.address?.state ? item?.address?.state : '-'}>
                    {item?.address?.state ? item?.address?.state : '-'}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1 text-center">
                  <CustomTooltip placement="topLeft" title={item?.createdAt ? removeDateRest(item?.createdAt) : "-"}>
                    {item?.createdAt ? removeDateRest(item?.createdAt) : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text text-center tb-mw-150">
                  <CustomTooltip placement="topLeft" title={`Redirect to ${item?.firstName ? item?.firstName : ""} ${item?.lastName ? item?.lastName : ""}'s Detail`}>
                    <IconBox
                      icon={<ICFBsBoxArrowInUpRight />}
                      onClickEvent={() => redirectToClientDetails(item?._id)}
                    />
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
      </div>
    </>
  );
};

export default ClientListTable;

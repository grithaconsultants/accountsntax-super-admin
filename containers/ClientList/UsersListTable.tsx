import React, { useState } from "react";
import { useRouter } from "next/router";

import CustomTooltip from "@/component/tooltip/tooltip";
import SortUi from '@/component/sortui/sortui';
import IconBox from "@/component/iconbox/iconbox";
import TagCustom from "@/component/tags/tags";

import { useDispatch, useSelector } from 'react-redux';
import { CLIENT_DETAILS_UPDATE } from "@/redux/constant";

import { ICFiEdit2 } from '@/utils/icons';
import { SrPageNumber } from "@/utils/helper";

const TAG = "Users List Table: ";

const UsersListTable = (props: any) => {

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

  const redirectToClientDetails = (clientId: any) => {
    const payLoad = {
      clientID: clientId,
      clientsList: clientsList,
      clientDetails: clientDetails,
      metaData: metaData
    }
    dispatch({ type: CLIENT_DETAILS_UPDATE, payload: payLoad });
    router.push('/clients/details');
  }

  const handleEditUser = (userDetails: any) => {
    console.log(TAG, " Edit User Action is Calling... ");
  }

  return (
    <>
      <div className="table-wrapper" >
        <table >
          <thead>
            <tr>
              <th className="ps-4">Sr. No.</th>
              <th className="text-center">ID</th>
              <th className="text-center">_ID</th>
              <th className="text-center">User</th>
              <th>GuacaMole UserName</th>
              <th>Instance Type</th>
              <th>Tally On Cloud</th>
              <th>VNC port</th>
              <th>VNC Session Number</th>
              <th>Status</th>
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
                  <CustomTooltip placement="topLeft" title={item?.id ? item?.id : "-"}>
                    {item?.id ? item?.id : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?._id ? item?._id : "-"}>
                    {item?._id ? item?._id : "-"}
                  </CustomTooltip>
                </td>

                <td className="tb-text tb-mw-150 px-1">
                  <CustomTooltip placement="topLeft" title={item?.user ? item?.user : "-"}>
                    {item?.user ? item?.user : "-"}
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

                <td className="tb-text text-center tb-mw-150">
                  <IconBox
                    type="text"
                    icon={<ICFiEdit2 />}
                    loading={false}
                    onClickEvent={() => handleEditUser(item?.userDetails)}
                  />
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

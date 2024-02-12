import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';

import CustomTooltip from "@/component/tooltip/tooltip";
import ToastComponent from "@/component/Toast/Toast";
import SortUi from '@/component/sortui/sortui';
import IconBox from "@/component/iconbox/iconbox";

import { fetchClientDetails } from "@/redux/actions/clientAction";

import { ICFBsBoxArrowInUpRight } from '@/utils/icons';
import { removeDateRest, removeplus91, SrPageNumber } from "@/utils/helper";


const TAG = "ClientListTable: ";

const ClientListTable = (props: any) => {

  const { rowsDataList, defaultCurrent, defaultPageSize, sortKey, setSortKey, sortType, setSortType } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const { clientID, clientDetails, clientsList, metaData }: any = useSelector((state: any) => state.clientsData);

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

    try {
      const payload = {
        clientID: clientId,
        clientsList: clientsList,
        clientDetails: clientDetails,
        metaData: metaData
      };

      setLoading(true);
      fetchClientDetails(dispatch, payload, router);
      setLoading(false);

    } catch (error: any) {
      ToastComponent(error ? error.message : "Something went wrong");
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientListTable;

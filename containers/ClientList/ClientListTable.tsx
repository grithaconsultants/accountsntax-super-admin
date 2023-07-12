import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { WhatsAppOutlined } from '@ant-design/icons';
import {AiOutlineMail , AiOutlineWhatsApp} from "react-icons/ai";

import CustomTooltip from "@/component/tooltip/tooltip";
import ToastComponent from "@/component/Toast/Toast";

// import { sendWhatsAppMessage } from "@/containers/WhatsappWebClient/WhatsappWebClient"

import { removeplus91, SrPageNumber } from "@/utils/helper";
import { whatsapp } from "@/utils/image";

import endPoints from "@/ApiHandler/AppConfig";
import NetworkOps3 from "@/ApiHandler/NetworkOps3";

const TAG = "ClientListTable: ";
const ClientListTable = (props: any) => {
  const router = useRouter();

  const { rowsDataList, defaultCurrent } = props;
  const [message, setMessage] = useState("Welcome to Account-n-tax");
  const [loading, setLoading] = useState<boolean>(false);

  // const handleWhatsAppIconClick = (clientNumber: string) => {
  //   const message = 'Hello, this is an automated message.';
  //   // sendWhatsAppMessage(clientNumber, message);
  //   const whatsappUrl = `https://api.whatsapp.com/send?phone=${clientNumber}&text=${encodeURIComponent(message)}`;

  //   window.open(whatsappUrl, '_blank');
  //   ToastComponent("message sent successfully");
  // };


 
   
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
            <th>Whatsapp</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {rowsDataList.map((item: any, index: number) => (
            <tr key={item?._id}>
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

              <td className="tb-text tb-mw-150 px-1 text-center">
                <CustomTooltip placement="topLeft" title={"Whatsapp"}>
                  <a onClick={() => NetworkOps3.sendMessage('+91 7357909096')}>
                     <WhatsAppOutlined style={{ fontSize: '24px', color: '#25D366' }} />
                     {/* <Image
                        src={whatsapp}
                        alt="Create icon"
                        width={25}
                        height={25}
                        priority
                      /> */}
                  </a>
                </CustomTooltip>
              </td>

              <td className="tb-text tb-mw-150 px-1">
                <CustomTooltip placement="topLeft" title={"Email"}>
                  <AiOutlineMail/>
                </CustomTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClientListTable;

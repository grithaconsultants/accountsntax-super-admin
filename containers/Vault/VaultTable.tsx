import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { FaTrash, FaCloudDownloadAlt } from "react-icons/fa";
import { Popconfirm } from 'antd';
import { FiEdit2 } from "react-icons/fi";

import CustomTooltip from '@/component/tooltip/tooltip';
import ToastComponent from '@/component/Toast/Toast';
import IconBox from '@/component/iconbox/iconbox';
import FileTileBtn from '@/component/filetilebtn/filetilebtn';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';
import { isEmpty } from '@/utils/helper';

const TAG = "VaultTable: ";

const VaultTable = (props: any) => {

  const [rowToUpdate, setRowToUpdate] = useState<any>(null);
  const [modalBool, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { rows, setReFetchAction, company } = props;

  const VaultUpdate = dynamic(() => import('./VaultUpdate'), { suspense: true });

  function displayFullView(calledwith: any) {
    setRowToUpdate(calledwith);
  }


  function callDelete(calledwith: any) {
    registerCall(calledwith?._id);
  }


  async function registerCall(_id: any): Promise<void> {
    setLoading(true);

    NetworkOps.makeDeleteRequest(`${endPoints.deletePasswordVault}/${_id}`, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          setReFetchAction(true);
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });

  }


  return (
    <>
      <div className="table-wrapper " >
        <table className="" >
          <thead>
            <tr>
              <th className="ps-4">Type of Registration</th>
              <th>Registration Number</th>
              <th>User Name</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {rows.map((item: any, index: any) => {
              return (

                <tr key={index} >

                  <td className="ps-4 tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={item?.typeOfregistration} > {item?.typeOfregistration}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <CustomTooltip placement="topLeft" title={item?.registrationNo} > {item?.registrationNo}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150" >
                    <CustomTooltip placement="topLeft" title={item?.username} > {item?.username ? item?.username : "_"}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1 tb-w-max" >
                    <CustomTooltip placement="topLeft" title={item?.expiryDate} > {item?.expiryDate ? item?.expiryDate : "_"}</CustomTooltip>
                  </td>

                  <td className="tb-text tb-mw-150 px-1" >
                    <div className='d-flex' >
                      <IconBox
                        type="text"
                        icon={<FiEdit2 />}
                        loading={false}
                        onClickEvent={displayFullView.bind('', item)}
                      />

                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete ?"
                        onConfirm={callDelete.bind('', item)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className='bg-transparent border-0' >
                          <IconBox
                            type="text"
                            icon={<FaTrash color="#673275" />}
                            loading={false}
                            onClickEvent={() => { }}
                          />
                        </button>
                      </Popconfirm>

                      {!isEmpty(item?.uploadCertificate) &&
                        <FileTileBtn fileName={item?.uploadCertificate} />
                      }

                    </div>
                  </td>
                </tr>

              )
            })}

          </tbody>
        </table>
      </div>

      {rowToUpdate !== null ?
        <Suspense fallback={`Loading...`}>
          <VaultUpdate
            modalBool={rowToUpdate}
            setModal={setRowToUpdate}
            company={company}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : null}

    </>
  );
}

export default VaultTable;
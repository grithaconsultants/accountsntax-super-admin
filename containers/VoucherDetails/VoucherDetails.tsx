import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomTooltip from '@/component/tooltip/tooltip';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import EmptyComp from '@/component/emptycomp/emptycomp';

import { back } from '@/utils/image';

import { durationType, durationFilter, selectedDurationFilter } from '@/utils/constants';
import { getSelectedCompanyId, durationFilterHelper, isEmpty, removeDateRest, decimalTwo } from '@/utils/helper';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "VoucherDetails: ";
const VoucherDetails = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cDataLeft, setcDataLeft] = useState<any>(null);

  function fallbackModal() {
    setModal(null);
    setApiData(null);
  }


  useEffect(() => {
    ApicallForData(modalBool);
  }, [0]);

  async function ApicallForData(voucherId: string): Promise<void> {

    setApiData(null);
    setLoading(true);

    const apiUrl = `${endPoints.voucherDetails}/${voucherId}`;

    NetworkOps.makeGetRequest(apiUrl, true)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200) {
          setApiData(response?.data?.data[0] ? response?.data?.data[0] : []);

          setcDataLeft([
            {
              title: 'Date',
              value: removeDateRest(response?.data?.data[0]?.date),
            },
            {
              title: 'Voucher ID',
              value: response?.data?.data[0]?.guid,
            },
            {
              title: 'Narration',
              value: response?.data?.data[0]?.narration,
            },
          ]);

        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(TAG, ' error i got in catch ', error);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
      });
  }



  // console.log(TAG, ' modal hit with data ', modalBool);
  // console.log(TAG, ' dataList ', apiData);

  return (
    <Modal
      centered
      open={modalBool !== null ? true : false}
      width={1000}
    >

      <div className="modal-wrapper" >

        <div className="m-tlt" >
          <div className="m-tlt-sec" >
            Voucher No: <span className='tx-d'> {apiData?.voucher_number ? apiData?.voucher_number : ""} </span>
            {/* Dated <span className='tx-d' > {apiData?.date ? removeDateRest(apiData?.date) : ""} </span> */}
          </div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        {loading === true ?
          <Loader /> :
          <>

            <div className='mt-4' >
              {/* {cDataLeft !== null ? <InformationCard renderData={cDataLeft} /> : ""} */}
            </div>

            <div className='mt-4' >

              <div className="tx-v ff-r fs-20 mb-3" >Accounting:  {apiData?.date ? removeDateRest(apiData?.date) : ""} </div>
              {apiData?.trn_accountings?.length ?
                <>
                  <table className="table-wrapper"  >
                    <thead>
                      <tr>
                        <th className="ps-4" > Sr. No.</th>
                        <th>Ledger</th>
                        <th>Debit</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.trn_accountings?.map((item: any, index: number) => {

                        const sumDr = apiData?.trn_accountings.reduce((accumulator: any, object: any) => {
                          return accumulator + (object.amount > 0 ? object.amount : 0);
                        }, 0);

                        const sumCr = apiData?.trn_accountings.reduce((accumulator: any, object: any) => {
                          return accumulator + (object.amount < 0 ? object.amount : 0);
                        }, 0);

                        if ((index + 1) == apiData?.trn_accountings.length) {
                          return (
                            <Fragment key={index} >
                              <tr key={index} className='' >

                                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{index + 1} </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  <CustomTooltip placement="topLeft" title={item?.ledger} > {item?.ledger}</CustomTooltip>
                                </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  {/* <CustomTooltip placement="topLeft" title={item?.amount < 0 ? item?.amount : ""} > */}
                                  {decimalTwo(item?.amount < 0 ? (item?.amount * -1) : "")}
                                  {/* </CustomTooltip> */}
                                </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  {/* <CustomTooltip placement="topLeft" title={item?.amount > 0 ? item?.amount : ""} > */}
                                  {decimalTwo(item?.amount > 0 ? item?.amount : "")}
                                  {/* </CustomTooltip> */}
                                </td>

                              </tr>

                              <tr key={index + 1} className='bg-o'  >

                                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " ></td>

                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m " >Total</td>

                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
                                  <CustomTooltip placement="topLeft" title={decimalTwo(sumCr * -1)} > {decimalTwo(sumCr * -1)}</CustomTooltip>
                                </td>

                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
                                  <CustomTooltip placement="topLeft" title={decimalTwo(sumDr)} > {decimalTwo(sumDr)}</CustomTooltip>
                                </td>

                              </tr>
                            </Fragment>
                          );
                        } else {
                          return (
                            <tr key={index} >

                              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{index + 1} </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                <CustomTooltip placement="topLeft" title={item?.ledger} > {item?.ledger}</CustomTooltip>
                              </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                {/* <CustomTooltip placement="topLeft" title={item?.amount < 0 ? item?.amount : ""} > */}
                                {decimalTwo(item?.amount < 0 ? (item?.amount * -1) : "")}
                                {/* </CustomTooltip> */}
                              </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                {/* <CustomTooltip placement="topLeft" title={item?.amount > 0 ? item?.amount : ""} > */}
                                {decimalTwo(item?.amount > 0 ? item?.amount : "")}
                                {/* </CustomTooltip> */}
                              </td>

                            </tr>
                          );
                        }

                      })}
                    </tbody>
                  </table>
                </>
                :
                <EmptyComp />
              }


            </div>

            <div className='mt-4' >

              <div className="tx-v ff-r fs-20 mb-3" >Inventory</div>
              {apiData?.trn_inventories?.length ?
                <>
                  <table className="table-wrapper" >
                    <thead>
                      <tr>
                        <th className="ps-4" > Sr. No.</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData?.trn_inventories?.map((item: any, index: number) => {

                        if ((index + 1) == apiData?.trn_inventories.length) {

                          const sumOfQuantity = apiData?.trn_inventories.reduce((accumulator: any, object: any) => {
                            return accumulator + (object.quantity > 0 ? object.quantity : (object.quantity * -1));
                          }, 0);

                          const sumOfAmount = apiData?.trn_inventories.reduce((accumulator: any, object: any) => {
                            return accumulator + object.amount;
                          }, 0);

                          return (
                            <Fragment key={index} >
                              <tr key={index} >

                                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{index + 1} </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  <CustomTooltip placement="topLeft" title={item?.item} > {item?.item}</CustomTooltip>
                                </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  {/* <CustomTooltip placement="topLeft" title={(item?.quantity > 0 ? item?.quantity : (item?.quantity * -1))} > */}
                                  {item?.quantity > 0 ? item?.quantity : (item?.quantity * -1)}
                                  {/* </CustomTooltip> */}
                                </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  <CustomTooltip placement="topLeft" title={item?.rate} > {item?.rate}</CustomTooltip>
                                </td>

                                <td className="tb-text tb-mw-150 px-1" >
                                  {/* <CustomTooltip placement="topLeft" title={(item?.amount > 0 ? item?.amount : (item?.amount * -1))} > */}
                                  {decimalTwo(item?.amount > 0 ? item?.amount : (item?.amount * -1))}
                                  {/* </CustomTooltip> */}
                                </td>
                              </tr>

                              <tr key={index + 587} className='bg-o' >

                                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " ></td>


                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m " >Total</td>

                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
                                  <CustomTooltip placement="topLeft" title={sumOfQuantity} > {sumOfQuantity}</CustomTooltip>
                                </td>

                                <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " ></td>

                                <td className="tb-text tb-mw-150 px-1 tx-w ff-m" >
                                  <CustomTooltip placement="topLeft" title={decimalTwo(sumOfAmount)} > {decimalTwo(sumOfAmount)}</CustomTooltip>
                                </td>

                              </tr>

                            </Fragment>
                          );
                        } else {
                          return (
                            <tr key={index} >

                              <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{index + 1} </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                <CustomTooltip placement="topLeft" title={item?.item} > {item?.item}</CustomTooltip>
                              </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                <CustomTooltip placement="topLeft" title={(item?.quantity > 0 ? item?.quantity : (item?.quantity * -1))} > {(item?.quantity > 0 ? item?.quantity : (item?.quantity * -1))}</CustomTooltip>
                              </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                <CustomTooltip placement="topLeft" title={item?.rate} > {item?.rate}</CustomTooltip>
                              </td>

                              <td className="tb-text tb-mw-150 px-1" >
                                {/* <CustomTooltip placement="topLeft" title={(item?.amount > 0 ? item?.amount : (item?.amount * -1))} > */}
                                {decimalTwo(item?.amount > 0 ? item?.amount : (item?.amount * -1))}
                                {/* </CustomTooltip> */}
                              </td>
                            </tr>
                          );
                        }

                      })}
                    </tbody>
                  </table>
                </>
                :
                <EmptyComp />
              }
            </div>

            <div className='mt-4' >
              <div className="tx-v ff-r fs-20 mb-3" >Narration</div>
              <div className=' bg-white p-2 border br-5' >
                <p className='m-0' style={{ minHeight: "50px" }} > {apiData?.narration} </p>
                {/* <p className='m-0' >
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                </p> */}
              </div>
            </div>


          </>
        }

      </div>
    </Modal>
  );
}

export default VoucherDetails;
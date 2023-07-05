import React from 'react';
import { Modal } from 'antd';
import CustomTooltip from '@/component/tooltip/tooltip';

import IconButton from '@/component/iconbutton/iconbutton';
import { back } from '@/utils/image';

const TAG = "ReceiptExpenses: ";
const ReceiptExpenses = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;

  function fallbackModal() {
    setModal(null);
  }

  // console.log(TAG, ' modal bool ', modalBool);

  return (
    <Modal
      centered
      open={modalBool !== null ? true : false}
      width={1000}
    >
      <div className="modal-wrapper" >

        <div className="m-tlt" >
          <div className="m-tlt-sec" >Expense Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <div className='mt-4' >

          <table className="table-wrapper" >
            <thead>
              <tr>
                <th className="ps-4" > Sr. No.</th>
                <th>Name</th>
            <th>Amount (₹)</th>
                <th>Bill Type</th>
              </tr>
            </thead>
            <tbody>
              {modalBool.trn_vouchers.trn_bills.map((item: any, index: number) => {
                return (
                  <tr key={index} >

                    <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4 " >{index + 1} </td>
                    {/* <td className="tb-text tb-mw-150 px-1 tb-w-max ps-4" >{SrPageNumber(defaultCurrent, index)} </td> */}

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={item?.name} > {item?.name}</CustomTooltip>
                    </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={item?.amount} > {item?.amount}</CustomTooltip>
                    </td>

                    <td className="tb-text tb-mw-150 px-1" >
                      <CustomTooltip placement="topLeft" title={item?.billtype} > {item?.billtype}</CustomTooltip>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

      </div>
    </Modal>
  );
}

export default ReceiptExpenses;
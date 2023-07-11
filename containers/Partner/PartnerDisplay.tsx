import React, { useState } from 'react';
import { Modal } from 'antd';

import IconButton from '@/component/iconbutton/iconbutton';
import InformationCard from '@/component/informationcard/InformationCard';

import { back } from '@/utils/image';
import { isEmpty, toddmmyy, removeFilePath } from '@/utils/helper';

const TAG = "PartnerDisplay: ";
const PartnerDisplay = (props: any) => {

  const { modalBool, setModal, company, setReFetchAction } = props;

  const fallbackModal = () => {
    setModal(false);
  }

  const prop: any = [
    {
      title: '_id', value: modalBool?._id ? modalBool?._id : "_"
    },
    {
      title: 'Name', value: modalBool?.name ? modalBool?.name : "_"
    },
    {
      title: 'Address Line 1', value: modalBool?.address?.addLine1 ? modalBool?.address?.addLine1 : "_"
    },
    {
      title: 'Address Line 2', value: modalBool?.address?.addLine2 ? modalBool?.address?.addLine2 : "_"
    },
    {
      title: 'Pincode', value: modalBool?.address?.pincode ? modalBool?.address?.pincode : "_"
    },
    {
      title: 'City', value: modalBool?.address?.city ? modalBool?.address?.city : "_"
    },
    {
      title: 'State', value: modalBool?.address?.state ? modalBool?.address?.state : "_"
    },
    {
      title: 'Country', value: modalBool?.address?.country ? modalBool?.address?.country : "_"
    },
    {
      title: 'DOB', value: modalBool?.dob ? toddmmyy(modalBool?.dob) : "_"
    },
    {
      title: 'Email', value: modalBool?.email ? modalBool?.email : "_"
    },
    {
      title: 'Contact Number', value: modalBool?.mobile ? modalBool?.mobile : "_"
    },
    {
      title: 'PAB', value: modalBool?.pan?.panNo ? modalBool?.pan?.panNo : "_"
    },
    {
      title: 'DIN', value: modalBool?.din?.dinNo ? modalBool?.din?.dinNo : "_"
    },
    {
      title: 'Aadhaar', value: modalBool?.aadhaar?.aadhaarNo ? modalBool?.aadhaar?.aadhaarNo : "_"
    },
    {
      title: 'Digital Signature Password', value: modalBool?.digitalSignature?.password ? modalBool?.digitalSignature?.password : "_"
    },
    {
      title: 'Digital Signature Expiry Date', value: modalBool?.digitalSignature?.expiryDate ? toddmmyy(modalBool?.digitalSignature?.expiryDate) : "_"
    },

  ];

  if (!isEmpty(modalBool?.photo)) {
    prop.push({
      file: true, title: 'Profile Picture', value: modalBool?.photo
    })
  }

  if (!isEmpty(modalBool?.pan?.panCard)) {
    prop.push({
      file: true, title: 'PAN File', value: modalBool?.pan?.panCard
    })
  }
  
  if (!isEmpty(modalBool?.din?.din)) {
    prop.push({
      file: true, title: 'DIN File', value: modalBool?.din?.din
    })
  }

  if (!isEmpty(modalBool?.aadhaar?.aadhaarCard)) {
    prop.push({
      file: true, title: 'Aadhaar File', value: modalBool?.aadhaar?.aadhaarCard
    })
  }

  // console.log(TAG + " partner display called with ", modalBool);

  return (
    <Modal
      centered
      open={modalBool}
      width={1000}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec" >Partner Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        <InformationCard renderData={prop} />

      </div>
    </Modal>
  );
}

export default PartnerDisplay;
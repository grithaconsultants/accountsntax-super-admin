import React from "react";
import Link from 'next/link';

import { tally } from '@/utils/image';
import TagCustom from "@/component/tags/tags";
import { ICAiOutlineCloudServer } from "@/utils/icons";

const TallyCloudCard = (props: any) => {
  const { seTOCModal, tallyOnCloud, totalTOCuser, noOfDays } = props;

  function openTocModal() {
    seTOCModal(true);
  }

  return (
    <div className='bg-lo br-5 oh bx-11 p-3' >

      <div className='d-flex justify-content-between' >
        <div className='icon-wrapper d-flex justify-content-center fs-26 TX-V' >
          <ICAiOutlineCloudServer />
        </div>
        <div className='title fs-20 tx-o ff-m' >{totalTOCuser}</div>
      </div>

      <div className='d-flex justify-content-between' >
        <div className='fs-18 tx-v ff-m mt-5 text-decoration-underline' >
          <Link href="" onClick={openTocModal}> TallyCLoud </Link>
        </div>

        <div className='d-flex align-items-end justify-content-end fs-20 ff-m tx-o'>
          {tallyOnCloud ? <TagCustom classNames='mie' color="green" title="Active" /> : <TagCustom classNames='mie' color="volcano" title="Inactive" />}
        </div>

      </div>

    </div>
  )
}

export default TallyCloudCard;
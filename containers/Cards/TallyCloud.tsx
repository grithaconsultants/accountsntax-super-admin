import React from "react";
import Image from 'next/image';
import Link from 'next/link';

import { tally } from '@/utils/image';
import TagCustom from "@/component/tags/tags";

const TallyCloud = (props: any) => {
  const { seTocModal, tallyOnCloud } = props;

  function openTocModal(){
    seTocModal(true);
  }
  
  return (
    <div className='bg-lo br-5 oh bx-11 p-3' >
      <div className='d-flex justify-content-between' >
        <div className='icon-wrapper' >
          <Image src={tally} alt="receivable" width={25} height={25} />
        </div>
        <div className='title fs-20 tx-o ms-3 ff-m' >{tallyOnCloud ? <TagCustom color="green" title="Active" /> : <TagCustom color="volcano" title="Inactive" />}</div>
      </div>
      <div className='fs-18 tx-v ff-m mt-5' >
        <Link href="" onClick={openTocModal}> TallyCLoud </Link>
      </div>
    </div>
  )
}

export default TallyCloud;
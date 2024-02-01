import React from "react";
import Image from 'next/image';
import Link from 'next/link';

import { tally } from '@/utils/image';
import { ICIoBusinessOutline } from "@/utils/icons";

const CompaniesCard = (props : any ) => {
  const { noOfCompanies, totalCompanies } = props;
	return(
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper d-flex justify-content-center fs-26' >
					<ICIoBusinessOutline/>
				</div>
				<div className='title fs-20 tx-o ms-3 ff-m' >{`${noOfCompanies}/${totalCompanies}`}</div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 ' >
				<Link href="" > Companies </Link>
			</div>
		</div>
	)
}

export default CompaniesCard;
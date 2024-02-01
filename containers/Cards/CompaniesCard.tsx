import React from "react";
import Image from 'next/image';
import Link from 'next/link';

import { users } from '@/utils/image';

const CompaniesCard = (props : any ) => {
  const { companiesData } = props;
	return(
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper' >
					<Image src={users} alt="receivable" width={25} height={25} />
				</div>
				<div className='title fs-20 tx-o ms-3 ff-m' >{`${companiesData.length > 0 ? companiesData.length : 0}/10` }</div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 ' >
				<Link href="" > Companies </Link>
			</div>
		</div>
	)
}

export default CompaniesCard;
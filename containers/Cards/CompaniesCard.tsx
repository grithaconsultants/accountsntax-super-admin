import React from "react";
import Link from 'next/link';

import { ICIoBusinessOutline } from "@/utils/icons";

const CompaniesCard = (props: any) => {
	const { noOfCompanies } = props;
	return (
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper d-flex justify-content-center fs-26' >
					<ICIoBusinessOutline />
				</div>
				<div className='title fs-20 tx-o ms-3 ff-m' >{noOfCompanies}</div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 text-decoration-underline' >
				<Link href="/clients/details/companies" > Companies </Link>
			</div>
		</div>
	)
}

export default CompaniesCard;
import React from "react";
import Link from 'next/link';

import { ICHiOutlineCurrencyRupee } from "@/utils/icons";

const SubscriptionCard = (props: any) => {
	const { totalRemainingDays, setSubscriptionModal } = props;

	function openSubscriptionModal() {
    setSubscriptionModal(true);
  }

	return (
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper d-flex justify-content-center fs-26' >
					<ICHiOutlineCurrencyRupee />
				</div>
				<div className='title fs-20 tx-o ms-3 ff-m' > {totalRemainingDays} </div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 text-decoration-underline' >
				<Link href="" onClick={openSubscriptionModal} > Subscription </Link>
			</div>
		</div>
	)
}

export default SubscriptionCard;
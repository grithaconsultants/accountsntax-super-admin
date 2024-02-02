import React from "react";
import Link from 'next/link';

import { ICAiOutlineTeam } from "@/utils/icons";

const UserCard = (props: any) => {
	const { totalUsers, noOfUsers } = props;
	return (
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper d-flex justify-content-center fs-26' >
					<ICAiOutlineTeam />
				</div>
				<div className='title fs-20 tx-o ff-m' >{`${noOfUsers}/${totalUsers}`}</div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 text-decoration-underline' >
				<Link href="/clients/details/users" > Users </Link>
			</div>
		</div>
	)
}

export default UserCard;
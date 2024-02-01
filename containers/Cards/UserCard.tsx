import React from "react";
import Image from 'next/image';
import Link from 'next/link';

import { users } from '@/utils/image';
import { ICAiOutlineTeam } from "@/utils/icons";
import IconBox from "@/component/iconbox/iconbox";

const UserCard = (props : any) => {
	const { totalUsers, noOfUsers } = props;
	return (
		<div className='bg-lo br-5 oh bx-11 p-3' >
			<div className='d-flex justify-content-between' >
				<div className='icon-wrapper d-flex justify-content-center fs-26' >
					<ICAiOutlineTeam/>
					{/* <IconBox
						icon={<ICAiOutlineTeam/>}
					/>				 */}
					{/* <Image src={<ICAiOutlineTeam/>} alt="receivable" width={25} height={25} /> */}
				</div>
				<div className='title fs-20 tx-o ff-m' >{ `${noOfUsers}/${totalUsers}`}</div>
			</div>
			<div className='fs-18 tx-v ff-m mt-5 ' >
				<Link href="/clients/details/users" > Users </Link>
			</div>
		</div>
	)
}

export default UserCard;
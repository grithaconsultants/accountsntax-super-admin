import React from 'react';
import { Progress } from 'antd';

const ProgressBar = (props: any) => {

	const { status, percent, showInfo = true, strokeColor = "#673275", title, data } = props;

	// status = success exception normal active

	return (
		<div className="" >
			<div className="d-flex justify-content-between " >
				<div className="fs-16 ff-m tx-d" >{title}</div>
				<div className="fs-16 ff-m tx-d" >{data}</div>
			</div>
			<Progress
				percent={percent}
				status={status}
				showInfo={showInfo}
				strokeColor={strokeColor}
			/>
		</div>
	);
}

export default ProgressBar;
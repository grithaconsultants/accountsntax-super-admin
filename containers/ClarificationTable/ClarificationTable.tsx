import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Image from 'next/image';


// const UpdateDWHClientConn = dynamic(() => import('../UpdateDWHClientConn/UpdateDWHClientConn'), { suspense: true });
import CustomTooltip from '@/component/tooltip/tooltip';
import { upar, downar, uparin, downarin } from '@/utils/image';

const TAG = "ClarificationTable: ";

const ClarificationTable = (props: any) => {

	//const { rowsDataList } = props;

	return (
		<>
			<table className="table-wrapper" >
				<thead>
					<tr>
						<th className="ps-4" > Sr No.</th>
						<th>Initiator Name</th>
						<th>Particulars</th>
						<th>Date/Time</th>
					</tr>
				</thead>
				<tbody>


					<tr>
						<td className="tb-text tb-mw-150 pe-1 ps-4" >1</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="Rakesh Sharma" > Rakesh Sharma</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1 tb-w-max" >
							<CustomTooltip placement="topLeft" title="1" > 1</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="25/05/2023, 5:30PM" > 25/05/2023, 5:30PM</CustomTooltip>
						</td>
					</tr>

					<tr>
						<td className="tb-text tb-mw-150 pe-1 ps-4" >2</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="Priya Chatterjee" > Priya Chatterjee</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1 tb-w-max" >
							<CustomTooltip placement="topLeft" title="3" > 3</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="25/05/2023, 5:30PM" > 25/05/2023, 5:30PM</CustomTooltip>
						</td>
					</tr>

					<tr>
						<td className="tb-text tb-mw-150 pe-1 ps-4" >1</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="Rakesh Sharma" > Rakesh Sharma</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1 tb-w-max" >
							<CustomTooltip placement="topLeft" title="1" > 1</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="25/05/2023, 5:30PM" > 25/05/2023, 5:30PM</CustomTooltip>
						</td>
					</tr>

					<tr>
						<td className="tb-text tb-mw-150 pe-1 ps-4" >1</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="Rakesh Sharma" > Rakesh Sharma</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1 tb-w-max" >
							<CustomTooltip placement="topLeft" title="1" > 1</CustomTooltip>
						</td>
						<td className="tb-text tb-mw-150 px-1" >
							<CustomTooltip placement="topLeft" title="25/05/2023, 5:30PM" > 25/05/2023, 5:30PM</CustomTooltip>
						</td>
					</tr>

				</tbody>
			</table>

		</>
	);
}

export default ClarificationTable;
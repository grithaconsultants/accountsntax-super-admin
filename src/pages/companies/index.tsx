import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import HomeLayout from '@/containers/Layout/Layout';

import CustomTooltip from '@/component/tooltip/tooltip';
import IconTitleButton from '@/component/icontitlebutton/icontitlebutton';
import DateRange from '@/component/daterange/daterange';
import IconButton from '@/component/iconbutton/iconbutton';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { mike, add, uploadIcon, receivable, filterIcon, back } from '@/utils/image';

const Companies = () => {

  return (
		<HomeLayout>

			<section id="contentSection">
				<div className="layout-contWrapper" >

					<div className="layout-cardArea" >

						<div className="bu-section" >

							<div className="bu-body px-3" >

								<div className='' >
									{/* <div className='d-flex justify-content-between align-items-end' >
										<div className="" >
											<div className="fs-20 tx-v ff-m " > Invoicing Data </div>
											<div className="fs-12 tx-b ff-r " > Last tally Updated: 29 Dec 2022 </div>
										</div>
										<div className='d-flex align-items-end' >
											<div className="input-con" > <DateRange /></div>
											<div className="ms-3" >
												<IconTitleButton imgSrc={filterIcon} title="Filter" />
											</div>
										</div>
									</div> */}

									<div className="table-wrapper mt-5 " >
										<table className="" >
											<thead>
												<tr>
													<th className="ps-4" >Sr. No</th>
													<th>Name</th>
													<th>Type</th>
													<th>Add Comment</th>
													<th>Add Voice Note</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="ps-4 tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="23453" > 23453</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="24 dec all" > 24 dec all</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice" >  Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1 tb-w-max" >
														<CustomTooltip placement="topLeft" title="Comment here Comment hereComment hereComment here" > Comment here Comment hereComment hereComment here</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Voice Note" >
															<Image src={mike} alt="mike icon" width={24} height={24} />
														</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="Delete" > Delete</CustomTooltip>
													</td>
												</tr>

												<tr>
													<td className="ps-4 tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="23453" > 23453</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="24 dec all" > 24 dec all</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice" >  Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1 tb-w-max" >
														<CustomTooltip placement="topLeft" title="Comment here Comment hereComment hereComment here" > Comment here Comment hereComment hereComment here</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Voice Note" >
															<Image src={mike} alt="mike icon" width={24} height={24} />
														</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="Delete" > Delete</CustomTooltip>
													</td>
												</tr>

												<tr>
													<td className="ps-4 tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="23453" > 23453</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="24 dec all" > 24 dec all</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice" >  Sales Invoice  Sales Invoice  Sales Invoice Sales InvoiceSales Invoice</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1 tb-w-max" >
														<CustomTooltip placement="topLeft" title="Comment here Comment hereComment hereComment here" > Comment here Comment hereComment hereComment here</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150 px-1" >
														<CustomTooltip placement="topLeft" title="Voice Note" >
															<Image src={mike} alt="mike icon" width={24} height={24} />
														</CustomTooltip>
													</td>
													<td className="tb-text tb-mw-150" >
														<CustomTooltip placement="topLeft" title="Delete" > Delete</CustomTooltip>
													</td>
												</tr>

											</tbody>
										</table>
									</div>

								</div>

							</div>

						</div>

					</div>


				</div>
			</section>

		</HomeLayout>
	);
}

export default Companies;
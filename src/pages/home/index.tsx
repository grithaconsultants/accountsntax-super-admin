import React, { useState } from 'react';
import Image from 'next/image';

import { Col, Row, Tabs } from 'antd';
import type { TabsProps } from 'antd';


import HomeLayout from '@/containers/Layout/Layout';

import CustomTooltip from '@/component/tooltip/tooltip';
import DatePickerComp from '@/component/datepicker/datepicker';
import Breadcrumb from '@/component/breadcrumb/breadcrumb';
import CardHeader from '@/component/cardHeader/cardHeader';
import DueDateCard from '@/component/DueDateCard/DueDateCard';
import ThemeButton from '@/component/button/button';

import { account, due, report, petty, gst, pdf, excel, income_tax, tds, icegate, services, calendar } from '@/utils/image';

const TAG = "Home: ";

const Home = () => {

  const [sidebarStatus, setSide] = useState<string>("none");

  return (
    <>
      <HomeLayout>

        <section id="contentSection">
          <div className="layout-contWrapper" >
            {/* <Breadcrumb /> */}

            <div className="layout-cardArea" >

              {/* account and due date */}
              <Row>
                {/* <Col className="gutter-row pe-xl-2 pe-0" xs={24} lg={24} xl={12} >

                  <div className="card-custom ">
                    <CardHeader title="Accounting" imgSrc={account} />
                    <div className="cardBody px-3 mt-0 pb-4"> */}

                      {/* <Tabs defaultActiveKey="1" items={items} /> */}

                    {/* </div>
                  </div>

                  <div className="mt-3">
                    <div className="card-custom ">
                      <CardHeader title="Reports" imgSrc={report} />
                      <div className="cardBody px-3 mt-0 pb-4 pt-4">

                        <div className="d-md-flex d-block p-0" >
                          <div className="col-md-6 col-12 ps-0 pe-md-2 pe-0" >
                            <div className="w-100 text-center bg-white " >

                              <div className="rep-card">

                                <div className=" rep-card-header p-2 ">
                                  <div className=" d-flex align-items-center  ">
                                    <div className="iconBox" >
                                      <Image src={gst} alt="gst icon" width={24} height={24}  />
                                    </div>
                                    <div className="rep-card-title ms-1" >GST</div>
                                  </div>
                                  <div className="  ">
                                    <DatePickerComp />
                                  </div>
                                </div>

                                <div className="rep-card-body" >

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Credit Ledger" > Credit Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="GSTR 2A" > GSTR 2A </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                </div>

                                <div className="rep-card-footer d-flex pb-3 px-2" >
                                  <div className="me-2">
                                    <ThemeButton type="btn-theme-color" title="Clarification" />
                                  </div>
                                  <div>
                                    <ThemeButton type="btn-theme-tr" title="File Return" />
                                  </div>
                                </div>

                              </div>

                            </div>
                          </div>

                          <div className="col-md-6 col-12 pe-0 ps-md-2 ps-0 mt-3 mt-md-0" >
                            <div className="w-100 text-center bg-white " >

                              <div className="rep-card">

                                <div className=" rep-card-header p-2 ">
                                  <div className=" d-flex align-items-center  ">
                                    <div className="iconBox" >
                                      <Image src={income_tax} alt="gst icon" width={24} height={24}  />
                                    </div>
                                    <div className="rep-card-title ms-1" >Income Tax</div>
                                  </div>
                                  <div className="  ">
                                    <DatePickerComp />
                                  </div>
                                </div>

                                <div className="rep-card-body" >

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="26S" > 26S </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="AIS" > AIS </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="TIS" > TIS </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                </div>

                                <div className="rep-card-footer d-flex pb-3 px-2" >
                                  <div className="me-2">
                                    <ThemeButton type="btn-theme-color" title="Clarification" />
                                  </div>
                                  <div>
                                    <ThemeButton type="btn-theme-tr" title="File Return" />
                                  </div>
                                </div>

                              </div>

                            </div>
                          </div>

                        </div>

                        <div className="d-md-flex d-block p-0 mt-3" >

                          <div className="col-md-6 col-12 ps-0 pe-md-2 pe-0" >
                            <div className="w-100 text-center bg-white " >

                              <div className="rep-card">

                                <div className=" rep-card-header p-2 ">
                                  <div className=" d-flex align-items-center  ">
                                    <div className="iconBox" >
                                      <Image src={tds} alt="gst icon" width={24} height={24}  />
                                    </div>
                                    <div className="rep-card-title ms-1" >TDS</div>
                                  </div>
                                  <div className="  ">
                                    <DatePickerComp />
                                  </div>
                                </div>

                                <div className="rep-card-body" >

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                </div>

                                <div className="rep-card-footer d-flex pb-3 px-2" >
                                  <div className="me-2">
                                    <ThemeButton type="btn-theme-color" title="Clarification" />
                                  </div>
                                  <div>
                                    <ThemeButton type="btn-theme-tr" title="File Return" />
                                  </div>
                                </div>

                              </div>

                            </div>
                          </div>

                          <div className="col-md-6 col-12 pe-0 ps-md-2 ps-0 mt-3 mt-md-0" >

                            <div className="w-100 text-center bg-white " >

                              <div className="rep-card">

                                <div className=" rep-card-header p-2 ">
                                  <div className=" d-flex align-items-center  ">
                                    <div className="iconBox" >
                                      <Image src={icegate} alt="gst icon" width={24} height={24}  />
                                    </div>
                                    <div className="rep-card-title ms-1" >Icegate</div>
                                  </div>
                                  <div className="  ">
                                    <DatePickerComp />
                                  </div>
                                </div>

                                <div className="rep-card-body" >

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item border-bottom-c d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                  <div className="rep-item d-flex align-items-center py-3 px-2 justify-content-between  ">
                                    <div className="rep-item-tlt">
                                      <CustomTooltip title="Cash Ledger" > Cash Ledger </CustomTooltip>
                                    </div>
                                    <div className="rep-item-img d-flex ">
                                      <CustomTooltip title="Download PDF" >
                                        <div className="iconBox me-1" >
                                          <Image src={pdf} alt="pdf icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                      <CustomTooltip title="Download Excel" >
                                        <div className="iconBox ms-1" >
                                          <Image src={excel} alt="excel icon" width={24} height={24}  />
                                        </div>
                                      </CustomTooltip>
                                    </div>
                                  </div>

                                </div>

                                <div className="rep-card-footer d-flex pb-3 px-2" >
                                  <div className="me-2">
                                    <ThemeButton type="btn-theme-color" title="Clarification" />
                                  </div>
                                  <div>
                                    <ThemeButton type="btn-theme-tr" title="File Return" />
                                  </div>
                                </div>

                              </div>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="card-custom ">
                      <CardHeader title="Quick Links" imgSrc={calendar} />
                      <div className="cardBody px-3 mt-0 pb-4">

                        {/* <QuickLinks /> */}

                      {/* </div>
                    </div>
                  </div>

                </Col>

                <Col className="gutter-row ps-xl-2 ps-0 mt-xl-0 mt-3" xs={24} lg={24} xl={12} >

                  <div className="card-custom ">
                    <CardHeader title="Due Dates" imgSrc={due} />
                    <div className="cardBody due-card px-3 pb-4">

                      <div className=" mt-4" >
                        <DueDateCard title="GST Return For month Jan 2023" date="20 Jan 2023" status="Upcoming" type="date-red" />
                      </div>

                      <div className=" mt-4" >
                        <DueDateCard title="GST Return For month Jan 2023" date="20 Jan 2023" status="Upcoming" type="date-orange" />
                      </div>

                      <div className=" mt-4" >
                        <DueDateCard title="GST Return For month Jan 2023" date="20 Jan 2023" status="Upcoming" type="date-green" />
                      </div>

                      <div className=" mt-4" >
                        <DueDateCard title="GST Return For month Jan 2023" date="20 Jan 2023" status="Upcoming" type="date-voilet" />
                      </div>

                      <div className=" mt-4" >
                        <DueDateCard title="GST Return For month Jan 2023" date="20 Jan 2023" status="Upcoming" type="date-voilet" />
                      </div>

                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="card-custom ">
                      <CardHeader title="Petty cash" imgSrc={petty} />
                      <div className="cardBody px-3 pb-4">  */}

                        {/* <PettyCash /> */}

                      {/* </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="card-custom ">
                      <CardHeader title="Services" imgSrc={services} />
                      <div className="cardBody px-3 pb-4"> */}
                        {/* <ServicesCard /> */}
                      {/* </div>
                    </div>
                  </div>

                </Col> */}

              </Row>

            </div>

          </div>
        </section>

      </HomeLayout>
    </>
  );
}


export default Home;
import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Col, Row, Tabs } from 'antd';

// const BasicPieChart = dynamic(() => import('@/component/basicpie/basicpie'), { suspense: true });
// const DueDateTime = dynamic(() => import('@/component/calendar/calendar'), { suspense: true });

import HomeLayout from '@/containers/Layout/Layout';
import Activities from '@/containers/ActivitiesTable/ActivitiesTable';
import Subscription from '@/containers/Subscription/Subscription';

import CustomTooltip from '@/component/tooltip/tooltip';
import Breadcrumb from '@/component/breadcrumb/breadcrumb';
import CardHeader from '@/component/cardHeader/cardHeader';
import ThemeButton from '@/component/button/button';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { account, due, report, petty, gst, pdf, excel, income_tax, tds, icegate, services, calendar, userIcon, clients, buildingIcon, singleusericon } from '@/utils/image';

const TAG = "Home: ";

const Home = () => {

  const [sidebarStatus, setSide] = useState<string>("none");
  const [callNum, setCallNum] = useState<number>(0);

  setTimeout(() => {
    setCallNum(1);
  }, 1500);

  console.log('got called ', callNum);

  return (
    <>
      <HomeLayout>

        <section id="contentSection">
          <div className="layout-contWrapper" >
            <Breadcrumb />

            <div className="layout-cardArea" >

              <div className="row admin-details gx-4 mb-4" >

                <div className="col-xl-3 col-md-3 col-sm-6 col-12 " >
                  <div className="info-card-wrapper p-3 br-10 oh" >
                    <div className="d-flex justify-content-between " >
                      <div className="" >
                        <Image src={userIcon} alt="rm icon" width={40} height={40} />
                      </div>
                      <div className="fs-40 ff-m tx-o lh-1" >25</div>
                    </div>
                    <div className="mt-5 tx-v ff-r fs-20 " >Relationship Manager (RM)</div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 col-sm-6 col-12 " >
                  <div className="info-card-wrapper p-3 br-10 oh" >
                    <div className="d-flex justify-content-between " >
                      <div className="" >
                        <Image src={clients} alt="rm icon" width={40} height={40} />
                      </div>
                      <div className="fs-40 ff-m tx-o lh-1" >12</div>
                    </div>
                    <div className="mt-5 tx-v ff-r fs-20 " >Clients</div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 col-sm-6 col-12 " >
                  <div className="info-card-wrapper p-3 br-10 oh" >
                    <div className="d-flex justify-content-between " >
                      <div className="" >
                        <Image src={buildingIcon} alt="rm icon" width={40} height={40} />
                      </div>
                      <div className="fs-40 ff-m tx-o lh-1" >35</div>
                    </div>
                    <div className="mt-5 tx-v ff-r fs-20 " >Company</div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3 col-sm-6 col-12 " >
                  <div className="info-card-wrapper p-3 br-10 oh" >
                    <div className="d-flex justify-content-between " >
                      <div className="" >
                        <Image src={singleusericon} alt="rm icon" width={40} height={40} />
                      </div>
                      <div className="fs-40 ff-m tx-o lh-1" >110</div>
                    </div>
                    <div className="mt-5 tx-v ff-r fs-20 " >Users</div>
                  </div>
                </div>

              </div>


              {/* account and due date */}
              <Row>
                <Col className="gutter-row pe-xl-2 pe-0" xs={24} lg={24} xl={18} >

                  <div className="card-custom ">
                    <CardHeader title="Recent Activities" imgSrc={account} />
                    <div className="cardBody px-3 mt-0 pb-4 mt-4">
                      <Activities rowsDataList="table data" />
                    </div>
                  </div>

                  <div className="card-custom mt-4">
                    <CardHeader title="Due Date" imgSrc={account} />
                    <div className="cardBody px-3 mt-0 pb-4 mt-4">

                      {/* {callNum === 1 ?
                        <Suspense fallback={`Loading...`}>
                          <DueDateTime />
                        </Suspense>
                        : null} */}

                    </div>
                  </div>


                </Col>

                <Col className="gutter-row ps-xl-2 ps-0 mt-xl-0 mt-3" xs={24} lg={24} xl={6} >

                  <div className="card-custom ">
                    <CardHeader title="Subscription" imgSrc={due} />
                    <div className="cardBody due-card px-3 pb-4">
                      <Subscription />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="card-custom ">
                      <CardHeader title="Work Status" imgSrc={petty} />
                      <div className="cardBody px-3 pb-4">
                        {/* {callNum === 1 ?
                          <Suspense fallback={`Loading...`}>
                            <BasicPieChart />
                          </Suspense>
                          : null} */}

                        <div className="mt-2" >
                          <ButtonSimple title="View More" type="voilet" />
                        </div>

                      </div>
                    </div>
                  </div>

                </Col>

              </Row>

              <div className="mb-4" >
                <div className="card-custom ">
                  <CardHeader title="Clarification Table" imgSrc={account} />
                  <div className="cardBody px-3 mt-0 pb-4 mt-4">
                    <Activities rowsDataList="table data" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </HomeLayout>
    </>
  );
}


export default Home;
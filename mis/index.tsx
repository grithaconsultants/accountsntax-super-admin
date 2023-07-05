import React, { Suspense, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import HomeLayout from '@/containers/Layout/Layout';

import IconTitleButton from '@/component/icontitlebutton/icontitlebutton';

import CustomTooltip from '@/component/tooltip/tooltip';
import DateRange from '@/component/daterange/daterange';
import IconButton from '@/component/iconbutton/iconbutton';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import CardHeader from '@/component/cardHeader/cardHeader';
// import DemoColumn from '@/component/columnchart/columnchart';
const UpdateDWHClientConn = dynamic(() => import('@/component/columnchart/columnchart'), { suspense: true });

import { mike, add, uploadIcon, receivable, filterIcon, back, calendar } from '@/utils/image';

const Sales = () => {

  const [reflector, setReflector] = useState(false);

  useEffect(() => {
    setReflector(true);
  }, [0]);

  return (
    <HomeLayout>

      <section id="contentSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >MIS Reports</span>
            </div>
            <div className="br-right" >
              <div className="me-3" >
                <IconTitleButton imgSrc={uploadIcon} title="Upload" />
              </div>
              <div className="me-3" >
                <IconTitleButton imgSrc={add} title="Create" />
              </div>
            </div>

          </div>

          <div className="layout-cardArea" >

            <div className="bu-section" >

              <div className="bu-body px-3 pt-4" >

                <div className='' >
                  <div className='row gx-3 gy-3' >

                    <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                      <div className='bg-white br-5 oh bx-11 p-3 pb-4' >
                        <div className='d-flex' >
                          <div className='icon-wrapper' >
                            <Image src={receivable} alt="receivable" width={32} height={32} />
                          </div>
                          <div className='title fs-20 tx-o ms-3 ff-m' >Liquidity</div>
                        </div>
                        <div className='fs-20 tx-d ff-m mt-3' > ₹ 25,050.00 </div>

                      </div>
                    </div>

                    <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                      <div className='bg-white br-5 oh bx-11 p-3 pb-4' >
                        <div className='d-flex' >
                          <div className='icon-wrapper' >
                            <Image src={receivable} alt="receivable" width={32} height={32} />
                          </div>
                          <div className='title fs-20 tx-o ms-3 ff-m' >Receivable</div>
                        </div>
                        <div className='fs-20 tx-d ff-m mt-3' > ₹ 25,050.00 </div>

                      </div>
                    </div>

                    <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                      <div className='bg-white br-5 oh bx-11 p-3 pb-4' >
                        <div className='d-flex' >
                          <div className='icon-wrapper' >
                            <Image src={receivable} alt="receivable" width={32} height={32} />
                          </div>
                          <div className='title fs-20 tx-o ms-3 ff-m' >Payable</div>
                        </div>
                        <div className='fs-20 tx-d ff-m mt-3' > ₹ 25,050.00 </div>

                      </div>
                    </div>

                    <div className='col-xl-3 col-lg-3 col-md-6 col-12 ' >
                      <div className='bg-white br-5 oh bx-11 p-3 pb-4' >
                        <div className='d-flex' >
                          <div className='icon-wrapper' >
                            <Image src={receivable} alt="receivable" width={32} height={32} />
                          </div>
                          <div className='title fs-20 tx-o ms-3 ff-m' >Sales</div>
                        </div>
                        <div className='fs-20 tx-d ff-m mt-3' > ₹ 25,050.00 </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            <div className="mt-5 row gx-3 gy-2">

              <div className="col-lg-6 ">
                <div className="card-custom ">
                  <CardHeader title="Sales Performance" imgSrc={calendar} />
                  <div className="cardBody bg-white">
                    <div className="p-3 bg-white">
                      {reflector === true &&
                        <Suspense fallback={`Loading...`}>
                          <UpdateDWHClientConn />
                        </Suspense>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 ">
                <div className="card-custom ">
                  <CardHeader title="Sales Performance" imgSrc={calendar} />
                  <div className="cardBody bg-white">
                    <div className="p-3 bg-white">
                      {reflector === true &&
                        <Suspense fallback={`Loading...`}>
                          <UpdateDWHClientConn />
                        </Suspense>
                      }
                    </div>
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

export default Sales;
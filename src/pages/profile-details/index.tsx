import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';

import SalesOp from '@/containers/SalesOp/SalesOp';
import HomeLayout from '@/containers/Layout/Layout';

import CustomTooltip from '@/component/tooltip/tooltip';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { getCompaniesData, getSelectedCompany, getSelectedCompanyData } from '@/utils/helper';

import { companyJPG } from '@/utils/image';

const ProfileDetails = () => {

  const router = useRouter();
  const [company, setCompany] = useState<any>(null);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Customer`,
      children: <SalesOp />,
    },
    {
      key: '2',
      label: `Sales`,
      children: <SalesOp />,
    },
    {
      key: '3',
      label: `Security`,
      children: <SalesOp />,
    }
  ];


  useEffect(() => {
    callDataKeeper();
  }, [0]);


  async function callDataKeeper() {

    const companyData = getCompaniesData();
    const getSelectedC: any = await getSelectedCompany();
    const companiesData = getSelectedCompanyData(getSelectedC._id);
    console.log('companyData ', companyData);
    console.log('getSelectedC ', getSelectedC);
    console.log('companiesData ', companiesData);
    setCompany(companiesData);

  }

  // console.log('company  ', company);


  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >Company Profile Details</span>
            </div>
            <div className="br-right" >
            </div>
          </div>

          <div className="layout-cardArea bg-lo br-10 p-3" >

            <div className="pr-section" >
              <div className="row gx-2 gy-3" >

                <div className="col-xl-3 col-lg-3 col-12 " >

                  <div className="detail-card bg-white " >

                    <div className="py-5 bb-o" >
                      <div className="pic-area" >
                        <Image
                          src={companyJPG}
                          alt="company icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className='text-center fs-20 mt-2 tx-d ' >{company?.name}</p>
                    </div>

                    <div className="detail-area" >
                      <div className="p-3" >

                        <ul className="mx-0 my-0 px-0 pt-0 list-unstyled ">
                          <li className="" >
                            <span className="fs-14 ff-r tx-v" >Pancard</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.pan_card} > {company?.pan_card} </CustomTooltip>
                            </span>
                          </li>
                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >TAN</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.tan} > {company?.tan}</CustomTooltip>
                            </span>
                          </li>
                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Type</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.type} > {company?.type}</CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Number of partners</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.noOfPartners} > {company?.noOfPartners} </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Name as per pancard</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.nameAsPerPan} > {company?.nameAsPerPan} </CustomTooltip>
                            </span>
                          </li>


                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Address</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.address} > {company?.address} </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Admin</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={company?.admin} > {company?.admin} </CustomTooltip>
                            </span>
                          </li>

                        </ul>

                        <div className="mt-5 d-flex justify-content-center" >
                          <ButtonSimple title="Update" type="voilet" disabled={false} onClickEvent={() => router.push('/update-company-profile')} />
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

                <div className="col-xl-9 col-lg-9 col-12  " >

                  <div className=' bg-white br-5 oh p-3' >

                    <div className="header" >
                      <Tabs defaultActiveKey="1" items={items} />
                    </div>

                    <div className="content" >

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

export default ProfileDetails;
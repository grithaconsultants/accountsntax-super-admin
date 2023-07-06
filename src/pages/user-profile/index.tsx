import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useRouter } from 'next/router';

// import SalesOp from '@/containers/SalesOp/SalesOp';
import HomeLayout from '@/containers/Layout/Layout';

import CustomTooltip from '@/component/tooltip/tooltip';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';

import { getUserProfileDetails } from '@/utils/helper';

import { userPNG } from '@/utils/image';

const UserProfileDetails = () => {

  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Customer`,
      // children: <SalesOp />,
    },
    {
      key: '2',
      label: `Sales`,
      // children: <SalesOp />,
    },
    {
      key: '3',
      label: `Security`,
      // children: <SalesOp />,
    }
  ];


  useEffect(() => {
    callDataKeeper();
  }, [0]);


  async function callDataKeeper() {

    const userProfileData = getUserProfileDetails();
    setProfileData(userProfileData);

  }

  // console.log('userProfileData  ', profileData);


  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >User Profile</span>
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
                          src={userPNG}
                          alt="company icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className='text-center fs-20 mt-2 tx-d ' >{`${profileData?.firstName}  ${profileData?.lastName}`}</p>
                    </div>

                    <div className="detail-area" >
                      <div className="p-3" >

                        <ul className="mx-0 my-0 px-0 pt-0 list-unstyled ">
                          <li className="" >
                            <span className="fs-14 ff-r tx-v" >First name</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.firstName} >
                                {profileData?.firstName ? profileData?.firstName : "_"}
                              </CustomTooltip>
                            </span>
                          </li>
                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Last name</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.lastName} >
                                {profileData?.lastName ? profileData?.lastName : "_"}
                              </CustomTooltip>
                            </span>
                          </li>
                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Email</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.email} >
                                {profileData?.email ? profileData?.email : "_"}
                              </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Contact number</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.mobile} >
                                {profileData?.mobile ? profileData?.mobile : "_"}
                              </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Gender</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.gender} > {profileData?.gender ? profileData?.gender : "_"} </CustomTooltip>
                            </span>
                          </li>


                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Address</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.address} >
                                {profileData?.address ? profileData?.address : "_"}
                              </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Admin</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.admin} >
                                {profileData?.admin ? profileData?.admin : "_"}
                              </CustomTooltip>
                            </span>
                          </li>

                          <li className="mt-2" >
                            <span className="fs-14 ff-r tx-v" >Create at</span><br />
                            <span className="fs-12 ff-r tx-d" >
                              <CustomTooltip placement="top" title={profileData?.admin} >
                                {profileData?.createdAt ? profileData?.createdAt : "_"}
                              </CustomTooltip>
                            </span>
                          </li>

                        </ul>

                        <div className="mt-5 d-flex justify-content-center" >
                          <ButtonSimple title="Update" type="voilet" disabled={false} onClickEvent={() => router.push('/update-user-profile')} />
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

export default UserProfileDetails;
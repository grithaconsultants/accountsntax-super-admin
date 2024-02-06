import React, { useState, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import HomeLayout from '@/containers/Layout/Layout';
import ToastComponent from '@/component/Toast/Toast';
import InformationCard from '@/component/informationcard/InformationCard';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import Loader from '@/component/loader/loader';
import CustomTooltip from '@/component/tooltip/tooltip';
import ImageViewer from '@/component/imageviewer/imageviewer';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { ret_ifEmpty, removeDateRest, formateMobileNo, removeplus91, getToken } from '@/utils/helper';

const TAG = "UserProfile : ";

const UserProfileDetails = () => {

  const dispatch = useDispatch();

  const { adminData }: any = useSelector((state: any) => state.adminData);

  const UpdateUserEmail = dynamic(() => import('@/containers/AdminProfile/UpdateAdminEmail'), { suspense: true });
  const ChangePassword = dynamic(() => import('@/containers/AdminProfile/ChangePassword'), { suspense: true });
  const VerifyEmail = dynamic(() => import('@/containers/AdminProfile/VerifyEmail'), { suspense: true });

  const [verifyModal, setVerifyModal] = useState<any>(false);
  const [editEmail, setEditEmail] = useState<any>(false);
  const [passwordEdit, setPasswordEdit] = useState<any>(false);

  const [profileData, setProfileData] = useState<any>(null);
  const [refetchAction, setReFetchAction] = useState<any>(true);

  useEffect(() => {
    if (adminData !== null) {
      const dataToDis = [
        {
          title: 'First Name',
          value: ret_ifEmpty(adminData?.firstName)
        },
        {
          title: 'Last Name',
          value: ret_ifEmpty(adminData?.lastName)
        },
        {
          title: `Email`,
          value: ret_ifEmpty(adminData?.email)
        },
        {
          title: 'Created At',
          value: ret_ifEmpty(removeDateRest(adminData?.createdAt))
        },
      ];

      setProfileData({ userProfileData: adminData, dataToDis: dataToDis });
    }
  }, [adminData]);


  function editEmailPop() {
    setEditEmail(true);
  }


  console.log(' adminData adminData ', adminData);

  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt ps-3" >Admin Profile</span>
            </div>
            <div className="br-right" >
            </div>
          </div>

          <div className="layout-cardArea bg-lo br-10 p-3" >

            {profileData !== null ?
              <div className="pr-section col-12 bg-white p-5" >

                <div className="col-12 p-0 mt-3" >
                  <InformationCard renderData={profileData?.dataToDis} />
                </div>

                <div className="col-12 p-0 d-flex justify-content-end" >
                  <div className="" >
                    <ButtonSimple
                      title="Change Password"
                      type="voilet"
                      disabled={false}
                      onClickEvent={() => setPasswordEdit(true)}
                    />
                  </div>
                </div>

              </div>
              : <Loader />}

          </div>

        </div>
      </section>    

      {passwordEdit == true ?
        <Suspense fallback={`Loading...`}>
          <ChangePassword
            modalBool={passwordEdit}
            setModal={setPasswordEdit}
            setReFetchAction={setReFetchAction}
          />
        </Suspense>
        : <div />}

    </HomeLayout>
  );
}

export default UserProfileDetails;
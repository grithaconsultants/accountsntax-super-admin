import React, { useEffect, useState } from 'react';
import { Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import EmptyComp from '@/component/emptycomp/emptycomp';
import Loader from '@/component/loader/loader';
import ToastComponent from '@/component/Toast/Toast';
import CustomInputNumber from '@/component/inputnumber/inputnumber';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import IconButton from "@/component/iconbutton/iconbutton";
import Informationcard from "@/component/informationcard/InformationsCard";

import { fetchClientDetails } from '@/redux/actions/clientAction';

import { back } from "@/utils/image";
import { ClientsService } from '@/utils/apiCallServices/client.api.services';
import { calcRemainingDays, dateDiffInDays, isEmpty, removeDateRest, ret_ifEmpty } from '@/utils/helper';

const TAG = 'Subscription Modal :';

const SubscriptionModal = (props: any) => {
  const { openModal, setOpenModal } = props;

  const dispatch = useDispatch();
  const { clientsList, metaData, clientID, clientDetails }: any = useSelector((state: any) => state.clientsData);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataToDis, setDataToDis] = useState<any>([]);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [isUpdateSubscription, setIsupdateSubscription] = useState<boolean>(false);
  const [totalUsers, setTotalUsers] = useState<boolean>(true);
  const [licenseId, setLicenseId] = useState<any>(null);

  useEffect(() => {
    if (clientDetails !== null) {

      if (clientDetails?.permissions && clientDetails?.permissions?.length > 0) {

        const filterUserPermission = clientDetails?.permissions.filter((permission: any) => permission.feature == "total_user");
        if (!isEmpty(filterUserPermission)) {
          setTotalUsers(filterUserPermission[0]?.value);
        }
      }

      const subscriptionData = clientDetails?.licenses ? clientDetails?.licenses : null;

      if (subscriptionData !== null) {

        setTotalDays(subscriptionData.period ? Number(subscriptionData?.period) : 0);
        setLicenseId(subscriptionData?.license ? subscriptionData?._id : null);

        const dataToDis = [
          {
            title: 'Subscription ID',
            value: ret_ifEmpty(subscriptionData?.subscription)
          },
          {
            title: 'License ID',
            value: ret_ifEmpty(subscriptionData?.license)
          },
          {
            title: 'Client ID',
            value: ret_ifEmpty(subscriptionData?.client)
          },
          {
            title: 'Tally License No.',
            value: ret_ifEmpty(subscriptionData?.tallyLicense)
          },
          {
            title: 'Created Date',
            value: ret_ifEmpty(removeDateRest(subscriptionData?.createdAt))
          },
          {
            title: 'Start Date',
            value: ret_ifEmpty(removeDateRest(subscriptionData?.startDate))
          },
          {
            title: 'Updated Date',
            value: ret_ifEmpty(removeDateRest(subscriptionData?.updatedAt))
          },
          {
            title: 'Total Days',
            value: ret_ifEmpty(subscriptionData?.period)
          },
          {
            title: 'Remaining Days',
            value: (subscriptionData?.active ? calcRemainingDays(subscriptionData?.startDate, Number(subscriptionData?.period)) : "Subscription has been Expired")
          },

        ]

        setDataToDis(dataToDis);
      }

    }

  }, [clientDetails]);

  function fallback() {
    setOpenModal(false);
  }


  async function upateSubscription(type: any) {
    if (type == 'submit') {
      if (licenseId !== null) {
        const payload = {
          clientID: clientID,
          clientsList: clientsList,
          clientDetails: clientDetails,
          metaData: metaData
        };

        const apiData = {
          period: totalDays,
          users: totalUsers
        };

        setLoading(true);
        const { response, status }: any = await ClientsService.updateLicenseById(licenseId, apiData);
        setLoading(false);

        if (!status) {
          ToastComponent(response?.data?.msg);
          return;
        }

        if (response?.data?.msg == 'Success') {
          fetchClientDetails(dispatch, payload);
        }

      }

      fallback();
      
    } else {
      setIsupdateSubscription(!isUpdateSubscription);
    }
  }

  console.log(TAG, " licenseId ", licenseId);
  console.log(TAG, " totalUsers ", totalUsers);
  console.log(TAG, " totalDays ", totalDays);
  console.log(TAG, " dataToDis ", dataToDis);

  return (
    <Modal
      centered
      open={openModal == true}
      width={900}
    >
      <div className="modal-wrapper" >
        <div className="m-tlt" >
          <div className="m-tlt-sec tx-v" >Subscription Details</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={() => { fallback(); }} /> </div>
        </div>

        <div className="row mt-5 mb-2 bb-o pb-5">
          <div className="col-lg-12 col-12">
            {
              dataToDis.length > 0 ?
                <Informationcard renderData={dataToDis} />
                :
                <EmptyComp />
            }
          </div>
        </div>

        {
          isUpdateSubscription == true ?
          <>
            <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mt-3 p-2'>
              <div className='d-flex justify-content-end w-60'>
                <span>Update Total Number of Days</span>
              </div>
              <div className='d-flex justify-content-start w-40'>
                <CustomInputNumber
                  defaultValue={totalDays}
                  label=""
                  onChangeEvent={(val: any) => { setTotalDays(val); }}
                />
              </div>
            </div>

            <div className='d-flex justify-content-center align-items-center fs-18 ff-m tx-v mb-3 p-2'>
              <div className='d-flex justify-content-end w-60'>
                <span>Update Total Number of Users</span>
              </div>
              <div className='d-flex justify-content-start w-40'>
                <CustomInputNumber
                  defaultValue={totalUsers}
                  label=""
                  onChangeEvent={(val: any) => { setTotalUsers(val); }}
                />
              </div>
            </div>

            <div className="col-12 p-0 d-flex justify-content-center mt-4" >
              <div className="" >
                {loading == false ?
                  <ButtonSimple
                    title="Submit"
                    type="voilet"
                    disabled={false}
                    onClickEvent={() => { upateSubscription('submit'); }}
                  />
                  :
                  <Loader />
                }
              </div>
            </div>
          </>
          :
          <div className="col-12 p-0 d-flex justify-content-center mt-4" >
            <div className="" >
              <ButtonSimple
                title="Update Subscription"
                type="voilet"
                disabled={false}
                onClickEvent={() => { upateSubscription('update'); }}
              />
            </div>
          </div>
        }

      </div>
    </Modal>
  )
}

export default SubscriptionModal;
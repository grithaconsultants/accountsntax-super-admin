import React, { useState } from 'react';
import { Modal } from 'antd';
import OtpInput from 'react18-otp-input';

import IconButton from '@/component/iconbutton/iconbutton';
import CustomInput from '@/component/input/input';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ToastComponent from '@/component/Toast/Toast';
import Loader from '@/component/loader/loader';
import Countdown from '@/component/countdown/countdown';

import { back } from '@/utils/image';

import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "VerifyEmail: ";
const VerifyEmail = (props: any) => {

  const { modalBool, setModal, setReFetchAction, email} = props;
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<any>(null);
  const [otpStatus, setOtpStatus] = useState<boolean>(false);
  const [otpVal, setOtpVal] = useState<string>("");

  const [resendState, setResendState] = useState<boolean>(false);
  const [countState, setCountState] = useState<boolean>(true);

  const fallbackModal = () => {
    setModal(false);
  }

  const resendOtpApi = () => {
    const otpObj = {
      role: "client",
      type: "email",
      value: email
    }
    console.log(TAG, ' otpObj ', otpObj);
    callOtpSender(otpObj);
  }

  const onCountdownCirculate = () => {
    setResendState(true);
    setCountState(false);
  }

  const verifyOtpCall = async () => {


    const verifyObj = {
      _id: userData?.otpId,
      userId: userData?._id,
      type: "email",
      value: email,
      otp: Number(otpVal),
      role: "client"
    }

    verifyOtpApiCall(verifyObj);
  }


  async function verifyOtpApiCall(json: any): Promise<void> {
    setLoading(true);
    NetworkOps.makePostRequest(endPoints.verifyOtp, json, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);

          fallbackModal();
          setReFetchAction(true);

        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  async function callOtpSender(json: any): Promise<void> {
    setLoading(true);
    NetworkOps.makePostRequest(endPoints.resendOTPApi, json, false)
      .then(async (response: any) => {
        setLoading(false);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          setUserData(response?.data?.data);
          setResendState(false);
          setCountState(true);
          setOtpStatus(true);
        } else {
          ToastComponent(response?.data?.msg);
          console.log(TAG, ' error got in else ');
        }
      })
      .catch((error: any) => {
        setLoading(false);
        error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
        console.log(TAG, ' error i got in catch ', error);
      });
  }


  // console.log(TAG, ' bankList ', bankList);
  // console.log(TAG, ' current selected bank ', modalBool);
  // console.log(TAG, ' passed data ', company);


  return (
    <Modal
      centered
      open={modalBool}
      width={500}
    >
      <div className="modal-wrapper" >

        <div className="m-tlt" >
          <div className="m-tlt-sec" >Verify Email</div>
          <div className="m-btn-sec" > <IconButton imgSrc={back} onClickCall={fallbackModal} /> </div>
        </div>

        {otpStatus == true ?
          <>
            <div className="pt-5 a-title" >Enter 6-digit OTP </div>

            <div className="pt-5 a-input-wrapper" >

              <div className="" >
                <OtpInput
                  inputStyle="inputStyle me-3 otp-input"
                  numInputs={6}
                  onChange={(value: any) => setOtpVal(value)}
                  separator={<span></span>}
                  isInputNum={true}
                  shouldAutoFocus
                  isDisabled={loading}
                  value={otpVal}
                />
              </div>

              <div className="mt-5" >
                {loading === true ?
                  <Loader /> :
                  <ButtonSimple
                    title="Verify"
                    type="voilet w-100"
                    disabled={otpVal.length > 5 ? false : true}
                    onClickEvent={verifyOtpCall}
                  />
                }
              </div>

              {countState === true ?
                <div className="mt-4 text-center d-flex align-items-center" >
                  You can resend otp in - <Countdown onCompleteEvent={onCountdownCirculate} />
                </div>
                : ""}

              {resendState === true ?
                <div className="mt-4 text-center" >
                  <span className="new-ac" onClick={resendOtpApi} >Resent OTP</span>
                </div>
                : ""}

            </div>
          </>
          :

          <div className="" >
            <div className="" >
              <CustomInput
                label="Email"
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                disabled={true}
                defaultValue={email}
                maxLength={250}
                asterisk={false}
              />
            </div>

            <div className="d-flex justify-content-end mt-2" >
              <ButtonSimple
                title="Send OTP"
                type="voilet"
                disabled={false}
                onClickEvent={resendOtpApi}
              />
            </div>
          </div>
        }
      </div>
    </Modal>
  );
}

export default VerifyEmail;
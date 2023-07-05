import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';


import ToastComponent from '@/component/Toast/Toast';
import CustomTooltip from '@/component/tooltip/tooltip';
import Loader from '@/component/loader/loader';
import CustomInput from '@/component/input/input';
import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import ProgressBar from '@/component/progress/progress';

import Country from '@/containers/Country/Country';
import State from '@/containers/State/State';
import City from '@/containers/City/City';
import HomeLayout from '@/containers/Layout/Layout';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { wait, getToken, getUserProfileDetails } from '@/utils/helper';

import { genderType, selectedGenderType, ALLOWED_IMG, CompanyLogoSize } from '@/utils/constants';
import { userProfileSchema } from '@/utils/schema';
import { userPNG } from '@/utils/image';
import { fileSizeUnder } from '@/utils/message';

const TAG = "UpdateUserProfile: ";
const UpdateUserProfile = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploading, setUploading] = useState<number>(10);

  const [countryList, setCountryList] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "IN", label: "India" });

  const [stateList, setStateList] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [cityList, setCityList] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const inputFileRef: any = React.useRef();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<any>({
    firstName: "",
    lastName: "",
    gender: "male",
    email: "",
    mobile: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    zipCode: ""
  });

  useEffect(() => {
    callDataKeeper();
  }, [0]);

  async function callDataKeeper() {

    const dataFromLocal: any = await getUserProfileDetails();

    setInitialValues({
      firstName: dataFromLocal?.firstName,
      lastName:dataFromLocal?.lastName,
      gender: dataFromLocal?.gender ? dataFromLocal?.gender : "male",
      email: dataFromLocal?.email,
      mobile: dataFromLocal?.mobile.replace(/\D/g, '').slice(-10),
      address: dataFromLocal?.address,
      country: "India",
      state: "",
      city: "",
      zipCode: ""
    });

  }

  useEffect(() => {
    if (selectedCountry !== null) {

      setStateList([]);
      setSelectedState(null);

      setCityList([]);
      setSelectedCity(null);

    }
  }, [selectedCountry]);


  useEffect(() => {
    if (selectedState !== null) {
      setCityList([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  useEffect(() => {
    getToken();
  }, [0]);

  async function callAsync(val: any) {

    setLoading(true);

    console.log(' i got this  ', val);

    const formData = {
      firstName: val?.firstName,
      lastName: val?.lastName,
      gender: val?.gender,
      mobile: val?.mobile,
      email: val?.email,
      address: val?.address,
      country: val?.country,
      state: val?.state,
      city: val?.city,
      zipCode: val?.zipCode
    }

    console.log(' form values  ', formData);

    // registerCall(formData);
    await wait(500);
    setUploading(50);
    await wait(500);
    setUploading(70);
    await wait(500);
    setUploading(100);

  }

  const onSelectFile = (element: any) => {

    setFileInfo(null);
    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    if (element.target.files[0].size > CompanyLogoSize.size) {
      ToastComponent(fileSizeUnder.replace('%key%', "Logo").replace('%size%', CompanyLogoSize.sizeN));
      return;
    }

    const holdFile = element.target.files[0];

    setFileInfo({
      name: holdFile?.name,
      size: holdFile?.size,
      type: holdFile?.type,
      url: URL.createObjectURL(element.target.files[0])
    });

  }

  const inputTrigger = () => {
    inputFileRef.current.click();
  }

  const hitFileReset = () => {
    setFileInfo(null);
    const target: any = document.getElementById("companyLogo");
    target.value = null;
  }


  async function registerCall(addJson: any): Promise<void> {

    NetworkOps.makePostRequest(endPoints.addCompany, addJson, true)
      .then(async (response: any) => {
        setLoading(false);
        // console.log(TAG, ' error got in else ', response);
        if (response?.status == 200 && response?.data?.success == true) {
          ToastComponent(response?.data?.msg);
          router.push('/login');
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


  // console.log(TAG + " got this ", fileInfo);
  console.log(TAG + " initialValues ", initialValues);
  // let regex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  // console.log(TAG + " pancard validation ", regex.test("ABCTY1234D") );

  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >Update User Profile </span>
            </div>
            <div className="br-right" >
            </div>
          </div>

          <div className="layout-cardArea bg-lo br-10 p-3" >

            <div className="pr-section" >

              <section id="addCompany" >

                <div className="company-wrapper">
                  {/* <div className="gx-3 row gy-2"> */}

                  <div className="company-self p-3">

                    {/* upper section */}
                    <div className="col-auto d-flex">
                      <div className="img-sct" >
                        <Image
                          src={fileInfo !== null ? fileInfo?.url : userPNG}
                          alt="company icon"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className=" ps-4" >
                        <div className="d-flex" >
                          <div className="" >

                            <div className="" >
                              <input
                                type="file"
                                name="companyLogo"
                                id="companyLogo"
                                className="d-none"
                                ref={inputFileRef}
                                onChange={onSelectFile}
                                accept={ALLOWED_IMG}
                              />
                            </div>

                            {fileInfo === null ?
                              <ButtonSimple title="Upload Photo" type="voilet" onClickEvent={inputTrigger} disabled={loading} />
                              : null}


                            {fileInfo !== null && loading !== true ?
                              <div className="d-flex" >
                                <p className="file-name" >
                                  <CustomTooltip title={fileInfo?.name} > {fileInfo?.name} </CustomTooltip>
                                </p>
                                <div className="ms-2" >
                                  <ButtonSimple title="Reset" type="transparent" onClickEvent={hitFileReset} />
                                </div>
                              </div>
                              : null
                            }

                            {loading === true && fileInfo !== null ?
                              <div className="pr-w" >
                                <ProgressBar
                                  status={uploading !== 100 ? "active" : "success"}
                                  percent={uploading}
                                  showInfo={true}
                                />
                              </div>
                              : null
                            }

                          </div>
                        </div>
                        <div className="mt-2 ff-r fs-14 tx-d" >Allowed JPG, JPEG or PNG. Max size of 1MB</div>
                      </div>
                    </div>

                    {/* down section */}

                    {initialValues.firstName !== "" ?
                      <div className="" >

                        <Formik
                          initialValues={initialValues}
                          validationSchema={userProfileSchema}
                          enableReinitialize={true}
                          isInitialValid={true}
                          onSubmit={values => {
                            callAsync(values);
                          }}
                        >
                          {({ errors, values, touched, handleChange, setFieldValue }) => (

                            <Form className="w-100" id="userProfileForm" >

                              <div className="customer-modal-body mt-3" >
                                <div className="gx-3 row gy-2">
                                  {/* {JSON.stringify(errors)} */}

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="First Name"
                                      id="firstName"
                                      name="firstName"
                                      placeholder="First Name"
                                      type="text"
                                      disabled={loading}
                                      maxLength={250}
                                      defaultValue={initialValues.firstName}
                                      onChangeEvent={handleChange('firstName')}
                                    />
                                    {errors.firstName && touched.firstName ? (<div className="in-error">{`${errors.firstName}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Last Name"
                                      id="lastName"
                                      name="lastName"
                                      placeholder="Last Name"
                                      type="text"
                                      maxLength={250}
                                      disabled={loading}
                                      defaultValue={initialValues.lastName}
                                      onChangeEvent={handleChange('lastName')}
                                    />
                                    {errors.lastName && touched.lastName ? (<div className="in-error">{`${errors.lastName}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12 " >
                                    <SimpleSelectLabel
                                      option={genderType}
                                      selected={selectedGenderType}
                                      onChangeEvent={(val: any) => setFieldValue('gender', val.value)}
                                      disabled={loading}
                                      id="genderType"
                                      label="Gender"
                                    />
                                    {errors.gender && touched.gender ? (<div className="in-error">{`${errors.gender}`}</div>) : null}
                                  </div>


                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Contact Number"
                                      id="mobile"
                                      name="mobile"
                                      placeholder="Contact Number"
                                      type="text"
                                      maxLength={10}
                                      disabled={loading}
                                      defaultValue={initialValues.mobile}
                                      onChangeEvent={handleChange('mobile')}
                                    />
                                    {errors.mobile && touched.mobile ? (<div className="in-error">{`${errors.mobile}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Email"
                                      id="email"
                                      name="email"
                                      placeholder="Email"
                                      type="text"
                                      disabled={loading}
                                      maxLength={251}
                                      defaultValue={initialValues.email}
                                      onChangeEvent={handleChange('email')}
                                    />
                                    {errors.email && touched.email ? (<div className="in-error">{`${errors.email}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12 " >
                                    <CustomInput
                                      label="Adress"
                                      id="address"
                                      name="address"
                                      placeholder="Adress"
                                      type="text"
                                      disabled={loading}
                                      maxLength={1001}
                                      defaultValue={initialValues.address}
                                      onChangeEvent={handleChange('address')}
                                    />
                                    {errors.address && touched.address ? (<div className="in-error">{`${errors.address}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-3 col-12" >
                                    <CustomInput
                                      label="Pin Code"
                                      id="zipCode"
                                      name="zipCode"
                                      placeholder="Pin Code"
                                      type="text"
                                      disabled={loading}
                                      maxLength={7}
                                      defaultValue={initialValues.zipCode}
                                      onChangeEvent={handleChange('zipCode')}
                                    />
                                    {errors.zipCode && touched.zipCode ? (<div className="in-error">{`${errors.zipCode}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-3 col-12" >
                                    <Country
                                      loading={loading}
                                      setLoading={setLoading}
                                      countryList={countryList}
                                      setCountryList={setCountryList}
                                      selectedCountry={selectedCountry}
                                      setSelectedCountry={setSelectedCountry}
                                      setFieldValue={setFieldValue}
                                    />
                                    {errors.country && touched.country ? (<div className="in-error">{`${errors.country}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-3 col-12" >
                                    <State
                                      loading={loading}
                                      setLoading={setLoading}
                                      selectedCountry={selectedCountry}
                                      stateList={stateList}
                                      setStateList={setStateList}
                                      selectedState={selectedState}
                                      setSelectedState={setSelectedState}
                                      setFieldValue={setFieldValue}
                                    />
                                    {errors.state && touched.state ? (<div className="in-error">{`${errors.state}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-3 col-12" >
                                    <City
                                      loading={loading}
                                      setLoading={setLoading}
                                      selectedCountry={selectedCountry}
                                      selectedState={selectedState}
                                      cityList={cityList}
                                      setCityList={setCityList}
                                      setSelectedCity={setSelectedCity}
                                      setFieldValue={setFieldValue}
                                    />
                                    {errors.city && touched.city ? (<div className="in-error">{`${errors.city}`}</div>) : null}
                                  </div>

                                </div>

                                <div className="mt-3" >
                                  {loading === true ?
                                    <Loader /> :
                                    <ButtonSimple title="Submit" type="voilet" disabled={loading} />
                                  }
                                </div>
                              </div>

                            </Form>
                          )}
                        </Formik>

                      </div>
                      : null}

                  </div>

                </div>
                {/* </div> */}


              </section >
            </div>

          </div>

        </div>
      </section>

    </HomeLayout>
  );

}

export default UpdateUserProfile;

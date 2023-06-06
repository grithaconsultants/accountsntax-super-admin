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
import UploadBar from '@/component/uploadbar/uploadbar';

import Country from '@/containers/Country/Country';
import State from '@/containers/State/State';
import City from '@/containers/City/City';
import HomeLayout from '@/containers/Layout/Layout';


import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

import { wait, isEmpty, getToken, getCompaniesData, getSelectedCompany, getSelectedCompanyData } from '@/utils/helper';

import { companyType, selectedCompanyType, ALLOWED_IMG, CompanyLogoSize } from '@/utils/constants';
import { companySchemaFull } from '@/utils/schema';
import { companyJPG } from '@/utils/image';
import { fileSizeUnder } from '@/utils/message';

const TAG = "UpdateCompanyProfile: ";
const UpdateCompanyProfile = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploading, setUploading] = useState<number>(10);

  const [countryList, setCountryList] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({ value: "IN", label: "India" });

  const [stateList, setStateList] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [cityList, setCityList] = useState<any>([]);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const [company, setCompany] = useState<any>(null);

  const inputFileRef: any = React.useRef();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<any>({
    companyName: "",
    noOfPartners: "",
    nameAsPerPan: "",
    tan: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    zipCode: "",
    pan_card: "",
    type: "individual"
  });

  // const initialValues = {
  //   companyName: "mak",
  //   noOfPartners: 2,
  //   nameAsPerPan: "aalam",
  //   tan: "54a4d5f45a",
  //   address: "adf54aw3ef35",
  //   country: "India",
  //   state: "",
  //   city: "",
  //   zipCode: "",
  //   pan_card: "",
  //   type: "individual"
  // };

  useEffect(() => {
    callDataKeeper();
  }, [0]);


  async function callDataKeeper() {

    const getSelectedC: any = await getSelectedCompany();
    const companiesData = getSelectedCompanyData(getSelectedC._id);
    console.log('getSelectedC ', getSelectedC);
    console.log('companiesData ', companiesData);
    setCompany(companiesData);

    setInitialValues({
      companyName: companiesData?.name,
      noOfPartners: companiesData?.noOfPartners,
      nameAsPerPan: companiesData?.nameAsPerPan,
      tan: companiesData?.tan,
      address: companiesData?.address,
      country: "India",
      state: "",
      city: "",
      zipCode: "",
      pan_card: companiesData?.pan_card,
      type: companiesData?.type
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
      name: val?.companyName,
      noOfPartners: val?.noOfPartners,
      nameAsPerPan: val?.nameAsPerPan,
      tan: val?.tan,
      address: val?.address,
      pan_card: val?.pan_card,
      type: val?.type,
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

    // console.log(TAG + ' i got this  ', element);
    // console.log(TAG + ' i got this  ', element.target.files);
    setFileInfo(null);
    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    if (element.target.files[0].size > CompanyLogoSize.size) {
      ToastComponent(fileSizeUnder.replace('%key%', "Logo").replace('%size%', CompanyLogoSize.sizeN));
      return;
    }

    const holdFile = element.target.files[0];
    console.log('file details ', holdFile);

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

  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >Update Company Profile </span>
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
                          src={fileInfo !== null ? fileInfo?.url : companyJPG}
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
                                <UploadBar
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

                    {initialValues.companyName !== "" ?
                      <div className="" >

                        <Formik
                          initialValues={initialValues}
                          validationSchema={companySchemaFull}
                          enableReinitialize={true}
                          isInitialValid={true}
                          onSubmit={values => {
                            callAsync(values);
                          }}
                        >
                          {({ errors, values, touched, handleChange, setFieldValue }) => (

                            <Form className="w-100">

                              <div className="customer-modal-body mt-3" >
                                <div className="gx-3 row gy-2">
                                  {/* {JSON.stringify(errors)} */}

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Company Name"
                                      id="companyName"
                                      name="companyName"
                                      placeholder="Company Name"
                                      type="text"
                                      disabled={loading}
                                      maxLength={501}
                                      defaultValue={initialValues.companyName}
                                      onChangeEvent={handleChange('companyName')}
                                    />
                                    {errors.companyName && touched.companyName ? (<div className="in-error">{`${errors.companyName}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Number Of Partners"
                                      id="noOfPartners"
                                      name="noOfPartners"
                                      placeholder="Number Of Partners"
                                      type="number"
                                      disabled={loading}
                                      defaultValue={initialValues.noOfPartners}
                                      onChangeEvent={handleChange('noOfPartners')}
                                    />
                                    {errors.noOfPartners && touched.noOfPartners ? (<div className="in-error">{`${errors.noOfPartners}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Name As On Pancard"
                                      id="nameAsPerPan"
                                      name="nameAsPerPan"
                                      placeholder="Name As On Pancard"
                                      type="text"
                                      maxLength={251}
                                      disabled={loading}
                                      defaultValue={initialValues.nameAsPerPan}
                                      onChangeEvent={handleChange('nameAsPerPan')}
                                    />
                                    {errors.nameAsPerPan && touched.nameAsPerPan ? (<div className="in-error">{`${errors.nameAsPerPan}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12" >
                                    <CustomInput
                                      label="Tan"
                                      id="tan"
                                      name="tan"
                                      placeholder="Tan"
                                      type="text"
                                      disabled={loading}
                                      maxLength={10}
                                      defaultValue={initialValues.tan}
                                      onChangeEvent={handleChange('tan')}
                                    />
                                    {errors.tan && touched.tan ? (<div className="in-error">{`${errors.tan}`}</div>) : null}
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

                                  <div className="col-lg-6 col-12" >
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

                                  <div className="col-lg-4 col-12" >
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

                                  <div className="col-lg-4 col-12" >
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

                                  <div className="col-lg-4 col-12" >
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


                                  <div className="col-lg-6 col-12 " >
                                    <CustomInput
                                      label="Pancard"
                                      id="pan_card"
                                      name="pan_card"
                                      placeholder="Pancard"
                                      type="text"
                                      disabled={loading}
                                      maxLength={10}
                                      defaultValue={initialValues.pan_card}
                                      onChangeEvent={handleChange('pan_card')}
                                    />
                                    {errors.pan_card && touched.pan_card ? (<div className="in-error">{`${errors.pan_card}`}</div>) : null}
                                  </div>

                                  <div className="col-lg-6 col-12 " >
                                    <SimpleSelectLabel
                                      option={companyType}
                                      selected={selectedCompanyType}
                                      onChangeEvent={(val: any) => setFieldValue('type', val.value)}
                                      disabled={loading}
                                      id="companyType"
                                      label="Type"
                                    />
                                    {errors.type && touched.type ? (<div className="in-error">{`${errors.type}`}</div>) : null}
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

export default UpdateCompanyProfile;

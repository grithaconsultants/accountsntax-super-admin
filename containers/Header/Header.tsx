import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import CustomTooltip from '@/component/tooltip/tooltip';
import SimpleSelect from '@/component/select/select';
import SimpleDropdown from '@/component/dropdown/dropdown';
import ToastComponent from '@/component/Toast/Toast';

import LS from '@/styles/Header.module.scss';

import { msg, search, insta, bars } from '@/utils/image';
import { isEmpty } from '@/utils/helper';



import endPoints from '@/ApiHandler/AppConfig';
import NetworkOps from '@/ApiHandler/NetworkOps';

const TAG = "Header: ";
const Header = (props: any) => {

  const router = useRouter();
  const { setSide, userData } = props;
  const [compDis, setCompDis] = useState<any>(null);
  const [compSel, setCompSel] = useState<any>(null);


  // useEffect(() => {

  //   if (compDis == null && compSel == null) {

  //     const comp: any = localStorage.getItem('companies');
  //     const selectedDump: any = localStorage.getItem('company');

  //     // console.log(TAG + ' compList ', comp);
  //     // console.log(TAG + ' selectedDump ', selectedDump);
  //     // console.log(TAG + ' JSON.parse(selectedDump) ', JSON.parse(selectedDump));

  //     if (isEmpty(comp)) {
  //       router.push('/login');
  //     } else {

  //       let item = {
  //         value: "addNewCompany",
  //         label: "Add New Company",
  //       };

  //       let parsed = JSON.parse(comp);
  //       parsed.splice(0, 0, item);

  //       setCompDis(parsed);

  //       let selected = [{
  //         value: JSON.parse(selectedDump)._id,
  //         label: JSON.parse(selectedDump).name
  //       }];

  //       setCompSel(selected);

  //     }
  //   }

  // }, [0]);

  function toggleHeader() {
    setSide("open");
  }

  function toDisplayDrop(compData: any) {
    const empArr: any = [];
    compData.map((item: any, index: any) => {
      empArr.push({
        value: item._id,
        label: item.name,
      });
    });
  }

  const captureChange = (newValue: any) => {

    if (newValue.value !== "addNewCompany") {

      //for selected company
      localStorage.setItem('company', JSON.stringify({ _id: newValue?.value, name: newValue?.label }));
      router.reload();
      // getUOMCall({ _id: newValue?.value, name: newValue?.label });


    } else {
      router.push('/add-company-profile');
    }

  }



  // async function getUOMCall(apiData: any): Promise<void> {

  //   NetworkOps.makeGetRequest(`${endPoints.getuoms}?company=${apiData?._id}`, true)
  //     .then(async (response: any) => {
  //       console.log(TAG, ' api response ', response);
  //       if (response?.status == 200 && response?.data?.status == true) {
  //         callValidatorUom(response, apiData);
  //       } else {
  //         ToastComponent(response?.data?.msg);
  //         console.log(TAG, ' error got in else ');
  //       }
  //     })
  //     .catch((error: any) => {
  //       error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
  //       console.log(TAG, ' error i got in catch ', error);
  //       router.push(`/technical-issue`);
  //     });

  // }



  // function callValidatorUom(response: any, apiData: any) {

  //   if (response?.data?.data && response?.data?.data.length > 0) {
  //     localStorage.setItem('uom', JSON.stringify(response?.data?.data));
  //     getLedgers(apiData);
  //   } else {
  //     router.push(`/technical-issue`);
  //   }

  // }



  // async function getLedgers(apiData: any): Promise<void> {

  //   NetworkOps.makeGetRequest(`${endPoints.getLedgers}?company=${apiData?._id}`, true)
  //     .then(async (response: any) => {
  //       console.log(TAG, ' api response ', response);
  //       if (response?.status == 200 && response?.data?.status == true) {

  //         validateLedgers(response);

  //       } else {
  //         ToastComponent(response?.data?.msg);
  //         console.log(TAG, ' error got in else ');
  //       }
  //     })
  //     .catch((error: any) => {
  //       error?.data?.msg ? ToastComponent(error?.data?.msg) : null;
  //       console.log(TAG, ' error i got in catch ', error);
  //       router.push(`/technical-issue`);
  //     });

  // }

  // function validateLedgers(response: any) {

  //   if (response?.data && response?.data?.data.length) {
  //     localStorage.setItem('ledgers', JSON.stringify(response?.data?.data));
  //     router.reload();
  //   } else {
  //     router.push(`/technical-issue`);
  //   }

  // }

  // console.log(TAG + ' userData ', userData);
  // console.log(TAG + ' compSel ', compSel);
  console.log(TAG + ' compDis ', compDis);


  return (
    <section id="headerSection" >
      <div className={LS.hwrapper} >
        <div className={LS.hleft} >

          <div className="iconBox d-xl-none d-lg-block d-md-block " onClick={toggleHeader} >
            <CustomTooltip title="Toggle Menu" >
              <Image src={bars} alt="menu icon" width={24} height={24} />
            </CustomTooltip>
          </div>

          <div className={LS.contBox} >

            <div className={LS.ringBox} >

              <div className="flex-wrapper" onClick={() => router.push('update-company-profile')} >
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart orange">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" strokeDasharray="25, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <text x="18" y="22" className="percentage">75%</text>
                  </svg>
                </div>
              </div>

            </div>
            {compDis && compDis.length && compSel && compSel.length ?
              <div className={LS.selecBox} >
                <SimpleSelect
                  from="from-header"
                  option={compDis}
                  selected={compSel}
                  onChangeEvent={captureChange}
                />
              </div>
              : null}
          </div>

        </div>

        <div className={LS.hright} >


          <div className={LS.boxes} >
            <div className={LS.boxSelf} >
              <Image src={insta} alt="insta icon" width={24} height={24} />
            </div>
            <div className={`${LS.boxSelf} ${LS.boxcenter} `} >
              <Image src={msg} alt="msg icon" width={24} height={24} />
            </div>
            <div className={LS.boxSelf} >
              <Image src={search} alt="search icon" width={24} height={24} />
            </div>
          </div>

          <div className={LS.drop} >
            <SimpleDropdown title={userData?.loginData?.firstName} />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Header;
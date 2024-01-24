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
  const { setSide, adminData } = props;
  const [compDis, setCompDis] = useState<any>(null);
  const [compSel, setCompSel] = useState<any>(null);

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
                {/* <SimpleSelect
                  from="from-header"
                  option={compDis}
                  selected={compSel}
                  onChangeEvent={captureChange}
                /> */}
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
            <SimpleDropdown title={adminData?.firstName} />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Header;
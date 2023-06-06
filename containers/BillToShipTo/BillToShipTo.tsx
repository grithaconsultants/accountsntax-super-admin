import React from 'react';
import Image from 'next/image';

import SimpleSelectLabel from '@/component/selectlabel/selectlabel';
import CustomTooltip from '@/component/tooltip/tooltip';
import CustomCheckbox from '@/component/checkbox/checkbox';
import CustomInput from '@/component/input/input';

import { buisnessProfilePic } from '@/utils/image';
import { customers, customersSelected } from '@/utils/constants';

const BillToShipTo = () => {

  const curOpt: any = [];
  const curSelected: any = [];
  customers.map((item, index) => { curOpt.push({ value: item, label: item }) });
  customersSelected.map((item, index) => { curSelected.push({ value: item, label: item }) });

  const custo = () => {
    console.log('got hit');
  }

  return (
    <section id="billToSection" className='billtosec' >
      <div className='title' >Buyer (Bill to)</div>
      <div className='row row gx-3 gy-2 mt-3'>
        <div className='col-lg-6 col-12' >
          <SimpleSelectLabel
            option={curOpt}
            selected={curSelected}
            onChangeEvent={custo}
            disabled={false}
            label="Select Customer"
          />
          <span className="input-tag-b" >Outstanding Balance: <span>₹2530.00</span></span>
        </div>
        <div className='col-lg-6 col-12' >
          <CustomInput
            label="GSTN Number"
            id="gstnNumber"
            name="gstnNumber"
            placeholder="GSTN Number"
            type="number"
            disabled={false}
            maxLength={15}
          />
          <div className="input-tag-b text-end text-right" >View Customer Profile</div>
        </div>
      </div>

      <div className='title mt-5' >CONSIGNEE (SHIP TO)</div>
      <div className='mt-3' >
        <CustomCheckbox
          title="Same as Buyer (Bill to)"
          checked={false}
          disabled={false}
        />
      </div>


    </section>
  );
}

export default BillToShipTo; 
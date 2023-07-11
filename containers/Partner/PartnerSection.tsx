import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import PartnerCard from '@/containers/Partner/PartnerCard';

const TAG = "PartnerSection: ";
const PartnerSection = (props: any) => {

  const { data, setReFetchAction } = props;

  const [modalBool, setModal] = useState<boolean>(false);
  const PartnerAdd = dynamic(() => import('@/containers/Partner/PartnerAdd'), { suspense: true });

  // console.log(TAG + " company data ", data);

  return (
    <div className='' >

      <PartnerCard
        users={data?.partners}
        company={data}
        setReFetchAction={setReFetchAction}
      />

      <div className='mt-3' >
        <ButtonSimple
          title="Add Partner"
          type="voilet"
          disabled={false}
          onClickEvent={() => setModal(true)}
        />
      </div>

      {modalBool === true ?
        <div>
          <Suspense fallback={`Loading...`}>
            <PartnerAdd
              modalBool={modalBool}
              setModal={setModal}
              company={data}
              setReFetchAction={setReFetchAction}
            />
          </Suspense>
        </div>
        : ""}

    </div>
  );
}

export default PartnerSection;
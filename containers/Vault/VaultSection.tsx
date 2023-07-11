import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import VaultTable from '@/containers/Vault/VaultTable'

const TAG = "VaultSection: ";
const VaultSection = (props: any) => {

  const { data, setReFetchAction } = props;

  const [modalBool, setModal] = useState<boolean>(false);
  const VaultAdd = dynamic(() => import('./VaultAdd'), { suspense: true });

  // console.log(TAG + " vault got called with ", data);
  // console.log(TAG + " vault got called with ", data.vaults);

  return (
    <div className='' >

      {data.vaults.length > 0 && <VaultTable setReFetchAction={setReFetchAction} company={data} rows={data.vaults} />}

      <div className='mt-3' >
        <ButtonSimple
          title="Add"
          type="voilet"
          disabled={false}
          onClickEvent={() => setModal(true)}
        />
      </div>

      {modalBool === true ?
        <div>
          <Suspense fallback={`Loading...`}>
            <VaultAdd
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

export default VaultSection;
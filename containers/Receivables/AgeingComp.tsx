import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useRouter } from 'next/router';

const TAG = "AgeingComp: ";
const AgeingComp = (props: any) => {

  const { ledgerTarget } = props;
  const router = useRouter();
  const ReceivableByTally = dynamic(() => import('@/containers/Receivables/ReveivableByTally'), { suspense: true });
  const ReceivableFifo = dynamic(() => import('@/containers/Receivables/ReceivableFifo'), { suspense: true });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `By Tally`,
      children: <Suspense fallback={`Loading...`}> <ReceivableByTally ledgerTarget={ledgerTarget} />  </Suspense>,
    },
    {
      key: '2',
      label: `By FIFO`,
      children: <Suspense fallback={`Loading...`}> <ReceivableFifo ledgerTarget={ledgerTarget} />  </Suspense>,
    }
  ];

  return (
    <div className="w-100 bg-lo p-3 oh br-5 bx-11" >
      <div className="cardBody px-0 mt-0 pb-4">
        <Tabs defaultActiveKey="2" items={items} />
      </div>
    </div>
  );
}

export default AgeingComp;
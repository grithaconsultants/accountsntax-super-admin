import React from 'react';
import { RingProgress } from '@ant-design/plots';

const DemoRingProgress = () => {
  
  const config = {
    height: 50,
    width: 50,
    autoFit: false,
    percent: 0.7,
    color: ['#EA7A3A', '#673275'],
  };

  return <RingProgress {...config} />;

};



      {/* <Suspense fallback={`Loading...`}>
                <DemoRingProgress />
              </Suspense>
              <div className={LS.numb} >75%</div> */}

// const DemoRingProgress = dynamic(() => import('@/component/circle/circle'), { suspense: true });

export default DemoRingProgress;
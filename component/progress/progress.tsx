import React from 'react';
import { Progress } from 'antd';

const ProgressBar = (props: any) => {

  const { status, percent, showInfo = true } = props;

  // status = success exception normal active

  return (
    <Progress
      percent={percent}
      status={status}
      showInfo={showInfo}
      strokeColor="#673275"
    />
  );
}

export default ProgressBar;
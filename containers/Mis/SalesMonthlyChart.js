import React from 'react';
import { Column } from '@ant-design/plots';

const SalesMonthlyChart = (props) => {

  const { chartColumnData } = props;

  const config = {
    data: chartColumnData,
    xField: 'type',
    yField: 'sales',
    
    label: {
      position: 'middle',
      backgroundColor: '#c4c4c4',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Category',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return <Column {...config} />;
  
};

export default SalesMonthlyChart;

import React from 'react';
import { Pie } from '@ant-design/plots';

const BasicPieChart = () => {

  const data = [
    {
      type: 'Reviewed',
      value: 27,
    },
    {
      type: 'Clarification',
      value: 25,
    },
    {
      type: 'Under Process',
      value: 18,
    },
    {
      type: 'In Progress',
      value: 15,
    },
    {
      type: 'Not yet Started',
      value: 15,
    }
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return <Pie {...config} />;

};


export default BasicPieChart;

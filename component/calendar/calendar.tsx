import React from 'react';
import { Badge, Calendar } from 'antd';

import type { Dayjs } from 'dayjs';
import type { BadgeProps } from 'antd';
import type { CellRenderInfo } from 'rc-picker/lib/interface';



const CalendarApp = (props: any) => {

  const { setSelectadEvent } = props;


  const getListData = (value: Dayjs) => {

    // console.log('getListData getting called with', value);
    // console.log('formatted ', value.format('DD-MM-YYYY'));
  
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'success', content: 'GST Return' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'ITR File' },
        ];
        break;
      case 15:
        listData = [
          { type: 'error', content: 'Captcha' },
        ];
        break;
      default:
    }
    return listData || [];
  };
  
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    console.log('monthCellRender getting called with', value);
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {

    // console.log('got called with ', value);
    // console.log('got called with ', value.format('DD-MM-YYYY'));

    const listData = getListData(value);
    return (
      <ul className="events list-unstyled" >
        {listData.map((item) => (
          <li key={item.content} onClick={() => gotHit(item)} >
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const gotHit = (calledWith: any) => {
    console.log('i got hit ', calledWith);
    setSelectadEvent(calledWith);
  }

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    // console.log('type of getting called ', info);
    if (info.type === 'date') return dateCellRender(current); //render for all date visible on screen
    // if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarApp;

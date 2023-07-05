
import React from 'react';

import CustomTooltip from '@/component/tooltip/tooltip';
import { PaperClipOutlined } from '@ant-design/icons';

const IconInformationCard = (props: any) => {

  const { renderData } = props;

  function ShowData() {
    return (
      renderData.map((item: any, index: any) => {
        const { IMGBLOCK } = item;

        // const ViewBlock = dynamic(() => import('../UpdateDWHClientConn/UpdateDWHClientConn'), { suspense: true });

        return (
          <li className="d-flex align-items-center py-3" key={index} >
            {/* <IMGBLOCK rev="" /> */}
            <span className="fs-14 ff-r tx-v ms-2 me-2" >{item.title} : </span><br />
            <span className="fs-14 ff-r tx-d" >
              <CustomTooltip placement="top" title={item.value} > {item.value} </CustomTooltip>
            </span>
          </li>
        )
      })

    )
  }

  return (
    <div>
      <ul className="mx-0 my-0 px-0 pt-0 list-unstyled ">

        {renderData.map((item: any, index: any) => {
          const { IMGBLOCK } = item;
          return (
            <li className="d-flex align-items-center py-3" key={index} >
              <PaperClipOutlined rev="" />
              <span className="fs-14 ff-r tx-v ms-2 me-2" >{item.title} : </span><br />
              <span className="fs-14 ff-r tx-d" >
                <CustomTooltip placement="top" title={item.value} > {item.value} </CustomTooltip>
              </span>
            </li>
          )
        })}

        {/* <ShowData /> */}

      </ul>
    </div>
  );
}

export default IconInformationCard;
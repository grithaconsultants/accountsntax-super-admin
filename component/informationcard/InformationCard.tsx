import React from 'react';
import CustomTooltip from '@/component/tooltip/tooltip';
import FileTileView from '@/component/filetileview/filetileview';

const informationcard = (props: any) => {

  const { renderData } = props;

  return (
    <div>
      <div className="row gx-3 gy-4  ">
        {renderData.map((item: any, index: any) => {
          return (
            <>
              {item.file == undefined ?
                <div className="col-xl-4 col-lg-4 col-md-6 col-12 " key={index} >
                  <span className="fs-14 ff-r tx-v" >{item.title}</span><br />
                  <span className="fs-12 ff-r tx-d" >
                    <CustomTooltip placement="top" title={item.value} > {item.value} </CustomTooltip>
                  </span>
                </div>
                :
                <FileTileView title={item.title} fileName={item.value} />
              }
            </>
          )
        })}
      </div>
    </div>
  );
}

export default informationcard;
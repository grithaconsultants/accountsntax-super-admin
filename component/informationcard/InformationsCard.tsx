import React, { Fragment } from 'react';
import CustomTooltip from '@/component/tooltip/tooltip';
import FileTileView from '@/component/filetileview/filetileview';

const informationcard = (props: any) => {

  const { renderData } = props;

  return (
    <div>
      <div className="row gx-3 gy-2">
        {renderData.map((item: any, index: any) => {
          return (
            <Fragment key={index} >
              {item.file == undefined ?
                <>
                  {item.isItemRender === undefined ?
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12 " key={index} >
                      <span className="fs-14 ff-r tx-v" >{item.title}</span><br />
                      <span className="fs-12 ff-r tx-d" >
                        <CustomTooltip
                          classNames={item.uppercase !== undefined ? `text-uppercase` : ""}
                          placement="top"
                          title={item.value}
                        > {item.value} </CustomTooltip>
                      </span>
                    </div>
                    :
                    (item?.isItemRender ?
                      <div className="col-xl-4 col-lg-4 col-md-6 col-12 " key={index} >
                        <span className="fs-14 ff-r tx-v" >{item.title}</span><br />
                        <span className="fs-12 ff-r tx-d" >
                          <CustomTooltip
                            classNames={item.uppercase !== undefined ? `text-uppercase` : ""}
                            placement="top"
                            title={item.value}
                          > {item.value} </CustomTooltip>
                        </span>
                      </div>
                      : "")}
                </>
                :
                <FileTileView title={item.title} fileName={item.value} />
              }
            </Fragment>
          )
        })}
      </div>
    </div>
  );
}

export default informationcard;
import React, { useState } from 'react';
import CustomTooltip from '@/component/tooltip/tooltip';
import Loader from '@/component/loader/loader';

import { getAWSFileUrl, wait, removeFilePath } from '@/utils/helper';

const FileTileView = (props: any) => {

  const { title, fileName } = props;
  const [loading, setLoading] = useState<boolean>(false);

  async function gotClicked() {
    const ancherReg: any = document.getElementById("_tobeclicked");
    setLoading(true);
    const geturl: any = await getAWSFileUrl(fileName);
    setLoading(false);
    ancherReg.href = geturl;
    wait(200);
    ancherReg.click();
  }

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-12 ">
      <span className="fs-14 ff-r tx-v" >{title}</span><br />
      <span className="fs-12 ff-r tx-d cp tu  " >
        <span onClick={() => { gotClicked() }} >
          {loading == true ?
            <Loader />
            :
            <CustomTooltip placement="top" title={removeFilePath(fileName)} > { removeFilePath(fileName) } </CustomTooltip>
          }
        </span>
        <a href="#" target="_blank" id="_tobeclicked" style={{ display: "none" }} >.</a>
      </span>
    </div>
  )
}

export default FileTileView;
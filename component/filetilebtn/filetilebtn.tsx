import React, { useState } from 'react';
import CustomTooltip from '@/component/tooltip/tooltip';
import { FaTrash, FaCloudDownloadAlt } from "react-icons/fa";
import IconBox from '@/component/iconbox/iconbox';
import Loader from '@/component/loader/loader';

import { getAWSFileUrl, wait, removeFilePath } from '@/utils/helper';

const FileTileBtn = (props: any) => {

  const { fileName } = props;
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
    <div>
      <IconBox
        type="text"
        icon={<FaCloudDownloadAlt color="#673275" />}
        loading={loading}
        onClickEvent={() => { gotClicked() }}
      />
      <a href="#" target="_blank" id="_tobeclicked" style={{ display: "none" }} >.</a>
    </div>
  )
}

export default FileTileBtn;
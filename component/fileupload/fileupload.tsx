import React from 'react';

import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';



const FileUpload = (propData: any) => {

  const { files, onRemoveEvent, delAllow } = propData;

  const props: UploadProps = {
    defaultFileList: files,
    multiple: true,
    onRemove: (item) => {
      onRemoveEvent(item);
      const todelval: any = document.getElementById("bulkFiles");
      todelval.value = null
    },
    showUploadList: {
      showDownloadIcon: false,
      showRemoveIcon: delAllow,
      downloadIcon: 'Download',
      // removeIcon: <StarOutlined onClick={ (e) => console.log(e, ' custom removeIcon event ') } />,
    },
  };


  return (
    <>
      <Upload {...props} listType="picture" >
        <Button style={{ display: "none" }} icon={<UploadOutlined rev="" />}>Upload</Button>
      </Upload >
    </>
  );
}

export default FileUpload;
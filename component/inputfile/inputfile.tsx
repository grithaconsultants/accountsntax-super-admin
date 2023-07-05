import React, { useState, useEffect } from 'react';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';

import ToastComponent from '@/component/Toast/Toast';

import { uploadFile, deleteS3File, removeFilePath, getAWSFileUrl, isEmpty } from '@/utils/helper';
import { fileSizeUnder } from '@/utils/message';

const TAG = "InputFile: ";
const InputFile = (props: any) => {

  const { label, placeholder, id, name, defaultValue, deleteRight, uploadRight } = props;

  const { accept, allowedSize, sizeText, reflectAction, companyId } = props;

  // console.log(TAG + " props props props ", props);

  const [loading, setLoading] = useState<boolean>(false);
  const inputFileRef: any = React.useRef();

  const inputTrigger = () => {
    inputFileRef.current.click();
  }

  const onSelectFile = (element: any) => {

    const docRef: any = document.getElementById(`${id}bulkfile`);
    const inputText: any = document.getElementById(id);

    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    if (element.target.files[0].size > allowedSize) {
      ToastComponent(fileSizeUnder.replace('%size%', sizeText));
      docRef.value = null;
      return;
    }

    inputText.value = "Uploading......";
    uploadAction(element.target.files);

  }


  async function uploadAction(originalFile: any) {

    const inputText: any = document.getElementById(id);
    const deleteRes = await deleteS3File(defaultValue);

    const filename = originalFile[0].name;
    const ext = filename.split(".").pop();

    let url;
    if( isEmpty(companyId) ){
      url = `${new Date().getTime()}.${ext}`;
    }else{
      url = `${companyId}/${new Date().getTime()}.${ext}`;
    }


    const gotFileUrlAfterUpload = await uploadFile(originalFile, url);
    reflectAction(gotFileUrlAfterUpload);
    inputText.value = removeFilePath(gotFileUrlAfterUpload);
  }

  async function deleteBucketFile(fileToDelete: string) {

    const deleteRes = await deleteS3File(fileToDelete);
    reflectAction("");

  }






  return (
    <div className="simple-input" >
      <label className="input-label" > {label} </label>
      <div className='input-file-box' >
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type="text"
          disabled={false}
          defaultValue={defaultValue ? removeFilePath(defaultValue) : ""}
          readOnly={true}
        />

        {!isEmpty(defaultValue) && deleteRight == true ?
          <div className='input-add-icon input-icon' onClick={() => deleteBucketFile(defaultValue)} >
            <DeleteOutlined rev="" />
          </div>
          : null}

        {uploadRight == true &&
          <div className='input-delete-icon input-icon' onClick={inputTrigger} >
            <CloudUploadOutlined rev="" />
          </div>
        }

      </div>

      <input
        type="file"
        name={`${id}bulkfile`}
        id={`${id}bulkfile`}
        className="d-none"
        ref={inputFileRef}
        onChange={onSelectFile}
        accept={accept}
      />

    </div>
  )
}

export default InputFile;
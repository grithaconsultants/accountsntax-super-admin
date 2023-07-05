import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import FileUpload from '@/component/fileupload/fileupload';
import ToastComponent from '@/component/Toast/Toast';
import IconTitleButton from '@/component/icontitlebutton/icontitlebutton';

import { fileSizeUnder } from '@/utils/message';
import { uploadFile } from '@/utils/helper';
import { upload, uploadIcon } from '@/utils/image';

const TAG = "UploadSingle: ";
const UploadSingle = (props: any) => {

  const { title, accept, allowedSize, sizeText, setUploadedFileName } = props;

  const inputFileRef: any = React.useRef();
  const [originalFile, setOriginalFile] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [delAllow, setDelAllow] = useState<boolean>(true);


  const inputTrigger = () => {
    inputFileRef.current.click();
  }

  const onSelectFile = (element: any) => {

    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    if (element.target.files[0].size > allowedSize) {
      ToastComponent(fileSizeUnder.replace('%size%', sizeText));
      return;
    }

    const holdFile = element.target.files[0];
    setOriginalFile(element.target.files);
    console.log(TAG + ' file details ', element.target.files);

    let newelement = {
      uid: uuidv4(),
      name: holdFile?.name,
      status: 'done',
      thumbUrl: 'https://i.ibb.co/MVS6KWX/file.png',
      size: holdFile?.size,
      type: holdFile?.type
    }

    setFiles([...files, newelement]);

  }

  const onRemoveEvent = (item: any) => {
    let allElement = files;
    const index = allElement.findIndex((obj: any) => obj.uid === item.uid);
    const newData = [
      ...allElement.slice(0, index),
      ...allElement.slice(index + 1)
    ];
    setFiles(newData);
    setOriginalFile(null);
    // console.log('got removed', item);
  }

  function FileGotCalled() {
    return (
      <FileUpload
        files={files}
        onRemoveEvent={onRemoveEvent}
        delAllow={delAllow}
      />
    )
  }


  async function uploadHit() {

    console.log(TAG + ' upload got hit');

    let itemval = [];
    for (let item of files) {
      itemval.push({
        uid: item.uid,
        name: item?.name,
        status: 'uploading',
        thumbUrl: 'https://i.ibb.co/MVS6KWX/file.png',
        size: item?.size,
        type: item?.type
      })
    }


    setDelAllow(false);
    setFiles(itemval);

    uploadAction();

  }

  async function uploadAction() {

    // console.log(TAG + ' will upload ', originalFile);
    // const gotFileUrlAfterUpload = await uploadFile(originalFile);
    // console.log(TAG + ' file url after upload ', gotFileUrlAfterUpload);
    // setUploadedFileName(gotFileUrlAfterUpload);

    // let itemval = [];
    // for (let item of files) {
    //   itemval.push({
    //     uid: item.uid,
    //     name: item?.name,
    //     status: 'done',
    //     thumbUrl: 'https://i.ibb.co/MVS6KWX/file.png',
    //     size: item?.size,
    //     type: item?.type
    //   })
    // }

    // setDelAllow(false);
    // setFiles(itemval);
  }

  return (

    <div className='px-0 mt-3' >

      <input
        type="file"
        name="bulkFiles"
        id="bulkFiles"
        className="d-none"
        ref={inputFileRef}
        onChange={onSelectFile}
        accept={accept}
      />

      {!files.length &&
        <div className="d-flex mb-2 align-items-end pb-1 " >
          <IconTitleButton
            imgSrc={uploadIcon}
            title={title}
            onClickCall={inputTrigger}
          />
        </div>
      }

      <div className='d-flex align-items-center pb-3' >
        <div className='mt-0' >
          <FileGotCalled />
        </div>

        {files.length !== 0 && delAllow == true ?
          <div className="" >
            <ButtonSimple
              title="Upload"
              type="voilet"
              onClickEvent={uploadHit}
            />
          </div>
          : null}
      </div>
    </div>

  );
}

export default UploadSingle;
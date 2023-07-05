import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ButtonSimple from '@/component/buttonsimple/buttonsimple';
import IconButton from '@/component/iconbutton/iconbutton';
import FileUpload from '@/component/fileupload/fileupload';
import ToastComponent from '@/component/Toast/Toast';

import { mike, add, back, upload } from '@/utils/image';

const FileUploadComp = () => {

  const inputFileRef: any = React.useRef();
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [delAllow, setDelAllow] = useState<boolean>(true);


  const inputTrigger = () => {
    inputFileRef.current.click();
  }

  const onSelectFile = (element: any) => {

    // setFileInfo(null);
    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    // if (element.target.files[0].size > CompanyLogoSize.size) {
    //   ToastComponent(fileSizeUnder.replace('%key%', "Logo").replace('%size%', CompanyLogoSize.sizeN));
    //   return;
    // }

    const holdFile = element.target.files[0];
    console.log('file details ', holdFile);

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
    console.log('got removed', item);
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


  function uploadHit() {

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

  }

  return (

    <div className='px-3 mt-3' >

      <input
        type="file"
        name="bulkFiles"
        id="bulkFiles"
        className="d-none"
        ref={inputFileRef}
        onChange={onSelectFile}
      // accept={ALLOWED_IMG}
      />

      <div className='' >
        <IconButton imgSrc={upload} onClickCall={inputTrigger} />
      </div>

      <div className='mt-0' >
        <FileGotCalled />
      </div>

      {files.length && delAllow == true &&
        <div className="mt-4 pb-4" >
          <ButtonSimple
            title="Upload"
            type="voilet"
            onClickEvent={uploadHit}
          />
        </div>
      }
    </div>

  );
}

export default FileUploadComp;
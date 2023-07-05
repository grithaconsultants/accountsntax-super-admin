import React from 'react';

import CustomInput from '@/component/input/input';
import IconButton from '@/component/iconbutton/iconbutton';
import ToastComponent from '@/component/Toast/Toast';

import { fileSizeUnder } from '@/utils/message';
import { upload, uploadIcon, close } from '@/utils/image';

const FilePicker = (props: any) => {

  const {
    name,
    id,
    label,
    fileInfo,
    setFileInfo,
    icon,
    accept,
    validation
  } = props;


  const inputFileRef: any = React.useRef();

  const inputTrigger = () => {
    inputFileRef.current.click();
  }

  const onSelectFile = (element: any) => {

    setFileInfo(null);
    if (element.target.files && element.target.files.length < 1) {
      return;
    }

    if (element.target.files[0].size > validation.size) {
      ToastComponent(fileSizeUnder.replace('%key%', "Logo").replace('%size%', validation.sizeN));
      return;
    }

    const holdFile = element.target.files[0];
    // console.log('file details ', holdFile);

    setFileInfo({
      name: holdFile?.name,
      size: holdFile?.size,
      type: holdFile?.type,
      url: URL.createObjectURL(element.target.files[0])
    });

  }

  function removeSelectedFile(){
    setFileInfo(null);
    // const fileRef: any = document.getElementById(id);
    // fileRef.value = null;
  }


  return (
    <div className='d-flex align-items-end' >
      <CustomInput
        label={label}
        id={`${id}1`}
        name={`${name}1`}
        placeholder={fileInfo !== null ? fileInfo.name : "file name"}
        type="text"
        disabled={true}
        asterisk={false}
      />

      <input
        type="file"
        id={id}
        name={name}
        className="d-none"
        ref={inputFileRef}
        onChange={onSelectFile}
        accept={accept}
      />

      <div className='ms-2' >
        {fileInfo === null ?
          <IconButton imgSrc={icon} onClickCall={inputTrigger} />
          :
          <IconButton imgSrc={close} onClickCall={removeSelectedFile} />
        }
      </div>
    </div>

  );
}

export default FilePicker;
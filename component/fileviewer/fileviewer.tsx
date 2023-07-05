import React, { useState, useEffect } from 'react';
import { FaDownload, FaTrash, FaCloudUploadAlt } from "react-icons/fa";

import IconBox from '@/component/iconbox/iconbox';
import ImageViewer from '@/component/imageviewer/imageviewer';
import { companyJPG } from '@/utils/image';

import { getAWSFileUrl, isEmpty } from '@/utils/helper';
import { ALLOWED_IMG_NAME } from '@/utils/constants';

const TAG = "FileViewer: ";
const FileViewer = (props: any) => {

  const [loading, setLoading] = useState<null | string>(null);
  const [fileOrImage, setType] = useState<null | string>("image");
  const [customError, setError] = useState<boolean>(false);

  const [awsLink, setawsLink] = useState<null | string>("https://i.ibb.co/QkBMd5s/loading.png");
  const { dowloadAction, uploadAction, deleteAction, title, fileUrl } = props;

  if (uploadAction == true) {
    const { accept, allowedSize, sizeText, setUploadedFileName } = props;
  }

  useEffect(() => {
  if (isEmpty(fileUrl)) {
    setawsLink("https://i.ibb.co/wMcXb7b/no-file.png");
  } else {
    const extensionRegex: any = /(?:\.([^.]+))?$/;
    console.log(TAG + " file url ", fileUrl);

    const ext = extensionRegex.exec(fileUrl)[1];
    console.log(TAG + " extension from url ", ext);

    if (ext === undefined) {
      setError(true);
    } else {
      const isImage = ALLOWED_IMG_NAME.includes(ext);
      console.log(TAG + " is image or not ", isImage);
      if (isImage == true) {
        setawsLink("https://i.ibb.co/wMcXb7b/no-file.png");
      } else {
        setawsLink("https://i.ibb.co/9gj4hTV/images.jpg");
      }
    }

    // const geturl: any = await getAWSFileUrl(fileUrl);
    // setLoading(geturl);

  }
  },[0]);






  return (
    <div className='fileviewer' >

      <div className='f-header border-bottom ' > {title} </div>

      <div className=' f-body  ' >
        <ImageViewer
          width={100}
          height="auto"
          preview={false}
          imageURL={awsLink}
          placeholderWidth={100}
        />
      </div>

      <div className='f-footer border-top' >

        {dowloadAction == true &&
          <div className='mx-2' >
            <IconBox
              type="text"
              icon={<FaDownload color="#673275" />}
              loading={false}
            // onClickEvent={() => { setEditCompany(true) }}
            />
          </div>
        }

        {uploadAction == true &&
          <div className='mx-2' >
            <IconBox
              type="text"
              icon={<FaCloudUploadAlt color="#673275" />}
              loading={false}
            // onClickEvent={() => { setEditCompany(true) }}
            />
          </div>
        }

        {deleteAction == true &&
          <div className='mx-2' >
            <IconBox
              type="text"
              icon={<FaTrash color="#673275" />}
              loading={false}
            // onClickEvent={() => { setEditCompany(true) }}
            />
          </div>
        }


      </div>


    </div >
  );
};

export default FileViewer;
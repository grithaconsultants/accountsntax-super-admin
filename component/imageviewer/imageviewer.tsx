import React, { useState, useEffect } from 'react';
import { Image } from 'antd';

import { getAWSFileUrl, isEmpty } from '@/utils/helper';

const TAG = "ImageViewer: ";
const ImageViewer = (props: any) => {

  const { width, height, preview, placeholderWidth, imageFileName, placeholderImage } = props;
  const [loading, setLoading] = useState<null | string>(null);

  useEffect(() => {
    getAWS();
  }, [0]);

  async function getAWS() {

    if (isEmpty(imageFileName)) {
      setLoading(placeholderImage);
    } else {
      const getUrl = await getAWSFileUrl(imageFileName);
      setLoading(getUrl);
    }

  }

  return (
    <div>
      <Image
        width={width}
        height={height}
        preview={preview}
        src={loading == null ? "https://i.ibb.co/QkBMd5s/loading.png" : loading}
        placeholder={
          <Image
            src="https://i.ibb.co/QkBMd5s/loading.png"
            width={placeholderWidth}
            preview={false}
          />
        }
      />
    </div>
  );
};

export default ImageViewer;
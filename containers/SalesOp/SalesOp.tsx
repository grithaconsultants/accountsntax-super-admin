import React from 'react';
import Image from 'next/image';
import { create_account, view_account, upload, clarification } from '@/utils/image';

const SalesOp: React.FC = () => {
  return (
    <>
      <div className="action-block d-xl-flex d-lg-flex d-md-block">

        <div className=" col-xl-6 col-lg-6 col-12 pe-lg-2 pe-0">
          <div className="py-4 action-block-self w-100  " >
            <div>
              <div className="w-100 d-flex justify-content-center">
                <Image src={create_account} alt="Create icon" width={48} height={48} priority />
              </div>
              <div className="w-100 d-flex justify-content-center item-title pt-2">Create</div>
            </div>
          </div>
        </div>

        <div className=" col-xl-6 col-lg-6 col-12 ps-lg-2 ps-0 mt-lg-0 mt-3">
          <div className="py-4 action-block-self w-100  " >
            <div>
              <div className="w-100 d-flex justify-content-center">
                <Image src={view_account} alt="Create icon" width={48} height={48} priority />
              </div>
              <div className="w-100 d-flex justify-content-center item-title pt-2">View</div>
            </div>
          </div>
        </div>

      </div>

      <div className="action-block d-xl-flex d-lg-flex d-md-block mt-3">

        <div className=" col-xl-6 col-lg-6 col-12 pe-lg-2 pe-0">
          <div className="py-4 action-block-self w-100  " >
            <div>
              <div className="w-100 d-flex justify-content-center">
                <Image src={upload} alt="Upload icon" width={48} height={48} priority />
              </div>
              <div className="w-100 d-flex justify-content-center item-title pt-2">Upload</div>
            </div>
          </div>
        </div>

        <div className=" col-xl-6 col-lg-6 col-12 ps-0 mt-lg-0 mt-3">
          <div className="py-4 action-block-self w-100  " >
            <div>
              <div className="w-100 d-flex justify-content-center">
                <Image src={clarification} alt="Create icon" width={48} height={48} priority />
              </div>
              <div className="w-100 d-flex justify-content-center item-title pt-2">Clarification</div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default SalesOp;
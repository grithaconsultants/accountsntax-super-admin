import React from 'react';
import ThemeButtonMD from '@/component/buttonmedium/buttonmedium';

const PettyCash = () => {
  return (
    <div className="pcash-block d-lg-flex d-md-flex d-block pt-4" >
      <div className="col-xl-5 col-lg-5 col-md-5 col-12 d-flex justify-content-center">
        <div className="flex-wrapper">
          <div className="single-chart-pcash">
            <svg viewBox="0 0 36 36" className="circular-chart orange">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="22" className="percentage d-none">75%</text>
            </svg>
          </div>
        </div>
      </div>
      <div className="col-xl-7 col-lg-7 col-md-7 col-12 d-flex pt-4 position-relative">
        <div className="d-flex pt-3">

          <div className="d-flex pc-cont me-3" >
            <div className="block-marker me-2 mt-1 voilet" > </div>
            <div className="pc-type voilet" >Wallet <br /> <span className="voilet" > &#8377; 740</span> </div>
          </div>

          <div className="d-flex pc-cont" >
            <div className="block-marker me-2 mt-1 orange" > </div>
            <div className="pc-type orange" >Cash <br /> <span className="orange" >300</span> </div>
          </div>

        </div>

        <div className="position-absolute end-0 bottom-0" >
          <ThemeButtonMD type="btn-theme-orange" title="Record Transaction" />
        </div>

      </div>

    </div>
  );
}

export default PettyCash;
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import CustomTooltip from "@/component/tooltip/tooltip";

import {
  logo776x120,
  dashboard,
  account,
  arrow,
  income_tax,
  gst,
  tds,
  arrowh,
  icegate,
  alert,
  tally,
  mis,
  wallet,
  profile,
  users,
  settings,
  subscription,
  services,
  about,
  refer,
} from "@/utils/image";

const TAG = "Navigation: ";
const Navigation = (props: any) => {
  const router = useRouter();
  const { sidebarStatus, setSide } = props;

  const [childMenu, setChildMenu] = useState<string>("none");

  function expandAndRotate(target: string) {
    if (target === childMenu) {
      setChildMenu("none");
    } else {
      setChildMenu(target);
    }
  }

  function closeSidebar() {
    setSide("none");
  }

  const directToTarget = (target: string) => {
    console.log(TAG + " Creds ", target);
    router.push(target);
  };

  return (
    <>
      <div
        className={`navSection ${
          sidebarStatus === "open" ? " active " : " none "
        } `}
      >
        <nav className="navSelf">
          <ul className="p-0">
            <li className="logoSec">
              <Image
                src={logo776x120}
                alt="accountNtax logo"
                width={776}
                height={120}
              />
            </li>

            {/* <li className="active"> */}
            {/* <li onClick={() => directToTarget("/home")} className='cp active' >
              <div className="navItem active">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={dashboard} alt="dashboard icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Dashboard" >Dashboard</CustomTooltip>
                  </div>
                </div>
              </div>
            </li> */}

      
            <li onClick={() => directToTarget("clients")} className="cp">
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox">
                      <Image src={mis} alt="mis icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="CLient">Client</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li onClick={() => directToTarget("companies")} className="cp">
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox">
                      <Image
                        src={services}
                        alt="services icon"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Companies">Companies</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            
          </ul>
        </nav>
      </div>

      <div
        className={`overlay-c-box ${
          sidebarStatus === "open" ? " active " : " none "
        } `}
        onClick={closeSidebar}
      >
        {" "}
      </div>
    </>
  );
};

export default Navigation;

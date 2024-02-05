import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import CustomTooltip from "@/component/tooltip/tooltip";

import { logo776x120, mis, services } from "@/utils/image";

const TAG = "Navigation: ";

const Navigation = (props: any) => { 

  const router = useRouter();

  const { sidebarStatus, setSide } = props;

  const [childMenu, setChildMenu] = useState<string>("none");
  const [selectMenu, setSelectMenu] = useState<string>("null");

  const [display, setDisplay] = useState<any>({
    clients: "active",
    companies: " ",
  });

  useEffect(() => {
    const { pathname } = router;
    if (pathname) {
      setSelectMenu(pathname);
    }
  }, [0]);

  function expandAndRotate(target: string) {
    setSelectMenu(target);
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
    setSelectMenu(target);
    router.push(target);
  }

  return (
    <>
      <div className={`navSection ${sidebarStatus === "open" ? " active " : " none "} `}>
        <nav className="navSelf">
          <ul className="p-0">
            <li className="logoSec">
              <Image src={logo776x120} alt="accountNtax logo" width={776} height={120} />
            </li>

            <li onClick={() => directToTarget("/clients")} className={`cp ${selectMenu === 'null' ? 'active' : (selectMenu === '/clients' ? 'active' : "")}`} >
              <div className="navItem active">
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

            <li onClick={() => directToTarget("/companies")} className={`cp ${selectMenu === '/companies' ? 'active' : ""}`} >
            {/* <li
              onClick={() => directToTarget("companies")}
              className={`cp ${display.companies}`}
            > */}
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

      <div className={`overlay-c-box ${sidebarStatus === "open" ? " active " : " none "} `} onClick={closeSidebar}>
        {" "}
      </div>
    </>
  );
};

export default Navigation;

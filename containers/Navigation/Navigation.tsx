import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomTooltip from '@/component/tooltip/tooltip';

import {
  logo776x120, account, arrow, income_tax, arrowh, profile, users, about, refer,

  dashboard,
  rmSvg,
  clientmanager,
  datarepo,
  subscription,
  services,
  accessright,
  communication,
  storage,
  promotion,
  compliancestatus,
  task,
  analytics,
  settings,
  attendance,
  bulkimport,
} from '@/utils/image';

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
  }


  return (
    <>
      <div className={`navSection ${sidebarStatus === "open" ? " active " : " none "} `}>
        <nav className="navSelf">
          <ul className="p-0" >

            <li className="logoSec">
              <Image src={logo776x120} alt="accountNtax logo" width={776} height={120} />
            </li>

            <li className="active">
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
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={rmSvg} alt="relationship icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Relationship Manager" >Relationship Manager </CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={clientmanager} alt="clientmanager icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Client Manager" >Client Manager</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={datarepo} alt="datarepo icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Data Repository" >Data Repository</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={subscription} alt="subscription icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Subscription" >Subscription</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={services} alt="services icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Services" >Services</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={accessright} alt="accessright icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Access Rights" >Access Rights</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={communication} alt="Communication icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Communication" >Communication</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={storage} alt="storage icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Storage" >Storage</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={promotion} alt="promotion icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Promotion" >Promotion</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={compliancestatus} alt="compliancestatus icon" width={24} height={24} />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Compliance Status" >Compliance Status </CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={task} alt="task icon" width={24} height={24} priority />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Task" >Task</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={analytics} alt="analytics icon" width={24} height={24} priority />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Analytics" >Analytics</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={settings} alt="settings" width={24} height={24} priority />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Settings" >Settings</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={attendance} alt="attendance" width={24} height={24} priority />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Attendance" >Attendance</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="navItem">
                <div className="navLeft">
                  <div className="navImg">
                    <div className="iconBox" >
                      <Image src={bulkimport} alt="bulkimport" width={24} height={24} priority />
                    </div>
                  </div>
                  <div className="navTlt">
                    <CustomTooltip title="Bulk Import" >Bulk Import</CustomTooltip>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </nav >
      </div >

      <div className={`overlay-c-box ${sidebarStatus === "open" ? " active " : " none "} `} onClick={closeSidebar} > </div>
    </>

  );
}

export default Navigation;
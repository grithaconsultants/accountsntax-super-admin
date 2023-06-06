import React, { useState, useEffect } from 'react';
import { Layout } from "antd";

import Header from '@/containers/Header/Header';
import Navigation from '@/containers/Navigation/Navigation';
import { getToken, isEmpty } from '@/utils/helper';

const { Content } = Layout;
const TAG = "HomeLayout: ";
const HomeLayout = (props: any) => {

  const [sidebarStatus, setSide] = useState<string>("none");
  const [userData, setUserData] = useState<any>("");
  const { children } = props;

  // useEffect(() => {
  //   const userDataT = getToken();
  //   if (!isEmpty(userDataT)) {
  //     setUserData(userDataT);
  //   }
  // }, [0]);

  return (
    <>
      <main className="main">
        <Navigation sidebarStatus={sidebarStatus} setSide={setSide} />

        <div className="contSection" >
          <Header setSide={setSide} userData={userData} />
          <Content>{children}</Content>
        </div>
      </main>
    </>
  );
}

export default HomeLayout;

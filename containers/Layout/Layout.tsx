import React, { useState } from 'react';
import { Layout } from "antd";
import { useSelector } from 'react-redux';

import Header from '@/containers/Header/Header';
import Navigation from '@/containers/Navigation/Navigation';

const { Content } = Layout;
const TAG = "HomeLayout: ";
const HomeLayout = (props: any) => {

  const { children } = props;

  const { adminData } = useSelector((state: any) => state.adminData);

  const [sidebarStatus, setSide] = useState<string>("none");
  const [refetchAction, setrefetchAction] = useState<any>(true);

  return (
    <>
      <main className="main">
        <Navigation sidebarStatus={sidebarStatus} setSide={setSide} />

        <div className="contSection" >
          <Header
            setSide={setSide}
            adminData={adminData}
            setrefetchAction={setrefetchAction}
          />
          <Content>{children}</Content>
        </div>
      </main>
    </>
  );
}

export default HomeLayout;

import React, { useState } from 'react';
import { Col, Row,} from 'antd';

import HomeLayout from '@/containers/Layout/Layout';

const TAG = "Home: ";

const Home = () => {

  const [sidebarStatus, setSide] = useState<string>("none");

  return (
    <>
      <HomeLayout>
        <section id="contentSection">
          <div className="layout-contWrapper" >
            <div className="layout-cardArea" >
              <Row>
                <Col>
                  <h1>Dashboard</h1>
                </Col>
              </Row>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
}


export default Home;
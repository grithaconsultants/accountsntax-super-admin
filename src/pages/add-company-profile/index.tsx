import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';


import HomeLayout from '@/containers/Layout/Layout';
import CompanyAdd from '@/containers/CompanyAdd/CompanyAdd';

const TAG = "AddCompany: ";
const AddCompany = () => {

  const UIBlock = () => {
    return <h1>Add Company</h1>
  }

  const UISales = () => {
    return <h1>Sales</h1>
  }

  const UISecurity = () => {
    return <h1>Security</h1>
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Add Customer`,
      children: <CompanyAdd />,
    },
    {
      key: '2',
      label: `Sales`,
      children: <UISales />,
    },
    {
      key: '3',
      label: `Security`,
      children: <UISecurity />,
    }
  ];


  return (
    <HomeLayout>

      <section id="profileSection">
        <div className="layout-contWrapper" >

          <div className="breadcrumb-wrapper" >
            <div className="br-left" >
              <span className="br-light-tlt" >Add Company</span>
            </div>
            <div className="br-right" >
            </div>
          </div>

          <div className="layout-cardArea bg-lo br-10 p-3" >
            <div className="pr-section" >
              <Tabs defaultActiveKey="1" items={items} />
            </div>
          </div>

        </div>
      </section>

    </HomeLayout>
  );

}

export default AddCompany;

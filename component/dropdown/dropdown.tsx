import React from 'react';
import { useRouter } from 'next/router';

import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const SimpleDropdown = (props: any) => {

  const router = useRouter();

  const { title } = props;

  const logoutProcess = () => {
    localStorage.clear();
    router.push('/login');
  }

  const redirectToProfile = () => {
    router.push('/user-profile');
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={redirectToProfile} >Profile </span>
      )
    },
    {
      key: '2',
      label: (
        <span onClick={logoutProcess} >Logout </span>
      )
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space> {title} <DownOutlined rev="" /> </Space>
      </a>
    </Dropdown>
  );

};

export default SimpleDropdown;
import React from 'react';
import { FileOutlined, DownloadOutlined, FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { read, writeFileXLSX, utils } from "xlsx";


const IconDropdown = (props: any) => {

  const { fileName, sheetName, sheetData, isXLSX, isCSV, isPDF } = props;

  let exportOptions = [];

  if (isXLSX) {
    exportOptions.push({
      label: 'XLSX',
      key: '1',
      icon: <FileExcelOutlined rev="" />
    });
  }

  if (isCSV) {
    exportOptions.push({
      label: 'CSV',
      key: '2',
      icon: <FileOutlined rev="" />
    });
  }

  if (isPDF) {
    exportOptions.push({
      label: 'PDF',
      key: '3',
      icon: <FilePdfOutlined rev="" />
    });
  }


  const handleMenuClick: MenuProps['onClick'] = (menuItemClicked) => {

    if (menuItemClicked.key == "1") {
      generateSheet();
    }

  };

  const menuProps = { items: exportOptions, onClick: handleMenuClick };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('click left button', e);
  };

  async function generateSheet() {

    const ws = utils.json_to_sheet(sheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);
    writeFileXLSX(wb, fileName);

  }

  return (
    <div className='' >
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            <DownloadOutlined rev="" />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
}

export default IconDropdown;
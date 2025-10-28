import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, DropDownItem, Space } from '@xybot/ui';
import type { MenuProps } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Profile',
    extra: '⌘P',
  },
  {
    key: '3',
    label: 'Billing',
    extra: '⌘B',
  },
  {
    key: '4',
    label: 'Settings',
    icon: <SettingOutlined />,
    extra: '⌘S',
  },
];

const App: React.FC = () => (
  <div className="">
    <DropDownItem>DropDownItem</DropDownItem>
    <Dropdown menu={{ items }} trigger={['click']} open>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  </div>
);

export default App;

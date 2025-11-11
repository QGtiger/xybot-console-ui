import { SettingOutlined } from '@ant-design/icons';
import { DropDownItem, UIButton, UIDropdown } from '@xybot/ui';
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
    <UIDropdown
      menu={{ items }}
      trigger={['click']}
      placement="bottomRight"
      footer={<DropDownItem>Footer Area</DropDownItem>}
      open
      width={200}
      maxHeight={100}
      useCustomStyle
    >
      <UIButton>测试</UIButton>
    </UIDropdown>

    <UIDropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <UIButton>测试</UIButton>
    </UIDropdown>
  </div>
);

export default App;

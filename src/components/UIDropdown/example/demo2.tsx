import { SettingOutlined } from '@ant-design/icons';
import { DropDownItem, UIButton, UIDropdown } from '@xybot/ui';
import type { MenuProps } from 'antd';
import React from 'react';

const baseItems: MenuProps['items'] = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  { type: 'divider' },
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

const manyItems: MenuProps['items'] = Array.from({ length: 12 }, (_, i) => ({
  key: `row-${i}`,
  label: `菜单项 ${i + 1}`,
}));

export default () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      alignItems: 'flex-start',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--text-base-tertiary, #888)' }}>
        useCustomStyle：ScrollArea + 底部 footer
      </span>
      <UIDropdown
        menu={{ items: manyItems }}
        trigger={['click']}
        placement="bottomLeft"
        useCustomStyle
        width={220}
        maxHeight={200}
        footer={
          <DropDownItem style={{ cursor: 'pointer', padding: '4px 8px' }}>
            固定底部操作区
          </DropDownItem>
        }
      >
        <UIButton type="primary" size="md">
          长列表 + 沉底 footer
        </UIButton>
      </UIDropdown>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--text-base-tertiary, #888)' }}>
        默认包装（无 useCustomStyle）
      </span>
      <UIDropdown
        menu={{ items: baseItems }}
        trigger={['click']}
        placement="bottomLeft"
      >
        <UIButton type="border" size="md">
          标准菜单
        </UIButton>
      </UIDropdown>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--text-base-tertiary, #888)' }}>
        自定义 popupRender（useCustomStyle 时优先于内置包装）
      </span>
      <UIDropdown
        menu={{ items: baseItems }}
        trigger={['click']}
        placement="bottomLeft"
        useCustomStyle
        popupRender={(menu) => (
          <div
            className="rounded-lg border border-solid p-3"
            style={{
              borderColor: 'var(--border-base-secondary, #e8e8e8)',
              background: 'var(--bg-base-container, #fff)',
              minWidth: 200,
            }}
          >
            <div style={{ fontSize: 12, marginBottom: 8, opacity: 0.65 }}>
              完全自定义头部
            </div>
            {menu}
          </div>
        )}
      >
        <UIButton type="secondary" size="md">
          自定义面板
        </UIButton>
      </UIDropdown>
    </div>
  </div>
);

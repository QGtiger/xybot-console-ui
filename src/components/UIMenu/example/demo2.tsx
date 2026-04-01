import { UIMenu } from '@xybot/ui';
import type { MenuProps } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  { key: 'a', label: '菜单项 A' },
  { key: 'b', label: '菜单项 B' },
  { key: 'c', label: '菜单项 C' },
];

const sizes = [
  { size: 'lg' as const, label: 'size=lg（行高 32）' },
  { size: 'xl' as const, label: 'size=xl（行高 36，默认）' },
  { size: 'xxl' as const, label: 'size=xxl（行高 40）' },
];

/** 三种行高对比 */
export default () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      alignItems: 'flex-start',
    }}
  >
    {sizes.map(({ size, label }) => (
      <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--text-base-tertiary, #888)' }}>
          {label}
        </span>
        <UIMenu
          size={size}
          style={{ width: 200 }}
          defaultSelectedKeys={['a']}
          items={items}
        />
      </div>
    ))}
  </div>
);

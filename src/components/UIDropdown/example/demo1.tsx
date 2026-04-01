import { UIButton, UIDropdown } from '@xybot/ui';
import type { MenuProps } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制' },
  { type: 'divider' },
  { key: 'delete', label: '删除', danger: true },
];

/**
 * 默认样式：不开启 useCustomStyle，下拉层由 antd Menu + 本库 overlay 样式渲染。
 */
export default () => (
  <UIDropdown menu={{ items }} trigger={['click']} placement="bottomLeft">
    <UIButton type="border" size="md">
      操作
    </UIButton>
  </UIDropdown>
);

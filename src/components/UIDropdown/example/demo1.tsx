import { UIButton, UIDropdown } from '@xybot/ui';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  { key: 'edit', label: '编辑' },
  {
    key: 'copy',
    label: '复制',
    children: [
      { key: 'copy1', label: '复制1' },
      { key: 'copy2', label: '复制2' },
    ],
  },
  { type: 'divider' },
  { key: 'delete', label: '删除', danger: true },
];

/**
 * 默认样式：不开启 useCustomStyle，下拉层由 antd Menu + 本库 overlay 样式渲染。
 */
export default () => (
  <UIDropdown open menu={{ items }} trigger={['click']} placement="bottomLeft">
    <UIButton type="border" size="md">
      操作
    </UIButton>
  </UIDropdown>
);

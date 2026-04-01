---
title: UIMenu 导航菜单
apiHeader: true
group:
  title: 通用
xybotuiDescription: "基于 Ant Design Menu 的内联侧栏菜单：固定 mode=inline、prefixCls=ui-menu 与内边距/圆角等样式；通过局部 ConfigProvider 按 size（lg/xl/xxl）映射 itemHeight 与选中/悬停 token；从类型中排除 theme，由封装统一控制。"
---

# UIMenu

基于 [Ant Design Menu](https://ant-design.antgroup.com/components/menu-cn) 封装，适用于控制台侧栏、设置页分节导航等 **内联** 场景。视觉与交互 token 由 `index.less` 与内层 `ConfigProvider` 共同约束。

:::info

以下属性由组件**写死**，传入也会被覆盖，请勿依赖修改它们来改变布局模式：

- `mode` 恒为 **`inline`**
- `inlineIndent` 恒为 **`10`**
- `prefixCls` 恒为 **`ui-menu`**

:::

<code src="./example/demo1.tsx"></code>

<code src="./example/demo2.tsx"></code>

## API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :----- | :--- |
| size | `'lg' \| 'xl' \| 'xxl'` | `'xl'` | 菜单项行高：`lg` → 32px，`xl` → 36px，`xxl` → 40px（通过 antd Menu 的 `itemHeight` token） |
| 其他属性 | `Omit<MenuProps, 'theme'>` | - | 如 `items`、`selectedKeys` / `defaultSelectedKeys`、`openKeys` / `defaultOpenKeys`、`onClick`、`style`、`className` 等；**不支持** antd 的 `theme` 字段 |

更多能力与数据结构见 [Menu API](https://ant-design.antgroup.com/components/menu-cn#api) 与 `items` 配置说明。

## 使用示例

```tsx | pure
import { UIMenu } from '@xybot/ui';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  { key: '1', label: '概览' },
  { key: '2', label: '设置' },
];

export function Demo() {
  return (
    <UIMenu
      size="lg"
      style={{ width: 240 }}
      defaultSelectedKeys={['1']}
      items={items}
      onClick={({ key }) => {
        // 路由跳转或状态更新
      }}
    />
  );
}
```

## 注意事项

- 需要 **顶部横向 Menu** 或 **弹出式 SubMenu** 等模式时，请直接使用 antd `Menu` 或另做封装；本组件仅服务 **内联侧栏** 形态。
- 颜色与背景依赖 CSS 变量（如 `--text-base-default`、`--bg-fill-deep-default`），请在外层使用 **`ThemeProvider`**，与设计系统一致。
- 内层 `ConfigProvider` 仅覆盖 `Menu` 组件 token，不会替换应用全局主题。

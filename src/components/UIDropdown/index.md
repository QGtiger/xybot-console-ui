---
title: UIDropdown 下拉菜单
apiHeader: true
group:
  title: 通用
xybotuiDescription: "基于 Ant Design Dropdown：固定 prefixCls=ui-dropdown 与控制台 overlay 样式；可选 useCustomStyle 用 ScrollArea 包裹菜单并支持 width/maxHeight 与沉底 footer；可完全自定义 popupRender。"
---

# UIDropdown

基于 [Ant Design Dropdown](https://ant-design.antgroup.com/components/dropdown-cn) 封装，用于触发器 + 浮层菜单场景。类型为 `OmitPrefixCls<DropdownProps>`（去掉 `prefixCls`）并扩展 **`footer` / `width` / `maxHeight` / `useCustomStyle`**。内部固定 **`prefixCls="ui-dropdown"`**，通过 `overlayClassName` 区分 **`ui-dropdown-default-style`** 与 **`ui-dropdown-custom-style`**（见 `index.less`）。

## 与 useCustomStyle、popupRender、footer 的关系

| 场景 | 行为 |
| :--- | :--- |
| `useCustomStyle` 为假或未传 | 浮层内直接渲染 antd 生成的 `menu`，**不**应用内置的 ScrollArea / footer 包装；此时传入的 `footer`、`width`、`maxHeight` **不会**通过本组件默认逻辑生效。 |
| `useCustomStyle` 为真，且**未**传 `popupRender` | 使用内置布局：外层容器宽度为 `width`（默认 `max-content`），菜单主体包在 `ScrollArea` 内，`maxHeight` 控制滚动区高度（默认 `auto`）；若存在 `footer`，在滚动区下方展示分隔线与 footer。 |
| `useCustomStyle` 为真，且**传入** `popupRender` | **仅**调用你的 `popupRender(menu)`，内置 ScrollArea/footer **不会**自动拼接；需要沉底区时请在自己的 `popupRender` 里实现。 |

<code src="./example/demo1.tsx"></code>

<code src="./example/demo2.tsx"></code>

## API

### 扩展属性

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :----- | :--- |
| useCustomStyle | `boolean` | - | 为真时使用自定义浮层结构（见上表）；为假时为默认菜单样式 |
| width | `number \| string` | `'max-content'`（内置包装时） | 仅在默认 `popupRender` 包装层上生效 |
| maxHeight | `number \| string` | `'auto'` | 滚动区域最大高度，超出由 `ScrollArea` 滚动 |
| footer | `React.ReactNode` | - | 仅在默认自定义包装下渲染在菜单下方 |

### 其余属性

与 [Dropdown](https://ant-design.antgroup.com/components/dropdown-cn#api) 一致，例如 `menu`、`trigger`、`placement`、`disabled`、`open` / `onOpenChange`、`overlayClassName`（会与内部 class 合并）。antd 5 中 `dropdownRender` 已废弃，请优先使用 `popupRender`（本组件在部分分支会覆盖该属性，见上文说明）。

> 说明：本组件用传入的函数**覆盖** antd 的 `popupRender` 以实现上述分支逻辑；在 `useCustomStyle === false` 时该函数直接返回 `menu`，因此不会执行你在 props 上传入的自定义 `popupRender`（若需自定义，请开启 `useCustomStyle`）。

## 使用示例

```tsx | pure
import { DropDownItem, UIButton, UIDropdown } from '@xybot/ui';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  { key: '1', label: '选项一' },
  { key: '2', label: '选项二' },
];

export function Demo() {
  return (
    <>
      <UIDropdown menu={{ items }} trigger={['click']}>
        <UIButton>打开</UIButton>
      </UIDropdown>
      <UIDropdown
        menu={{ items }}
        trigger={['click']}
        useCustomStyle
        width={240}
        maxHeight={280}
        footer={<DropDownItem>底部操作</DropDownItem>}
      >
        <UIButton>可滚动 + footer</UIButton>
      </UIDropdown>
    </>
  );
}
```

## 注意事项

- 需要 **footer 固定在下、中间列表滚动** 时，必须 **`useCustomStyle`**，并避免在未自行布局的情况下仅依赖 `footer`。
- 底部区域若需与菜单项视觉对齐，可使用同包内的 **`DropDownItem`**（`ui-dropdown-item`）或自管样式。
- `ScrollArea` 来自本库 `blocks`，请保证应用已按文档正常注册区块依赖（与包导出一致即可）。

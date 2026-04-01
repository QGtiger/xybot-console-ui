---
title: UIButton 按钮
apiHeader: true
group:
  title: 通用
xybotuiDescription: "基于 Ant Design Button 的控制台按钮：自定义 size（xs～xl）与 type（border/text/base/primary/danger/secondary 及 magic 系列），固定 prefixCls=ui-btn 与样式 token；loading 合并默认图标；支持 ThemeProvider.componentConfig.uiButton 注入默认 props。"
---

# UIButton

基于 [Ant Design Button](https://ant-design.antgroup.com/components/button-cn) 封装。对内始终向 antd 传入 `type="default"` 与 `prefixCls="ui-btn"`，通过 `className`（`ui-btn-size-*` / `ui-btn-type-*`）承载视觉变体；样式见 `index.less`。

`useDefaultProps(props, 'uiButton')` 会与 `ThemeProvider` 的 `componentConfig.uiButton` 合并，**未配置时**代码内默认 **`type` 为 `danger`、`size` 为 `lg`**（若你们在根上配置了 `componentConfig`，以运行期合并结果为准）。

<code src="./example/demo1.tsx"></code>
<code src="./example/demo2.tsx"></code>

## API

| 名称 | 类型 | 默认值（未配置 componentConfig 时） | 描述 |
| :--- | :--- | :----- | :--- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | 按钮尺寸与内边距 |
| type | `'border' \| 'text' \| 'base' \| 'primary' \| 'danger' \| 'secondary' \| 'magic-light' \| 'magic-primary'` | `'danger'` | 视觉变体；`magic-*` 为带渐变光晕/描边的强调样式 |
| autoInsertSpace | `boolean` | `false` | 是否在两个汉字间插入空格；与 antd 默认不同，此处默认关闭 |
| loading | `boolean \| { delay?: number; icon?: ReactNode }` | - | 为真时使用内置旋转图标作为默认 loading 图标，传入对象时可与默认图标浅合并 |
| 其他属性 | `Omit<AntdButtonProps, 'type' \| 'size' \| 'variant' \| 'prefixCls' \| 'danger'>` | - | 如 `disabled`、`onClick`、`icon`、`htmlType`、`className`、`style` 等 |

`UIButtonProps` 为具名导出类型。

## 尺寸说明 (size)

- `xs`：超小（高度约 20px）
- `sm`：小（约 24px）
- `md`：中等
- `lg`：**默认**，大号
- `xl`：超大

## 类型说明 (type)

- `border`：描边按钮
- `text`：纯文字按钮
- `base`：基础填充按钮
- `primary`：主操作（高亮填充）
- `danger`：**代码默认**，危险/删除向语义色
- `secondary`：次要填充（中性灰底）
- `magic-light`：浅色底 + 装饰性光晕与 hover 渐变描边，适合轻量强调
- `magic-primary`：魔法主色渐变背景 + 光晕，适合强视觉主按钮场景

## 与 Ant Design Button 的差异

- 不使用 antd 的 `type`（`primary`/`dashed`/…）、`size`、`variant`、`prefixCls`；其中 `danger` 作为 antd 的 boolean 属性也已从类型中剔除，危险样式请用本组件 **`type="danger"`**。
- 其余行为与 antd 对齐；更多属性见 [Button API](https://ant-design.antgroup.com/components/button-cn#api)。

## 使用示例

```tsx | pure
<UIButton>未传 type/size 时使用组件内默认 danger + lg</UIButton>

<UIButton type="primary" size="md">
  主按钮中等尺寸
</UIButton>

<UIButton type="magic-light" size="sm">
  魔法浅色
</UIButton>

<UIButton type="border" icon={<Icon />} loading>
  加载中
</UIButton>
```

## 注意事项

- 不要传入 antd 的 `type`、`size`、`variant`、`prefixCls`、`danger`；尺寸与危险样式一律用本组件的 `size` / `type`。
- 需要在应用内统一默认尺寸或类型时，在 `ThemeProvider` 上配置 `componentConfig.uiButton`，无需封装新组件。

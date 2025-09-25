---
order: 2
title: UITag 标签
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---


UITag 是一个标签组件，用于展示分类、状态或其他简短信息，支持多种样式和交互效果。

<code src="./example/demo1.tsx"></code>

# API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 标签尺寸 |
| type | `'border' \| 'text' \| 'textSecondary' \| 'fillSecondary' \| 'fillPrimary'` | `'border'` | 标签样式类型 |
| preset | `'default' \| 'info' \| 'brand'` | `'default'` | 预设颜色方案 |
| icon | `React.ReactNode` | - | 标签前缀图标 |
| closable | `boolean` | `false` | 是否显示关闭按钮 |
| onClose | `() => void` | - | 关闭按钮点击回调 |
| disabled | `boolean` | `false` | 是否禁用标签 |
| ...其他属性 | `Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' \| 'size'>` | - | 支持所有标准的 button HTML 属性 |

## 尺寸说明 (size)

- `sm`: 小尺寸标签
- `md`: 中等尺寸标签（默认）
- `lg`: 大尺寸标签

## 类型说明 (type)

- `border`: 边框样式
- `text`: 文字样式
- `textSecondary`: 次要文字样式
- `fillSecondary`: 次要填充样式
- `fillPrimary`: 主要填充样式

## 预设说明 (preset)

- `default`: 默认颜色方案
- `info`: 信息色方案
- `brand`: 品牌色方案

## 使用示例

```tsx | pure
// 基础用法
<UITag>默认标签</UITag>

// 带图标和关闭按钮
<UITag icon={<Icon />} closable onClose={handleClose}>
  可关闭标签
</UITag>

// 不同尺寸和类型
<UITag size="sm" type="fillPrimary" preset="brand">
  小号品牌标签
</UITag>

// 禁用状态
<UITag disabled>禁用标签</UITag>
```

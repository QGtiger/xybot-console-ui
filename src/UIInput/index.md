---
order: 3
title: UIInput 输入
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---

# UIInput

输入框组件。

<code src="./example/demo1.tsx"></code>

## API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| type | `'border' \| 'borderless' \| 'filledsecondary' \| 'filledbase'` | `'border'` | 输入框样式类型 |
| size | `'md' \| 'lg' \| 'xl' \| 'xxl'` | `'md'` | 输入框尺寸 |
| className | `string` | - | 自定义 CSS 类名 |
| ...其他属性 | `React.InputHTMLAttributes<HTMLInputElement>` | - | 支持所有标准的 input HTML 属性 |

## 类型说明 (type)

- `border`: 带边框的输入框样式
- `borderless`: 无边框的输入框样式
- `filledsecondary`: 次要填充背景的输入框
- `filledbase`: 基础填充背景的输入框

## 尺寸说明 (size)

- `md`: 中等尺寸（默认）
- `lg`: 大尺寸
- `xl`: 超大尺寸
- `xxl`: 最大尺寸

## 使用示例

```tsx | pure
// 默认输入框
<UIInput placeholder="请输入内容" />

// 无边框大尺寸输入框
<UIInput type="borderless" size="lg" placeholder="大尺寸无边框输入框" />

// 填充背景的超大尺寸输入框
<UIInput type="filledsecondary" size="xl" placeholder="超大填充输入框" />

// 带自定义样式的输入框
<UIInput className="custom-input" placeholder="自定义样式" />
```

## 标准 Antd input 属性支持

详细参考 [antd input](https://ant-design.antgroup.com/components/input-cn?theme=light#api)

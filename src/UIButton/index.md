---
order: 1
title: UIButton 按钮
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---


# UIButton

按钮组件，基于 Ant Design Button 封装。

<code src="./example/demo1.tsx"></code>

## API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 按钮尺寸 |
| type | `'border' \| 'text' \| 'base' \| 'primary' \| 'danger' \| 'secondary'` | `'base'` | 按钮样式类型 |
| ...其他属性 | `Omit<AntdButtonProps, 'type' \| 'size' \| 'variant' \| 'prefixCls'>` | - | 支持 Ant Design Button 的其他属性 |

## 尺寸说明 (size)

- `xs`: 超小尺寸
- `sm`: 小尺寸
- `md`: 中等尺寸（默认）
- `lg`: 大尺寸
- `xl`: 超大尺寸

## 类型说明 (type)

- `border`: 边框按钮
- `text`: 文字按钮
- `base`: 基础按钮
- `primary`: 主要按钮
- `danger`: 危险按钮
- `secondary`: 次要按钮

## 支持的 Ant Design Button 属性

该组件支持大部分 Ant Design Button 的属性，例如：

- `disabled`: 禁用状态
- `loading`: 加载状态
- `onClick`: 点击事件
- `icon`: 图标
- `htmlType`: 按钮原生类型（submit、button、reset）
- `className`: 自定义类名
- `style`: 自定义样式

## 使用示例

```tsx | pure
// 基础按钮
<UIButton>默认按钮</UIButton>

// 主要按钮
<UIButton type="primary">主要按钮</UIButton>

// 小尺寸危险按钮
<UIButton type="danger" size="sm">删除</UIButton>

// 带图标的边框按钮
<UIButton type="border" icon={<Icon />}>操作</UIButton>

// 加载状态的大尺寸按钮
<UIButton size="lg" loading>加载中...</UIButton>

// 超大尺寸次要按钮
<UIButton type="secondary" size="xl">大按钮</UIButton>
```

## 注意事项

- 该组件排除了 Ant Design Button 原生的 `type`、`size`、`variant` 和 `prefixCls` 属性
- 使用自定义的 `type` 和 `size` 属性来定义按钮样式和尺寸

其余详细配置 查看 [antd button](https://ant-design.antgroup.com/components/button-cn?theme=light#api)

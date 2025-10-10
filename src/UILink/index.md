---
order: 7
title: UILink 文字按钮
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---

# UILink 组件说明

基于原生 `button` 元素自主实现的链接样式组件，独立于设计稿中的文字按钮。

## 配置项

### color

- **类型**: `default` | `info` | `secondary`
- **默认值**: `default`
- **说明**: 控制链接的文字颜色
- **样式对应**:
  - `default`: 文字基础
  - `info`: 文字强调
  - `secondary`: 文字次要

### disabled

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 禁用状态

### onClick

- **类型**: `function`
- **说明**: 点击事件处理函数

<code src="./example/demo1.tsx"></code>

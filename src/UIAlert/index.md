---
order: 17
title: UIAlert
group:
  title: 通用
nav:
  title: 组件
  order: 4
---

# UIAlert 组件说明

基于 [Ant Design Alert](https://ant-design.antgroup.com/components/alert-cn) 组件二次开发，扩展了类型配置项。

## 配置项

### type

- **类型**: `success` | `info` | `warning` | `error` | `secondary`
- **说明**: 控制警告提示的样式类型
- **新增枚举值**:
  - `secondary`: 次要样式类型

## 兼容性说明

- 完全兼容原有 Ant Design Alert 组件的所有类型 (`success`, `info`, `warning`, `error`)
- 新增 `secondary` 类型，提供额外的视觉样式选项
- 保持原有组件的所有其他配置项和行为不变

<code src="./example/demo2.tsx"></code>

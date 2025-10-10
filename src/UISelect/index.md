---
order: 4
title: UISelect 选择器
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---

# UISelect

基于 Ant Design Select 组件进行了功能扩展，新增了以下配置项：

## 新增配置项

### 1. size

- **类型**: `md` | `lg` | `xl` | `xxl`
- **默认值**: `lg`
- **说明**: 控制选择框的尺寸
- **对应高度**:
  - `md`: 28px
  - `lg`: 32px
  - `xl`: 36px
  - `xxl`: 40px

### 2. type

- **类型**: `border` | `borderless` | `filledsecondary` | `filledbase`
- **默认值**: `border`
- **说明**: 控制选择框的视觉样式
- **样式对应**:
  - `border`: 线性基础
  - `borderless`: 文字基础
  - `filledsecondary`: 面型次要
  - `filledbase`: 面型基础

<code src="./example/demo1.tsx"></code>

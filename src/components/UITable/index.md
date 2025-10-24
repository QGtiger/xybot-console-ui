---
title: UITable
group:
  title: 通用
---

# UITable

基于 [Ant Design Table](https://ant-design.antgroup.com/components/table-cn#when-to-use) 组件进行了功能扩展，新增了以下配置项：

## 新增配置项

### 1. size

- **类型**: `md` | `lg`
- **说明**: 控制表格每一行的尺寸
- **对应高度**:
  - `sm`: 36px
  - `lg`: 64px

### 2. hoverType

- **类型**: `withRadius` | `withoutRadius`
- **说明**: 控制表格行的 hover 效果样式
- **效果**:
  - `withRadius`: 带圆角的 hover 效果
  - `withoutRadius`: 不带圆角的 hover 效果

<code src="./example/demo2.tsx"></code>

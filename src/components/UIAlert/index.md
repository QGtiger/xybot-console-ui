---
title: UIAlert 警告提示
apiHeader: true
group:
  title: 通用
xybotuiDescription: "基于 Ant Design Alert 封装：统一 prefixCls 与样式（无边框、图标色与设计 token 对齐），在保留 success/info/warning/error 语义的前提下扩展 type=secondary 次要样式。"
---

# UIAlert

基于 [Ant Design Alert](https://ant-design.antgroup.com/components/alert-cn) 封装，用于页面内非阻塞式提示。组件内部固定 `prefixCls="ui-alert"`，并覆盖边框与各类型的图标颜色；`type="secondary"` 时使用次要背景色（见 `index.less`）。

<code src="./example/demo2.tsx"></code>

## API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :----- | :--- |
| type | `'success' \| 'info' \| 'warning' \| 'error' \| 'secondary'` | - | 视觉类型；`secondary` 为本库扩展，其余与 Ant Design 语义一致 |
| 其他属性 | `Omit<AlertProps, 'type'>` | - | 与 [Alert](https://ant-design.antgroup.com/components/alert-cn#api) 一致，例如 `message`、`description`、`showIcon`、`banner`、`closable`、`onClose` 等 |

`UIAlertProps` 即上述类型的具名导出，便于业务侧扩展或包装。

## type 说明

- `success` / `info` / `warning` / `error`：行为与 Ant Design 一致，样式走本库 token（图标色等）。
- `secondary`：中性次要提示，无对应 Ant Design 原生 `type`，实现为带 `ui-alert-secondary` 类名的 Alert（不传 antd 的 `type`）。

## 使用示例

```tsx | pure
import { UIAlert } from '@xybot/ui';

<UIAlert showIcon type="success" message="操作成功" />
<UIAlert type="secondary" message="补充说明类文案" />
<UIAlert
  type="warning"
  message="标题"
  description="可配合 description 展示详情。"
  closable
/>
```

## 注意事项

- 不要自行传入 `prefixCls`，由组件内部统一为 `ui-alert`，以保证样式命中。
- 未改动 Ant Design Alert 的交互与无障碍结构；若需与全局主题联动，请保证外层已使用本库的 `ThemeProvider`。

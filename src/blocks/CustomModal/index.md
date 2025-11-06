---
title: CustomModal
apiHeader: true
group:
  title: 通用
---

## CustomModal

:::info
针对 useCustomModal 弹窗组件(hooks) 的 组件式 使用
:::

:::warning
注意 由于 CustomModal 是完全复写了 Modal 的页面结构，所以
Modal 自带的 title, onCancel, cancelProps 等属性将不再生效。
具体配置会被收口到 `customModalProps` 配置项
:::

<code src="./examples/demo1.tsx"></code>

---
order: 2
title: useCustomModal
group:
  title: 区块
---

## useCustomModal 自定义弹窗

:::info
卓越中心业务侧孵化的 的弹窗组件
:::

| 属性名    | 类型                                                                  | 必填 | 说明                                       |
| --------- | --------------------------------------------------------------------- | ---- | ------------------------------------------ |
| title     | React.ReactNode                                                       | 是   | 弹窗标题                                   |
| subTitle  | React.ReactNode \| ((toggleNode: React.ReactNode) => React.ReactNode) | 否   | 副标题，支持直接传入内容或渲染函数         |
| logo      | React.ReactNode                                                       | 否   | 图标/Logo 内容                             |
| extra     | React.ReactNode                                                       | 否   | 引导内容                                   |
| closeable | boolean                                                               | 否   | 是否显示关闭按钮                           |
| content   | React.ReactNode                                                       | 否   | 弹窗主体内容                               |
| rtRender  | (closeBtn: React.ReactNode) => React.ReactNode                        | 否   | 右上角自定义渲染方法，接收关闭按钮作为参数 |

<code src="./examples/demo1.tsx"></code>

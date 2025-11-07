---
title: useCustomModal
apiHeader: true
group:
  title: 通用
---

## useCustomModal 自定义弹窗

:::info
卓越中心业务侧孵化的 的弹窗组件
当前 useCustomModal 的上下文是最顶层的。 采用的 modal 是通过 ThemeModal 导出的。
可以采用 useCustomModalWithHolder hooks 获取当前 contextholder
:::

:::warning
由于 hooks 的版本 content 和 footer 渲染逻辑是完全解耦的，但是在业务侧，存在 footer 渲染受控于 content.
导致可能需要 自己手写 footer，这样就会影响到 弹窗的滚动逻辑-。-

所以提供了 content function, 详细使用可以简单看 demo。
注意 📢。 setFooter 记得放到 useLayoutEffect 里面好了。
:::

| 属性名            | 类型                                                                                                                   | 必填 | 说明                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------ |
| title             | React.ReactNode                                                                                                        | 是   | 弹窗标题                                   |
| subTitle          | React.ReactNode \| ((toggleNode: React.ReactNode) => React.ReactNode)                                                  | 否   | 副标题，支持直接传入内容或渲染函数         |
| logo              | React.ReactNode                                                                                                        | 否   | 图标/Logo 内容                             |
| isWithLogoWrapper | boolean                                                                                                                | 否   | 是否包含 Logo 包装容器                     |
| headerBorder      | boolean                                                                                                                | 否   | 是否显示头部边框                           |
| headerStyle       | React.CSSProperties                                                                                                    | 否   | 头部自定义样式                             |
| extra             | React.ReactNode                                                                                                        | 否   | 引导内容                                   |
| closeable         | boolean                                                                                                                | 否   | 是否显示关闭按钮                           |
| content           | React.ReactNode                                                                                                        | 否   | 弹窗主体内容                               |
| rtRender          | (closeBtn: React.ReactNode) => React.ReactNode                                                                         | 否   | 右上角自定义渲染方法，接收关闭按钮作为参数 |
| footer            | React.ReactNode \| ((originNode: React.ReactNode, extra: { OkBtn: React.FC; CancelBtn: React.FC }) => React.ReactNode) | 否   | 底部内容，支持直接传入或渲染函数           |
| okButtonProps     | UIButtonProps                                                                                                          | 否   | 确定按钮属性                               |
| okText            | React.ReactNode                                                                                                        | 否   | 确定按钮文本                               |
| cancelButtonProps | UIButtonProps                                                                                                          | 否   | 取消按钮属性                               |
| cancelText        | React.ReactNode                                                                                                        | 否   | 取消按钮文本                               |
| onOk              | () => void \| Promise<void>                                                                                            | 否   | 确定按钮回调函数                           |
| onCancel          | () => void \| Promise<void>                                                                                            | 否   | 取消按钮回调函数                           |

<code src="./examples/demo1.tsx"></code>

---
title: CustomAvatar
apiHeader: true
group:
  title: 通用
---

## CustomAvatar

:::info
UIAvatar 是基于 antd 进行开发，但是 antd 的 avatar，会进行响应式处理， 针对当前 显示 childrenToRender 计算 scale.
https://github.com/ant-design/ant-design/blob/master/components/avatar/Avatar.tsx#L215

在 table columns 拖拽会导致频繁渲染，在视觉上就是会空。

所以就简单实现替换掉原有的 UIAvatar。 不做响应式
:::

<code src="./examples/demo1.tsx"></code>

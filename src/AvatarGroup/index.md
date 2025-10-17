---
order: 1
title: AvatarGroup
group:
  title: 区块
---

## AvatarGroup

:::info
头像组合呈现. 响应式
:::

| Name               | Type                                 | Description        | Required | Default |
| ------------------ | ------------------------------------ | ------------------ | -------- | ------- |
| avatarList         | `AvatarItem[]`                       | 头像列表           | Yes      | -       |
| borderWidth        | `number`                             | 边框宽度           | No       | `0`     |
| indent             | `number`                             | 缩进距离           | No       | `-8`    |
| avatarSize         | `number`                             | 头像大小           | No       | `40`    |
| mergeTextFormatter | `(count: number) => React.ReactNode` | 合并文本格式化函数 | No       | -       |

<code src="./examples/demo1.tsx"></code>

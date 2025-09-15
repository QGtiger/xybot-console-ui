---
order: 2
title: 安装
group: 介绍
---


# 使用说明

1.依赖安装

```bash
pnpm add @xybot/ui
```

2.引入全局样式. 需要手动在外层包裹一次`ThemeProvider`. 例如:

```tsx | pure
import { ThemeProvider } from '@xybot/ui';

export default function App(props: any) {
  return (
    <ThemeProvider>
      {props.children}
    </ThemeProvider>
  );
}

```

3.然后再具体业务逻辑中使用

```typescript
import { Button } from '@xybot/ui'
```

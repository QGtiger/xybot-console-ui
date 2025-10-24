---
title: ScrollArea
apiHeader: true
group:
  title: 通用
---

基于 `simplebar-react` 封装的滚动区域组件，用于替换浏览器原生滚动条，支持自定义样式和多种交互功能。

## 组件简介

`ScrollArea` 组件是对 `simplebar-react` 的封装，旨在为 React 应用提供可自定义样式的滚动条。它解决了不同浏览器间滚动样式不统一的问题，特别是在火狐（Firefox）等浏览器中也能实现样式自定义。

## 安装与引入

您的组件包名为 `@xybot/ui`，可以直接引入使用：

```javascript
import { ScrollArea } from '@xybot/ui';
```

## API 属性说明

`ScrollArea` 组件继承了 `simplebar-react` 的所有属性。以下是常用属性表格：

| 属性                                    | 类型                     | 默认值 | 说明                                                                  |
| --------------------------------------- | ------------------------ | ------ | --------------------------------------------------------------------- |
| `autoHide`                              | `boolean`                | `true` | 是否自动隐藏滚动条。设为 `false` 时，只要内容超出就会一直显示滚动条。 |
| `forceVisible`                          | `"x"` \| `"y"` \| `"xy"` | -      | 强制显示滚动条。                                                      |
| `style`                                 | `React.CSSProperties`    | -      | 设置滚动区域容器样式，常用 `height` 或 `maxHeight` 控制滚动区域尺寸。 |
| `className`                             | `string`                 | -      | 自定义滚动区域容器的 CSS 类名。                                       |
| `scrollbarMinSize` / `scrollbarMaxSize` | `number`                 | -      | 滚动条最小/最大尺寸。                                                 |
| `onScroll`                              | `Function`               | -      | 滚动时触发的回调函数。                                                |

## 使用范例

<code src="./example/demo1.tsx"></code>

更详细的样式定制，可以参考 `simplebar-react` 的官方文档。

## 注意事项

1. **样式导入**：组件已经导入了 `simplebar-react` 的默认样式，您只需在需要时添加自定义样式。
2. **性能优化**：对于大型列表或复杂内容，建议结合虚拟滚动技术使用。
3. **移动端适配**：组件默认支持触摸操作，在移动设备上表现良好。

## 兼容性

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 兼容 React 16.8+（支持 Hooks）

希望这份文档能帮助您更好地使用 `ScrollArea` 组件！如有更多需求，可以参考 [simplebar-react 官方文档](https://www.npmjs.com/package/simplebar-react)。

---
title: ThemeProvider 主题提供者
apiHeader: true
group:
  title: 通用
xybotuiDescription: "应用根级包装组件：注入 Ant Design ConfigProvider 的亮色/暗色主题与组件 token，挂载全局样式与图标字体；通过 ThemeModel 提供 modal 与暗色标记；通过 componentConfig 为 UIButton/UIInput 等提供默认 props。"
---

# ThemeProvider

在应用根部使用，统一控制台视觉主题与 Ant Design 组件变量。内部使用 [ConfigProvider](https://ant-design.antgroup.com/components/config-provider-cn)，并合并本库的 `lightTheme` / `darkTheme`（见 `theme.ts`）；同时引入全局 `global.less`、`styles.css`、iconfont 及 ThemeProvider 自身样式。

:::info

- 暗色模式下会为 `document.documentElement` 切换 `dark` class，便于 CSS 变量与自定义样式联动。
- 默认将 Ant Design 的「水波纹」效果关闭（`wave.disabled`），若 `isUseAntdTheme` 为 true 则不再注入上述自定义 `theme` 对象，水波纹等行为以 Ant Design 默认为准。

:::

<code src="./example/demo1.tsx"></code>

## API（ThemeProvider）

除下表所列扩展项外，支持 [ConfigProvider](https://ant-design.antgroup.com/components/config-provider-cn) 的其余属性，但 **`theme` 与 `prefixCls` 由本组件接管**，请勿传入。

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :----- | :--- |
| theme | `ThemeType`（与 ahooks `useTheme` 一致，通常为 `'light' \| 'dark'`） | `'light'` | 亮色 / 暗色；决定注入的 algorithm 与 `theme.ts` 中的 token |
| isUseAntdTheme | `boolean` | - | 为 true 时不注入本库自定义 `theme`（`theme` 传空对象），仅保留 ConfigProvider 其它配置 |
| isUseAntdOriginModal | `boolean` | - | 非 true 时会把 `UIModal` 实例挂到 `ModalRef`，与全局 `Modal.xxx` 类 API 联动；为 true 时不改写，使用 Ant Design 原生 Modal 静态方法行为 |
| componentConfig | `ComponentConfig` | - | 为子树内 `UIButton` / `UIInput` / `UISelect` / `UILink` 合并默认 props（通过 `useDefaultProps` 消费） |
| children | `ReactNode` | - | 子节点；会在树末渲染 `modalHolder`（UIModal 容器） |

`ThemeModel.Provider` 注入的值在 `useMemo` 中生成，包含 **`modal`**、**`isDarkMode`**（由 `theme === 'dark'` 推导）以及传入的其它 props（含 `componentConfig`）。

## 相关导出

| 名称 | 说明 |
| :--- | :--- |
| `ThemeModel` | `createCustomModel` 生成的 model，子组件中 `ThemeModel.useModel()` 可取 `modal`、`isDarkMode`、`componentConfig` 等 |
| `useDefaultProps(props, key)` | 从上下文读取 `componentConfig` 中对应 key 的默认值，再与当前 props 浅合并（后者优先） |
| `ComponentConfig` | `uiButton` / `uiInput` / `uiSelect` / `uiLink` 可选默认 props 类型 |
| `ThemeMode`、`ThemeType` | 自 `ahooks/useTheme` 再导出，便于类型标注 |

## 使用示例

```tsx | pure
import { ThemeProvider, UIButton } from '@xybot/ui';

export function App() {
  return (
    <ThemeProvider theme="light" componentConfig={{ uiButton: { size: 'md' } }}>
      <UIButton type="primary">提交</UIButton>
    </ThemeProvider>
  );
}
```

## 注意事项

- 业务应用应在最外层只包一层 `ThemeProvider`，避免嵌套多套 ConfigProvider 导致 token 难以推理。
- 若完全使用 `isUseAntdTheme`，需自行保证与设计稿一致的变量来源（本库 token 与 CSS 变量将不再通过该 ConfigProvider 注入）。
- `useDefaultProps` 仅作用于显式接入的 UI 组件；新增组件若需同样能力，需在组件内调用并传入对应 `ComponentConfig` 键名。

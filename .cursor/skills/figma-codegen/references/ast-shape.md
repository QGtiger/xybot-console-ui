# figmaui `processed` 输出结构（摘要）

与 MCP `generate_from_figma` 一致：常见字段如下。

## 顶层

- **`meta`**：如 `parsedUrl`、`wholeImageLayerNames` 等。
- **`processed.assets`**：资源 URL 列表，与生码资源落盘配合使用。
- **`processed.ast`**：清洗后的树，生码主输入。

## AST 节点（常见字段）

| 字段 | 含义 |
|------|------|
| `type` | 布局类或组件名；与 [ui-components.md](ui-components.md) 表中「组件名」一致时可映射到 `@xybot/ui` |
| `style` / `layout` / `children` / `text` / `asset` | 见 figmaui 实际输出 |

组件映射见 [ui-components.md](ui-components.md)；示例与 API 用 **`xybotui info` / `xybotui demo`**（见 xybotui-llm-context skill）。

## `type: "icon"` 与生码约定

常见形态：`style` 里有占位宽高，`asset` 里有 `index` / `path` / `mode`（如 `contain`）及另一组宽高。生码时 **不把**这些数字写成 React 图标组件上的 `width`/`height` 或 Tailwind 尺寸类。

具体规则（`?react` 引入、禁止在图标上设 size、仅用父级布局对齐）见 Skill **「5. 生码 → 图标」** 小节。

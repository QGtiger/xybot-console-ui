---
name: figma-codegen
description: 基于 figmaui MCP 的 generate_from_figma 将设计稿生成为目标项目代码；按 references/ui-components.md 做 AST type 与 @xybot/ui 的映射，具体 props 与示例用 xybotui info/demo（见 xybotui-llm-context skill）。`SKILL.md`、`references/`、`scripts/` 可整份复制到目标项目使用。
---

# Figma Codegen Skill

将 Figma 设计稿通过 **`generate_from_figma`** 转为目标项目代码。

## 工作流总览

```
定位 TARGET_DIR → MCP 取 AST（JSON）→ analyze_figma_ast_dependencies.mjs → 对齐依赖 → download_figma_assets → ui-components 映射 + xybotui info/demo → 生码 → Checklist
```

## 工作流程

### 1. 定位目标目录

按页面/路由约定确定输出位置（如页面 `<目录>/index.tsx`，子组件 `<目录>/components/<Name>.tsx`），与用户确认后记为 `TARGET_DIR`。

### 2. 调用 MCP 获取 AST

使用 figmaui MCP：

```
generate_from_figma(url: string)
```

`url` 须含 `node-id`；其余参数以工具定义为准。保留完整 JSON（含 `processed.ast`、`processed.assets`）。结构摘要见 [references/ast-shape.md](references/ast-shape.md)。

### 3. 脚本遍历 AST，输出依赖 JSON

执行 [scripts/analyze_figma_ast_dependencies.mjs](scripts/analyze_figma_ast_dependencies.mjs)：

```bash
node scripts/analyze_figma_ast_dependencies.mjs --file ./mcp-result.json
# 或: cat mcp-result.json | node scripts/analyze_figma_ast_dependencies.mjs
```

对 `processed.ast` **深度优先遍历**：若存在 `type` 以 **`UI`** 开头的节点，则 **`needsXybotUi` 为 true**，并输出建议依赖 **`@xybot/ui`** 与 **`antd@5.27.4`**（版本与 `package.json` 冲突时以本 JSON 为准）。**stdout 一行 JSON** 字段：

| 字段           | 用途                                                         |
| -------------- | ------------------------------------------------------------ |
| `needsXybotUi` | 是否检出 `UI*` 类型                                          |
| `dependencies` | 命中时为 `{ "@xybot/ui": "*", "antd": "5.27.4" }`，否则 `{}` |
| `matchedTypes` | 出现的 `UI*` 类型名列表（去重排序）                          |

随后：**按需安装或对齐上述依赖**。

### 4. 下载图片资源

从 MCP 结果中的 `processed.assets`（及设计上下文中的图片 URL）整理为 `[{ "url", "name" }]`。在**目标项目**中执行 [scripts/download_figma_assets.mjs](scripts/download_figma_assets.mjs)：

```bash
node scripts/download_figma_assets.mjs --output-dir TARGET_DIR/assets --assets '<JSON>'
```

扩展名由 Content-Type / 魔数决定。文件落在 `TARGET_DIR/assets/`；多组件复用时可将 `assets` 提到公共祖先目录。生码时**只引用已下载的本地路径**，不要用未落盘的 URL 占位。**`type: "icon"` 且落盘为 SVG**：后续 Step 5 一律按 **SVG React 组件（`?react`）** 使用，不要为图标再走 `?url` + `<img>` 分支（除非目标工程明确禁止 SVGR）。

**SVG 颜色（下载后建议处理）**：单色、需随父级文案色变化的图标，把 `fill` / `stroke` 里写死的颜色改成 **`currentColor`**，在 JSX **父级**用 `className` 的 `text-*`（或组件自带的 `color`）控制颜色；同时**去掉** SVG 上的 **`opacity` / `stroke-opacity` / `fill-opacity` 等透明度配置**，不要靠 SVG 自身做深浅，只靠父级 `text-*` 即可。**多色插图、品牌渐变**可保留原有 hex，或改为 `fill="var(--token)"` 等与项目 token 对齐。

### 5. 生码

- **映射**：以 [references/ui-components.md](references/ui-components.md) 为准：`type` 与表内「组件名」一致则按「引入」与「用法摘要」起笔；**具体 props、默认值、示例 JSX** 在目标项目执行 **`xybotui info <Name> --json`** 与 **`xybotui demo <Name> --json`**（流程见 `.cursor/skills/xybotui-llm-context/SKILL.md`），勿手写臆测。
- **布局 / 未映射 `type`**：按目标项目样式规范实现；**若**用 Tailwind 且需与 `@xybot/ui` 变量体系一致，可复制 [references/tailwind-tokens.md](references/tailwind-tokens.md) 中的配置片段（非必做）。
- **图片（非 icon）**：引用 Step 4 已下载的 `TARGET_DIR/assets/` 内文件；可用 `?url` + `<img>` 或工程约定的静态资源方式，按需写尺寸。
- **图标（`type: "icon"`，含带 `asset` 的图标节点）**（与 MCP 中 `style` / `asset` 字段的关系见 [references/ast-shape.md](references/ast-shape.md)）：
  - **引入**：落盘为 **SVG** 时，必须使用与目标工程一致的 **SVGR 写法**，例如  
    `import IconName from './assets/xxx.svg?react';`  
    在 JSX 中以 `<IconName />`（或 `<IconName aria-hidden />`）使用。**禁止**对该类图标使用 `import url from '...svg?url'` 再配 `<img width height>` 来「对齐」AST 里的像素。
  - **尺寸**：**不要在图标组件上再设显示尺寸**——不写 `width` / `height`、不写 Tailwind 的 `size-*` / `w-[Npx]` / `h-[Npx]` 等。呈现大小以 **导出 SVG 的固有尺寸（如 `viewBox` / 导出结果）** 为准。若稿里要在按钮、行内对齐，只用**父级**的 flex / `items-center` / `justify-center` / padding 控制位置与留白，**不要**为「贴齐父级」去放大图标组件。
  - **AST 数字怎么用**：节点上的 `style.width` × `style.height` 与 `asset.width` × `asset.height`（例如 `mode: "contain"` 时二者常不一致）仅用于**理解设计框与验稿**，**不映射**为图标组件上的 props 或 class。**禁止**用父级 Row/Frame 的尺寸替代本节点去写图标宽高，也禁止为「看着更大」在代码里等比放大图标。
  - **与 Step 4 颜色约定一致**：已在 SVG 内使用 `currentColor` 的图标，**在包裹层**（如 `UIButton`、flex 容器）设置 `text-textBase-*` / `text-textPrimary-*` 等即可；勿再在子级 SVG 组件上重复写死颜色类（除非设计明确要求局部多色）。

### 6. 交付前 Checklist

- [ ] 依赖与 `analyze_figma_ast_dependencies` 输出的 `dependencies` 一致（无冲突或已按 JSON 版本处理）。
- [ ] 若 Step 3 `needsXybotUi` 为 true：应用根已配置 `@xybot/ui` 的 `ThemeProvider`。
- [ ] 视觉与结构相对设计稿可接受；资源已本地化、无裸 URL 占位。
- [ ] 所有 `type: "icon"` 且为 SVG 的资源均已 `*.svg?react` 引入，且图标组件上无额外尺寸类 / 宽高 props（对齐仅依赖父级布局）；单色图标已按需改为 `currentColor`、颜色由父级 `text-*` 控制，且 SVG 内无 `opacity` / `stroke-opacity`。
- [ ] TypeScript 与路径别名正常，无多余未使用依赖。

## 使用示例

```
帮我把 https://www.figma.com/design/xxx/...?node-id=320:47457 转成 React 组件，输出到 src/components/Foo
```

## 参考

| 路径                                                                                     | 用途                                                                      |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [references/ui-components.md](references/ui-components.md)                               | AST `type` → `@xybot/ui` 映射（分组、引入、摘要）                         |
| `.cursor/skills/xybotui-llm-context/SKILL.md`                                              | `xybotui list/info/demo` 拉 props 与 demo 源码                            |
| [references/ast-shape.md](references/ast-shape.md)                                       | MCP 返回结构摘要                                                          |
| [references/tailwind-tokens.md](references/tailwind-tokens.md)                           | （可选）Tailwind 与 `@xybot/ui` 配套的 theme 片段，自写布局时用语义 class |
| [scripts/analyze_figma_ast_dependencies.mjs](scripts/analyze_figma_ast_dependencies.mjs) | DFS：`UI*` → `@xybot/ui` + `antd@5.27.4` JSON                             |
| [scripts/download_figma_assets.mjs](scripts/download_figma_assets.mjs)                   | 资源下载                                                                  |

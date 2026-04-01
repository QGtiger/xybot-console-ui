---
name: xybotui-llm-context
description: 通过 @xybot/ui 自带的 xybotui CLI（list / info / demo）拉取组件与 block 的清单、props、文档摘要与示例源码，整理后交给 LLM 做设计与编码。在用户提到 xybotui、npx xybotui、组件清单、把组件资料给 AI、查 UIButton 用法、或需要快速了解 @xybot/ui 某导出时使用。
---

# 用 xybotui 向 LLM 提供组件上下文

## 前置条件

- 业务仓库已安装依赖 **`@xybot/ui`**（`package.json` 中有该包）。
- CLI 从已发布包内的 **`dist/component-manifest.json`** 读数据；若报错「未找到 component-manifest.json」，说明装的包未带构建产物或版本异常，需换正确版本或联系发包方。

## 调用方式（在业务项目根目录）

优先使用与 `bin` 一致的命令名（与 `npx @xybot/ui` 等价，见包文档）：

```bash
pnpm exec xybotui <子命令>
# 或
npx xybotui <子命令>
```

## 三个子命令（给 LLM 的推荐顺序）

### 1. `list` — 有哪些组件 / block

```bash
xybotui list
xybotui list --json
```

- 无 `--json`：人类可读的分组列表（`## components` / `## blocks`）。
- **`--json`**：输出 `{ "components": [...], "blocks": [...] }`，适合脚本或需要精确名称时让模型选对 key（名称大小写不敏感，但 JSON 里是规范名）。

**给 LLM 时**：先贴 `list` 或 `list --json`，避免臆造不存在的组件名。

### 2. `info <Name>` — 做什么、有哪些 props

```bash
xybotui info UIButton
xybotui info UIButton --json
```

- 含：`kind`（component / block）、`displayName`、源码/JSDoc 说明、`descriptionFromIndexMd`（来自 `index.md` 的 `xybotuiDescription` / `description` 或清洗正文）、props 表（TS/docgen）。
- **`--json`**：完整 `ManifestEntry` 结构，便于模型解析 `props[].name` / `type` / `required`。

**给 LLM 时**：针对具体组件，优先贴 **`info <Name>`** 全文或 **`--json`** 再附一句用户任务。

### 3. `demo <Name>` — 示例怎么用

```bash
xybotui demo UIButton
xybotui demo UIButton --file demo1
xybotui demo UIButton --file demo1.tsx
xybotui demo TipTapEditor --json
```

- 输出 `example/` 或 `examples/` 下匹配的 **`demo*.tsx`** 源码。
- **`--file`**：只输出某一个 demo 文件。
- **`--json`**：`[{ file, content }, ...]`，适合程序化拼接 prompt。

**给 LLM 时**：在已贴 `info` 后追加 **`demo`**，用于补「写法与 import 路径」；块级组件 demo 路径可能为 `examples/`（与 manifest 扫描规则一致）。

## Agent 操作建议

1. 在**用户实际依赖 @xybot/ui 的项目根**执行上述命令（`run_terminal_cmd`），把 stdout 原样或精简后写入回复；不要凭记忆编造 props。
2. 名称不确定时先 **`list --json`**，再 **`info`** / **`demo`**。
3. 需要**结构化上下文**（多组件、自动化 prompt）时，对 `list` / `info` / `demo` 统一加 **`--json`**。
4. 若用户未安装包、只在 monorepo 子路径开发，指向装了 `@xybot/ui` 的目录再执行，或使用 workspace 协议包路径下的 `node_modules`。

## 最小工作流示例

```bash
npx xybotui list --json
npx xybotui info UIDropdown --json
npx xybotui demo UIDropdown --json
```

将三段输出依次提供给 LLM，即可覆盖：**名称空间、API、示例代码**。

## 与 figma-codegen

从 Figma AST 按 [figma-codegen 的 ui-components 映射表](../figma-codegen/references/ui-components.md) 得到组件名后，对每一个名执行 **`info` + `demo`** 即可替代旧的静态 examples 片段。

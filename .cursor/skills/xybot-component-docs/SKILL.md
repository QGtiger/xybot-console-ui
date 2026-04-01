---
name: xybot-component-docs
description: 按 xybot-console-ui 约定撰写或补全组件/区块的 index.md（dumi 文档），兼顾站点展示与下游 AI / component-manifest 消费。在用户新增组件、改 props、写说明文档、或提到「组件文档」「index.md」「喂给 AI」时使用。
---

# xybot 组件文档（index.md）

## 目标

- **站点**：dumi 渲染（frontmatter、`<code src="..."/>`、admonition、表格）。
- **manifest**：`scripts/generate-component-manifest.mjs` 写入 `dist/component-manifest.json` 的 `descriptionFromIndexMd`。
- **AI**：结构稳定、信息可检索；优先在固定小节里写清「是什么 / 何时用 / 与 antd 差异 / 注意点」。

## 文件位置与命名

- 组件：`src/components/<Name>/index.md`
- 区块：`src/blocks/<Name>/index.md`
- 与同级 `index.tsx`、示例目录（常见为 `example/` 或 `examples/`）保持一致。

## Frontmatter（必填与推荐）

与现有文档一致，使用 dumi 风格 YAML：

```yaml
---
title: 组件中文名（可与英文名并列）
apiHeader: true   # 需要展示 API 区时设为 true（与仓库惯例一致）
group:
  title: 通用     # 或设计令牌里已有分组
---
```

### 给 manifest / AI 的短描述（强烈建议）

构建脚本**只从 frontmatter 里读单行**字段（无多行 YAML）：

- 优先：`xybotuiDescription: "一句话说明组件职责与典型场景"`
- 或：`description: "..."`（与上二选一即可，脚本优先 `xybotuiDescription`）

规则：

- **必须单行**；较长时用**英文双引号**包一整句。
- 若设置了上述字段之一，脚本**只用该字段**作为 `descriptionFromIndexMd`，**不会**再把正文拼进去。
- 未设置时，才会用正文经处理后的文本：会移除 `<code />`、admonition 标记、**GFM 表格**，再压缩空行。因此**长说明不要只写在表格里**，表格留给 dumi 展示即可。

## 正文推荐结构（自上而下）

按此顺序写，便于人类扫读与 AI 分块理解（可删减小节，但顺序尽量不变）：

1. **标题 + 一句话概述**  
   `# ComponentName` 下用 1～2 句说明封装对象（如基于哪个 antd 组件）和核心能力。

2. **演示（靠前）**  
   在概述之后立即放交互 demo（团队现有习惯多为 UIButton 类；若概述很短也可紧跟概述后）。

   ```markdown
   <code src="./example/demo1.tsx"></code>
   ```

3. **设计意图 / 使用场景（可选）**  
   用 `:::info` 或短列表写「适合 / 不适合」场景，避免与 props 表重复堆砌。

4. **API（props 表）**  
   Markdown 表格，列名与仓库现有两种风格之一对齐即可（如：名称 / 类型 / 默认值 / 描述，或含 Required）。

5. **枚举或扩展项说明**  
   对 `type`、`size` 等枚举逐项一句说明（UIButton、UIAlert 类文档已有范例）。

6. **与 Ant Design（或上游）的关系**  
   列出透传、`Omit` 掉的 props、文档链接。

7. **代码片段（静态）**  
   使用 dumi 的 pure 代码块，便于复制、不参与 demo 编译：

   ````markdown
   ```tsx | pure
   <UIButton type="primary">提交</UIButton>
   ```
   ````

8. **注意事项 / 兼容性**  
   边界行为、破坏性变更、可访问性或与主题的耦合。

## 写作要点（机器友好）

- **先写 `xybotuiDescription`**：用完整句，包含组件角色 + 典型用途，避免只写单词。
- **小节标题用稳定措辞**：如「API」「与 Ant Design 的关系」「注意事项」，方便检索与同仓库一致。
- **类型列写完整 TS 字面量联合**：不要用「字符串」敷衍；与 `index.tsx` 类型一致。
- **差异写 explicit**：相对 antd「多了什么 / 少了什么 / 语义覆盖」各用短句列出。
- **避免信息只存在于表格**：manifest 正文抽取会删表格；概述与注意点应用散文或列表写在表格外。

## 自检清单

- [ ] `title`、`group.title` 已填
- [ ] 需要 API 导航时 `apiHeader: true`
- [ ] 已写单行 `xybotuiDescription`（或 `description`）
- [ ] `<code src>` 路径相对当前 `index.md` 存在
- [ ] props 与实现/类型导出一致；链接可访问
- [ ] 本地可执行 `node scripts/generate-component-manifest.mjs`，确认 manifest 中该组件 `descriptionFromIndexMd` 符合预期

## 最小示例骨架

```markdown
---
title: UIFoo
apiHeader: true
group:
  title: 通用
xybotuiDescription: "基于 Ant Design X 封装的 Foo，用于在控制台表单中统一展示 Bar。"
---

# UIFoo

一句话概述。基于 [Ant Design X](https://...) 的 Y 组件封装。

<code src="./example/demo1.tsx"></code>

## API

| 名称 | 类型 | 默认值 | 描述 |
| :--- | :--- | :----- | :--- |
| baz | `string` | - | 说明 |

## 注意事项

- 与 antd 的差异或限制
```

## 可选扩展

- 复杂组件可将长文放在同目录 `reference.md`，在 `index.md` 顶部用一行链接指向；manifest **不会**自动合并该文件，重要摘要仍应放在 `xybotuiDescription` 或正文非表格段落中。

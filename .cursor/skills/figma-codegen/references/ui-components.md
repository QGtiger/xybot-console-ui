# AST `type` → `@xybot/ui` 映射表

## 规则

1. `processed.ast` 节点 **`type` 与下表「组件名」字符串完全一致**时，从 `@xybot/ui` 按「引入」列生码；**props、默认值、与 antd 差异**不要猜，在已安装 `@xybot/ui` 的目标项目根执行：
   - **`xybotui info <组件名> --json`**
   - **`xybotui demo <组件名> --json`**（或 `--file demo1` 只要一个文件时）
2. 流程说明见 **`.cursor/skills/xybotui-llm-context/SKILL.md`**。未安装包、无法跑 CLI 时，可只看本表「用法摘要」作最小占位，上线前仍需对照包内类型或文档。
3. 表内名称以 **`@xybot/figmaui` 的 `components.json`** 为准；库侧新增导出后，应同步本表一行（或改 figmaui 映射），并可用 **`xybotui list --json`** 核对包内实际导出名。

**注意**：Step 3 脚本仅根据 **`UI*` 前缀** 判断是否依赖 `@xybot/ui`。表中 **无 `UI` 前缀** 的 `type`（如 `AvatarGroup`）若出现在 AST，需人工确认已装包；映射与生码仍按本表。

## 按场景分组

### 表单

| 组件名       | 引入                                      | 用法摘要                          |
| ------------ | ----------------------------------------- | --------------------------------- |
| UICheckbox   | `import { UICheckbox } from '@xybot/ui';`   | 受控/非受控勾选，子节点为标签文案 |
| UIRadio      | `import { UIRadio } from '@xybot/ui';`      | 单选，子节点为标签文案           |
| UISwitch     | `import { UISwitch } from '@xybot/ui';`     | 开关                             |
| UIInput      | `import { UIInput } from '@xybot/ui';`      | 输入框，`placeholder` 等         |
| UISelect     | `import { UISelect } from '@xybot/ui';`     | 下拉选择，`options` 等           |
| UIDatePicker | `import { UIDatePicker } from '@xybot/ui';` | 日期选择                         |

### 操作与导航

| 组件名     | 引入                                    | 用法摘要                                |
| ---------- | --------------------------------------- | --------------------------------------- |
| UIButton   | `import { UIButton } from '@xybot/ui';`   | `type` / `size` 见包文档，勿用 antd Button 的 type |
| UITag      | `import { UITag } from '@xybot/ui';`      | 标签                                    |
| UILink     | `import { UILink } from '@xybot/ui';`     | 链接，`href` 等                         |
| UIDropdown | `import { UIDropdown } from '@xybot/ui';` | `menu` + 触发子元素；`useCustomStyle` / `footer` 见 `info` |

### 反馈与容器

| 组件名      | 引入                                     | 用法摘要                    |
| ----------- | ---------------------------------------- | --------------------------- |
| UIModal     | `import { UIModal } from '@xybot/ui';`   | 弹层，`open` / `onOk` 等    |
| CustomModal | `import { CustomModal } from '@xybot/ui';` | 业务封装弹窗，`customModalProps` 等 |
| UIAlert     | `import { UIAlert } from '@xybot/ui';`   | `type`、`message` 等        |
| UITooltip   | `import { UITooltip } from '@xybot/ui';` | `title` + 触发子节点        |
| UIPopover   | `import { UIPopover } from '@xybot/ui';` | `content` + 触发子节点      |
| UISpin      | `import { UISpin } from '@xybot/ui';`    | `spinning` 等               |

### 数据展示

| 组件名      | 引入                                       | 用法摘要             |
| ----------- | ------------------------------------------ | -------------------- |
| UIDivider   | `import { UIDivider } from '@xybot/ui';`   | 分割线               |
| UIMenu      | `import { UIMenu } from '@xybot/ui';`      | 内联菜单 `items`     |
| UITable     | `import { UITable } from '@xybot/ui';`     | 表格 `columns` 等    |
| UITabs      | `import { UITabs } from '@xybot/ui';`      | `items` / `type` 等  |
| UIContainer | `import { UIContainer } from '@xybot/ui';` | 布局容器包裹子内容   |

### 布局与媒体

| 组件名          | 引入                                         | 用法摘要           |
| --------------- | -------------------------------------------- | ------------------ |
| AvatarGroup     | `import { AvatarGroup } from '@xybot/ui';`     | `avatarList` 等    |
| ScrollContainer | `import { ScrollContainer } from '@xybot/ui';` | 固定区域滚动       |
| ScrollArea      | `import { ScrollArea } from '@xybot/ui';`      | 滚动区域（块）     |
| UIAvatar        | `import { UIAvatar } from '@xybot/ui';`        | 头像，`name` 等    |
| CustomAvatar    | `import { CustomAvatar } from '@xybot/ui';`    | `src`、`name` 等   |

### 复杂业务块

| 组件名       | 引入                                       | 用法摘要                         |
| ------------ | ------------------------------------------ | -------------------------------- |
| TipTapEditor | `import { TipTapEditor } from '@xybot/ui';` | 富文本；扩展与样式以 `info` 为准 |
| CommentTree  | `import { CommentTree } from '@xybot/ui';`  | 评论树数据结构                   |

**依赖版本**：出现任意 `UI*` 时安装建议见 Step 3 脚本（`@xybot/ui` + `antd@5.27.4`）；与 lockfile 冲突时以业务仓库为准。

<p align="center">
  <img src="https://winrobot-pub-a-1302949341.cos.ap-shanghai.myqcloud.com/image/20240401164536/25f904c24902e72b398b718bb3e0ed18.svg" alt="@xybot/ui" width="120" />
</p>

<h1 align="center">@xybot/ui</h1>

<p align="center">
  <strong>xybot 控制台 UI 组件库</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@xybot/ui" target="_blank">
    <img src="https://img.shields.io/npm/v/@xybot/ui.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@xybot/ui" target="_blank">
    <img src="https://img.shields.io/npm/dm/@xybot/ui.svg" alt="npm downloads" />
  </a>
  <a href="./LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="license" />
  </a>
</p>

## 📖 简介

`@xybot/ui` 是基于 **Ant Design v5** 构建的 xybot 控制台 UI 组件库，提供了一套完整、统一、可定制的 UI 组件和业务模块，帮助开发者快速搭建 xybot 控制台应用。

### 特性

- 🎨 **完整的设计体系** — 基于 CSS 变量驱动的主题系统，支持亮/暗色主题一键切换
- 🧩 **丰富的组件** — 提供 20+ 通用 UI 组件，覆盖按钮、输入框、表格、弹窗等常见场景
- 🏗️ **业务模块** — 提供 AvatarGroup、TipTapEditor、CommentTree 等开箱即用的业务模块
- 🎭 **主题定制** — 通过 ThemeProvider 轻松定制品牌色、圆角、阴影等设计 Token
- 🌓 **暗色模式** — 内置完整的暗色主题方案，支持动态切换
- ⚡ **Tailwind CSS 集成** — 提供官方 Tailwind CSS 插件，在 Tailwind 中无缝使用设计 Token
- 🛠️ **CLI 工具** — 内置命令行工具，快速查看组件信息、Props 和示例代码
- 📦 **按需加载** — 支持 Tree Shaking，只引入使用的组件

## 📦 安装

```bash
# 使用 npm
npm install @xybot/ui

# 使用 pnpm
pnpm add @xybot/ui

# 使用 yarn
yarn add @xybot/ui
```

### 依赖要求

- **React**: >= 16.9.0
- **ReactDOM**: >= 16.9.0
- **antd**: 5.27.4
- **@ant-design/icons**: ^6.0.2

## 🚀 快速开始

### 基础使用

```tsx
import { UIButton, ThemeProvider } from '@xybot/ui';

function App() {
  return (
    <ThemeProvider>
      <UIButton type="primary">Hello xybot</UIButton>
    </ThemeProvider>
  );
}
```

### 引入样式

```tsx
// 在入口文件中引入全局样式
import '@xybot/ui/global.less';
```

### 使用设计 Token 变量

```less
// 在 Less 文件中使用设计变量
@import '@xybot/ui/variables.less';

.my-component {
  background: @bg-base-container;
  color: @text-base-default;
  border: 1px solid @border-base-default;
  border-radius: @radius-200;
  padding: @space-300;
  box-shadow: @drop-shadow-100;
}
```

### Tailwind CSS 集成

```js
// tailwind.config.js
module.exports = {
  plugins: [require('@xybot/ui/tailwind-color-ui')],
};
```

然后在 Tailwind 中使用设计 Token：

```html
<div
  class="bg-bgBase-container text-textBase-default border border-borderBase-default rounded-[--sds-size-radius-200] p-[--sds-size-space-300]"
>
  Hello xybot
</div>
```

## 🧩 组件列表

### 通用 UI 组件

| 组件                                                         | 描述                                   |
| ------------------------------------------------------------ | -------------------------------------- |
| [UIButton](https://github.com/QGtiger/xybot-console-ui)      | 按钮组件，支持多种类型和状态           |
| [UIInput](https://github.com/QGtiger/xybot-console-ui)       | 输入框组件                             |
| [UISelect](https://github.com/QGtiger/xybot-console-ui)      | 选择器组件                             |
| [UICheckbox](https://github.com/QGtiger/xybot-console-ui)    | 复选框组件                             |
| [UIRadio](https://github.com/QGtiger/xybot-console-ui)       | 单选框组件                             |
| [UISwitch](https://github.com/QGtiger/xybot-console-ui)      | 开关组件                               |
| [UIDropdown](https://github.com/QGtiger/xybot-console-ui)    | 下拉菜单组件                           |
| [UIMenu](https://github.com/QGtiger/xybot-console-ui)        | 导航菜单组件                           |
| [UITable](https://github.com/QGtiger/xybot-console-ui)       | 表格组件（基于 @tanstack/react-table） |
| [UITabs](https://github.com/QGtiger/xybot-console-ui)        | 标签页组件                             |
| [UIModal](https://github.com/QGtiger/xybot-console-ui)       | 弹窗组件                               |
| [UIAlert](https://github.com/QGtiger/xybot-console-ui)       | 警告提示组件                           |
| [UIMessage](https://github.com/QGtiger/xybot-console-ui)     | 全局消息提示组件                       |
| [UILink](https://github.com/QGtiger/xybot-console-ui)        | 链接组件                               |
| [UIDivider](https://github.com/QGtiger/xybot-console-ui)     | 分割线组件                             |
| [UIContainer](https://github.com/QGtiger/xybot-console-ui)   | 容器组件                               |
| [UIDatePicker](https://github.com/QGtiger/xybot-console-ui)  | 日期选择器组件                         |
| [UITooltip](https://github.com/QGtiger/xybot-console-ui)     | 文字提示组件                           |
| [UIPopover](https://github.com/QGtiger/xybot-console-ui)     | 气泡卡片组件                           |
| [UISpin](https://github.com/QGtiger/xybot-console-ui)        | 加载中组件                             |
| [UITag](https://github.com/QGtiger/xybot-console-ui)         | 标签组件                               |
| [ThemeProvider](https://github.com/QGtiger/xybot-console-ui) | 主题提供者，支持亮/暗色主题切换        |

### 业务模块 (Blocks)

| 模块                                                           | 描述                                                     |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| [AvatarGroup](https://github.com/QGtiger/xybot-console-ui)     | 头像组，支持重叠排列                                     |
| [CustomAvatar](https://github.com/QGtiger/xybot-console-ui)    | 自定义头像组件                                           |
| [UIAvatar](https://github.com/QGtiger/xybot-console-ui)        | 通用头像组件                                             |
| [CommentTree](https://github.com/QGtiger/xybot-console-ui)     | 评论树组件                                               |
| [CustomModal](https://github.com/QGtiger/xybot-console-ui)     | 自定义弹窗业务组件                                       |
| [ScrollArea](https://github.com/QGtiger/xybot-console-ui)      | 滚动区域组件（基于 simplebar-react）                     |
| [ScrollContainer](https://github.com/QGtiger/xybot-console-ui) | 滚动容器组件                                             |
| [TipTapEditor](https://github.com/QGtiger/xybot-console-ui)    | 富文本编辑器（基于 TipTap），支持代码高亮、Emoji、链接等 |

### Hooks

| Hook                                                          | 描述            |
| ------------------------------------------------------------- | --------------- |
| [useCustomModal](https://github.com/QGtiger/xybot-console-ui) | 自定义弹窗 Hook |

### 工具函数

| 工具                              | 描述                                                    |
| --------------------------------- | ------------------------------------------------------- |
| `createCustomModel`               | 创建自定义 Context Model，提供 Provider + useModel 模式 |
| `uploadFile`                      | 文件上传工具函数                                        |
| `getToken` / `getTokenByCssColor` | 获取 CSS 设计 Token 的实际值                            |
| `DesignToken`                     | 设计 Token 枚举                                         |
| `CustomFilterIcon`                | 自定义过滤图标组件                                      |
| `RightIcon`                       | 右侧图标组件                                            |
| `DropDownItem`                    | 下拉菜单项组件                                          |
| `IconFont`                        | 图标字体组件                                            |

## 🛠️ CLI 工具

`@xybot/ui` 内置了命令行工具 `xybotui`，方便在终端中快速查看组件信息。

```bash
# 查看所有可用组件
npx xybotui list

# 以 JSON 格式输出
npx xybotui list --json

# 查看组件 Props 信息
npx xybotui info UIButton

# 查看组件示例代码
npx xybotui demo UIButton
```

## 🎨 主题定制

### 亮暗色主题切换

```tsx
import { ThemeProvider } from '@xybot/ui';

function App() {
  return <ThemeProvider>{/* 你的应用代码 */}</ThemeProvider>;
}
```

`ThemeProvider` 基于 antd v5 的 CSS-in-JS 方案，默认提供美观易用的亮色和暗色主题。通过 `ThemeProvider` 的 `themeMode` 属性可以控制主题模式。

### 设计 Token

组件库使用 CSS 变量驱动的设计 Token 体系，涵盖：

- **背景色** — bg-base、bg-fill-deep、bg-fill-shallow、bg-primary、bg-info、bg-success、bg-warning、bg-error、bg-magic、bg-wonder
- **文字色** — text-base、text-primary、text-info、text-success、text-warning、text-error、text-magic、text-wonder
- **边框色** — border-base、border-specular、border-primary、border-info、border-success、border-warning、border-error、border-magic、border-wonder
- **阴影** — effect-shadow
- **尺寸** — 圆角、间距、深度

每个色系包含从浅到深多个色阶（spotlight → quinary → ... → default），满足各种使用场景。

## 📚 开发指南

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（文档 + CSS 监听）
pnpm dev

# 构建
pnpm build

# 构建文档
pnpm docs:build
```

### 项目结构

```
src/
├── blocks/          # 业务模块（AvatarGroup, CommentTree, TipTapEditor 等）
├── cli/             # CLI 命令行工具
├── common/          # 公共组件和图标
│   ├── components/  # DropDownItem, IconFont
│   ├── iconfont/    # 图标字体文件
│   └── icons/       # SVG 图标组件
├── components/      # 通用 UI 组件（UIButton, UIInput, UITable 等）
├── hooks/           # 自定义 Hooks
├── locale/          # 国际化
├── utils/           # 工具函数
│   ├── date.ts      # 日期工具
│   ├── model.tsx    # Context Model 工厂 + 文件上传
│   └── token.ts     # 设计 Token 枚举和获取函数
├── global.less      # 全局样式和 CSS 变量定义
├── variables.less   # Less 变量（映射 CSS 变量）
├── mixins.less      # Less 混入
├── input.css        # Tailwind CSS 入口
└── styles.css       # Tailwind CSS 输出
```

### 代码规范

项目使用 ESLint + Stylelint + Prettier 保证代码质量，使用 Husky + lint-staged 在提交前自动检查。

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:es --fix
pnpm lint:css --fix
```

### 发布流程

项目使用 Changesets 管理版本和发布：

```bash
# 创建一个 changeset
pnpm changeset

# 升级版本
pnpm changeset:version

# 发布
pnpm release
```

## 📄 许可证

[MIT](./LICENSE) © lightfish

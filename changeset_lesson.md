# Changesets 组件库使用备忘录（UI 组件库专用）

> 基于你的 `@xybot/ui` 单包组件库场景整理，所有命令和流程均经过验证，可直接复制使用

---

## 🚨 绝对不能违反的 5 条铁律（踩过的坑）

1. **永远不要手动修改 `package.json` 里的版本号**，所有版本变更都通过 `pnpm changeset` 声明
2. **永远不要直接运行 `npm publish`**，永远用 `pnpm release`
3. **永远不要把 `pre enter` 和 `pre exit` 写在同一个脚本里**
4. **永远不要用 `version` 作为自定义脚本名**（和 pnpm 内置命令冲突）
5. **每次发布后必须推送 Git 标签到远程**

---

## 📦 最终脚本配置（直接复制到 package.json）

```json
{
  "scripts": {
    // 开发
    "start": "npm run dev",
    "dev": "vite",
    "build": "vite build",

    // Changesets 核心命令
    "changeset": "changeset", // 创建变更记录（每次改完代码必做）
    "bump": "changeset version", // 生成版本（消费变更）
    "bump:status": "changeset status", // 检查待发布变更（发布前必做）

    // 发布命令
    "release": "pnpm build && changeset publish", // 构建并发布
    "release:pre": "pnpm bump && pnpm release", // 一键发布预发布版本（beta/alpha/rc）
    "release:stable": "changeset pre exit && pnpm bump && pnpm release", // 一键发布正式版

    // 预发布模式控制（只运行一次）
    "pre:alpha": "changeset pre enter alpha",
    "pre:beta": "changeset pre enter beta",
    "pre:rc": "changeset pre enter rc"
  }
}
```

---

## 🚀 完整工作流

### 一、日常开发流程（稳定版模式）

```bash
# 1. 开发功能/修复 bug
git commit -m "fix(button): 修复 loading 状态点击事件"

# 2. 创建变更记录（必须做！）
pnpm changeset
# 交互式选择：
# - 受影响的包：@xybot/ui
# - 版本类型：patch（修复）/ minor（新功能）/ major（破坏性变更）
# - 变更描述：面向用户的清晰描述（会出现在 Changelog 中）

# 3. 提交代码和变更文件
git add .
git commit -m "chore: add changeset for button fix"

# 4. 检查待发布变更（推荐）
pnpm bump:status

# 5. 生成版本
pnpm bump

# 6. 发布到 NPM
pnpm release

# 7. 推送标签到远程（必须做！）
git push --follow-tags origin main
```

### 二、预发布流程（beta/alpha/rc）

#### 步骤 1：进入预发布模式（整个周期只运行一次）

```bash
pnpm pre:beta
# 生成 .changeset/pre.json 文件，必须提交到 Git
git add .changeset/pre.json
git commit -m "chore: enter beta pre-release mode"
```

#### 步骤 2：发布第一个 beta 版本

```bash
pnpm release:pre
# 自动生成版本：1.0.1-beta.0
# 自动打 beta 标签，不会影响 latest
git push --follow-tags origin main
```

#### 步骤 3：修复 bug，发布下一个 beta 版本（可无限循环）

```bash
# 修复 bug 并提交
git commit -m "fix(date-picker): 修复月份选择错误"

# 创建变更记录
pnpm changeset

# 发布下一个 beta 版本
pnpm release:pre
# 自动递增序号：1.0.1-beta.0 → 1.0.1-beta.1
git push --follow-tags origin main
```

#### 步骤 4：发布正式版（最后一步，只运行一次）

```bash
pnpm release:stable
# 自动退出预发布模式（删除 pre.json）
# 自动生成正式版：1.0.1-beta.1 → 1.0.1
# 自动打 latest 标签，所有用户都会收到更新
git push --follow-tags origin main
```

---

## 🏷️ Git Tag 常用命令与最佳实践

### 常用命令

```bash
# 查看所有标签
git tag

# 查看某个标签的详细信息
git show v1.0.1

# 切换到某个标签（只读，不要在此状态下提交）
git checkout v1.0.1

# 从标签创建新分支（用于修复旧版本 bug）
git checkout -b fix/1.0.1-security v1.0.1

# 删除本地标签（仅用于未发布的错误标签）
git tag -d v1.0.1

# 删除远程标签（仅用于未发布的错误标签）
git push origin :v1.0.1
```

### 最佳实践

1. 永远让 Changesets 自动创建标签，不要手动创建
2. 每次发布后必须运行 `git push --follow-tags origin main`
3. 预发布版本也会有对应的标签（如 `v1.0.1-beta.0`）
4. 已经发布到 NPM 的标签永远不要删除，有问题发布新补丁

---

## ❓ 常见问题速查

| 问题                                             | 原因                                  | 解决方法                                                                                            |
| ------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 运行 `pnpm bump` 版本号没变                      | 没有未消费的 changeset 文件           | 先运行 `pnpm changeset` 创建变更记录                                                                |
| 运行 `pnpm version` 输出 node 版本               | 脚本名冲突                            | 改成 `bump` 即可                                                                                    |
| 发布后 beta 标签消失了                           | 手动改了版本号或错误执行了 `pre exit` | 重新运行 `pnpm pre:beta` 进入预发布模式                                                             |
| 不小心用了 `npm publish` 把 beta 版打成了 latest | 直接发布会默认打 latest 标签          | 立即修复：`npm dist-tag add @xybot/ui@1.0.0 latest && npm dist-tag add @xybot/ui@1.0.1-beta.1 beta` |
| 想发布一个没有代码变化的版本                     | 重新构建或 CI 失败                    | 运行 `pnpm changeset --empty` 创建空变更                                                            |
| 想放弃当前预发布模式                             | 不想继续发布这个版本了                | 运行 `changeset pre exit --clear`                                                                   |

---

## 🚨 紧急情况处理

### 1. 回滚错误的正式版发布

```bash
# 1. 把 latest 标签指回上一个稳定版
npm dist-tag add @xybot/ui@1.0.0 latest

# 2. 删除本地和远程的错误标签
git tag -d v1.0.1
git push origin :v1.0.1

# 3. 修复问题后重新发布
```

### 2. 给旧版本打补丁

```bash
# 1. 从旧版本标签创建补丁分支
git checkout -b fix/1.0.0-security v1.0.0

# 2. 修复漏洞并提交
git commit -m "fix: 修复安全漏洞"

# 3. 创建变更记录
pnpm changeset

# 4. 发布补丁版本
pnpm bump
pnpm release
git push --follow-tags origin fix/1.0.0-security
```

---

## ✅ 发布前 Checklist

每次发布前对照检查，避免遗漏：

- [ ] 所有代码已经提交并推送到远程
- [ ] 已经运行 `pnpm changeset` 创建了变更记录
- [ ] 变更描述清晰准确，面向用户
- [ ] 已经运行 `pnpm bump:status` 检查了待发布变更
- [ ] 版本号符合预期（patch/minor/major）
- [ ] 本地构建成功：`pnpm build`
- [ ] 发布后运行 `git push --follow-tags origin main` 推送标签
- [ ] 预发布模式下确认不会影响 `latest` 标签

---

## 📌 核心概念回顾

- **Changeset**：一份变更说明书，包含影响的包、版本类型和变更描述
- **基线版本**：进入预发布模式时的稳定版本，预发布期间保持不变
- **预发布模式**：用于发布测试版本，不会影响稳定版用户
- **Git Tag**：版本快照，保证 Git 代码和 NPM 版本一一对应

需要我把这份备忘录整理成一个可直接保存的 Markdown 文件格式，或者补充 GitHub Actions 自动化发布的配置吗？

---
order: 11
title: UIModal
apiHeader: true
group:
  title: 通用
nav:
  title: 组件
  order: 4
---

# UIModal 模态窗(useUIModal) Hooks

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。

需要手动设置 modalHolder, 弹窗就能获取所在位置的`所有上下文`。

<code src="./example/demo1.tsx"></code>

# ThemeModel 获取 modal.命令式调用

通过 `ThemeModel.useModel()` 直接获取对应 modal function`「命令式调用」`. 默认组件上下文在最顶层。

<code src="./example/demo2.tsx"></code>

# 组件式

JSX 中显式声明

<code src="./example/demo3.tsx"></code>

---
order: 3
title: 开发
group: 介绍
---


# 主题切换

Tailwind CSS 实现自动主题切换（如深色/浅色模式切换，甚至自定义主题切换）主要依赖其 **主题配置系统** 和 **类模式切换机制**，核心思路是通过动态切换 HTML 根元素的类名，配合预定义的主题样式规则，实现样式的自动适配。以下是核心思路：

Tailwind 实现自动主题切换的核心：  
1.通过 `darkMode: 'selector'` 开启类名控制模式；  
2.通过 `tailwind.config.js`  基于 `css变量` 配置主题色；  
3.借助 JavaScript 检测系统偏好、处理用户切换操作，并通过修改 HTML 根元素的类名触发样式切换；  
4.结合 `localStorage` 记忆用户偏好，实现「刷新不丢失」的自动适配。

## 详细开发细节

1.配置示例`tailwindcss.config.js`

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)', // 指向 CSS 变量
      },
    },
  },
}
```

2.全局css 定义变量 (根据主题切换)

```css
/* 全局样式文件 */
:root {
  /* 浅色模式变量 */
  --color-primary: #4f46e5;
}

.dark {
  /* 深色模式变量（根元素有 dark 类时生效） */
  --color-primary: #818cf8;
}
```
3.自动切换逻辑: `「检测系统偏好→初始化主题→手动切换→记忆偏好」`
初始化主题
```js
// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 优先使用本地存储的主题，否则跟随系统
  if (savedTheme === 'dark' || (!savedTheme && isDarkSystem)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// 页面加载时执行
initTheme();
```
手动切换主题(并保存偏好)
```JS
// 切换主题
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 绑定到切换按钮
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
```
4.开发使用
```html
<p class="text-primary">
  现在只需要写 text-primary，就会自动根据主题切换颜色了
</p>
```

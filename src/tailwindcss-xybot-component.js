// src/index.js
const plugin = require('tailwindcss/plugin');

// 自定义 Tailwind 插件
module.exports = plugin(
  // 插件主逻辑：添加组件和颜色
  function ({ addComponents, theme, addBase, addUtilities }) {
    // 1. 添加自定义颜色（供组件使用）
    addBase({
      '.theme-light': {
        '--color-base-container': '#1e293b',
        '--color-base-container-light': '#f8fafc',
        '--color-success-base': '#10b981',
      },

      '.dark': {
        '--color-base-container': '#1e293b',
        '--color-base-container-light': '#f8fafc',
        '--color-success-base': '#10b981',
      },
    });

    // 2. 添加自定义组件
    addComponents({
      '.base-container': {
        '@apply bg-[--color-base-container] text-white p-6 rounded-lg shadow-sm':
          {},
      },
      '.base-container-light': {
        '@apply bg-[--color-base-container-light] text-gray-800 p-6 rounded-lg shadow-sm':
          {},
      },
      '.text-success-base': {
        '@apply text-[--color-success-base]': {},
      },
    });
  },
  // 插件主题配置（可选：允许用户在自己的 tailwind.config 中覆盖颜色）
  {
    theme: {
      extend: {
        // 这里定义的变量可以被用户在自己的配置中扩展/覆盖
        colors: {
          brand: {
            50: 'rgba(247, 63, 75, 0.05)',
            100: 'rgba(247, 63, 75, 0.1)',
            150: 'rgba(247, 63, 75, 0.15)',
            250: 'rgba(247, 63, 75, 0.25)',
            400: 'rgba(247, 63, 75, 0.4)',
            500: 'rgba(247, 63, 75, 1)',
            600: 'rgba(255, 88, 99, 1)',
            700: 'rgba(252, 173, 181, 1)',
            800: 'rgba(253, 208, 213, 1)',
            900: 'rgba(254, 231, 234, 1)',
          },
        },
      },
    },
  },
);

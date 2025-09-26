---
order: 2
title: 颜色主题
group: 开发
---

# tailwindcss 配置

设置 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgBase: {
          container: 'var(--bg-base-container)',
          containerSecondary: 'var(--bg-base-contianer-secondary)',
          layout: 'var(--bg-base-layout)',
          layoutSecondary: 'var(--bg-base-layout-secondary)',
          spotlight: 'var(--bg-base-spotlight)',
          spotlightSecondary: 'var(--bg-base-spotlight-secondary)',
          mask: 'var(--bg-base-mask)',
        },
        bgFillDeep: {
          quinary: 'var(--bg-fill-deep-quinary)',
          quaternary: 'var(--bg-fill-deep-quaternary)',
          tertiary: 'var(--bg-fill-deep-tertiary)',
          secondary: 'var(--bg-fill-deep-secondary)',
          default: 'var(--bg-fill-deep-default)',
        },
        bgFillShallow: {
          quinary: 'var(--bg-fill-shallow-quinary)',
          quaternary: 'var(--bg-fill-shallow-quaternary)',
          tertiary: 'var(--bg-fill-shallow-tertiary)',
          secondary: 'var(--bg-fill-shallow-secondary)',
          default: 'var(--bg-fill-shallow-default)',
        },
        bgPrimary: {
          spotlight: 'var(--bg-primary-spotlight)',
          spotlightSecondary: 'var(--bg-primary-spotlight-secondary)',
          quaternary: 'var(--bg-primary-quaternary)',
          tertiary: 'var(--bg-primary-tertiary)',
          secondary: 'var(--bg-primary-secondary)',
          default: 'var(--bg-primary-default)',
        },
        bgInfo: {
          spotlight: 'var(--bg-info-spotlight)',
          spotlightSecondary: 'var(--bg-info-spotlight-secondary)',
          quaternary: 'var(--bg-info-quaternary)',
          tertiary: 'var(--bg-info-tertiary)',
          secondary: 'var(--bg-info-secondary)',
          default: 'var(--bg-info-default)',
        },
        bgSuccess: {
          spotlight: 'var(--bg-success-spotlight)',
          spotlightSecondary: 'var(--bg-success-spotlight-secondary)',
          quaternary: 'var(--bg-success-quaternary)',
          tertiary: 'var(--bg-success-tertiary)',
          secondary: 'var(--bg-success-secondary)',
          default: 'var(--bg-success-default)',
        },
        bgWarning: {
          spotlight: 'var(--bg-warning-spotlight)',
          spotlightSecondary: 'var(--bg-warning-spotlight-secondary)',
          quaternary: 'var(--bg-warning-quaternary)',
          tertiary: 'var(--bg-warning-tertiary)',
          secondary: 'var(--bg-warning-secondary)',
          default: 'var(--bg-warning-default)',
        },
        bgError: {
          spotlight: 'var(--bg-error-spotlight)',
          spotlightSecondary: 'var(--bg-error-spotlight-secondary)',
          quaternary: 'var(--bg-error-quaternary)',
          tertiary: 'var(--bg-error-tertiary)',
          secondary: 'var(--bg-error-secondary)',
          default: 'var(--bg-error-default)',
        },
        textBase: {
          default: 'var(--text-base-default)',
          secondary: 'var(--text-base-secondary)',
          tertiary: 'var(--text-base-tertiary)',
          quaternary: 'var(--text-base-quaternary)',
          inGrayDefault: 'var(--text-base-in-gray-default)',
          inGraySecondary: 'var(--text-base-in-gray-secondary)',
          inGrayTertiary: 'var(--text-base-in-gray-tertiary)',
          inGrayDisable: 'var(--text-base-in-gray-disable)',
          inColorDefault: 'var(--text-base-in-coloer-default)',
          inColorSecondary: 'var(--text-base-in-coloer-secondary)',
          inColorTertiary: 'var(--text-base-in-coloer-tertiary)',
          inColorDisable: 'var(--text-base-in-coloer-disable)',
        },
        textPrimary: {
          default: 'var(--text-primary-default)',
          defaultHover: 'var(--text-primary-default-hover)',
          secondary: 'var(--text-primary-secondary)',
          tertiary: 'var(--text-primary-tertiary)',
        },
        textInfo: {
          default: 'var(--text-info-default)',
          defaultHover: 'var(--text-info-default-hover)',
          secondary: 'var(--text-info-secondary)',
          tertiary: 'var(--text-info-tertiary)',
        },
        textSuccess: {
          default: 'var(--text-success-default)',
          defaultHover: 'var(--text-success-default-hover)',
          secondary: 'var(--text-success-secondary)',
          tertiary: 'var(--text-success-tertiary)',
        },
        textWarning: {
          default: 'var(--text-warning-default)',
          defaultHover: 'var(--text-warning-default-hover)',
          secondary: 'var(--text-warning-secondary)',
          tertiary: 'var(--text-warning-tertiary)',
        },
        textError: {
          default: 'var(--text-error-default)',
          defaultHover: 'var(--text-error-default-hover)',
          secondary: 'var(--text-error-secondary)',
          tertiary: 'var(--text-error-tertiary)',
        },
        borderBase: {
          default: 'var(--border-base-default)',
          secondary: 'var(--border-base-secondary)',
          tertiary: 'var(--border-base-tertiary)',
          quaternary: 'var(--border-base-quaternary)',
        },
        borderSpecular: {
          default: 'var(--border-specular-default)',
          secondary: 'var(--border-specular-secondary)',
          tertiary: 'var(--border-specular-tertiary)',
          quaternary: 'var(--border-specular-quaternary)',
        },
        borderPrimary: {
          default: 'var(--border-primary-default)',
          secondary: 'var(--border-primary-secondary)',
          tertiary: 'var(--border-primary-tertiary)',
          quaternary: 'var(--border-primary-quaternary)',
        },
        borderInfo: {
          default: 'var(--border-info-default)',
          secondary: 'var(--border-info-secondary)',
          tertiary: 'var(--border-info-tertiary)',
          quaternary: 'var(--border-info-quaternary)',
        },
        borderSuccess: {
          default: 'var(--border-success-default)',
          secondary: 'var(--border-success-secondary)',
          tertiary: 'var(--border-success-tertiary)',
          quaternary: 'var(--border-success-quaternary)',
        },
        borderWarning: {
          default: 'var(--border-warning-default)',
          secondary: 'var(--border-warning-secondary)',
          tertiary: 'var(--border-warning-tertiary)',
          quaternary: 'var(--border-warning-quaternary)',
        },
        borderError: {
          default: 'var(--border-error-default)',
          secondary: 'var(--border-error-secondary)',
          tertiary: 'var(--border-error-tertiary)',
          quaternary: 'var(--border-error-quaternary)',
        },
        effectShadow: {
          default: 'var(--effect-shadow-default)',
          secondary: 'var(--effect-shadow-secondary)',
        },
      },
    },
  },
  plugins: [],
  safelist: [],
};
```

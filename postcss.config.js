module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-prefix-selector': {
      prefix: '.xybot-ui',
      transform(prefix, selector, prefixedSelector) {
        // 排除不需要加前缀的选择器
        if (
          selector.includes('html') ||
          selector.includes('body') ||
          [':root', '.dark'].includes(selector.trim())
        ) {
          return selector;
        }
        return prefixedSelector;
      },
    },
  },
};

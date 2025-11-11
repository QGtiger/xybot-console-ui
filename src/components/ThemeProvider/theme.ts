import { ThemeConfig } from 'antd';

const commonComponetsTokens: ThemeConfig['components'] = {
  Form: {
    colorError: 'var(--text-error-default)',
    itemMarginBottom: 12,
    labelColor: 'var(--text-base-secondary)',
  },
  Segmented: {
    borderRadius: 8,
    borderRadiusSM: 8,
    borderRadiusXS: 8,
    borderRadiusLG: 8,
    itemColor: 'var(--text-base-tertiary)',
    itemHoverColor: 'var(--text-base-secondary)',
    itemHoverBg: 'transparent',
    itemSelectedBg: 'var(--bg-base-container)',
    trackBg: 'var(--bg-fill-deep-secondary)',
  },
  Input: {
    colorTextPlaceholder: 'var(--text-base-tertiary)',
  },
  Modal: {
    contentBg: 'var(--bg-base-container)',
  },

  Table: {},
  Tabs: {
    itemActiveColor: 'inherit',
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorBgContainer: 'rgba(45, 46, 53, 1)',
    colorBgElevated: 'rgba(45, 46, 53, 1)',
    controlItemBgHover: 'rgba(0, 0, 0, 0.15)',
    colorSplit: 'rgba(255, 255, 255, 0.2)',
    colorText: 'rgba(255, 255, 255, 0.8)',

    fontSize: 13,
    colorSuccessBg: 'var(--bg-success-default)',
    colorInfoBg: 'var(--bg-info-default)',
    colorWarningBg: 'var(--bg-warning-default)',
    colorErrorBg: 'var(--bg-error-default)',

    colorTextPlaceholder: 'var(--text-base-tertiary)',
  },
  components: commonComponetsTokens,
};

export const lightTheme: ThemeConfig = {
  token: {
    colorBgContainer: 'rgba(255, 255, 255, 1)',
    colorBgElevated: 'rgba(255, 255, 255, 1)',
    // 下拉菜单选中
    controlItemBgHover: 'rgba(15, 17, 24, 0.03)',
    // 分割线
    colorSplit: 'rgba(15, 17, 24, 0.15)',
    colorText: 'rgba(15, 17, 24, 1)',

    fontSize: 13,
    colorSuccessBg: 'var(--bg-success-default)',
    colorInfoBg: 'var(--bg-info-default)',
    colorWarningBg: 'var(--bg-warning-default)',
    colorErrorBg: 'var(--bg-error-default)',

    colorTextPlaceholder: 'var(--text-base-tertiary)',
  },
  components: commonComponetsTokens,
};

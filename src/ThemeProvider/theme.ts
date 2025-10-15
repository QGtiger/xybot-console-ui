import { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorBgContainer: 'rgba(45, 46, 53, 1)',
    fontSize: 13,
    colorText: 'var(--text-base-default)',
    colorSuccessBg: 'var(--bg-success-default)',
    colorInfoBg: 'var(--bg-info-default)',
    colorWarningBg: 'var(--bg-warning-default)',
    colorErrorBg: 'var(--bg-error-default)',
  },
  components: {
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
  },
};

export const lightTheme: ThemeConfig = {
  token: {
    colorBgContainer: 'rgba(255, 255, 255, 1)',
    fontSize: 13,
    colorText: 'var(--text-base-default)',
    colorSuccessBg: 'var(--bg-success-default)',
    colorInfoBg: 'var(--bg-info-default)',
    colorWarningBg: 'var(--bg-warning-default)',
    colorErrorBg: 'var(--bg-error-default)',
  },
  components: {
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
  },
};

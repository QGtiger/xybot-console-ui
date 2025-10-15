import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { createCustomModel } from '../utils';

import {
  theme as AntdTheme,
  ConfigProvider,
  ConfigProviderProps,
  message,
} from 'antd';
import { ModalRef, UIModalFns, useUIModal } from '../UIModal';

import type { ThemeMode, ThemeType } from 'ahooks/lib/useTheme';
import { UIButtonProps } from '../UIButton';
import type { UIInputProps } from '../UIInput/input';
import { UILinkProps } from '../UILink';
import type { UISelectProps } from '../UISelect';

import '../global.less';
import './index.less';

export { ThemeMode, ThemeType };

export type ComponentConfig = {
  uiSelect?: Partial<UISelectProps>;
  uiInput?: Partial<UIInputProps>;
  uiButton?: Partial<UIButtonProps>;
  uiLink?: Partial<UILinkProps>;
};

type ThemeModelProps = {
  modal: UIModalFns;
  componentConfig?: ComponentConfig;
  isDarkMode?: boolean;
};

const ComponentConfigContext = createContext<ComponentConfig>({});

message.config({
  prefixCls: 'ui-message',
});

export const ThemeModel = createCustomModel((props: ThemeModelProps) => {
  return props;
});

export function ThemeProvider(
  props: PropsWithChildren<Omit<ConfigProviderProps, 'prefixCls' | 'theme'>> &
    Omit<ThemeModelProps, 'modal'> & {
      theme?: ThemeType;
    },
) {
  const { theme = 'light' } = props;
  const { modal, modalHolder } = useUIModal();

  ModalRef.current = modal;

  const commonTheme: ConfigProviderProps['theme'] = {
    token: {
      // colorBgContainer: 'var(--bg-base-container)',
      fontSize: 13,
      colorText: 'var(--text-base-default)',
      colorSuccessBg: 'var(--bg-success-default)',
      colorInfoBg: 'var(--bg-info-default)',
      colorWarningBg: 'var(--bg-warning-default)',
      colorErrorBg: 'var(--bg-error-default)',

      // 不能设置这个默认样式有问题
      // colorBgBase: 'var(--bg-base-container)',
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
    },
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const memoValue = useMemo(() => {
    return {
      ...props,
      modal,
      isDarkMode: theme === 'dark',
    };
  }, [modal, theme]);

  return (
    <ConfigProvider
      prefixCls="ui"
      {...props}
      wave={{
        disabled: true,
        ...props.wave,
      }}
      theme={{
        ...commonTheme,
        algorithm:
          theme === 'dark'
            ? AntdTheme.darkAlgorithm
            : AntdTheme.defaultAlgorithm,
      }}
    >
      <ThemeModel.Provider value={memoValue}>
        <ComponentConfigContext.Provider value={props.componentConfig || {}}>
          {props.children}
          {modalHolder}
        </ComponentConfigContext.Provider>
      </ThemeModel.Provider>
    </ConfigProvider>
  );
}

export function useDefaultProps<T>(props: T, key: keyof ComponentConfig): T {
  const config = useContext(ComponentConfigContext);
  return { ...config?.[key], ...props };
}

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
import { darkTheme, lightTheme } from './theme';

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

  const commonTheme = theme === 'dark' ? darkTheme : lightTheme;

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

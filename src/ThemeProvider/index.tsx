import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { createCustomModel } from '../utils';

import { ConfigProvider, ConfigProviderProps, message } from 'antd';
import { useThemeMode, type ThemeMode } from 'antd-style';

import { useMount } from 'ahooks';
import { UIModalFns, useUIModal } from '../UIModal';
import './index.less';

import '../global.less';
import './tabs.less';

import { UIButtonProps } from '../UIButton';
import type { UIInputProps } from '../UIInput/input';
import { UILinkProps } from '../UILink';
import type { UISelectProps } from '../UISelect';

export { ThemeMode };

export type ComponentConfig = {
  uiSelect?: Partial<UISelectProps>;
  uiInput?: Partial<UIInputProps>;
  uiButton?: Partial<UIButtonProps>;
  uiLink?: Partial<UILinkProps>;
};

type ThemeModelProps = {
  modal: UIModalFns;
  componentConfig?: ComponentConfig;
};

const ComponentConfigContext = createContext<ComponentConfig>({});

export const ThemeModel = createCustomModel((props: ThemeModelProps) => {
  const { themeMode, setThemeMode, isDarkMode } = useThemeMode();

  const theme = isDarkMode ? 'dark' : 'light';

  useMount(() => {
    message.config({
      prefixCls: 'ui-message',
    });
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return {
    isDarkMode,
    theme,
    themeMode,
    setThemeMode,
    ...props,
  };
});

export function ThemeProvider(
  props: PropsWithChildren<Omit<ConfigProviderProps, 'prefixCls'>> &
    Omit<ThemeModelProps, 'modal'>,
) {
  const { modal, modalHolder } = useUIModal();

  const memoValue = useMemo(() => {
    return {
      ...props,
      modal,
    };
  }, [modal]);

  return (
    <ConfigProvider
      prefixCls="ui"
      {...props}
      wave={{
        disabled: true,
        ...props.wave,
      }}
      theme={{
        ...props.theme,
        token: {
          fontSize: 13,
          colorText: 'var(--text-base-default)',
          ...props.theme?.token,
        },
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

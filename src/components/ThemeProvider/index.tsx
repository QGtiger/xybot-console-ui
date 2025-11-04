import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';

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
import { darkTheme, lightTheme } from './theme';

import { createCustomModel } from '@/utils/model';

import '@/common/iconfont/iconfont.css';
import '../../global.less';
import '../../styles.css';
import { MessageInsRef } from '../UIMessage';
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

export const ThemeModel = createCustomModel((props: ThemeModelProps) => {
  return props;
});

export function ThemeProvider(
  props: PropsWithChildren<Omit<ConfigProviderProps, 'prefixCls' | 'theme'>> &
    Omit<ThemeModelProps, 'modal'> & {
      theme?: ThemeType;
      isUseAntdTheme?: boolean;
    },
) {
  const { theme = 'light', isUseAntdTheme } = props;
  const [messageApi, messsageApiHolder] = message.useMessage({
    prefixCls: 'ui-message',
  });
  const { modal, modalHolder } = useUIModal();

  ModalRef.current = modal;
  MessageInsRef.current = messageApi;

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
      {...props}
      wave={
        isUseAntdTheme
          ? {}
          : {
              disabled: true,
              ...props.wave,
            }
      }
      theme={
        isUseAntdTheme
          ? {}
          : {
              ...commonTheme,
              algorithm:
                theme === 'dark'
                  ? AntdTheme.darkAlgorithm
                  : AntdTheme.defaultAlgorithm,
            }
      }
    >
      <ThemeModel.Provider value={memoValue}>
        <ComponentConfigContext.Provider value={props.componentConfig || {}}>
          {props.children}
          {modalHolder}
          {messsageApiHolder}
        </ComponentConfigContext.Provider>
      </ThemeModel.Provider>
    </ConfigProvider>
  );
}

export function useDefaultProps<T>(props: T, key: keyof ComponentConfig): T {
  const config = useContext(ComponentConfigContext);
  return { ...config?.[key], ...props };
}

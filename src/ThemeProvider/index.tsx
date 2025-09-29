import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createCustomModel } from '../utils';

import { ConfigProvider, ConfigProviderProps, message } from 'antd';
import { useThemeMode, type ThemeMode } from 'antd-style';

import { useMount } from 'ahooks';
import { UIModalFns, useUIModal } from '../UIModal';
import './index.less';

import '../global.less';
import './tabs.less';

export { ThemeMode };

export const ThemeModel = createCustomModel((props: { modal: UIModalFns }) => {
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
  props: PropsWithChildren<Omit<ConfigProviderProps, 'prefixCls'>>,
) {
  const { modal, modalHolder } = useUIModal();

  const memoValue = useMemo(() => {
    return {
      modal,
    };
  }, [modal]);

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 13,
          colorText: 'var(--text-base-default)',
        },
      }}
      prefixCls="ui"
      {...props}
      wave={{
        disabled: true,
        ...props.wave,
      }}
    >
      <ThemeModel.Provider value={memoValue}>
        {props.children}
        {modalHolder}
      </ThemeModel.Provider>
    </ConfigProvider>
  );
}

import { PropsWithChildren, useEffect, useMemo } from 'react';
import { createCustomModel } from '../utils';

import { ConfigProvider, message } from 'antd';
import { useThemeMode } from 'antd-style';

import { useMount } from 'ahooks';
import { UIModalFunc, useUIModal } from '../Modal';
import './index.less';

import '../global.less';

export const ThemeModel = createCustomModel((props: { modal: UIModalFunc }) => {
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
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  const { modal, modalHolder } = useUIModal();

  const memoValue = useMemo(() => {
    return {
      modal,
    };
  }, [modal]);

  return (
    <ConfigProvider
      wave={{
        disabled: true,
      }}
      prefixCls="ui"
    >
      <ThemeModel.Provider value={memoValue}>
        {props.children}
        {modalHolder}
      </ThemeModel.Provider>
    </ConfigProvider>
  );
}

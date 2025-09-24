import { PropsWithChildren, useEffect } from 'react';
import { createCustomModel } from '../utils';

import { ConfigProvider, message } from 'antd';
import { useThemeMode } from 'antd-style';

import { useMount } from 'ahooks';
import './index.less';

export const ThemeModel = createCustomModel(() => {
  const { themeMode, setThemeMode, isDarkMode } = useThemeMode();

  const theme = isDarkMode ? 'dark' : 'light';

  console.log('theme', theme, themeMode, isDarkMode);

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
  };
});

export function ThemeProvider(
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <ConfigProvider
      wave={{
        disabled: true,
      }}
      prefixCls="ui"
    >
      <ThemeModel.Provider>{props.children}</ThemeModel.Provider>
    </ConfigProvider>
  );
}

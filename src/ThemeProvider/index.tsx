import { PropsWithChildren, useEffect } from 'react';
import { createCustomModel } from '../utils';

import { ConfigProvider } from 'antd';
import { useThemeMode } from 'antd-style';

export const ThemeModel = createCustomModel(() => {
  const { themeMode, setThemeMode, isDarkMode } = useThemeMode();

  const theme = isDarkMode ? 'dark' : 'light';

  console.log('theme', theme, themeMode, isDarkMode);

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
    >
      <ThemeModel.Provider>{props.children}</ThemeModel.Provider>
    </ConfigProvider>
  );
}

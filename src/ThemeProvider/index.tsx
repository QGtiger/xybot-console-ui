import { PropsWithChildren, useEffect } from 'react';
import { createCustomModel } from '../utils';

import { useThemeMode } from 'antd-style';
import classNames from 'classnames';
import '../global.css';

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
    getPopupContainer: () =>
      (document.querySelector('.xybot-ui') as HTMLElement) || document.body,
  };
});

export function ThemeProvider(
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <ThemeModel.Provider>
      <div className={classNames('xybot-ui ', props.className)}>
        {props.children}
      </div>
    </ThemeModel.Provider>
  );
}

import { useTheme } from 'ahooks';
import { PropsWithChildren, useEffect } from 'react';
import { createCustomModel } from '../utils';

import classNames from 'classnames';
import '../global.css';

export const ThemeModel = createCustomModel(() => {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'xybot-console-ui-theme',
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, themeMode, setThemeMode };
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

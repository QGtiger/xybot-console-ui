import { useTheme } from 'ahooks';
import { PropsWithChildren } from 'react';
import { createCustomModel } from '../../common/createModel';

import '../../global.css';

export const ThemeModel = createCustomModel(() => {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'xybot-console-ui-theme',
  });

  return { theme, themeMode, setThemeMode };
});

export function ThemeProvider(props: PropsWithChildren) {
  return (
    <ThemeModel.Provider>
      <div className="xybot-ui">{props.children}</div>
    </ThemeModel.Provider>
  );
}

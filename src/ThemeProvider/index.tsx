import { useTheme } from 'ahooks';
import { PropsWithChildren } from 'react';
import { createCustomModel } from '../utils';

import '../global.css';

export const ThemeModel = createCustomModel(() => {
  const { theme, themeMode, setThemeMode } = useTheme({
    localStorageKey: 'xybot-console-ui-theme',
  });

  return { theme, themeMode, setThemeMode };
});

function ThemeConsumer(props: PropsWithChildren) {
  const { theme } = ThemeModel.useModel();
  return <div className={`theme-${theme}`}>{props.children}</div>;
}

export function ThemeProvider(props: PropsWithChildren) {
  return (
    <ThemeModel.Provider>
      <div className="xybot-ui ">
        <ThemeConsumer>{props.children}</ThemeConsumer>
      </div>
    </ThemeModel.Provider>
  );
}

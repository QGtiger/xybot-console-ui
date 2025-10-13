import { useThemeMode } from 'antd-style';
import { useOutlet } from 'dumi';
import { ThemeProvider } from '../../../../src';

export default () => {
  const outlet = useOutlet();
  const { isDarkMode } = useThemeMode();

  return (
    <ThemeProvider theme={isDarkMode ? 'dark' : 'light'}>
      {outlet}
    </ThemeProvider>
  );
};

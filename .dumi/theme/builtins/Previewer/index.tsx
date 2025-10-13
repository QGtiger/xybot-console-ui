import { useThemeMode } from 'antd-style';
import OriginalPreview from 'dumi/theme-default/builtins/Previewer';
import { ThemeProvider } from '../../../../src';

export default function Previewer(props: any) {
  const { isDarkMode } = useThemeMode();

  return (
    <ThemeProvider
      componentConfig={{
        uiSelect: {
          type: 'filledbase',
        },
        uiInput: {
          type: 'filledbase',
        },
      }}
      theme={isDarkMode ? 'dark' : 'light'}
    >
      <OriginalPreview {...props} />
    </ThemeProvider>
  );
}

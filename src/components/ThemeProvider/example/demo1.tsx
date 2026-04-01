import { ThemeModel, ThemeProvider, UIButton } from '@xybot/ui';

export default () => {
  return (
    <ThemeProvider theme="light">
      <Inner />
    </ThemeProvider>
  );
};

function Inner() {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ margin: 0 }}>
        当前主题：<strong>{isDarkMode ? 'dark' : 'light'}</strong>
      </p>
      <UIButton type="primary">示例按钮</UIButton>
    </div>
  );
}

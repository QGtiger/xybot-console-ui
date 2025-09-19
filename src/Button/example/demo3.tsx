import { Link, ThemeModel } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <Link>Default Link</Link>
      <Link color="info">Info Link</Link>
      <Link color="secondary">Secondary Link</Link>
    </div>
  );
};

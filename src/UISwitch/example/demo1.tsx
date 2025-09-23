import { ThemeModel, UISwitch } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  return (
    <div
      className="flex"
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        alignItems: 'flex-start',
      }}
    >
      <UISwitch />
      <UISwitch disabled />
      <UISwitch size="small" />
      <UISwitch size="small" disabled />
    </div>
  );
};

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
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span>info:</span>
        <UISwitch />
        <UISwitch disabled />
        <UISwitch disabled checked />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span>neutral:</span>
        <UISwitch type="neutral" />
        <UISwitch type="neutral" disabled />
        <UISwitch type="neutral" disabled checked />
      </div>
      <UISwitch size="small" />
      <UISwitch size="small" disabled />
    </div>
  );
};

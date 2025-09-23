import { ThemeModel, UICheckbox } from '@xybot/ui';

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
      <UICheckbox>常规</UICheckbox>
      <UICheckbox checked disabled>
        默认选中
      </UICheckbox>
      <UICheckbox disabled>常规</UICheckbox>
    </div>
  );
};

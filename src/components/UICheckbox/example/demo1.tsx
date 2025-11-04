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
      <UICheckbox></UICheckbox>
      <UICheckbox>常规</UICheckbox>
      <UICheckbox checked indeterminate disabled>
        常规
      </UICheckbox>
      <UICheckbox checked disabled>
        默认选中
      </UICheckbox>
      <UICheckbox disabled>常规</UICheckbox>

      <UICheckbox.Group>
        <UICheckbox value="A">选项A</UICheckbox>
        <UICheckbox value="B">选项B</UICheckbox>
        <UICheckbox value="C">选项C</UICheckbox>
      </UICheckbox.Group>
    </div>
  );
};

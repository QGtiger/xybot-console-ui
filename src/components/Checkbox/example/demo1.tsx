import { Checkbox, ThemeModel } from '@xybot/ui';

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
      <Checkbox></Checkbox>
      <Checkbox>常规</Checkbox>
      <Checkbox checked indeterminate disabled>
        常规
      </Checkbox>
      <Checkbox checked disabled>
        默认选中
      </Checkbox>
      <Checkbox disabled>常规</Checkbox>

      <Checkbox.Group>
        <Checkbox value="A">选项A</Checkbox>
        <Checkbox value="B">选项B</Checkbox>
        <Checkbox value="C">选项C</Checkbox>
      </Checkbox.Group>
    </div>
  );
};

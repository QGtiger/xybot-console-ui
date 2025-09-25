import { Radio, ThemeModel } from '@xybot/ui';

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
      }}
    >
      <Radio.Group
        options={[
          {
            value: 'Apple',
            label: 'Apple',
          },
          {
            value: 'Pear',
            label: 'Pear',
          },
        ]}
      ></Radio.Group>
      <Radio>常规</Radio>
      <Radio disabled>常规</Radio>
      <Radio disabled checked>
        常规
      </Radio>
    </div>
  );
};

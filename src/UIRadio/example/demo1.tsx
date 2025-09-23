import { ThemeModel, UIRadio } from '@xybot/ui';

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
      <UIRadio.Group
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
      ></UIRadio.Group>
      <UIRadio>常规</UIRadio>
      <UIRadio disabled>常规</UIRadio>
      <UIRadio disabled checked>
        常规
      </UIRadio>
    </div>
  );
};

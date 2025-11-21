import { IconFont, ThemeModel, UILink } from '@xybot/ui';

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
      <UILink icon={<IconFont type="Image-sm" />}>Default UILink</UILink>
      <UILink color="info">Info UILink</UILink>
      <UILink color="secondary">Secondary UILink</UILink>
    </div>
  );
};

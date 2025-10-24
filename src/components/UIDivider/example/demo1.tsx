import { ThemeModel, UIDivider } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  return (
    <div
      className="flex"
      style={{
        display: 'flex',
        gap: 6,
        flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        alignItems: 'flex-start',
      }}
    >
      <UIDivider preset="light" />
      <UIDivider preset="medium" />
      <UIDivider preset="dark" />
      <UIDivider preset="blackhole" variant="dashed" />

      <UIDivider preset="light" size="lg" />
      <UIDivider preset="medium" size="lg" />
      <UIDivider preset="dark" size="lg" />
      <UIDivider preset="blackhole" size="lg" variant="dashed" />
    </div>
  );
};

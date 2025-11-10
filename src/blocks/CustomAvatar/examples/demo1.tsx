import { CustomAvatar, ThemeModel } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <CustomAvatar
        src="https://avatars.githubusercontent.com/u/50761513?v=4"
        size={30}
        borderWidth={5}
        name="p"
      ></CustomAvatar>
    </div>
  );
};

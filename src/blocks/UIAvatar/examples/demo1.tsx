import { ThemeModel } from '@xybot/ui';
import { UIAvatar } from '..';

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
      <UIAvatar
        // src="https://avatars.githubusercontent.com/u/50761513?v=4"
        size={30}
        style={{
          borderWidth: 5,
          borderColor: '#000',
        }}
        name="lightfish"
      >
        <span>Edwise</span>
      </UIAvatar>
    </div>
  );
};

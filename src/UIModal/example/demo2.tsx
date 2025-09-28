import { HomeOutlined } from '@ant-design/icons';
import { Space, ThemeModel, UIButton } from '@xybot/ui';

export default () => {
  const { isDarkMode, modal } = ThemeModel.useModel();

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
      <Space>
        <UIButton
          onClick={() => {
            let secondsToGo = 5;

            const instance = modal.confirm({
              title: 'This is a notification message',
              content: `This modal will be destroyed after ${secondsToGo} second.`,
            });

            const timer = setInterval(() => {
              secondsToGo -= 1;
              instance.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
              });
              console.log('counting');
            }, 1000);

            setTimeout(() => {
              clearInterval(timer);
              instance.destroy();
            }, secondsToGo * 1000);
          }}
          icon={<HomeOutlined />}
          type="border"
        ></UIButton>
      </Space>
    </div>
  );
};

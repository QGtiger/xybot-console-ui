import { message, Space, ThemeModel, UIButton } from '@xybot/ui';

export default () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { isDarkMode } = ThemeModel.useModel();

  const normal = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a normal message',
      duration: 1000,
    });
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };

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
      {contextHolder}
      <Space>
        <UIButton type="border" onClick={normal}>
          default
        </UIButton>
        <UIButton onClick={success}>Success</UIButton>
        <UIButton onClick={error}>Error</UIButton>
        <UIButton onClick={warning}>Warning</UIButton>
      </Space>
    </div>
  );
};

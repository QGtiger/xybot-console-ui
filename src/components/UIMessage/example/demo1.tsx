import { Space, ThemeModel, UIButton, UIMessage } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  const normal = () => {
    // messageApi.open({
    //   type: 'info',
    //   content: 'This is a normal message',
    //   duration: 1000,
    // });

    UIMessage.info('This is a success message from UIMessage', 20);
  };

  const success = () => {
    UIMessage.success({
      content: 'This is a success message',
    });
  };

  const error = () => {
    UIMessage.error({
      type: 'error',
      content: 'This is an error message',
    });
  };

  const warning = () => {
    UIMessage.warning({
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
      <Space>
        <UIButton type="border" onClick={normal}>
          default
        </UIButton>
        <UIButton onClick={success}>Success</UIButton>
        <UIButton onClick={error}>Error</UIButton>
        <UIButton onClick={warning}>Warning</UIButton>
        <UIButton
          onClick={() => {
            UIMessage.loading({ content: 'Loading...' });
          }}
        >
          Loading
        </UIButton>
      </Space>
    </div>
  );
};

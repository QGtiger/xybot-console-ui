import { FormOutlined } from '@ant-design/icons';
import { ThemeModel, UIButton, useCustomModal } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  const { showCustomModal } = useCustomModal();

  return (
    <div
      className="flex"
      style={{
        // display: 'flex',
        // gap: 16,
        // flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        // alignItems: 'flex-start',
      }}
    >
      <UIButton
        onClick={() => {
          showCustomModal({
            title: '自定义 Modal 标题',
            logo: <FormOutlined />,
            extra: <div>额外信息</div>,
          });
        }}
      >
        测试 CustomModal
      </UIButton>
    </div>
  );
};

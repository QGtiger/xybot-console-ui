import { HomeOutlined } from '@ant-design/icons';
import { Space, ThemeModel, Tooltip, UIButton } from '@xybot/ui';

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
        alignItems: 'flex-start',
      }}
    >
      <Space>
        <Tooltip title={<div>进入社区</div>}>
          <UIButton icon={<HomeOutlined />} type="border"></UIButton>
        </Tooltip>
        <Tooltip title={<div>进入编辑</div>}>
          <UIButton icon={<HomeOutlined />} type="border"></UIButton>
        </Tooltip>
      </Space>
    </div>
  );
};

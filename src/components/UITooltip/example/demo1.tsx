import { HomeOutlined } from '@ant-design/icons';
import { Space, ThemeModel, UIButton, UITooltip } from '@xybot/ui';

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
        <UITooltip title={<div>进入社区</div>} open>
          <UIButton icon={<HomeOutlined />} type="border"></UIButton>
        </UITooltip>
        <UITooltip title={<div>进入编辑</div>}>
          <UIButton icon={<HomeOutlined />} type="border"></UIButton>
        </UITooltip>
      </Space>
    </div>
  );
};

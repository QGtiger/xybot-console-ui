import { UserOutlined } from '@ant-design/icons';
import { Select, ThemeModel } from '@xybot/ui';

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
      }}
    >
      <Select
        placeholder="border 请输入"
        type="border"
        prefix={<UserOutlined />}
      />
      <Select
        placeholder="borderless 请输入"
        autoFocus
        type="borderless"
        prefix={<UserOutlined />}
      />

      <Select
        placeholder="filledsecondary 请输入"
        autoFocus
        type="filledsecondary"
        prefix={<UserOutlined />}
      />

      <Select
        placeholder="filledbase 请输入"
        autoFocus
        type="filledbase"
        prefix={<UserOutlined />}
      />
    </div>
  );
};

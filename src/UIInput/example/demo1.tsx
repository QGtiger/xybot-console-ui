import { UserOutlined } from '@ant-design/icons';
import {
  ThemeModel,
  UIInput,
  UIInputPassword,
  UIInputTextArea,
} from '@xybot/ui';

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
      <UIInputPassword size="xxl" placeholder="ui input password" />
      <UIInputPassword type="borderless" placeholder="ui input password" />
      <UIInputTextArea placeholder="ui input text area" />
      <UIInput.Number variant="underlined" type="borderless" />
      <UIInput
        placeholder="border 请输入"
        type="border"
        prefix={<UserOutlined />}
      />
      <UIInput
        placeholder="borderless 请输入"
        autoFocus
        type="borderless"
        prefix={<UserOutlined />}
      />

      <UIInput
        placeholder="filledsecondary 请输入"
        autoFocus
        type="filledsecondary"
        prefix={<UserOutlined />}
      />

      <UIInput
        placeholder="filledbase 请输入"
        autoFocus
        type="filledbase"
        prefix={<UserOutlined />}
      />
    </div>
  );
};

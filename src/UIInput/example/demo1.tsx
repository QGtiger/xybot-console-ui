import { UserOutlined } from '@ant-design/icons';
import {
  Form,
  ThemeModel,
  UIButton,
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
      Form
      <Form>
        <Form.Item
          label="用户名"
          name="username"
          required
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <UIInput type="border" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="borderless"
          name="borderless"
          required
          rules={[{ required: true, message: '请输入borderless' }]}
        >
          <UIInput placeholder="请输入borderless" type="borderless" />
        </Form.Item>
        <Form.Item
          label="filledsecondary"
          name="filledsecondary"
          required
          rules={[{ required: true, message: '请输入filledsecondary' }]}
        >
          <UIInput placeholder="请输入filledsecondary" type="filledsecondary" />
        </Form.Item>
        <Form.Item
          label="filledbase"
          name="filledbase"
          required
          rules={[{ required: true, message: '请输入filledbase' }]}
        >
          <UIInput placeholder="请输入filledbase" type="filledbase" />
        </Form.Item>
        <Form.Item
          label="TextArea"
          name="TextArea"
          required
          rules={[{ required: true, message: '请输入TextArea' }]}
        >
          <UIInput.TextArea />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          required
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <UIInputPassword placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <UIButton type="primary" htmlType="submit">
            提交
          </UIButton>
        </Form.Item>
      </Form>
      <UIInput type="filledbase" placeholder="请输入用户名" />
      <UIInputPassword size="xxl" placeholder="ui input password" />
      <UIInputPassword type="borderless" placeholder="ui input password" />
      <UIInputTextArea placeholder="ui input text area" />
      <UIInput.Number variant="underlined" type="borderless" />
      <UIInput placeholder="border 请输入" type="border" />
      <UIInput placeholder="borderless 请输入" autoFocus type="borderless" />
      <UIInput
        placeholder="filledsecondary 请输入"
        autoFocus
        type="filledsecondary"
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

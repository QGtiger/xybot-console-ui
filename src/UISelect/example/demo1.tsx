import { UserOutlined } from '@ant-design/icons';
import { Select, ThemeModel, UISelect } from '@xybot/ui';

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
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />
      <Select
        mode="multiple"
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />
      <UISelect
        placeholder="border 请输入"
        type="border"
        prefix={<UserOutlined />}
        size="xl"
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
        mode="multiple"
      />
      <UISelect
        placeholder="border 请输入"
        type="border"
        prefix={<UserOutlined />}
        size="xl"
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />
      <UISelect
        placeholder="borderless 请输入"
        autoFocus
        type="borderless"
        prefix={<UserOutlined />}
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />

      <UISelect
        placeholder="filledsecondary 请输入"
        autoFocus
        type="filledsecondary"
        prefix={<UserOutlined />}
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />

      <UISelect
        placeholder="filledbase 请输入"
        autoFocus
        type="filledbase"
        prefix={<UserOutlined />}
        options={[
          {
            label: 'Option 1',
            value: 'option1',
          },
          {
            label: 'Option 2',
            value: 'option2',
          },
        ]}
      />
    </div>
  );
};

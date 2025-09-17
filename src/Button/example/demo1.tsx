import { Button, ThemeModel } from '@xybot/ui';

function PrefixIconDemo() {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M2.18 4.63999L8 8.00665L13.82 4.63999M8 14.72V7.99999M14 10.6667V5.33332C13.9998 5.0995 13.938 4.86986 13.821 4.66743C13.704 4.465 13.5358 4.29689 13.3333 4.17999L8.66667 1.51332C8.46397 1.39629 8.23405 1.33469 8 1.33469C7.76595 1.33469 7.53603 1.39629 7.33333 1.51332L2.66667 4.17999C2.46417 4.29689 2.29599 4.465 2.17897 4.66743C2.06196 4.86986 2.00024 5.0995 2 5.33332V10.6667C2.00024 10.9005 2.06196 11.1301 2.17897 11.3325C2.29599 11.535 2.46417 11.7031 2.66667 11.82L7.33333 14.4867C7.53603 14.6037 7.76595 14.6653 8 14.6653C8.23405 14.6653 8.46397 14.6037 8.66667 14.4867L13.3333 11.82C13.5358 11.7031 13.704 11.535 13.821 11.3325C13.938 11.1301 13.9998 10.9005 14 10.6667Z"
        stroke={isDarkMode ? '#ffffff' : '#0F1118'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      {[
        { size: 'xs', label: 'Extra Small' },
        { size: 'sm', label: 'Small' },
        { size: 'md', label: 'Medium' },
        { size: 'lg', label: 'Large' },
        { size: 'xl', label: 'Extra Large' },
      ].map((item) => (
        <div
          key={item.size}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: 120,
              textAlign: 'right',
              fontSize: 12,
              color: isDarkMode ? '#999' : '#666',
            }}
          >
            {item.label} ({item.size})
          </span>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="border"
          >
            Click Me
          </Button>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="text"
          >
            Click Me
          </Button>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="base"
          >
            Click Me
          </Button>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="primary"
          >
            Click Me
          </Button>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="danger"
          >
            Click Me
          </Button>
          <Button
            prefix={<PrefixIconDemo />}
            size={item.size as any}
            type="secondary"
          >
            Click Me
          </Button>
        </div>
      ))}
    </div>
  );
};

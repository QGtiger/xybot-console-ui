import { ThemeModel, UIButton } from '@xybot/ui';

function PrefixIconDemo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      focusable="false"
      data-icon="more"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M8 1.333V4M8 12V14.667M3.287 3.287L5.173 5.173M10.827 10.827L12.713 12.713M1.333 8H4M12 8H14.667M3.287 12.713L5.173 10.827M10.827 5.173L12.713 3.287" />
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
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="border"
            onClick={() => {
              console.log('click');
            }}
            iconPosition="end"
          >
            Click Me
          </UIButton>
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="text"
          >
            Click Me
          </UIButton>
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="base"
          >
            Click Me
          </UIButton>
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="primary"
          >
            Click Me
          </UIButton>
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="danger"
          >
            Click Me
          </UIButton>
          <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="secondary"
          >
            Click Me
          </UIButton>
          {/* <UIButton
            icon={<PrefixIconDemo />}
            size={item.size as any}
            type="magic"
          >
            Click Me
          </UIButton> */}
        </div>
      ))}
    </div>
  );
};

import { ConfigProvider, Menu, MenuProps } from 'antd';
import './index.less';

export type UIMenuProps = Omit<MenuProps, 'theme'> & {
  size?: 'lg' | 'xl' | 'xxl';
};

export function UIMenu(props: UIMenuProps) {
  const { size = 'xl', ...rest } = props;

  const itemHeight = {
    lg: 32,
    xl: 36,
    xxl: 40,
  }[size];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight,
            itemSelectedColor: 'var(--text-base-default)',
            itemHoverBg: 'var(--bg-fill-deep-default)',
            itemActiveBg: 'var(--bg-fill-deep-secondary)',
            itemSelectedBg: 'var(--bg-fill-deep-secondary)',

            itemMarginInline: 0,
          },
        },
      }}
    >
      <Menu {...rest} inlineIndent={10} mode="inline" prefixCls="ui-menu" />
    </ConfigProvider>
  );
}

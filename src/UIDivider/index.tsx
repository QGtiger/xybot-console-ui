import { Divider, DividerProps } from 'antd';
import classNames from 'classnames';

import './index.less';

export type UIDividerProps = Omit<DividerProps, 'prefixCls' | 'size'> & {
  //  浅、中、深、黑洞
  preset?: 'light' | 'medium' | 'dark' | 'blackhole';
  size?: 'md' | 'lg';
};

export function UIDivider(props: UIDividerProps) {
  const { preset = 'medium', size = 'md' } = props;
  return (
    <Divider
      {...props}
      size="middle"
      className={classNames(
        `ui-divider-preset-${preset}`,
        `ui-divider-size-${size}`,
        props.className,
      )}
    />
  );
}

import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from 'antd';
import classNames from 'classnames';

import { forwardRef } from 'react';
import './input.less';

export type { InputRef };

export interface InputProps extends Omit<AntdInputProps, 'size' | 'variant'> {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'md' | 'lg' | 'xl' | 'xxl';
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const { type = 'md', size = 'lg', ...rest } = props;
  return (
    <AntdInput
      allowClear
      prefixCls="ui-input"
      ref={ref}
      {...rest}
      className={classNames(
        props.className,
        'ui-input',
        `ui-input-${size}`,
        `ui-input-type-${type}`,
      )}
    />
  );
});

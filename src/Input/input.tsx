import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from 'antd';

import { forwardRef } from 'react';
// import './input.less';

export type { InputRef };

export interface InputProps extends Omit<AntdInputProps, 'size' | 'variant'> {
  type?: 'outlined' | 'borderless' | 'filled-secondary' | 'filled-base';
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  return <AntdInput allowClear prefixCls="ui-input" {...props} />;
});

import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputRef,
} from 'antd';
import { composeRef } from 'rc-util/lib/ref';

import { forwardRef, useRef } from 'react';
// import './input.less';

export type { InputRef };

export interface InputProps extends Omit<AntdInputProps, 'size' | 'variant'> {
  type?: 'outlined' | 'borderless' | 'filled-secondary' | 'filled-base';
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  return (
    <AntdInput
      ref={composeRef(ref, inputRef)}
      // allowClear={{
      //   clearIcon: <Button size="xs" icon={<CloseIcon />} type="text" />,
      // }}
      allowClear
      prefixCls="ui-input"
      {...props}
    />
  );
});

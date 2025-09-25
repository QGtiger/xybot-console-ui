import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputNumber,
  InputRef,
} from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import classNames from 'classnames';

import { forwardRef } from 'react';
import './input.less';

type WrapperPropsWithCustom<T> = {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
} & T;

function UIInputWrapper<WrapperRef, WrapperProps>(Componet: any) {
  return forwardRef<WrapperRef, WrapperPropsWithCustom<WrapperProps>>(
    (props, ref) => {
      const { type = 'border', size = 'lg', ...rest } = props;
      return (
        <Componet
          ref={ref}
          {...rest}
          variant="outlined"
          className={classNames(
            props.className,
            'ui-input',
            `ui-input-${size}`,
            `ui-input-type-${type}`,
          )}
        />
      );
    },
  );
}

export const UIInputNumber = UIInputWrapper<InputRef, AntdInputProps>(
  InputNumber,
);

export const UIInputPassword = UIInputWrapper<InputRef, PasswordProps>(
  AntdInput.Password,
);

export const UIInput = UIInputWrapper<InputRef, AntdInputProps>(AntdInput);

export const UIInputTextArea = UIInputWrapper<InputRef, AntdInputProps>(
  AntdInput.TextArea,
);

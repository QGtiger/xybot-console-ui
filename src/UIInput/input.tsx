import {
  Input as AntdInput,
  InputProps as AntdInputProps,
  InputNumber,
  InputRef,
} from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import classNames from 'classnames';

import { forwardRef } from 'react';
import { useDefaultProps } from '../ThemeProvider';
import './input.less';

type WrapperPropsWithCustom<T> = Omit<T, 'size'> & {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
};

export type UIInputProps = WrapperPropsWithCustom<AntdInputProps>;

function UIInputWrapper<WrapperRef, WrapperProps>(Componet: any) {
  return forwardRef<WrapperRef, WrapperPropsWithCustom<WrapperProps>>(
    (props, ref) => {
      const {
        // @ts-expect-error
        type = 'border',
        // @ts-expect-error
        size = 'lg',
        ...rest
      } = useDefaultProps(props, 'uiInput');
      return (
        <Componet
          ref={ref}
          {...rest}
          variant="outlined"
          className={classNames(
            // @ts-expect-error
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

import {
  Input as AntdInput,
  InputNumberProps as AntdInputNumberProps,
  InputProps as AntdInputProps,
  ConfigProvider,
  InputNumber,
  InputRef,
} from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import classNames from 'classnames';

import { TextAreaProps } from 'antd/es/input';
import { forwardRef } from 'react';
import { useDefaultProps } from '../ThemeProvider';
import './input.less';

type WrapperPropsWithCustom<T> = Omit<T, 'size'> & {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
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
        <ConfigProvider prefixCls="ui">
          <Componet
            ref={ref}
            {...rest}
            variant="outlined"
            // prefixCls="ui-input"
            className={classNames(
              // @ts-expect-error
              props.className,
              'ui-input',
              `ui-input-${size}`,
              `ui-input-type-${type}`,
            )}
            // @ts-expect-error 通过取巧的方式 解决外层 样式问题
            suffix={props.suffix || <></>}
          />
        </ConfigProvider>
      );
    },
  );
}

export const UIInputNumber = UIInputWrapper<InputRef, AntdInputNumberProps>(
  InputNumber,
);

export const UIInputPassword = UIInputWrapper<InputRef, PasswordProps>(
  AntdInput.Password,
);

export const UIInput = UIInputWrapper<InputRef, AntdInputProps>(AntdInput);

export const UIInputTextArea = forwardRef<
  InputRef,
  TextAreaProps & {
    type?: UIInputProps['type'];
  }
>((props, ref) => {
  const { type = 'border', ...rest } = useDefaultProps(props, 'uiInput');
  return (
    <AntdInput.TextArea
      ref={ref}
      {...rest}
      variant="outlined"
      className={classNames(
        props.className,
        'ui-input',
        `ui-input-textarea`,
        `ui-input-type-${type}`,
      )}
    />
  );
});

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
import { FC, forwardRef } from 'react';
import { useDefaultProps } from '../ThemeProvider';
import './input.less';

type CommonInputProps = {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
};

type GetInputProps<T> = Omit<T, 'size' | 'variant' | 'type'> & CommonInputProps;

function UIInputWrapper<WrapperRef, WrapperProps extends CommonInputProps>(
  Componet: any,
) {
  return forwardRef<WrapperRef, WrapperProps>((props, ref) => {
    const {
      type = 'border',
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
  });
}

export type UIInputNumberProps = GetInputProps<AntdInputNumberProps>;
export const UIInputNumber: FC<UIInputNumberProps> = UIInputWrapper<
  InputRef,
  UIInputNumberProps
>(InputNumber);

export type UIInputPasswordProps = GetInputProps<PasswordProps>;
export const UIInputPassword = UIInputWrapper<InputRef, UIInputPasswordProps>(
  AntdInput.Password,
);

export type UIInputProps = GetInputProps<AntdInputProps>;
export const UIInput = UIInputWrapper<InputRef, UIInputProps>(AntdInput);

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

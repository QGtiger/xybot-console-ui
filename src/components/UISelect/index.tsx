import {
  Select as AntdSelect,
  SelectProps as AntdSelectProps,
  type RefSelectProps,
} from 'antd';
import classNames from 'classnames';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDefaultProps } from '../ThemeProvider';
import './index.less';

export interface UISelectProps
  extends Omit<AntdSelectProps, 'size' | 'variant'> {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'md' | 'lg' | 'xl' | 'xxl';
}

export const UISelect = forwardRef<RefSelectProps, UISelectProps>(
  (props, ref) => {
    const {
      type = 'border',
      size = 'lg',
      ...rest
    } = useDefaultProps(props, 'uiSelect');
    const selectRef = useRef<RefSelectProps>(null);

    useImperativeHandle(ref, () => selectRef.current as RefSelectProps);

    return (
      <AntdSelect
        allowClear
        prefixCls="ui-select"
        ref={selectRef}
        className={classNames(
          props.className,
          'ui-select',
          `ui-select-size-${size}`,
          `ui-select-type-${type}`,
        )}
        suffixIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            data-icon="more"
            width="1em"
            height="4px"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M1 0.5L4 3.5L7 0.5" />
          </svg>
        }
        menuItemSelectedIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // viewBox="0 0 16 16"
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
            <path d="M10 3L4.5 8.5L2 6" />
          </svg>
        }
        {...rest}
      />
    );
  },
);

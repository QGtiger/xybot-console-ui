import {
  Select as AntdSelect,
  SelectProps as AntdSelectProps,
  type RefSelectProps,
} from 'antd';
import classNames from 'classnames';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import './index.less';

export interface UISelectProps
  extends Omit<AntdSelectProps, 'size' | 'variant'> {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'md' | 'lg' | 'xl' | 'xxl';
}

export const UISelect = forwardRef<RefSelectProps, UISelectProps>(
  (props, ref) => {
    const { type = 'md', size = 'lg', ...rest } = props;
    const selectRef = useRef<RefSelectProps>(null);

    useImperativeHandle(ref, () => selectRef.current as RefSelectProps);

    return (
      <AntdSelect
        allowClear
        prefixCls="ui-select"
        ref={selectRef}
        {...rest}
        className={classNames(
          props.className,
          'ui-select',
          `ui-select-size-${size}`,
          `ui-select-type-${type}`,
        )}
      />
    );
  },
);

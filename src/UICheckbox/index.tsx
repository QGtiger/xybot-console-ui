import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from 'antd';
import './index.less';

export type UICheckboxProps = Omit<AntdCheckboxProps, 'prefixCls'>;

export function UICheckbox(props: UICheckboxProps) {
  return <AntdCheckbox {...props} prefixCls="ui-checkbox" />;
}

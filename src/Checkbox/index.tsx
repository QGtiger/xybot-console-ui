import {
  Checkbox as AntdCheckbox,
  CheckboxProps as AntdCheckboxProps,
} from 'antd';
import './index.less';

export type CheckboxProps = Omit<AntdCheckboxProps, 'prefixCls'>;

export function Checkbox(props: CheckboxProps) {
  return <AntdCheckbox {...props} prefixCls="ui-checkbox" />;
}

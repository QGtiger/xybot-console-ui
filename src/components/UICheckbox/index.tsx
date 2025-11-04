import { Checkbox, CheckboxProps } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import './index.less';

export type UICheckboxProps = OmitPrefixCls<CheckboxProps>;

function UICheckboxInner(props: UICheckboxProps) {
  return <Checkbox {...props} prefixCls="ui-checkbox" />;
}

function UICheckboxGroup(props: CheckboxGroupProps) {
  return <Checkbox.Group {...props} prefixCls="ui-checkbox" />;
}

type CompoundedComponent = typeof UICheckboxInner & {
  Group: typeof UICheckboxGroup;
};

export const UICheckbox = UICheckboxInner as CompoundedComponent;

UICheckbox.Group = UICheckboxGroup;

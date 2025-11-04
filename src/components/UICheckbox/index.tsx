import { Checkbox, CheckboxProps } from 'antd';
import './index.less';

export type UICheckboxProps = OmitPrefixCls<CheckboxProps>;

function UICheckboxInner(props: UICheckboxProps) {
  return <Checkbox {...props} prefixCls="ui-checkbox" />;
}

type CompoundedComponent = typeof UICheckboxInner & {
  Group: typeof Checkbox.Group;
};

export const UICheckbox = UICheckboxInner as CompoundedComponent;

UICheckbox.Group = Checkbox.Group;

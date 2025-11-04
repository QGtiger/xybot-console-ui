import { Dropdown, DropdownProps } from 'antd';
import './index.less';

export type UIDropdownProps = OmitPrefixCls<DropdownProps>;

export function UIDropdown(props: UIDropdownProps) {
  return <Dropdown {...props} prefixCls="ui-dropdown" />;
}

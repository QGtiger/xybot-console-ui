import { Switch, SwitchProps } from 'antd';

import './index.less';

export type UISwtichProps = OmitPrefixCls<SwitchProps>;

export function UISwitch(props: UISwtichProps) {
  return <Switch {...props} prefixCls="ui-switch" />;
}

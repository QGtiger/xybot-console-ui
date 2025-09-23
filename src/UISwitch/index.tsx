import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import './index.less';

export type UISwitchProps = Omit<AntdSwitchProps, 'prefixCls'>;

export function UISwitch(props: UISwitchProps) {
  return <AntdSwitch {...props} prefixCls="ui-switch" />;
}

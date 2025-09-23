import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import './index.less';

export type SwitchProps = Omit<AntdSwitchProps, 'prefixCls'>;

export function Switch(props: SwitchProps) {
  return <AntdSwitch {...props} prefixCls="ui-switch" />;
}

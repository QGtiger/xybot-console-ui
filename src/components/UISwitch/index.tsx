import type { OmitPrefixCls } from '@/types';
import { Switch, SwitchProps } from 'antd';

import './index.less';

export type UISwitchType = 'info' | 'neutral';

export type UISwtichProps = OmitPrefixCls<SwitchProps> & {
  type?: UISwitchType;
};

export function UISwitch({ type = 'info', ...rest }: UISwtichProps) {
  return <Switch {...rest} prefixCls="ui-switch" data-type={type} />;
}

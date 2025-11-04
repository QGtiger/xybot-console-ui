import { Tooltip, TooltipProps } from 'antd';

import './index.less';

export type UITooltipProps = OmitPrefixCls<TooltipProps>;

export function UITooltip(props: UITooltipProps) {
  return <Tooltip {...props} prefixCls="ui-tooltip" />;
}

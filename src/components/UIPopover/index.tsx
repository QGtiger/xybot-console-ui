import { Popover, PopoverProps } from 'antd';

import './index.less';

export type UIPopoverProps = OmitPrefixCls<PopoverProps>;

export function UIPopover(props: UIPopoverProps) {
  return <Popover {...props} prefixCls="ui-popover" />;
}

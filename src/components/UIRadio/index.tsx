import { Radio, RadioGroupProps, RadioProps } from 'antd';

import './index.less';

export type UIRadioProps = OmitPrefixCls<RadioProps>;

export function UIRadioInner(props: UIRadioProps) {
  return <Radio {...props} prefixCls="ui-radio" />;
}

export function UIRadioGroup(props: RadioGroupProps) {
  return <Radio.Group {...props} prefixCls="ui-radio" />;
}

type CompoundedComponent = typeof UIRadioInner & {
  Group: typeof UIRadioGroup;
};

export const UIRadio = UIRadioInner as CompoundedComponent;

UIRadio.Group = UIRadioGroup;

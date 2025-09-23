import { Radio, RadioGroupProps, RadioProps } from 'antd';

import './index.less';

export type UIRadioProps = Omit<RadioProps, 'prefixCls'>;

export function Group(props: RadioGroupProps) {
  return <Radio.Group {...props} prefixCls="ui-radio" />;
}

function InternalRadio(props: UIRadioProps) {
  return <Radio {...props} prefixCls="ui-radio" />;
}

type CompoundedComponent = typeof InternalRadio & {
  Group: typeof Group;
};

export const UIRadio = InternalRadio as CompoundedComponent;

UIRadio.Group = Group;

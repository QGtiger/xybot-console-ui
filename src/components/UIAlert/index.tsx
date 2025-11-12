import { Alert, AlertProps } from 'antd';

import './index.less';

export interface UIAlertProps extends Omit<AlertProps, 'type'> {
  type?: 'success' | 'info' | 'warning' | 'error' | 'secondary';
}

export function UIAlert(props: UIAlertProps) {
  const { type, ...rest } = props;
  if (type === 'secondary') {
    return (
      <Alert className="ui-alert-secondary" {...rest} prefixCls="ui-alert" />
    );
  }
  return <Alert {...rest} type={type} prefixCls="ui-alert" />;
}

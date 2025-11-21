import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import { useDefaultProps } from '@/components/ThemeProvider';
import './index.less';

type LinkType = 'default' | 'info' | 'secondary';

export interface UILinkProps extends React.HTMLAttributes<HTMLElement> {
  color?: LinkType;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function UILink(props: PropsWithChildren<UILinkProps>) {
  const { color = 'default', icon, ...rest } = useDefaultProps(props, 'uiLink');

  return (
    <button
      type="button"
      {...rest}
      className={classNames(`ui-link ui-link-${color}`, props.className)}
    >
      {icon && <span className="ui-link-icon">{icon}</span>}
      {props.children}
    </button>
  );
}

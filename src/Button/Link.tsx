import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import './link.less';

type LinkType = 'default' | 'info' | 'secondary';

export interface LinkProps extends React.HTMLAttributes<HTMLElement> {
  color?: LinkType;
  disabled?: boolean;
}

export function Link(props: PropsWithChildren<LinkProps>) {
  const { color = 'default', ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={classNames(`ui-link ui-link-${color}`, props.className)}
    >
      {props.children}
    </button>
  );
}

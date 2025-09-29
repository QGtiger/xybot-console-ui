import classNames from 'classnames';
import { PropsWithChildren } from 'react';

import { useDefaultProps } from '../ThemeProvider';
import './index.less';

type LinkType = 'default' | 'info' | 'secondary';

export interface UILinkProps extends React.HTMLAttributes<HTMLElement> {
  color?: LinkType;
  disabled?: boolean;
}

export function UILink(props: PropsWithChildren<UILinkProps>) {
  const { color = 'default', ...rest } = useDefaultProps(props, 'uiLink');

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

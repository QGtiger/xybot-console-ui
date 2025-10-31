import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export function IconFont(
  props: { type: string } & HTMLAttributes<HTMLSpanElement>,
) {
  const type = props.type.startsWith('icon')
    ? props.type
    : `icon-${props.type}`;
  return (
    <span
      {...props}
      className={classNames(`iconfont ${type}`, props.className)}
    ></span>
  );
}

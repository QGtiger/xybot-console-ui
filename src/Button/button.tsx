import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import './button.less';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonType =
  | 'border'
  | 'text'
  | 'base'
  | 'primary'
  | 'danger'
  | 'secondary';

type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
  'type' | 'icon' | 'size'
>;

export type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
  icon?: React.ReactNode;
} & MergedHTMLAttributes;

const defaultSize = 'md';
const defaultType = 'primary';

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { size = defaultSize, type = defaultType, icon, ...rest } = props;

  const isIconOnly = !!icon && !props.children;

  return (
    <button
      {...rest}
      type="button"
      className={classNames(
        `ui-btn ui-btn-${size} ui-btn-type-${type}`,
        isIconOnly ? `ui-btn-${size}-iconOnly` : '',
        props.className,
      )}
    >
      {icon && <span className="ui-btn-icon">{icon}</span>}

      {props.children}
    </button>
  );
}

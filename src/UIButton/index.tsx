import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import classNames from 'classnames';

import './index.less';

type UIButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type UIButtonType =
  | 'border'
  | 'text'
  | 'base'
  | 'primary'
  | 'danger'
  | 'secondary';

export type UIButtonProps = Omit<
  AntdButtonProps,
  'type' | 'size' | 'variant' | 'prefixCls'
> & {
  size?: UIButtonSize;
  type?: UIButtonType;
};

const defaultSize = 'lg';
const defaultType = 'danger';

const defaultLoading = {
  icon: (
    <svg
      className="rotate"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      focusable="false"
      data-icon="more"
      width="1em"
      height="1em"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M8 1.333V4M8 12V14.667M3.287 3.287L5.173 5.173M10.827 10.827L12.713 12.713M1.333 8H4M12 8H14.667M3.287 12.713L5.173 10.827M10.827 5.173L12.713 3.287" />
    </svg>
  ),
};

export function UIButton(props: UIButtonProps) {
  const {
    type = defaultType,
    size = defaultSize,
    disabled,
    loading,
    ...rest
  } = props;

  const mergeLoading: UIButtonProps['loading'] = (() => {
    if (!loading) return false;
    if (typeof loading === 'object') {
      return {
        ...defaultLoading,
        ...loading,
      };
    }
    return defaultLoading;
  })();

  return (
    <AntdButton
      {...rest}
      type="default"
      disabled={disabled}
      loading={mergeLoading}
      className={classNames(
        `ui-btn ui-btn-size-${size} ui-btn-type-${type}`,
        props.className,
        { 'ui-btn-disabled': disabled },
      )}
    />
  );
}

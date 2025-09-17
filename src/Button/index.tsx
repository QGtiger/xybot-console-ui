import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export interface ButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'border' | 'text' | 'base' | 'primary' | 'danger' | 'secondary';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { size = 'xl', type = 'primary', onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        ' text-textBaseDefault border border-solid border-transparent inline-flex items-center justify-center transition-all outline-none leading-[20px] text-[13px] ',
        'not-disabled:active:shadow-btnActiveShadow ',
        'not-disabled:focus-visible:border-borderInfoDefault not-disabled:focus-visible:shadow-btnFocusVisibleShadow',
        'disabled:cursor-not-allowed disabled:opacity-50 ',
        {
          xs: ' px-1.5 gap-0.5 rounded-md',
          sm: ' px-2 py-0.5 gap-1 rounded-md',
          md: ' px-2.5 py-1 gap-1 rounded-lg',
          lg: ' py-1.5 px-3 gap-2 rounded-lg',
          xl: ' py-2 px-3 gap-2 rounded-lg',
        }[size],
        {
          border:
            ' !border-borderBaseSecondary not-disabled:hover:bg-effectInteractiveHoverCave  ',
          text: ' not-disabled:hover:border-borderBaseSecondary not-disabled:hover:bg-effectInteractiveHoverCave  ',
          base: ' btn-base bg-bgBaseContainer shadow-baseBtnShadow not-disabled:hover:border-borderBaseSecondary   ',
          primary:
            ' btn-primary bg-bgBaseSpotlight text-textBaseInGrayDefault  ',
          danger:
            ' btn-danger bg-bgPrimaryQuaternary text-textBaseInGrayDefault  ',
          secondary:
            ' btn-secondary bg-bgFillTertiary not-disabled:hover:border-borderBaseSecondary  ',
        }[type],
      )}
    >
      {props.prefix}
      {props.children}
      {props.suffix}
    </button>
  );
}

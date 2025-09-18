import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonType =
  | 'border'
  | 'text'
  | 'base'
  | 'primary'
  | 'danger'
  | 'secondary';

export interface ButtonProps {
  size?: ButtonSize;
  type?: ButtonType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const defaultSize = 'md';
const defaultType = 'primary';

function getBtnRectClassName(size: ButtonSize) {
  return {
    xs: ' px-1.5 gap-0.5 rounded-md',
    sm: ' px-2 py-0.5 gap-1 rounded-md',
    md: ' px-2.5 py-1 gap-1 rounded-lg',
    lg: ' py-1.5 px-3 gap-2 rounded-lg',
    xl: ' py-2 px-3 gap-2 rounded-lg',
  }[size];
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { size = defaultSize, type = defaultType, onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        ' text-textBase-default border border-solid border-transparent inline-flex items-center justify-center transition-all outline-none leading-[20px] text-[13px] ',
        ' btn-active-shadow',
        ' btn-focus-visible',
        ' btn-disabled',
        getBtnRectClassName(size),
        {
          border: ' !border-borderBase-secondary ihover:bg-bgFill-secondary  ',
          text: ' ihover:border-borderBase-secondary ihover:bg-bgFill-secondary iactive:bg-bgFill-tertiary ',
          base: '  bg-bgBase-container ihover:bg-bgBase-containerSecondary iactive:bg-bgBase-layout shadow-baseBtnShadow not-disabled:hover:border-borderBase-secondary   ',
          primary:
            ' bg-bgBase-spotlight ihover:bg-bgBase-spotlightSecondary iactive:bg-bgBase-spotlight text-textBase-inGrayDefault  ',
          danger:
            '  bg-bgPrimary-spotlight ihover:bg-bgPrimary-spotlightSecondary iactive:bg-bgPrimary-spotlight text-textBase-inColorDefault  ',
          secondary:
            '  bg-bgFill-secondary ihover:bg-bgFill-tertiary iactive:bg-bgFill-quaternary  ',
        }[type],
      )}
    >
      {props.prefix}
      {props.children}
      {props.suffix}
    </button>
  );
}

import classNames from 'classnames';

export interface ButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'border' | 'text' | 'base' | 'primary' | 'danger' | 'secondary';
}

export function Button(props: ButtonProps) {
  const { size = 'xl', type = 'primary' } = props;

  return (
    <button
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
          base: ' bg-bgBaseContainer shadow-baseBtnShadow not-disabled:hover:border-borderBaseSecondary not-disabled:hover:bg-[#f8f8f8] not-disabled:active:bg-[#f3f3f3] ',
          primary:
            ' bg-bgBaseSpotlight text-textBaseInGrayDefault not-disabled:hover:bg-[#5c5c60] not-disabled:active:bg-[#24252a]  ',
          danger:
            ' bg-bgPrimaryQuaternary text-textBaseInGrayDefault not-disabled:hover:bg-[#e8777b]  not-disabled:active:bg-[#d54b4d] ',
          secondary:
            ' bg-bgFillTertiary not-disabled:hover:border-borderBaseSecondary not-disabled:hover:bg-[#c2c2c3] not-disabled:active:bg-[#bfbfbf]  ',
        }[type],
      )}
    >
      Click Me
    </button>
  );
}

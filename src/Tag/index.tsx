import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type TagProps = {
  size?: 'sm' | 'md' | 'lg';
  type?: 'border' | 'text' | 'textSecondary' | 'secondary' | 'primary';
  preset?: 'default' | 'link' | 'danger';
  prefix?: React.ReactNode;
  allowClose?: boolean;
  onClose?: () => void;
  disabled?: boolean;
};

const closeIcon = (
  <svg
    fillRule="evenodd"
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
  </svg>
);

export function Tag(props: PropsWithChildren<TagProps>) {
  const {
    size = 'md',
    type = 'primary',
    preset = 'default',
    prefix,
    allowClose,
    onClose,
    disabled,
  } = props;

  const [show, showAction] = useBoolean(true);

  if (!show) return null;

  return (
    <button
      type="button"
      className={classNames(
        ' inline-flex items-center border border-solid border-transparent outline-none transition-all ',
        {
          sm: ' px-0.5 rounded gap-0.5 leading-4 text-xs',
          md: ' px-1 rounded-md gap-0.5 leading-5 text-xs',
          lg: ' px-1.5 rounded-md gap-0.5 leading-6 text-[13px]',
        }[size],

        // shadow
        {
          border: {
            default: ' btn-active-shadow',
            link: '  btn-active-shadow ',
            danger: ' btn-active-shadow',
          },
          text: {
            default: '',
            link: ' ',
            danger: '',
          },
          textSecondary: {
            default: ' ',
            link: ' ',
            danger: '',
          },
          secondary: {
            default: ' btn-active-shadow',
            link: '  btn-active-shadow ',
            danger: ' btn-active-shadow',
          },
          primary: {
            default: ' btn-active-shadow',
            link: '  btn-active-shadow ',
            danger: ' btn-active-shadow',
          },
        }[type][preset],

        // 背景色
        {
          border: {
            default: ' ihover:bg-effectInteractiveHoverCave',
            link: ' ihover:bg-effectInteractiveHoverCave',
            danger: ' ihover:bg-effectInteractiveHoverCave',
          },
          text: {
            default: ' ',
            link: ' ',
            danger: '',
          },
          textSecondary: {
            default: ' ',
            link: ' ',
            danger: '',
          },
          secondary: {
            default: ' bg-bgFillTertiary tag-default-secondary ',
            link: ' bg-bgInfoSecondary tag-link-secondary-hover',
            danger: ' bg-bgPrimarySecondary tag-secondary-danger-hover',
          },
          primary: {
            default: ' bg-bgBaseSpotlight btn-primary',
            link: ' bg-bgInfoQuaternary infoQuaternaryHover ',
            danger: ' bg-bgPrimaryQuaternary primaryQuaternaryHover',
          },
        }[type][preset],

        // 边框色
        {
          border: {
            default:
              ' border-borderBaseSecondary not-disabled:focus-visible:border-borderInfoDefault not-disabled:focus-visible:shadow-btnFocusVisibleShadow',
            link: '  border-borderInfoSecondary not-disabled:focus-visible:border-borderInfoDefault not-disabled:focus-visible:shadow-btnFocusVisibleShadow',
            danger:
              ' border-borderPrimarySecondary not-disabled:focus-visible:border-borderInfoDefault not-disabled:focus-visible:shadow-btnFocusVisibleShadow',
          },
          text: {
            default:
              ' rounded-none  ihover:border-b-borderBaseQuaternary iactive:border-b-borderBaseQuaternary',
            link: ' rounded-none  ihover:border-b-borderInfoDefault iactive:border-b-borderInfoDefault',
            danger:
              ' rounded-none  ihover:border-b-borderPrimaryDefault iactive:border-b-borderPrimaryDefault',
          },
          textSecondary: {
            default:
              ' rounded-none  ihover:border-b-borderBaseQuaternary iactive:border-b-borderBaseQuaternary',
            link: 'rounded-none  ihover:border-b-borderInfoDefault iactive:border-b-borderInfoDefault',
            danger:
              'rounded-none  ihover:border-b-borderPrimaryDefault iactive:border-b-borderPrimaryDefault',
          },
          secondary: {
            default:
              ' border-borderBaseSecondary ifocus-visible:border-borderInfoDefault',
            link: ' border-borderInfoSecondary ifocus-visible:border-borderInfoDefault',
            danger:
              ' border-borderPrimarySecondary ifocus-visible:border-borderInfoDefault',
          },
          primary: {
            default: ' ifocus-visible:border-borderInfoDefault ',
            link: ' ifocus-visible:border-borderInfoDefault',
            danger: ' ifocus-visible:border-borderInfoDefault',
          },
        }[type][preset],

        // 文字颜色
        {
          border: {
            default: ' text-textBaseSecondary',
            link: 'text-textInfoDefault',
            danger: ' text-textPrimaryDefault',
          },
          text: {
            default: ' text-textBaseDefault ',
            link: ' text-textInfoDefault',
            danger: 'text-textPrimaryDefault',
          },
          textSecondary: {
            default: ' text-textBaseTertiary ',
            link: ' text-textInfoSecondary',
            danger: ' text-textPrimarySecondary',
          },
          secondary: {
            default: ' text-textBaseSecondary ',
            link: ' text-textInfoDefault',
            danger: 'text-textPrimaryDefault',
          },
          primary: {
            default: ' text-textBaseInGrayDefault ',
            link: ' text-white-1000',
            danger: ' text-white-1000',
          },
        }[type][preset],

        {
          ' off ': disabled,
        },
      )}
    >
      {prefix}
      <span className=" line-clamp-1 break-all">{props.children}</span>

      {allowClose && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;
            onClose?.();
            showAction.setFalse();
          }}
          className={classNames(' flex items-center ', {
            ' cursor-pointer ': !disabled,
          })}
        >
          {closeIcon}
        </span>
      )}
    </button>
  );
}

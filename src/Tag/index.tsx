import { useBoolean } from 'ahooks';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type TagProps = {
  size?: 'sm' | 'md' | 'lg';
  type?: 'border' | 'text' | 'textSecondary' | 'secondary' | 'primary';
  preset?: 'default' | 'link' | 'danger';
  icon?: React.ReactNode;
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
    icon,
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
        ' btn-disabled',
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
        }[type]?.[preset],

        // 背景色
        {
          border: {
            default: ' ihover:bg-bgFill-secondary',
            link: ' ihover:bg-bgFill-secondary',
            danger: ' ihover:bg-bgFill-secondary',
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
            default: ' bg-bgFill-secondary ihover:bg-bgFill-tertiary',
            link: ' bg-bgInfo-secondary  ihover:bg-bgInfo-tertiary',
            danger: ' bg-bgPrimary-secondary ihover:bg-bgPrimary-tertiary ',
          },
          primary: {
            default: ' bg-bgBase-spotlight ihover:bg-bgBase-spotlightSecondary',
            link: ' bg-bgInfo-spotlight ihover:bg-bgInfo-spotlightSecondary ',
            danger:
              ' bg-bgPrimary-spotlight ihover:bg-bgPrimary-spotlightSecondary ',
          },
        }[type][preset],

        // 边框色
        {
          border: {
            default: ' !border-borderBase-secondary btn-focus-visible',
            link: '  !border-borderInfo-secondary btn-focus-visible',
            danger: ' !border-borderPrimary-secondary btn-focus-visible',
          },
          text: {
            default:
              ' rounded-none  ihover:border-b-borderBase-quaternary iactive:border-b-borderBase-quaternary',
            link: ' rounded-none  ihover:border-b-borderInfo-default iactive:border-b-borderInfo-default',
            danger:
              ' rounded-none  ihover:border-b-borderPrimary-default iactive:border-b-borderPrimary-default',
          },
          textSecondary: {
            default:
              ' rounded-none  ihover:border-b-borderBase-quaternary iactive:border-b-borderBase-quaternary',
            link: 'rounded-none  ihover:border-b-borderInfo-default iactive:border-b-borderInfo-default',
            danger:
              'rounded-none  ihover:border-b-borderPrimary-default iactive:border-b-borderPrimary-default',
          },
          secondary: {
            default: ' ihover:border-borderBase-secondary btn-focus-visible',
            link: ' ihover:border-borderInfo-secondary btn-focus-visible',
            danger: ' ihover:border-borderPrimary-secondary btn-focus-visible',
          },
          primary: {
            default: 'btn-focus-visible ',
            link: ' btn-focus-visible',
            danger: ' btn-focus-visible',
          },
        }[type]?.[preset],

        // 文字颜色
        {
          border: {
            default: ' text-textBase-secondary',
            link: 'text-textInfo-default',
            danger: ' text-textPrimary-default',
          },
          text: {
            default: ' text-textBase-default ',
            link: ' text-textInfo-default',
            danger: 'text-textPrimary-default',
          },
          textSecondary: {
            default: ' text-textBase-tertiary ',
            link: ' text-textInfo-secondary',
            danger: ' text-textPrimary-secondary',
          },
          secondary: {
            default: ' text-textBase-secondary ',
            link: ' text-textInfo-default',
            danger: 'text-textPrimary-default',
          },
          primary: {
            default: ' text-textBase-inGrayDefault ',
            link: ' text-white-1000',
            danger: ' text-white-1000',
          },
        }[type]?.[preset],

        {
          ' off ': disabled,
        },
      )}
    >
      {icon}
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

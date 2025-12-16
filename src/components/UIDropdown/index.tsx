import { ScrollArea } from '@/blocks';
import { Dropdown, DropdownProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.less';

export type UIDropdownProps = OmitPrefixCls<DropdownProps> & {
  footer?: React.ReactNode;
  width?: number | string;
  maxHeight?: number | string;
  useCustomStyle?: boolean;
};

export function UIDropdown(props: UIDropdownProps) {
  const { popupRender, footer, useCustomStyle } = props;

  return (
    <Dropdown
      {...props}
      overlayClassName={classNames(
        props.overlayClassName,
        {
          'ui-dropdown-custom-style': useCustomStyle,
        },
        useCustomStyle
          ? 'ui-dropdown-custom-style'
          : 'ui-dropdown-default-style',
      )}
      popupRender={(menu) => {
        if (!useCustomStyle) return menu;
        if (popupRender) {
          return popupRender(menu);
        }
        return (
          <div
            className="flex flex-col ui-dropdown-menu-wrapper p-1.5"
            style={{
              width: props.width || 'max-content',
            }}
          >
            <ScrollArea
              className=" w-full -ml-[6px] px-[6px]"
              style={{
                maxHeight: props.maxHeight || 'auto',
              }}
            >
              {menu}
            </ScrollArea>
            {footer && (
              <>
                <div className="h-[1px] bg-borderBase-default my-2 mx-2"></div>
                <div>{props.footer}</div>
              </>
            )}
          </div>
        );
      }}
      prefixCls="ui-dropdown"
    />
  );
}

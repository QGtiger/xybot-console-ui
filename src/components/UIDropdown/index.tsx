import { ScrollArea } from '@/blocks';
import { Dropdown, DropdownProps } from 'antd';
import React from 'react';
import './index.less';

export type UIDropdownProps = OmitPrefixCls<DropdownProps> & {
  footer?: React.ReactNode;
  width?: number | string;
  maxHeight?: number | string;
};

export function UIDropdown(props: UIDropdownProps) {
  const { popupRender, footer } = props;

  return (
    <Dropdown
      {...props}
      popupRender={(menu) => {
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
              className=" w-full"
              style={{
                maxHeight: props.maxHeight || 'auto',
              }}
            >
              {menu}
            </ScrollArea>
            {footer && (
              <>
                <div className="h-[1px] bg-borderBase-default my-1 mx-2"></div>
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

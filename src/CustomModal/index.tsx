import React from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { ThemeModel } from '../ThemeProvider';
import './index.less';

export interface CustomModalContentProps {
  title: React.ReactNode;
  subTitle?:
    | React.ReactNode
    | ((toggleNode: React.ReactNode) => React.ReactNode);
  logo?: React.ReactNode;
  // extra
  extra?: React.ReactNode;
  closeable?: boolean;
  content?: React.ReactNode;

  rtRender?: (closeBtn: React.ReactNode) => React.ReactNode;
}

function CustomModalContent(
  props: CustomModalContentProps & {
    onClose: () => void;
  },
) {
  const {
    title,
    subTitle,
    logo,
    extra,
    content,
    closeable = true,
    onClose,
    rtRender = (t) => t,
  } = props;
  const [showExtra, showExtraAction] = useBoolean(false);

  const toggleNode = extra && (
    <div className="extra-toggle" onClick={() => showExtraAction.toggle()}>
      <span>{showExtra ? '收起' : '展开'}引导</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M9 7.5L6 4.5L3 7.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  const renderSubTitle = () => {
    if (typeof subTitle === 'function') {
      return subTitle(toggleNode);
    }
    return (
      <>
        <div className="sub-title">{subTitle}</div>
        {toggleNode}
      </>
    );
  };

  return (
    <div className="ui-custom-modal">
      <div className="ui-custom-modal-header">
        {logo && <div className="logo">{logo}</div>}
        <div className="title-wrapper">
          <div className="title">{title}</div>
          <div className="sub">{renderSubTitle()}</div>
        </div>
      </div>
      {showExtra && <div className="extra-content">{extra}</div>}
      <div className="ui-custom-modal-content">{content}</div>

      {closeable && (
        <div className="rt-cont">
          {rtRender(
            <div className="act-btn close-btn" onClick={onClose}>
              <CloseOutlined />
            </div>,
          )}
        </div>
      )}
    </div>
  );
}

export function useCustomModal() {
  const { modal } = ThemeModel.useModel();

  const showCustomModal = (props: CustomModalContentProps) => {
    const ins = modal.confirm({
      icon: null,
      footer: null,
      styles: {
        content: {
          padding: 0,
        },
      },
      className: 'ui-custom-modal-wrapper',
      content: (
        <CustomModalContent
          {...props}
          onClose={() => {
            ins.destroy();
          }}
        />
      ),
    });
  };

  return { showCustomModal };
}

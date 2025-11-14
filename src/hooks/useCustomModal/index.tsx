import React, { useMemo, useRef, useState } from 'react';

import { ScrollArea } from '@/blocks';
import { UIModalFuncProps } from '@/components';
import { ThemeModel } from '@/components/ThemeProvider';
import { UIButton, UIButtonProps } from '@/components/UIButton';
import { CloseOutlined } from '@ant-design/icons';
import { useBoolean, useSize } from 'ahooks';
import { Modal } from 'antd';
import classNames from 'classnames';
import './index.less';

export type ControlContentProps = {
  originFooterNode: React.ReactNode;
  extra: {
    OkBtn: React.FC;
    CancelBtn: React.FC;
    close: () => void;
  };
  setFooter: (rn: React.ReactNode) => void;
};

export interface CustomModalContentProps {
  title: React.ReactNode;
  subTitle?:
    | React.ReactNode
    | ((toggleNode: React.ReactNode) => React.ReactNode);
  logo?: React.ReactNode;

  isWithLogoWrapper?: boolean;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  headerStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;

  // extra
  extra?: React.ReactNode;
  closeable?: boolean;
  content?: React.ReactNode | ((opts: ControlContentProps) => React.ReactNode);

  rtRender?: (closeBtn: React.ReactNode) => React.ReactNode;
  footer?:
    | React.ReactNode
    | ((
        originNode: React.ReactNode,
        extra: {
          OkBtn: React.FC;
          CancelBtn: React.FC;
          close: () => void;
        },
      ) => React.ReactNode);

  okButtonProps?: UIButtonProps;
  okText?: React.ReactNode;
  cancelButtonProps?: UIButtonProps;
  cancelText?: React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;

  width?: number;

  originalMoalProps?: Omit<
    UIModalFuncProps,
    'content' | 'width' | 'icon' | 'footer' | 'styles' | 'className'
  >;
}

export function CustomModalContent(
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
    isWithLogoWrapper = true,
    headerStyle,
    footerStyle,
    footer,
    okButtonProps,
    okText = '确认',
    cancelButtonProps,
    cancelText = '取消',
    onOk,
    onCancel,
    headerClassName,
    contentClassName,
    footerClassName,
  } = props;
  const [showExtra, showExtraAction] = useBoolean(false);
  const [footerNode, setFooterNode] = useState<React.ReactNode>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const headerSize = useSize(headerRef);
  const footerSize = useSize(footerRef);
  const extraSize = useSize(extraRef);

  const toggleNode = extra && (
    <div className="extra-toggle" onClick={() => showExtraAction.toggle()}>
      {showExtra ? (
        <>
          收起引导
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
        </>
      ) : (
        <>如何操作?</>
      )}
    </div>
  );

  const renderSubTitle = () => {
    if (!subTitle) return toggleNode;
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

  const renderLogo = () => {
    if (!logo) return null;
    const logoNode = <div className="logo">{logo}</div>;
    if (isWithLogoWrapper) {
      return <div className="logo-wrapper">{logoNode}</div>;
    }
    return logoNode;
  };

  const OkBtn = (
    <UIButton
      onClick={() => {
        Promise.resolve(onOk?.()).then(onClose);
      }}
      type="danger"
      {...okButtonProps}
    >
      {okText}
    </UIButton>
  );

  const CancelBtn = (
    <UIButton
      type="border"
      onClick={() => {
        Promise.resolve(onCancel?.()).then(onClose);
      }}
      {...cancelButtonProps}
    >
      {cancelText}
    </UIButton>
  );

  const originFooterNode = (
    <div className="actions">
      {OkBtn}
      {CancelBtn}
    </div>
  );

  const renderFooter = () => {
    if (footer === null) return null;
    if (typeof footer !== 'function' && footer !== undefined) {
      return footer;
    }

    const fn = footer || ((n) => n);

    return fn(originFooterNode, {
      OkBtn: () => OkBtn,
      CancelBtn: () => CancelBtn,
      close: onClose,
    });
  };

  const modalContent = useMemo(() => {
    console.log('renderContent', content);
    if (typeof content === 'function') {
      return content({
        originFooterNode,
        extra: {
          OkBtn: () => OkBtn,
          CancelBtn: () => CancelBtn,
          close: onClose,
        },
        setFooter(footerNode) {
          setFooterNode(footerNode);
        },
      });
    }
    return content;
  }, [content]);

  // const renderContent = () => {
  //   console.log('renderContent', content);
  //   if (typeof content === 'function') {
  //     return content({
  //       originFooterNode,
  //       extra: {
  //         OkBtn: () => OkBtn,
  //         CancelBtn: () => CancelBtn,
  //         close: onClose,
  //       },
  //       setFooter(footerNode) {
  //         setFooterNode(footerNode);
  //       },
  //     });
  //   }
  //   return content;
  // };

  const fNode = footerNode || renderFooter();

  return (
    <div
      className={classNames('ui-custom-modal flex flex-col ')}
      style={{
        // @ts-expect-error
        '--fh':
          (footerSize?.height || 0) +
            (headerSize?.height || 0) +
            (showExtra ? extraSize?.height || 0 : 0) || 0,
      }}
    >
      <div
        className={classNames(
          'ui-custom-modal-header flex-shrink-0',
          headerClassName,
        )}
        style={headerStyle}
        ref={headerRef}
      >
        {renderLogo()}
        <div className="title-wrapper">
          <div className="title">{title}</div>
          <div className="sub">{renderSubTitle()}</div>
        </div>
      </div>
      {showExtra && (
        <div className="extra-content" ref={extraRef}>
          {extra}
        </div>
      )}
      <ScrollArea className=" ui-custom-modal-scroll-area">
        <div
          className={classNames('ui-custom-modal-content', contentClassName)}
        >
          {modalContent}
        </div>
      </ScrollArea>

      {fNode && (
        <div
          className={classNames(
            'ui-custom-modal-footer flex-shrink-0',
            footerClassName,
          )}
          style={footerStyle}
          ref={footerRef}
        >
          {fNode}
        </div>
      )}

      {closeable && (
        <div className="rt-cont">
          {rtRender(
            <div
              className="act-btn close-btn"
              onClick={() => {
                Promise.resolve(onCancel?.()).then(onClose);
              }}
            >
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
      width: props.width || 520,
      ...props.originalMoalProps,
    });
    return ins;
  };

  return { showCustomModal };
}

export function useCustomModalWithHolder() {
  const [modal, contextHolder] = Modal.useModal();

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
      width: props.width || 520,
    });
    return ins;
  };

  return { showCustomModal, contextHolder };
}

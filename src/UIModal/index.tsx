import { Modal, ModalProps } from 'antd';
import { ConfigUpdate, ModalFunc } from 'antd/es/modal/confirm';
import { UIButton, UIButtonProps } from '../UIButton';

import { FC, useMemo } from 'react';

import './index.less';

export type UIModalFuncProps = Omit<
  Parameters<ModalFunc>[0],
  'okButtonProps' | 'cancelButtonProps'
> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
} & {
  okButtonProps?: UIButtonProps;
  cancelButtonProps?: UIButtonProps;
};

export type UIModalFunc = (config: UIModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
} & {
  then<T>(resolve: (confirmed: boolean) => T, reject: VoidFunction): Promise<T>;
};

const sizeWidthMap = {
  sm: 320,
  md: 480,
  lg: 640,
  xl: 720,
};

type ModalType = 'confirm' | 'info' | 'success' | 'error' | 'warning';
const ModalTypes: ModalType[] = [
  'confirm',
  'info',
  'success',
  'error',
  'warning',
];

export type UIModalFns = Record<ModalType, UIModalFunc>;

function isNoFooter(v: any) {
  return v === null || v === false;
}

type UIModalStaticFunctions = Record<NonNullable<ModalType>, UIModalFunc>;

function getModalInvokeOptions(config: UIModalFuncProps, close: () => void) {
  const {
    okText = '确认',
    cancelText = '取消',
    onOk,
    onCancel,
    footer,
    size = 'md',
    width,
    type = 'confirm',
    okButtonProps,
    cancelButtonProps,
  } = config;

  const mergeWidth = width || sizeWidthMap[size];

  return {
    ...config,
    width: mergeWidth,
    footer: !isNoFooter(footer)
      ? () => {
          if (typeof footer !== 'function' && footer !== undefined) {
            return footer;
          }
          const OkBtn: FC = () => (
            <UIButton
              onClick={() => {
                Promise.resolve(onOk?.()).then(close);
              }}
              type="danger"
              {...okButtonProps}
            >
              {okText}
            </UIButton>
          );

          const CancelBtn = () => (
            <UIButton
              type="border"
              onClick={() => {
                Promise.resolve(onCancel?.()).then(close);
              }}
              {...cancelButtonProps}
            >
              {cancelText}
            </UIButton>
          );

          const originNode = (
            <div className="ui-modal-footer">
              <OkBtn />
              {type === 'confirm' && <CancelBtn />}
            </div>
          );

          if (footer) {
            return footer(originNode, {
              OkBtn,
              CancelBtn,
            });
          }

          return originNode;
        }
      : footer,
  };
}

export function useUIModal() {
  const [customModal, modalHolder] = Modal.useModal();

  const modal = useMemo(() => {
    return ModalTypes.reduce((acc, type) => {
      // @ts-ignore
      acc[type] = (config: UIModalFuncProps) => {
        const modalRef = customModal[type](
          // @ts-expect-error 复写了 okButtonProps cancelButtonProps 属性
          getModalInvokeOptions(
            {
              ...config,
              type,
            },
            () => {
              modalRef.destroy();
            },
          ),
        );
        return modalRef;
      };
      return acc;
    }, {} as Record<ModalType, UIModalFunc>);
  }, [customModal]);

  return {
    modal,
    modalHolder,
  };
}

function UIOriginModal(
  props: ModalProps & {
    size?: 'sm' | 'md' | 'lg' | 'xl';
  },
) {
  const {
    okText = '确认',
    cancelText = '取消',
    onOk,
    onCancel,
    footer,
    size = 'md',
    width,
    okButtonProps,
    cancelButtonProps,
  } = props;

  const mergeWidth = width || sizeWidthMap[size];

  const mergedFooter = !isNoFooter(footer)
    ? () => {
        if (typeof footer !== 'function' && footer !== undefined) {
          return footer;
        }
        const OkBtn: FC = () => (
          <UIButton onClick={onOk} type="danger" {...okButtonProps}>
            {okText}
          </UIButton>
        );

        const CancelBtn = () => (
          <UIButton type="border" onClick={onCancel} {...cancelButtonProps}>
            {cancelText}
          </UIButton>
        );

        const originNode = (
          <div className="ui-modal-footer">
            <OkBtn />
            <CancelBtn />
          </div>
        );

        if (footer) {
          return footer(originNode, {
            OkBtn,
            CancelBtn,
          });
        }

        return originNode;
      }
    : footer;

  return <Modal {...props} footer={mergedFooter} width={mergeWidth} />;
}

export const UIModal = UIOriginModal as typeof UIOriginModal &
  UIModalStaticFunctions;

ModalTypes.forEach((type) => {
  // @ts-ignore
  UIModal[type] = (config: UIModalFuncProps) => {
    const modalRef = Modal[type](
      // @ts-expect-error 复写了 okButtonProps cancelButtonProps 属性
      getModalInvokeOptions(
        {
          ...config,
          type,
          prefixCls: 'ui-modal',
        },
        () => {
          modalRef.destroy();
        },
      ),
    );
    return modalRef;
  };
});

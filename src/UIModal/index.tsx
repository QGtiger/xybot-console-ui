import { Modal, ModalProps } from 'antd';
import { ConfigUpdate, ModalFunc } from 'antd/es/modal/confirm';
import { UIButton } from '../UIButton';

import { FC, useMemo } from 'react';

import './index.less';

export type UIModalFuncProps = Parameters<ModalFunc>[0] & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  } = config;

  const mergeWidth = width || sizeWidthMap[size];

  return {
    ...config,
    width: mergeWidth,
    footer() {
      if (typeof footer !== 'function' && footer !== undefined) {
        return footer;
      }
      const OkBtn: FC = () => (
        <UIButton
          onClick={() => {
            Promise.resolve(onOk?.()).then(close);
          }}
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
    },
  };
}

export function useUIModal() {
  const [customModal, modalHolder] = Modal.useModal();

  const modal = useMemo(() => {
    return ModalTypes.reduce((acc, type) => {
      // @ts-ignore
      acc[type] = (config: UIModalFuncProps) => {
        const modalRef = customModal[type](
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
  } = props;

  const mergeWidth = width || sizeWidthMap[size];

  const mergedFooter = () => {
    if (typeof footer !== 'function' && footer !== undefined) {
      return footer;
    }
    const OkBtn: FC = () => <UIButton onClick={onOk}>{okText}</UIButton>;

    const CancelBtn = () => (
      <UIButton type="border" onClick={onCancel}>
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
  };
  return <Modal {...props} footer={mergedFooter} width={mergeWidth} />;
}

export const UIModal = UIOriginModal as typeof UIOriginModal &
  UIModalStaticFunctions;

ModalTypes.forEach((type) => {
  // @ts-ignore
  UIModal[type] = (config: UIModalFuncProps) => {
    const modalRef = Modal[type](
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

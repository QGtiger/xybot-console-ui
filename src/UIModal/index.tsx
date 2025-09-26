import { Modal, ModalProps } from 'antd';
import { ConfigUpdate, ModalFunc } from 'antd/es/modal/confirm';
import { UIButton } from '../UIButton';

import { FC } from 'react';
import './index.less';

export type UIModalFuncProps = Omit<Parameters<ModalFunc>[0], 'prefixCls'> & {
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

export function useUIModal() {
  const [customModal, modalHolder] = Modal.useModal();

  const modal = (config: UIModalFuncProps) => {
    const {
      okText = '确认',
      cancelText = '取消',
      onOk,
      onCancel,
      footer,
      size = 'md',
      width,
    } = config;

    const mergeWidth = width || sizeWidthMap[size];

    const modalIns = customModal.confirm({
      icon: null,
      ...config,
      width: mergeWidth,
      footer() {
        if (typeof footer !== 'function' && footer !== undefined) {
          return footer;
        }
        const OkBtn: FC = () => (
          <UIButton
            onClick={() => {
              Promise.resolve(onOk?.()).then(modalIns.destroy);
            }}
          >
            {okText}
          </UIButton>
        );

        const CancelBtn = () => (
          <UIButton
            type="border"
            onClick={() => {
              Promise.resolve(onCancel?.()).then(modalIns.destroy);
            }}
          >
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
      },
    });
    return modalIns;
  };

  return {
    modal,
    modalHolder,
  };
}

export function UIModal(
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

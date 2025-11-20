import { CustomModalContent, CustomModalContentProps } from '@/hooks';
import { Modal, ModalProps } from 'antd';
import classNames from 'classnames';

export type CustomModalProps = Omit<
  ModalProps,
  'onCancel' | 'footer' | 'title' | 'onOk' | 'closable' | 'closeIcon'
> & {
  customModalProps: CustomModalContentProps;
  fullScreen?: boolean;
};

export function CustomModal(props: CustomModalProps) {
  const { customModalProps, children, fullScreen, ...rest } = props;
  return (
    <Modal
      {...rest}
      closable={false}
      closeIcon={null}
      footer={null}
      title={null}
      styles={{
        content: {
          padding: 0,
        },
      }}
      className={classNames(
        'ui-custom-modal-wrapper',
        fullScreen && 'full-screen',
      )}
      prefixCls="ui-modal"
    >
      <CustomModalContent
        content={children}
        {...customModalProps}
        onClose={() => {
          // 让onOK onCancel 去做逻辑
        }}
      />
    </Modal>
  );
}

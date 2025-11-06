import { CustomModalContent, CustomModalContentProps } from '@/hooks';
import { Modal, ModalProps } from 'antd';

export type CustomModalProps = Omit<
  ModalProps,
  'onCancel' | 'footer' | 'title' | 'onOk' | 'closable' | 'closeIcon'
> & {
  customModalProps: CustomModalContentProps;
};

export function CustomModal(props: CustomModalProps) {
  const { customModalProps, children, ...rest } = props;
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
      className="ui-custom-modal-wrapper"
      prefixCls="ui-modal"
    >
      <CustomModalContent
        content={children}
        {...customModalProps}
        onClose={() => {
          customModalProps.onCancel?.();
        }}
      />
    </Modal>
  );
}

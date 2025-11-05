import { HomeOutlined } from '@ant-design/icons';
import { Space, ThemeModel, UIButton, UIModal, useUIModal } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  const { modal, modalHolder } = useUIModal();

  return (
    <div
      className="flex"
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        alignItems: 'flex-start',
      }}
    >
      <Space>
        <UIButton
          onClick={() => {
            // modal.warning({
            //   title: '11',
            //   content: <UIInput placeholder="请输入内容" />,
            //   onCancel() {
            //     console.log('cancel');
            //   },
            // });

            UIModal.confirm({
              title: '222',
              content: 'content',
            });
          }}
          icon={<HomeOutlined />}
          type="border"
        ></UIButton>
        <UIButton
          onClick={() => {
            UIModal.info({
              title: '11',
              content: 'content',
              cancelText: 'cancancancale',
              onCancel() {
                console.log('cancel');
              },
            });
          }}
          icon={<HomeOutlined />}
          type="border"
        >
          {' '}
          静态方法{' '}
        </UIButton>
        {modalHolder}
      </Space>
    </div>
  );
};

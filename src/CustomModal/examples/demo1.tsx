import { FormOutlined } from '@ant-design/icons';
import { CustomModal, ThemeModel } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  return (
    <div
      className="flex"
      style={{
        // display: 'flex',
        // gap: 16,
        // flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        // alignItems: 'flex-start',
      }}
    >
      <div
        className=""
        style={{
          width: '100%',
          background: '#fff',
        }}
      >
        <CustomModal
          title="测试"
          subTitle="这是一个测试"
          logo={<FormOutlined />}
          extra={
            <div
              style={{
                padding: '10px 20px',
                background: isDarkMode ? '#2c2c34' : '#f9f9fb',
              }}
            >
              额外引导内容
            </div>
          }
        >
          主体内容
        </CustomModal>
      </div>
    </div>
  );
};

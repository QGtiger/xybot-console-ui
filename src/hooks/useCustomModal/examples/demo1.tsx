import { FormOutlined } from '@ant-design/icons';
import {
  ControlContentProps,
  ThemeModel,
  UIButton,
  useCustomModal,
} from '@xybot/ui';
import { useLayoutEffect } from 'react';

const Card = ({ step, title, description }: any) => {
  return (
    <div
      style={{
        width: '300px',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* 视频图标区域 - 背景渐变 + 模拟图标 */}
      <div
        style={{
          height: '100px',
          background: 'linear-gradient(135deg, #e0f7fa 0%, #64b5f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '60px',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '4px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '15px',
              right: '-10px',
              width: '20px',
              height: '30px',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              borderLeft: 'none',
              borderTopRightRadius: '4px',
              borderBottomRightRadius: '4px',
            }}
          />
        </div>
      </div>
      {/* 文本区域 */}
      <div style={{ padding: '16px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >
          {step} {title}
        </h3>
        <p style={{ color: '#666', lineHeight: '1.5' }}>{description}</p>
      </div>
    </div>
  );
};

const ExtraContainer = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        backgroundColor: '#f5f7fa',
      }}
    >
      <Card
        step="01"
        title="上传操作视频"
        description="使用影刀录屏或其他工具，录制并上传业务流程操作视频"
      />
      <Card
        step="02"
        title="AI分析处理"
        description="AI自动识别业务流程中的关键步骤和决策点"
      />
    </div>
  );
};

function ControlContent({ setFooter }: ControlContentProps) {
  useLayoutEffect(() => {
    setFooter(222);
  });
  return (
    <div
      className=""
      style={{
        height: '500px',
      }}
    >
      测试 CustomModal
    </div>
  );
}

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  const { showCustomModal } = useCustomModal();

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
      <UIButton
        onClick={() => {
          showCustomModal({
            title: '自定义 Modal 标题',
            logo: <FormOutlined />,
            extra: <ExtraContainer />,
            content: (props) => {
              return <ControlContent {...props} />;
            },
            okButtonProps: {
              type: 'primary',
            },
          });
        }}
      >
        测试 CustomModal
      </UIButton>
    </div>
  );
};

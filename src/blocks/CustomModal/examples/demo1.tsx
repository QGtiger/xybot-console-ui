import { CustomModal, ThemeModel, UIButton, UIMessage } from '@xybot/ui';
import { useBoolean } from 'ahooks';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
  const [visible, visibleAction] = useBoolean(false);
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        background: isDarkMode ? '#202127' : '#f4f4f7',
        padding: '16px',
      }}
    >
      <UIButton onClick={() => visibleAction.setTrue()}>
        打开自定义弹窗
      </UIButton>

      <CustomModal
        open={visible}
        customModalProps={{
          title: '测试',
          extra: '这是额外内容',
          onCancel: () => visibleAction.setFalse(),
        }}
        afterClose={() => {
          UIMessage.success('弹窗已关闭');
        }}
      >
        222
      </CustomModal>
    </div>
  );
};

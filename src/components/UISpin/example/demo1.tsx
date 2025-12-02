import { ThemeModel, UIAlert, UISpin } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

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
      {['xs', 'sm', 'md', 'lg'].map((size) => {
        return (
          <div className="  flex items-center gap-8 mb-2 " key={size}>
            <div className="flex items-center gap-2">
              <span>brand</span>
              <UISpin size={size as any} type="brand" />
            </div>
            <div className="flex items-center gap-2">
              <span>info</span>
              <UISpin size={size as any} type="info" />
            </div>
            <div className="flex items-center gap-2">
              <span>primary</span>
              <UISpin size={size as any} type="primary" />
            </div>
            <div className="flex items-center gap-2">
              <span>success</span>
              <UISpin size={size as any} type="success" />
            </div>
            <div className="flex items-center gap-2">
              <span>magic</span>
              <UISpin size={size as any} type="magic" />
            </div>
            <div className="flex items-center gap-2">
              <span>softBase</span>
              <UISpin size={size as any} type="softBase" />
            </div>
            <div className="flex items-center gap-2">
              <span>softColor</span>
              <UISpin size={size as any} type="softColor" />
            </div>
          </div>
        );
      })}
      <UISpin>222</UISpin>
      <UIAlert
        showIcon
        type="info"
        message={'提供了原子loading组件  UIDotLoading，可以单独使用'}
        className="w-full"
      ></UIAlert>
    </div>
  );
};

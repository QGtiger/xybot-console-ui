import { ScrollContainer, ThemeModel } from '@xybot/ui';

const Card = ({ title, description, bgColor, titleColor }: any) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: titleColor,
          marginBottom: '12px',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: '16px',
          lineHeight: '1.6',
          color: '#4a4a4a',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default () => {
  const { isDarkMode } = ThemeModel.useModel();
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
      <ScrollContainer style={{ height: '400px' }} indicatorColor="#000">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
          }}
        >
          <Card
            title="响应式设计原则"
            description="响应式设计确保网站在各种设备上都能提供良好的体验。通过灵活的布局和媒体查询，开发者可以创建适应不同屏幕尺寸的界面。"
            bgColor="#e8f5e9"
            titleColor="#2e7d32"
          />
          <Card
            title="用户体验优化"
            description="优秀的用户体验是产品成功的关键。通过精心设计的交互、清晰的视觉层次和流畅的动画，可以显著提升用户对产品的满意度。"
            bgColor="#f3e5f5"
            titleColor="#6a1b9a"
          />
          <Card
            title="性能优化技巧"
            description="网站性能直接影响用户体验和搜索引擎排名。通过代码分割、懒加载、缓存策略等技术，可以显著提升网站的加载速度和运行效率。"
            bgColor="#fff8e1"
            titleColor="#b5651d"
          />
        </div>
      </ScrollContainer>
    </div>
  );
};

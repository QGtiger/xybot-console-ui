import { useSize } from 'ahooks';
import classNames from 'classnames';
import React, { useRef } from 'react';
import './index.less';

// 单个头像配置项
export interface AvatarItem {
  src: string; // 头像图片地址
  name?: string; // 头像名称（用于alt和title）
}

// 头像组配置项
export interface AvatarGroupProps {
  avatarList: AvatarItem[]; // 头像列表
  borderWidth?: number; // 边框宽度，默认0
  indent?: number; // 缩进距离，默认-8px（重叠效果）
  avatarSize?: number; // 头像大小，默认40px
  mergeTextFormatter?: (count: number) => React.ReactNode; // 合并文本格式化函数
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatarList = [],
  borderWidth = 4,
  indent = -8,
  avatarSize = 40,
  mergeTextFormatter = (count) => `${count}`,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  const isOverflow = (() => {
    if (!containerSize || !listRef.current) return false;
    const containerWidth = containerSize.width;
    const listWidth = listRef.current.offsetWidth;
    return listWidth > containerWidth;
  })();

  console.log('isOverflow', isOverflow);

  if (!avatarList.length) return null;

  return (
    <div
      className={classNames('block-avatar-group-wrapper', {
        overflow: isOverflow,
      })}
      ref={containerRef}
    >
      <div
        className="block-avatar-group-inner"
        style={{
          width: isOverflow ? `calc(100% - ${avatarSize}px)` : 'auto',
        }}
      >
        <div
          className="block-avatar-group-item"
          style={{
            marginLeft: 0,
            width: avatarSize,
            height: avatarSize,
            borderWidth: borderWidth,
          }}
        ></div>
        <div className={classNames('block-avatar-group-list')} ref={listRef}>
          {avatarList.map((avatar, index) => (
            <div
              key={index}
              className="block-avatar-group-item"
              style={{
                marginLeft: index === 0 ? 0 : indent,
                width: avatarSize,
                height: avatarSize,
                borderWidth: borderWidth,
                backgroundImage: `url(${avatar.src})`,
              }}
              title={avatar.name}
            ></div>
          ))}
        </div>
      </div>
      {isOverflow && (
        <div
          className="block-avatar-group-item merge"
          style={{
            width: avatarSize,
            height: avatarSize,
            borderWidth: borderWidth,
          }}
        >
          {mergeTextFormatter(avatarList.length)}
        </div>
      )}
    </div>
  );
};

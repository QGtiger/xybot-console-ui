import { useSize } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { UIAvatar } from '../UIAvatar';
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
  // 显示布局方式，默认不固定
  fixed?: 'left' | 'right';
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatarList = [],
  borderWidth = 4,
  indent = -8,
  avatarSize = 40,
  mergeTextFormatter = (count) => `${count}`,
  fixed,
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

  const memoFixed = useMemo(() => {
    return isOverflow ? 'left' : fixed;
  }, [fixed, isOverflow]);

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
        <UIAvatar
          size={avatarSize}
          borderWidth={borderWidth}
          style={{
            opacity: 0,
            visibility: 'hidden',
          }}
        />
        <div
          className={classNames('block-avatar-group-list', memoFixed)}
          ref={listRef}
        >
          {avatarList.map((avatar, index) => {
            return (
              <UIAvatar
                key={index}
                {...avatar}
                size={avatarSize}
                borderWidth={borderWidth}
                style={{
                  marginLeft: index === 0 ? 0 : indent,
                }}
              />
            );
          })}
        </div>
      </div>
      {isOverflow && (
        <UIAvatar
          className="block-avatar-group-item merge"
          size={avatarSize}
          borderWidth={borderWidth}
        >
          {mergeTextFormatter(avatarList.length)}
        </UIAvatar>
      )}
    </div>
  );
};

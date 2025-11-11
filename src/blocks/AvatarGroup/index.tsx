import { useSize } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { UIAvatar } from '../UIAvatar';
import './index.less';

// 单个头像配置项
export interface AvatarItem {
  src?: string; // 头像图片地址
  name?: string; // 头像名称（用于alt和title）
}

// 头像组配置项
export interface AvatarGroupProps {
  avatarList: AvatarItem[]; // 头像列表
  borderColor?: string; // 边框颜色，默认白色
  borderWidth?: number; // 边框宽度，默认0
  indent?: number; // 缩进距离，默认-8px（重叠效果）
  avatarSize?: number; // 头像大小，默认40px
  mergeTextFormatter?: (count: number) => React.ReactNode; // 合并文本格式化函数
  // 显示布局方式，默认不固定
  fixed?: 'left' | 'right';
  renderAvatar?: (
    originNode: React.ReactNode,
    avatar: AvatarItem,
    index: number,
  ) => React.ReactNode; // 自定义头像渲染函数
  className?: string; // 头像额外的类名
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatarList = [],
  borderColor,
  borderWidth = 4,
  indent = -8,
  avatarSize = 40,
  mergeTextFormatter = (count) => `${count}`,
  fixed,
  renderAvatar = (v) => v,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const containerSize = useSize(containerRef);
  const listSize = useSize(listRef);

  const isOverflow = useMemo(() => {
    if (!containerSize || !listSize) return false;
    const containerWidth = containerSize.width;
    const listWidth = listSize.width;
    return listWidth > containerWidth;
  }, [containerSize?.width, listSize?.width]);

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
          borderColor={borderColor}
          style={{
            opacity: 0,
            visibility: 'hidden',
          }}
          className={className}
        />
        <div
          className={classNames('block-avatar-group-list', memoFixed)}
          ref={listRef}
        >
          {avatarList.map((avatar, index) => {
            return renderAvatar(
              <UIAvatar
                key={index}
                {...avatar}
                size={avatarSize}
                borderWidth={borderWidth}
                borderColor={borderColor}
                style={{
                  marginLeft: index === 0 ? 0 : indent,
                }}
                className={className}
              />,
              avatar,
              index,
            );
          })}
        </div>
      </div>
      {isOverflow && (
        <UIAvatar
          className={classNames('block-avatar-group-item merge', className)}
          size={avatarSize}
          borderWidth={borderWidth}
          borderColor={borderColor}
        >
          {mergeTextFormatter(avatarList.length)}
        </UIAvatar>
      )}
    </div>
  );
};

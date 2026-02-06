import { useBoolean } from 'ahooks';
import classNames from 'classnames';

import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import { ScrollArea } from '../ScrollArea';
import './index.less';

export type ScrollContainerProps = {
  // 滚动触发阈值 默认10
  threshold?: number;
  indicatorHeight?: number;
  indicatorColor?: string;
} & HTMLAttributes<HTMLDivElement>;

const ScrollContainerComponent = forwardRef<
  any,
  PropsWithChildren<ScrollContainerProps>
>(
  (
    {
      children,
      className,
      threshold = 10,
      indicatorHeight = 10,
      style,
      indicatorColor,
      ...restProps
    },
    ref,
  ) => {
    const [showIndicator, showIndicatorAction] = useBoolean(false);

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
      const scrollTop =
        e.target instanceof HTMLElement ? e.target.scrollTop : 0;
      showIndicatorAction.set(scrollTop > threshold);
    };

    return (
      <div
        className={classNames(
          'ui-scroll-container-wrapper',
          {
            showIndicator: showIndicator,
          },
          className,
        )}
        style={{
          ...style,
          // @ts-ignore
          '--mask-h': `${indicatorHeight}px`,
          '--mask-bg': indicatorColor,
        }}
      >
        <ScrollArea
          {...restProps}
          ref={ref}
          className={classNames('ui-scroll-container')}
          onScroll={handleScroll}
        >
          {children}
        </ScrollArea>
      </div>
    );
  },
);

ScrollContainerComponent.displayName = 'ScrollContainer';

export const ScrollContainer: typeof ScrollContainerComponent =
  ScrollContainerComponent;

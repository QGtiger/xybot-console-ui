import { useBoolean } from 'ahooks';
import React, { PropsWithChildren, ReactElement, useId } from 'react';

export function cloneElement(
  element: ReactElement<any>,
  props: any,
): ReactElement<any> {
  if (props.style && element.props.style) {
    props.style = { ...element.props.style, ...props.style };
  }
  if (props.className && element.props.className) {
    props.className = `${element.props.className} ${props.className}`;
  }
  return React.cloneElement(element, props);
}

export function DragCore(
  props: PropsWithChildren<{
    className?: string;
    // 鼠标相对于初始位置的偏移量
    onMouseOffsetX?: (offsetX: number) => void;
  }>,
) {
  const [active, activeAction] = useBoolean(false);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 记录初始位置
    const startX = e.clientX;

    activeAction.setTrue();

    function mouseMove(e: MouseEvent) {
      const dx = e.clientX - startX;

      props.onMouseOffsetX?.(dx);
    }
    document.addEventListener('mousemove', mouseMove);

    document.addEventListener(
      'mouseup',
      () => {
        document.removeEventListener('mousemove', mouseMove);
        activeAction.setFalse();
      },
      {
        once: true,
      },
    );
  };

  const { children, className, ...p } = props;
  const id = useId();

  // @ts-expect-error
  return cloneElement(children, {
    ...p,
    className: `ui-drag-core ${className || ''}`,
    children: [
      // @ts-expect-error
      ...children?.props.children,
      <div
        key={id}
        className={`drag-handle ${active ? 'active' : ''}`}
        onMouseDown={onMouseDown}
      />,
    ],
  });
}

import SimpleBar from 'simplebar-react';
// @ts-expect-error 引入css
import 'simplebar-react/dist/simplebar.min.css';

import './index.less';

export type ScrollAreaProps = Parameters<typeof SimpleBar>[0];

export function ScrollArea(props: ScrollAreaProps) {
  const { onScroll } = props;
  return (
    <SimpleBar
      {...props}
      scrollableNodeProps={{
        onScroll,
        ...props.scrollableNodeProps,
      }}
    />
  );
}

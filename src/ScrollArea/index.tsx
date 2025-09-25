import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './index.less';

export type ScrollAreaProps = Parameters<typeof SimpleBar>[0];

export function ScrollArea(props: ScrollAreaProps) {
  return <SimpleBar {...props} />;
}

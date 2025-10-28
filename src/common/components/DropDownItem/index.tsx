import { HTMLAttributes, PropsWithChildren } from 'react';

import classNames from 'classnames';
import './index.less';

export function DropDownItem(
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div {...props} className={classNames('ui-dropdown-item', props.className)}>
      {props.children}{' '}
    </div>
  );
}

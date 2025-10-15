import classNames from 'classnames';
import './index.less';

export function UIContainer(
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div {...props} className={classNames('ui-container', props.className)}>
      {props.children}
    </div>
  );
}

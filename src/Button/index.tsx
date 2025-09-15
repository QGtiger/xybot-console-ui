import classNames from 'classnames';
import './index.css';

export interface ButtonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'border' | 'text' | 'base' | 'primary' | 'danger' | 'secondary';
}

export function Button(props: ButtonProps) {
  const { size = 'xl', type = 'secondary' } = props;
  return (
    <button
      type="button"
      className={classNames(' btn', `btn-${size}`, `btn-${type}`)}
    >
      Click Me
    </button>
  );
}

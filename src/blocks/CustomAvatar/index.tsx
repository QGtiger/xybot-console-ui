import { PropsWithChildren, useMemo } from 'react';
import { trans2Icon, trans2User } from '../UIAvatar/utils';

import './index.less';

export type CustomAvatarProps = {
  borderWidth?: number;
  borderColor?: string;
  name?: string;
  type?: 'user' | 'app';
  size?: number;
  src?: string;
  className?: string;
};

export function CustomAvatar(props: PropsWithChildren<CustomAvatarProps>) {
  const {
    borderWidth,
    borderColor,
    name,
    type = 'user',
    size = 24,
    children,
    className,
  } = props;

  const firstChar = name ? name.charAt(0) : 'a';

  const customStyle = useMemo(() => {
    if (props.src) return {};
    return type === 'app' ? trans2Icon(firstChar) : trans2User(firstChar);
  }, [props.src, type, firstChar]);

  return (
    <div
      className={`custom-avatar flex items-center justify-center rounded-full border border-borderBase-default border-solid type-${type} ${className}`}
      style={{
        backgroundClip: 'content-box',
        borderWidth,
        borderColor,
        width: size,
        height: size,
        ...customStyle,
        backgroundImage: props.src ? `url(${props.src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children || name}
    </div>
  );
}

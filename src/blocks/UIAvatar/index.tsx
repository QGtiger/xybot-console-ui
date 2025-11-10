import { Avatar, AvatarProps } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';
import { trans2Icon, trans2User } from './utils';

export type UIAvatarProps = Omit<AvatarProps, 'size'> & {
  borderWidth?: number;
  borderColor?: string;
  name?: string;
  type?: 'user' | 'app';
  size?: number;
};

export function UIAvatar(props: UIAvatarProps) {
  const {
    borderWidth,
    borderColor,
    type,
    className,
    name,
    children,
    size = 30,
    ...rest
  } = props;
  const firstChar = name ? name.charAt(0) : '';

  const customStyle = useMemo(() => {
    if (props.src) return {};
    return type === 'app' ? trans2Icon(firstChar) : trans2User(firstChar);
  }, [props.src, type, firstChar]);
  return (
    <Avatar
      {...rest}
      className={classNames(className)}
      style={{
        backgroundClip: 'content-box',
        borderWidth,
        borderColor,
        ...rest.style,
        ...customStyle,
      }}
      size={size}
    >
      {children || name}
    </Avatar>
  );
}

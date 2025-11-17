import { Spin, SpinProps } from 'antd';
import Lottie, { LottieComponentProps } from 'lottie-react';

import BrandDarkJson from './assets/brand-dark.json';
import BrandJson from './assets/brand.json';
import PrimaryDarkJson from './assets/primary-dark.json';
import PrimaryJson from './assets/primary.json';

import './index.less';

export type UISpinProps = Omit<OmitPrefixCls<SpinProps>, 'size' | 'percent'> &
  UIDotLoadingType & {
    size?: 'xs' | 'sm' | 'md' | 'lg';
  };

export type UIDotLoadingType = {
  type?: 'brand' | 'brankDark' | 'primary' | 'primaryDark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

const sizeMap: Record<NonNullable<UISpinProps['size']>, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

export function UIDotLoading(
  props: UIDotLoadingType &
    Omit<LottieComponentProps, 'size' | 'animationData'>,
) {
  const { type = 'brand', size = 'md', ...rest } = props;

  const getSrcByType = (type: UISpinProps['type']) => {
    switch (type) {
      case 'brand':
        return BrandJson;
      case 'primary':
        return PrimaryJson;
      case 'brankDark':
        return BrandDarkJson;
      case 'primaryDark':
        return PrimaryDarkJson;
      default:
        return PrimaryJson;
    }
  };

  return (
    <Lottie
      {...rest}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        ...rest.style,
      }}
      size={sizeMap[size]}
      animationData={getSrcByType(type)}
    />
  );
}

export function setSpinDefaultIndicator() {
  Spin.setDefaultIndicator(<UIDotLoading type="brand" size="md" />);
}

export function UISpin(props: UISpinProps) {
  const { size = 'md', ...rest } = props;

  return (
    <Spin
      indicator={<UIDotLoading size={size} className={size} />}
      prefixCls="ui-spin"
      {...rest}
    />
  );
}

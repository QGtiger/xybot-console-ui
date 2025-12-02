import { Spin, SpinProps } from 'antd';
import Lottie, { LottieComponentProps } from 'lottie-react';

import brandDarkJson from './assets/brand-dark.json';
import brandLightJson from './assets/brand-light.json';

import infoDarkJson from './assets/info-dark.json';
import infoLightJson from './assets/info-light.json';

import successDarkJson from './assets/success-dark.json';
import successLightJson from './assets/success-light.json';

import magicDarkJson from './assets/magic-dark.json';
import magicLightJson from './assets/magic-light.json';

import primaryDarkJson from './assets/primary-dark.json';
import primaryLightJson from './assets/primary-light.json';

import softBaseDarkJson from './assets/soft-base-dark.json';
import softBaseLightJson from './assets/soft-base-light.json';

import softColorDarkJson from './assets/soft-color-dark.json';
import softColorLightJson from './assets/soft-color-light.json';

import './index.less';

export type UISpinProps = Omit<OmitPrefixCls<SpinProps>, 'size' | 'percent'> &
  UIDotLoadingType & {
    size?: 'xs' | 'sm' | 'md' | 'lg';
  };

type LoadingType =
  | 'brand'
  | 'info'
  | 'success'
  | 'magic'
  | 'primary'
  | 'softBase'
  | 'softColor';

export type UIDotLoadingType = {
  type?: LoadingType;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDarkMode?: boolean;
};

const loadingAssetsMap: Record<
  LoadingType,
  {
    light: any;
    dark: any;
  }
> = {
  brand: {
    light: brandLightJson,
    dark: brandDarkJson,
  },
  info: {
    light: infoLightJson,
    dark: infoDarkJson,
  },
  success: {
    light: successLightJson,
    dark: successDarkJson,
  },
  magic: {
    light: magicLightJson,
    dark: magicDarkJson,
  },
  primary: {
    light: primaryLightJson,
    dark: primaryDarkJson,
  },
  softBase: {
    light: softBaseLightJson,
    dark: softBaseDarkJson,
  },
  softColor: {
    light: softColorLightJson,
    dark: softColorDarkJson,
  },
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
  const { type = 'brand', size = 'md', isDarkMode = false, ...rest } = props;

  const getSrcByType = (type: LoadingType) => {
    return loadingAssetsMap[type][isDarkMode ? 'dark' : 'light'];
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
  const { size = 'md', type = 'brand', isDarkMode = false, ...rest } = props;

  return (
    <Spin
      indicator={
        <UIDotLoading
          size={size}
          className={size}
          type={type}
          isDarkMode={isDarkMode}
        />
      }
      prefixCls="ui-spin"
      {...rest}
    />
  );
}

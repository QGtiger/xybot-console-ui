import {
  DotLottieReact,
  DotLottieReactProps,
} from '@lottiefiles/dotlottie-react';
import { Spin, SpinProps } from 'antd';
import brandDarkLottie from './assets/primary-dark.lottie?inline';
import brandLottie from './assets/primary.lottie?inline';
import primaryDarkLottie from './assets/secondary-dark.lottie?inline';
import primaryLottie from './assets/secondary.lottie?inline';

import './index.less';

export function setSpinDefaultIndicator() {
  Spin.setDefaultIndicator(<DotLottieReact src={brandLottie} loop autoplay />);
}

export type UISpinProps = Omit<OmitPrefixCls<SpinProps>, 'size' | 'percent'> &
  UIDotLoadingType & {
    size?: 'xs' | 'sm' | 'md' | 'lg';
  };

export type UIDotLoadingType = {
  type?: 'brand' | 'brankDark' | 'primary' | 'primaryDark';
};

export function UIDotLoading(props: UIDotLoadingType & DotLottieReactProps) {
  const { type = 'brand', ...rest } = props;

  const getSrcByType = (type: UISpinProps['type']) => {
    switch (type) {
      case 'brand':
        return brandLottie;
      case 'primary':
        return primaryLottie;
      case 'brankDark':
        return brandDarkLottie;
      case 'primaryDark':
        return primaryDarkLottie;
      default:
        return primaryLottie;
    }
  };

  return <DotLottieReact src={getSrcByType(type)} loop autoplay {...rest} />;
}

export function UISpin(props: UISpinProps) {
  const { size = 'md', ...rest } = props;

  return (
    <Spin
      indicator={<UIDotLoading className={size} />}
      prefixCls="ui-spin"
      {...rest}
    />
  );
}

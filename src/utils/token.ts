export const colorMap = {
  green700: 'rgba(40, 194, 112, 1)',
};

// 定义所有 Token 枚举
export enum DesignToken {
  // Background Base
  BG_BASE_CONTAINER = 'bg-base-container',
  BG_BASE_CONTAINER_SECONDARY = 'bg-base-container-secondary',
  BG_BASE_LAYOUT = 'bg-base-layout',
  BG_BASE_LAYOUT_SECONDARY = 'bg-base-layout-secondary',
  BG_BASE_SPOTLIGHT = 'bg-base-spotlight',
  BG_BASE_SPOTLIGHT_SECONDARY = 'bg-base-spotlight-secondary',
  BG_BASE_MASK = 'bg-base-mask',
  BG_BASE_MASK_SECONDARY = 'bg-base-mask-secondary',
  BG_BASE_MASK_TERTIARY = 'bg-base-mask-tertiary',

  // Background Fill Deep
  BG_FILL_DEEP_QUINARY = 'bg-fill-deep-quinary',
  BG_FILL_DEEP_QUATERNARY = 'bg-fill-deep-quaternary',
  BG_FILL_DEEP_TERTIARY = 'bg-fill-deep-tertiary',
  BG_FILL_DEEP_SECONDARY = 'bg-fill-deep-secondary',
  BG_FILL_DEEP_DEFAULT = 'bg-fill-deep-default',

  // Background Fill Shallow
  BG_FILL_SHALLOW_QUINARY = 'bg-fill-shallow-quinary',
  BG_FILL_SHALLOW_QUATERNARY = 'bg-fill-shallow-quaternary',
  BG_FILL_SHALLOW_TERTIARY = 'bg-fill-shallow-tertiary',
  BG_FILL_SHALLOW_SECONDARY = 'bg-fill-shallow-secondary',
  BG_FILL_SHALLOW_DEFAULT = 'bg-fill-shallow-default',

  // Background Primary
  BG_PRIMARY_SPOTLIGHT = 'bg-primary-spotlight',
  BG_PRIMARY_SPOTLIGHT_SECONDARY = 'bg-primary-spotlight-secondary',
  BG_PRIMARY_QUATERNARY = 'bg-primary-quaternary',
  BG_PRIMARY_TERTIARY = 'bg-primary-tertiary',
  BG_PRIMARY_SECONDARY = 'bg-primary-secondary',
  BG_PRIMARY_DEFAULT = 'bg-primary-default',

  // Background Info
  BG_INFO_SPOTLIGHT = 'bg-info-spotlight',
  BG_INFO_SPOTLIGHT_SECONDARY = 'bg-info-spotlight-secondary',
  BG_INFO_QUATERNARY = 'bg-info-quaternary',
  BG_INFO_TERTIARY = 'bg-info-tertiary',
  BG_INFO_SECONDARY = 'bg-info-secondary',
  BG_INFO_DEFAULT = 'bg-info-default',

  // Background Success
  BG_SUCCESS_SPOTLIGHT = 'bg-success-spotlight',
  BG_SUCCESS_SPOTLIGHT_SECONDARY = 'bg-success-spotlight-secondary',
  BG_SUCCESS_QUATERNARY = 'bg-success-quaternary',
  BG_SUCCESS_TERTIARY = 'bg-success-tertiary',
  BG_SUCCESS_SECONDARY = 'bg-success-secondary',
  BG_SUCCESS_DEFAULT = 'bg-success-default',

  // Background Warning
  BG_WARNING_SPOTLIGHT = 'bg-warning-spotlight',
  BG_WARNING_SPOTLIGHT_SECONDARY = 'bg-warning-spotlight-secondary',
  BG_WARNING_QUATERNARY = 'bg-warning-quaternary',
  BG_WARNING_TERTIARY = 'bg-warning-tertiary',
  BG_WARNING_SECONDARY = 'bg-warning-secondary',
  BG_WARNING_DEFAULT = 'bg-warning-default',

  // Background Error
  BG_ERROR_SPOTLIGHT = 'bg-error-spotlight',
  BG_ERROR_SPOTLIGHT_SECONDARY = 'bg-error-spotlight-secondary',
  BG_ERROR_QUATERNARY = 'bg-error-quaternary',
  BG_ERROR_TERTIARY = 'bg-error-tertiary',
  BG_ERROR_SECONDARY = 'bg-error-secondary',
  BG_ERROR_DEFAULT = 'bg-error-default',

  // Text Base
  TEXT_BASE_DEFAULT = 'text-base-default',
  TEXT_BASE_SECONDARY = 'text-base-secondary',
  TEXT_BASE_TERTIARY = 'text-base-tertiary',
  TEXT_BASE_QUATERNARY = 'text-base-quaternary',
  TEXT_BASE_IN_GRAY_DEFAULT = 'text-base-in-gray-default',
  TEXT_BASE_IN_GRAY_SECONDARY = 'text-base-in-gray-secondary',
  TEXT_BASE_IN_GRAY_TERTIARY = 'text-base-in-gray-tertiary',
  TEXT_BASE_IN_GRAY_DISABLE = 'text-base-in-gray-disable',
  TEXT_BASE_IN_COLOR_DEFAULT = 'text-base-in-coloer-default',
  TEXT_BASE_IN_COLOR_SECONDARY = 'text-base-in-coloer-secondary',
  TEXT_BASE_IN_COLOR_TERTIARY = 'text-base-in-coloer-tertiary',
  TEXT_BASE_IN_COLOR_DISABLE = 'text-base-in-coloer-disable',

  // Text Primary
  TEXT_PRIMARY_DEFAULT = 'text-primary-default',
  TEXT_PRIMARY_DEFAULT_HOVER = 'text-primary-default-hover',
  TEXT_PRIMARY_SECONDARY = 'text-primary-secondary',
  TEXT_PRIMARY_TERTIARY = 'text-primary-tertiary',

  // Text Info
  TEXT_INFO_DEFAULT = 'text-info-default',
  TEXT_INFO_DEFAULT_HOVER = 'text-info-default-hover',
  TEXT_INFO_SECONDARY = 'text-info-secondary',
  TEXT_INFO_TERTIARY = 'text-info-tertiary',

  // Text Success
  TEXT_SUCCESS_DEFAULT = 'text-success-default',
  TEXT_SUCCESS_DEFAULT_HOVER = 'text-success-default-hover',
  TEXT_SUCCESS_SECONDARY = 'text-success-secondary',
  TEXT_SUCCESS_TERTIARY = 'text-success-tertiary',

  // Text Warning
  TEXT_WARNING_DEFAULT = 'text-warning-default',
  TEXT_WARNING_DEFAULT_HOVER = 'text-warning-default-hover',
  TEXT_WARNING_SECONDARY = 'text-warning-secondary',
  TEXT_WARNING_TERTIARY = 'text-warning-tertiary',

  // Text Error
  TEXT_ERROR_DEFAULT = 'text-error-default',
  TEXT_ERROR_DEFAULT_HOVER = 'text-error-default-hover',
  TEXT_ERROR_SECONDARY = 'text-error-secondary',
  TEXT_ERROR_TERTIARY = 'text-error-tertiary',

  // Border Base
  BORDER_BASE_DEFAULT = 'border-base-default',
  BORDER_BASE_SECONDARY = 'border-base-secondary',
  BORDER_BASE_TERTIARY = 'border-base-tertiary',
  BORDER_BASE_QUATERNARY = 'border-base-quaternary',

  // Border Specular
  BORDER_SPECULAR_DEFAULT = 'border-specular-default',
  BORDER_SPECULAR_SECONDARY = 'border-specular-secondary',
  BORDER_SPECULAR_TERTIARY = 'border-specular-tertiary',
  BORDER_SPECULAR_QUATERNARY = 'border-specular-quaternary',

  // Border Primary
  BORDER_PRIMARY_DEFAULT = 'border-primary-default',
  BORDER_PRIMARY_SECONDARY = 'border-primary-secondary',
  BORDER_PRIMARY_TERTIARY = 'border-primary-tertiary',
  BORDER_PRIMARY_QUATERNARY = 'border-primary-quaternary',

  // Border Info
  BORDER_INFO_DEFAULT = 'border-info-default',
  BORDER_INFO_SECONDARY = 'border-info-secondary',
  BORDER_INFO_TERTIARY = 'border-info-tertiary',
  BORDER_INFO_QUATERNARY = 'border-info-quaternary',

  // Border Success
  BORDER_SUCCESS_DEFAULT = 'border-success-default',
  BORDER_SUCCESS_SECONDARY = 'border-success-secondary',
  BORDER_SUCCESS_TERTIARY = 'border-success-tertiary',
  BORDER_SUCCESS_QUATERNARY = 'border-success-quaternary',

  // Border Warning
  BORDER_WARNING_DEFAULT = 'border-warning-default',
  BORDER_WARNING_SECONDARY = 'border-warning-secondary',
  BORDER_WARNING_TERTIARY = 'border-warning-tertiary',
  BORDER_WARNING_QUATERNARY = 'border-warning-quaternary',

  // Border Error
  BORDER_ERROR_DEFAULT = 'border-error-default',
  BORDER_ERROR_SECONDARY = 'border-error-secondary',
  BORDER_ERROR_TERTIARY = 'border-error-tertiary',
  BORDER_ERROR_QUATERNARY = 'border-error-quaternary',

  // Effect
  EFFECT_SHADOW_DEFAULT = 'effect-shadow-default',
  EFFECT_SHADOW_SECONDARY = 'effect-shadow-secondary',

  // Size
  SDS_SIZE_DEPTH_0 = 'sds-size-depth-0',
  SDS_SIZE_DEPTH_100 = 'sds-size-depth-100',
  SDS_SIZE_DEPTH_200 = 'sds-size-depth-200',
  SDS_SIZE_RADIUS_100 = 'sds-size-radius-100',
  SDS_SIZE_RADIUS_200 = 'sds-size-radius-200',
  SDS_SIZE_SPACE_050 = 'sds-size-space-050',
  SDS_SIZE_SPACE_100 = 'sds-size-space-100',
  SDS_SIZE_SPACE_150 = 'sds-size-space-150',
  SDS_SIZE_SPACE_200 = 'sds-size-space-200',
  SDS_SIZE_SPACE_250 = 'Space-250',
  SDS_SIZE_SPACE_300 = 'sds-size-space-300',
}

export const getTokenByCssColor = (() => {
  return function (token: string, ele = document.documentElement) {
    const fullToken = token.startsWith('--') ? token : `--${token}`;
    const value = getComputedStyle(ele).getPropertyValue(fullToken).trim();
    return value;
  };
})();

/**
 * 获取设计 token 的具体值
 * @param token - 设计 token 枚举值
 * @param isDarkMode - 是否为暗色模式
 * @returns 具体的色值或尺寸值
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getToken(token: string, isDarkMode: boolean = false): string {
  return getTokenByCssColor(token);
}

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// 导入需要的语言包（按需添加）
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);

/**
 * 格式化时间戳为相对时间描述（优化版：按是否跨年动态调整日期格式）
 * @param timestamp 时间戳（毫秒级）
 * @param options 配置项
 * @param options.overdueThreshold 超过多少天使用具体日期（默认30天）
 * @param options.locale 语言（默认zh-cn）
 * @param options.sameYearFormat 今年的日期格式（默认MM-DD HH:mm）
 * @param options.diffYearFormat 跨年的日期格式（默认YYYY-MM-DD HH:mm）
 * @returns 相对时间描述
 */
export function formatRelativeTime(
  timestamp: number,
  options?: {
    overdueThreshold?: number;
    locale?: string;
    sameYearFormat?: string;
    diffYearFormat?: string;
  },
): string {
  const {
    overdueThreshold = 30,
    locale = 'zh-cn',
    sameYearFormat = 'MM-DD HH:mm',
    diffYearFormat = 'YYYY-MM-DD HH:mm',
  } = options || {};

  // 处理无效时间戳
  if (!timestamp || isNaN(timestamp)) {
    return '--';
  }

  // 局部设置语言
  const targetTime = dayjs(timestamp).locale(locale);
  const now = dayjs().locale(locale);

  // 计算天数差
  const dayDiff = Math.abs(now.diff(targetTime, 'day'));

  // 未超过阈值：显示相对时间（如3分钟前）
  if (dayDiff < overdueThreshold) {
    return targetTime.fromNow();
  }

  // 超过阈值：按是否跨年显示不同格式
  const isSameYear = targetTime.year() === now.year();
  return isSameYear
    ? targetTime.format(sameYearFormat)
    : targetTime.format(diffYearFormat);
}

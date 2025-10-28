import { DatePicker, DatePickerProps } from 'antd';
import { MonthPickerProps } from 'antd/es/date-picker';
import { FC } from 'react';
import './index.less';

interface CommonDatePickerProps {
  type?: 'border' | 'borderless' | 'filledsecondary' | 'filledbase';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  classNames?: any;
}

type GetDatePickerProps<T> = Omit<T, 'size' | 'variant' | 'type'> &
  CommonDatePickerProps;

function CommonPickerWrapper<T extends CommonDatePickerProps>(
  PickerComponent: any,
): FC<T> {
  return (props) => {
    const { type = 'border', size = 'lg', className, ...rest } = props;
    return (
      <PickerComponent
        {...rest}
        className={`ui-date-picker ui-date-picker-size-${size} ui-date-picker-type-${type} ${className}`}
        classNames={{
          popup: {
            root: 'ui-date-picker-dropdown',
          },
        }}
      />
    );
  };
}

type GetProps<T extends (...args: any) => any> = Parameters<T>[0];

export type UIDatePickerProps = GetDatePickerProps<DatePickerProps>;
export const OriginDatePicker =
  CommonPickerWrapper<UIDatePickerProps>(DatePicker);

export type UIMonthPickerProps = GetDatePickerProps<MonthPickerProps>;
export const UIMonthPicker = CommonPickerWrapper<UIMonthPickerProps>(
  DatePicker.MonthPicker,
);

export type UIQuarterPickerProps = GetDatePickerProps<
  GetProps<typeof DatePicker.QuarterPicker>
>;
export const UIQuarterPicker = CommonPickerWrapper<UIQuarterPickerProps>(
  DatePicker.QuarterPicker,
);

export type UIRangePickerProps = GetDatePickerProps<
  GetProps<typeof DatePicker.RangePicker>
>;
export const UIRangePicker = CommonPickerWrapper<UIRangePickerProps>(
  DatePicker.RangePicker,
);

export type UITimePickerProps = GetDatePickerProps<
  GetProps<typeof DatePicker.TimePicker>
>;
export const UITimePicker = CommonPickerWrapper<UITimePickerProps>(
  DatePicker.TimePicker,
);

export type UIWeekPickerProps = GetDatePickerProps<
  GetProps<typeof DatePicker.WeekPicker>
>;
export const UIWeekPicker = CommonPickerWrapper<UIWeekPickerProps>(
  DatePicker.WeekPicker,
);

export type UIYearPickerProps = GetDatePickerProps<
  GetProps<typeof DatePicker.YearPicker>
>;
export const UIYearPicker = CommonPickerWrapper<UIYearPickerProps>(
  DatePicker.YearPicker,
);

type CompoundedComponent = typeof OriginDatePicker & {
  MonthPicker: typeof UIMonthPicker;
  QuarterPicker: typeof UIQuarterPicker;
  RangePicker: typeof UIRangePicker;
  TimePicker: typeof UITimePicker;
  WeekPicker: typeof UIWeekPicker;
  YearPicker: typeof UIYearPicker;
};

export const UIDatePicker = OriginDatePicker as CompoundedComponent;

UIDatePicker.MonthPicker = UIMonthPicker;
UIDatePicker.QuarterPicker = UIQuarterPicker;
UIDatePicker.RangePicker = UIRangePicker;
UIDatePicker.TimePicker = UITimePicker;
UIDatePicker.WeekPicker = UIWeekPicker;
UIDatePicker.YearPicker = UIYearPicker;

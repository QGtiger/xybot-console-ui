import { ThemeModel, UIDatePicker } from '@xybot/ui';

export default () => {
  const { isDarkMode } = ThemeModel.useModel();

  return (
    <div
      className="flex"
      style={{
        display: 'flex',
        gap: 16,
        flexDirection: 'column',
        padding: 16,
        background: isDarkMode ? '#202127' : '#f4f4f7',
        alignItems: 'flex-start',
      }}
    >
      <UIDatePicker type="border" />
      <UIDatePicker type="borderless" />
      <UIDatePicker type="filledsecondary" />
      <UIDatePicker type="filledbase" />

      <UIDatePicker.MonthPicker type="border" />
      <UIDatePicker.MonthPicker type="borderless" />
      <UIDatePicker.MonthPicker type="filledsecondary" />
      <UIDatePicker.MonthPicker type="filledbase" />

      <UIDatePicker.QuarterPicker type="border" />
      <UIDatePicker.QuarterPicker type="borderless" />
      <UIDatePicker.QuarterPicker type="filledsecondary" />
      <UIDatePicker.QuarterPicker type="filledbase" />

      <UIDatePicker.RangePicker type="border" />
      <UIDatePicker.RangePicker type="borderless" />
      <UIDatePicker.RangePicker type="filledsecondary" />
      <UIDatePicker.RangePicker type="filledbase" />

      <UIDatePicker.TimePicker type="border" />
      <UIDatePicker.TimePicker type="borderless" />
      <UIDatePicker.TimePicker type="filledsecondary" />
      <UIDatePicker.TimePicker type="filledbase" />
    </div>
  );
};

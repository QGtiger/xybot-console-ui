import RcSelect, { SelectProps as RcSelectProps } from 'rc-select';
import 'rc-select/assets/index.css';
import { ThemeModel } from '../ThemeProvider';

const selectIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="#0F1118"
      stroke-opacity="0.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export type SelectProps = RcSelectProps & {
  size?: 'md' | 'lg' | 'xl' | 'xxl';
};

export function Select(props: SelectProps) {
  const { getPopupContainer } = ThemeModel.useModel();
  return (
    <RcSelect
      placeholder="请选择"
      dropdownStyle={{
        zIndex: 1050,
      }}
      animation="slide-up"
      getPopupContainer={getPopupContainer}
      optionRender={(item) => (
        <span style={{ color: 'red' }}>{item.value}</span>
      )}
      open
      menuItemSelectedIcon={selectIcon}
      className="111"
      suffixIcon={selectIcon}
      placement="topLeft"
      options={
        Array.from({ length: 100 }).map((_, index) => ({
          label: `选项${index + 1}`,
          value: `option${index + 1}`,
        })) as any
      }
      {...props}
    ></RcSelect>
  );
}

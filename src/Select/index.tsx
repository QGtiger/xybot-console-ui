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
      getPopupContainer={getPopupContainer}
      open
      optionRender={(item) => (
        <span style={{ color: 'red' }}>{item.value}</span>
      )}
      menuItemSelectedIcon={selectIcon}
      className="111"
      suffixIcon={selectIcon}
      placement="topLeft"
    >
      <RcSelect.Option value="1">
        Jack Jack Jack Jack Jack Jack Jack Jack Jack Jack Jack
      </RcSelect.Option>
      <RcSelect.Option value="2">
        Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy
      </RcSelect.Option>
      <RcSelect.Option value="3">Jill</RcSelect.Option>
    </RcSelect>
  );
}

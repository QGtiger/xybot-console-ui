import { UIDivider } from '@/components/UIDivider';
import type { FilterDropdownProps } from 'antd/es/table/interface';

import RightIcon from '@/common/RightIcon';
import classNames from 'classnames';
import './index.less';

function Item(props: {
  label: string;
  checked?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={classNames('item', {
        checked: props.checked,
      })}
      onClick={props.onClick}
    >
      <div className="label">{props.label}</div>

      <div className="r">{props.checked && <RightIcon />}</div>
    </div>
  );
}

export function CustomFilterDropDown({
  filters,
  selectedKeys,
  setSelectedKeys,
  confirm,
}: FilterDropdownProps) {
  console.log(selectedKeys);
  return (
    <div className="custom-filter-dropdown">
      <Item
        label="全部"
        checked={!selectedKeys.length}
        onClick={() => {
          setSelectedKeys([]);
          confirm();
        }}
      />
      <div style={{ padding: '0 8px' }}>
        <UIDivider style={{ margin: '8px 0' }} />
      </div>
      <div className="list">
        {filters?.map((filter) => (
          <Item
            key={filter.value as string}
            label={filter.text as string}
            checked={selectedKeys.includes(filter.value as string)}
            onClick={() => {
              setSelectedKeys([filter.value as string]);
              // if (selectedKeys.includes(filter.value as string)) {
              //   setSelectedKeys(
              //     selectedKeys.filter((key) => key !== filter.value),
              //   );
              // } else {
              //   setSelectedKeys([...selectedKeys, filter.value as string]);
              // }
              confirm();
            }}
          />
        ))}
      </div>
    </div>
  );
}

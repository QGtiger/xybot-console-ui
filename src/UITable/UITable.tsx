import { Table, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import classNames from 'classnames';
import { useMemo } from 'react';
import './UITable.less';

type UITableProps = {
  size?: 'md' | 'lg';
  hoverType?: 'withRadius' | 'withoutRadius';
} & Omit<TableProps<any>, 'size'>;

const defaultSortIcon: ColumnType['sortIcon'] = ({ sortOrder }) => {
  const colorMap = {
    ascend: '#959699',
    descend: '#959699',
  };

  const isActive = sortOrder && colorMap[sortOrder];

  if (isActive) {
    colorMap[sortOrder] = '#1474F2';
  }

  return (
    <div className="table-sort-icon">
      <div className="arrow-up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M9 7.5L6 4.5L3 7.5"
            stroke={colorMap.ascend}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="arrow-down">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke={colorMap.descend}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export function UITable(props: UITableProps) {
  const { size = 'md', hoverType = 'withoutRadius', columns, ...rest } = props;

  const memoColumns = useMemo(() => {
    return columns?.map((col) => {
      if (col.sorter && !col.sortIcon) {
        return {
          ...col,
          sortIcon: defaultSortIcon,
        };
      }
      return col;
    });
  }, [columns]);

  return (
    <Table
      {...rest}
      columns={memoColumns}
      rowHoverable={false}
      className={classNames(size, hoverType, props.className)}
    />
  );
}

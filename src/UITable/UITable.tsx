import { ConfigProvider, Table, TableColumnType, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { DragCore } from './DragCore';

import { CustomFilterIcon } from '../components/CustomFilterIcon';
import { CustomFilterDropDown } from './components/CustomFilterDropDown';

import './UITable.less';

export type UITableProps = {
  size?: 'md' | 'lg';
  hoverType?: 'withRadius' | 'withoutRadius';
  columnsResizeable?: boolean;
  minColumnWidth?: number;
  // 自定义 filter 会覆盖掉默认的 filter UI样式
  customFilter?: boolean;
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

const ResizableTitle = (props: any) => {
  const { onMouseOffsetX, width, isResizeable = true, ...restProps } = props;
  if (!width || !isResizeable) {
    return <th {...restProps} />;
  }

  return (
    <DragCore onMouseOffsetX={onMouseOffsetX}>
      <th {...restProps} />
    </DragCore>
    // <Resizable
    //   width={width}
    //   height={0}
    //   // onResize={onResize}
    //   draggableOpts={{ enableUserSelectHack: false }}
    // >
    //   <th {...restProps} />
    // </Resizable>
  );
};

export function UITable(props: UITableProps) {
  const {
    size = 'md',
    hoverType = 'withoutRadius',
    columns,
    columnsResizeable,
    minColumnWidth = 80,
    customFilter = true,
    ...rest
  } = props;

  // 初始化列宽
  const [colWidths, setColWidths] = useState(
    () =>
      columns?.map((col) => ({
        width: col.width || 120,
      })) || [],
  );

  const handleResize = (index: number) => (offsetNum: number) => {
    if (!columnsResizeable) return;

    const nextWidths = [...colWidths];
    const t = nextWidths[index];
    const width = Math.max(+t.width + offsetNum, minColumnWidth);
    nextWidths[index] = { ...t, width };
    setColWidths(nextWidths);
  };

  const memoColumns = useMemo(() => {
    function getColumnSearchProps(col: TableColumnType): TableColumnType {
      if (!customFilter || !col.filters?.length) return {};
      return {
        filterIcon(filtered: boolean) {
          return (
            <CustomFilterIcon
              style={{ color: filtered ? '#1677ff' : undefined }}
            />
          );
        },
        filterDropdown: CustomFilterDropDown,
      };
    }

    return columns?.map((col, index) => {
      const width = colWidths[index]?.width;
      return {
        ...col,
        width,
        onHeaderCell: () => ({
          width,
          onMouseOffsetX: handleResize(index),
          isResizeable: index !== (columns?.length || 0) - 1, // 最后一列不允许调整宽度
        }),
        ...(col.sorter && !col.sortIcon ? { sortIcon: defaultSortIcon } : {}),
        ...getColumnSearchProps(col),
      };
    });
  }, [columns, colWidths, customFilter]);

  const components = useMemo(() => {
    if (columnsResizeable) {
      return {
        header: {
          cell: ResizableTitle,
        },
      };
    }
    return {};
  }, [columnsResizeable]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerFilterHoverBg: 'transparent',
          },
        },
      }}
    >
      <Table
        {...rest}
        columns={memoColumns}
        rowHoverable={false}
        className={classNames(size, hoverType, props.className)}
        components={components}
        tableLayout={columnsResizeable ? 'fixed' : 'auto'}
      />
    </ConfigProvider>
  );
}

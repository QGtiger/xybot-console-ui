import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import classNames from 'classnames';
import './UITable.less';

type UITableProps<TData> = {
  size?: 'md' | 'lg';
  hoverType?: 'withRadius' | 'withoutRadius';

  data: TData[];
  columns: ColumnDef<TData, any>[];
};

export function UITable<T>(props: UITableProps<T>) {
  const { data, columns, size = 'md', hoverType = 'withRadius' } = props;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classNames('ui-table-scope-wrapper')}>
      <table
        className={classNames(
          'ui-table',
          `ui-table-size-${size}`,
          `ui-table-hover-${hoverType}`,
        )}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  // style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="header-content">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* {header.column.getCanSort() && (
                          <span className="sort-indicator">
                            {{
                              asc: ' ↑',
                              desc: ' ↓',
                            }[header.column.getIsSorted()] ?? ' ↕'}
                          </span>
                        )} */}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.getIsSelected() ? 'selected' : ''}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

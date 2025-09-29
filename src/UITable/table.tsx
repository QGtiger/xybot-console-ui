import React from 'react';
import './table.less';

// 类型定义
export interface Column<T = any> {
  key: string;
  title: string;
  size?: string | number; // 列的宽度，可以是 '100px', '20%', 200 等
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  rowKey?: string | ((record: T, index: number) => string);
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  className = '',
  rowKey = 'id',
}: TableProps<T>) => {
  // 获取行键值
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record, index);
    }
    return record[rowKey] || `row-${index}`;
  };

  // 获取列样式
  const getColumnStyle = (column: Column<T>): React.CSSProperties => {
    const style: React.CSSProperties = {};

    if (column.size) {
      if (typeof column.size === 'number') {
        style.width = `${column.size}px`;
      } else {
        style.width = column.size;
      }
    }

    if (column.align) {
      style.textAlign = column.align;
    }

    return style;
  };

  // 渲染表头
  const renderTableHeader = () => {
    return (
      <thead className="table-header">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="table-header-cell"
              style={getColumnStyle(column)}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  // 渲染表体
  const renderTableBody = () => {
    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="table-empty">
              暂无数据
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className="table-body">
        {data.map((record, index) => (
          <tr key={getRowKey(record, index)} className="table-row">
            {columns.map((column) => (
              <td
                key={column.key}
                className="table-cell"
                style={getColumnStyle(column)}
              >
                {column.render
                  ? column.render(record[column.key], record, index)
                  : record[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className={`table-container  ${className}`}>
      <table className="table">
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

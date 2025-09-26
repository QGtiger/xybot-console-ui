import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

// 示例数据
const initialData = [
  {
    id: 1,
    firstName: '张三',
    lastName: '李',
    age: 28,
    email: 'zhangsan@example.com',
    status: '活跃',
    role: '管理员',
    department: '技术部',
    salary: 8500,
    startDate: '2022-03-15',
    projects: 5,
    performance: 95,
  },
  {
    id: 2,
    firstName: '李四',
    lastName: '王',
    age: 32,
    email: 'lisi@company.com',
    status: '活跃',
    role: '开发工程师',
    department: '技术部',
    salary: 7200,
    startDate: '2021-07-22',
    projects: 8,
    performance: 88,
  },
  {
    id: 3,
    firstName: '王五',
    lastName: '赵',
    age: 45,
    email: 'wangwu@test.org',
    status: '休假',
    role: '项目经理',
    department: '产品部',
    salary: 10500,
    startDate: '2019-11-05',
    projects: 12,
    performance: 92,
  },
  {
    id: 4,
    firstName: '赵六',
    lastName: '钱',
    age: 29,
    email: 'zhaoliu@demo.net',
    status: '活跃',
    role: 'UI设计师',
    department: '设计部',
    salary: 6800,
    startDate: '2023-01-10',
    projects: 3,
    performance: 78,
  },
  {
    id: 5,
    firstName: '钱七',
    lastName: '孙',
    age: 38,
    email: 'qianqi@example.com',
    status: '离职',
    role: '高级工程师',
    department: '技术部',
    salary: 9500,
    startDate: '2020-09-18',
    projects: 10,
    performance: 96,
  },
  {
    id: 6,
    firstName: '孙八',
    lastName: '周',
    age: 27,
    email: 'sunba@company.com',
    status: '活跃',
    role: '测试工程师',
    department: '质量部',
    salary: 6000,
    startDate: '2022-12-01',
    projects: 6,
    performance: 85,
  },
  {
    id: 7,
    firstName: '周九',
    lastName: '吴',
    age: 41,
    email: 'zhoujiu@test.org',
    status: '活跃',
    role: '产品经理',
    department: '产品部',
    salary: 11000,
    startDate: '2018-05-30',
    projects: 15,
    performance: 90,
  },
  {
    id: 8,
    firstName: '吴十',
    lastName: '郑',
    age: 33,
    email: 'wushi@demo.net',
    status: '休假',
    role: '前端工程师',
    department: '技术部',
    salary: 7800,
    startDate: '2021-03-22',
    projects: 7,
    performance: 87,
  },
];

// 完整的表格组件
const EmployeeTable = () => {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  // 定义列
  const columns = useMemo(
    () => [
      // 选择列
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 40,
      },
      // 基础数据列
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: '名字',
        cell: ({ getValue }) => <strong>{getValue()}</strong>,
      },
      {
        accessorKey: 'lastName',
        header: '姓氏',
      },
      // 自定义渲染列
      {
        accessorKey: 'email',
        header: '邮箱',
        cell: ({ getValue }) => (
          <a
            href={`mailto:${getValue()}`}
            className="email-link"
            title="发送邮件"
          >
            {getValue()}
          </a>
        ),
      },
      // 带排序的列
      {
        accessorKey: 'age',
        header: '年龄',
        enableSorting: true,
      },
      // 带过滤的列
      {
        accessorKey: 'status',
        header: '状态',
        enableColumnFilter: true,
        cell: ({ getValue }) => {
          const status = getValue();
          const statusConfig = {
            活跃: { color: 'green', bg: '#f0f9ff' },
            休假: { color: 'orange', bg: '#fff7ed' },
            离职: { color: 'red', bg: '#fef2f2' },
          };

          const config = statusConfig[status] || {
            color: 'gray',
            bg: '#f3f4f6',
          };

          return (
            <span
              className="status-badge"
              style={{
                color: config.color,
                backgroundColor: config.bg,
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            >
              {status}
            </span>
          );
        },
        filterFn: 'includesString',
      },
      // 格式化数据列
      {
        accessorKey: 'salary',
        header: '薪资',
        cell: ({ getValue }) => {
          const salary = getValue();
          return `¥${salary.toLocaleString()}`;
        },
        enableSorting: true,
      },
      {
        accessorKey: 'startDate',
        header: '入职日期',
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return date.toLocaleDateString('zh-CN');
        },
      },
      // 条件样式列
      {
        accessorKey: 'performance',
        header: '绩效',
        cell: ({ getValue }) => {
          const performance = getValue();
          let color = 'green';
          if (performance < 70) color = 'red';
          else if (performance < 85) color = 'orange';

          return (
            <span style={{ color, fontWeight: 'bold' }}>{performance}%</span>
          );
        },
        enableSorting: true,
      },
      // 操作列
      {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => {
          const employee = row.original;

          const handleEdit = () => {
            alert(`编辑员工: ${employee.firstName} ${employee.lastName}`);
          };

          const handleDelete = () => {
            if (
              window.confirm(
                `确定要删除 ${employee.firstName} ${employee.lastName} 吗？`,
              )
            ) {
              setData(data.filter((item) => item.id !== employee.id));
            }
          };

          return (
            <div className="action-buttons">
              <button onClick={handleEdit} className="edit-btn">
                编辑
              </button>
              <button onClick={handleDelete} className="delete-btn">
                删除
              </button>
            </div>
          );
        },
      },
    ],
    [data],
  );

  // 创建表格实例
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="table-container">
      <h2>员工管理表格</h2>

      {/* 全局搜索 */}
      <div className="filters">
        <input
          type="text"
          placeholder="全局搜索..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="global-filter"
        />

        <div className="selected-count">
          已选择 {table.getSelectedRowModel().rows.length} 行
        </div>
      </div>

      {/* 表格 */}
      <table className="employee-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className="header-content">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() && (
                        <span className="sort-indicator">
                          {{
                            asc: ' ↑',
                            desc: ' ↓',
                          }[header.column.getIsSorted()] ?? ' ↕'}
                        </span>
                      )}
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

      {/* 分页控制 */}
      <div className="pagination-controls">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          首页
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          上一页
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          下一页
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          末页
        </button>

        <span className="page-info">
          第 {table.getState().pagination.pageIndex + 1} 页，共{' '}
          {table.getPageCount()} 页
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              每页显示 {pageSize} 条
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// 添加样式
const styles = `
.table-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.table-container h2 {
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
}

.global-filter {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.selected-count {
  color: #666;
  font-size: 14px;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.employee-table th {
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  cursor: pointer;
  user-select: none;
}

.employee-table th:hover {
  background-color: #e9ecef;
}

.employee-table td {
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
}

.employee-table tr:hover {
  background-color: #f8f9fa;
}

.employee-table tr.selected {
  background-color: #e7f3ff;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-indicator {
  color: #6c757d;
  font-size: 12px;
}

.email-link {
  color: #007bff;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}

.status-badge {
  font-weight: 500;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.edit-btn:hover {
  background-color: #218838;
}

.delete-btn:hover {
  background-color: #c82333;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.pagination-controls button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-controls button:not(:disabled):hover {
  background-color: #f8f9fa;
}

.page-info {
  margin: 0 10px;
  color: #666;
}

.pagination-controls select {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
`;

// 主应用组件
const App = () => {
  return (
    <>
      <style>{styles}</style>
      <EmployeeTable />
    </>
  );
};

export default App;

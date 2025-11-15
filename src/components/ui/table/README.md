# DataTable Component

Component bảng dữ liệu mạnh mẽ được xây dựng với TanStack Table, hỗ trợ sắp xếp, lọc, phân trang và đồng bộ trạng thái với URL.

## Tính năng

- ✅ **Sắp xếp (Sorting)**: Sắp xếp dữ liệu theo cột với icons từ Tabler
- ✅ **Tìm kiếm (Search)**: Tìm kiếm nhanh với input có icon và nút xóa
- ✅ **Lọc (Filtering)**: Lọc dữ liệu với faceted filters
- ✅ **Phân trang (Pagination)**: Điều hướng trang với icons đẹp mắt
- ✅ **Page Size Selector**: Chọn số dòng hiển thị mỗi trang
- ✅ **URL State Sync**: Đồng bộ trạng thái với URL parameters
- ✅ **Striped Rows**: Hỗ trợ dòng kẻ sọc
- ✅ **Dark Mode**: Hỗ trợ chế độ tối
- ✅ **TypeScript**: Type-safe với generics
- ✅ **Accessible**: Tuân thủ WCAG guidelines

## Components

### DataTable

Component chính để hiển thị bảng dữ liệu.

### DataTableWithFilters

Variant của DataTable cho phép truy cập table instance để tạo custom filters.

```tsx
import { DataTable } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  name: string;
  email: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

<DataTable columns={columns} data={users} />;
```

### DataTableColumnHeader

Component header với chức năng sắp xếp và icons.

```tsx
import { DataTableColumnHeader } from "@/components/ui/table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
];
```

### DataTableFacetedFilter

Component lọc dữ liệu theo nhiều giá trị.

```tsx
import {
  DataTableWithFilters,
  DataTableFacetedFilter,
} from "@/components/ui/table";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

const statusOptions = [
  { value: "active", label: "Active", icon: IconCircleCheck },
  { value: "inactive", label: "Inactive", icon: IconCircleX },
];

<DataTableWithFilters
  columns={columns}
  data={data}
  renderFilters={(table) => (
    <DataTableFacetedFilter
      column={table.getColumn("status")}
      title="Status"
      options={statusOptions}
    />
  )}
/>;
```

### DataTableToolbar

Component toolbar với search và filters.

```tsx
import { DataTableToolbar } from "@/components/ui/table";

<DataTableToolbar
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  searchPlaceholder="Search..."
>
  {/* Custom filters */}
</DataTableToolbar>;
```

### DataTablePagination

Component phân trang với page size selector.

```tsx
import { DataTablePagination } from "@/components/ui/table";

<DataTablePagination
  pageIndex={0}
  pageSize={10}
  pageCount={5}
  totalRows={50}
  canPreviousPage={false}
  canNextPage={true}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange}
  pageSizeOptions={[10, 20, 30, 40, 50]}
/>;
```

## Props

### DataTable Props

| Prop                     | Type              | Default       | Description                                    |
| ------------------------ | ----------------- | ------------- | ---------------------------------------------- |
| `columns`                | `ColumnDef[]`     | Required      | Định nghĩa các cột                             |
| `data`                   | `TData[]`         | Required      | Dữ liệu hiển thị                               |
| `searchKey`              | `string`          | -             | Key để tìm kiếm                                |
| `searchPlaceholder`      | `string`          | "Search..."   | Placeholder cho input tìm kiếm                 |
| `pageSize`               | `number`          | `10`          | Số dòng mỗi trang                              |
| `pageSizeOptions`        | `number[]`        | `[10,20,...]` | Các tùy chọn page size                         |
| `enableSorting`          | `boolean`         | `true`        | Bật/tắt sắp xếp                                |
| `enableFiltering`        | `boolean`         | `true`        | Bật/tắt lọc                                    |
| `enablePagination`       | `boolean`         | `true`        | Bật/tắt phân trang                             |
| `enablePageSizeSelector` | `boolean`         | `true`        | Bật/tắt page size selector                     |
| `enableUrlState`         | `boolean`         | `true`        | Đồng bộ trạng thái với URL                     |
| `striped`                | `boolean`         | `false`       | Dòng kẻ sọc                                    |
| `toolbarContent`         | `React.ReactNode` | -             | Nội dung tùy chỉnh cho toolbar (filters, etc.) |

## Ví dụ sử dụng

### Bảng cơ bản với tìm kiếm

```tsx
<DataTable
  columns={columns}
  data={users}
  searchKey="name"
  searchPlaceholder="Tìm kiếm theo tên..."
/>
```

### Bảng với filters

```tsx
import {
  DataTableWithFilters,
  DataTableFacetedFilter,
} from "@/components/ui/table";

const statusOptions = [
  { value: "active", label: "Hoạt động", icon: IconCircleCheck },
  { value: "inactive", label: "Không hoạt động", icon: IconCircleX },
];

const roleOptions = [
  { value: "Admin", label: "Quản trị viên", icon: IconShield },
  { value: "User", label: "Người dùng", icon: IconUser },
];

<DataTableWithFilters
  columns={columns}
  data={users}
  searchKey="name"
  renderFilters={(table) => (
    <>
      <DataTableFacetedFilter
        column={table.getColumn("status")}
        title="Trạng thái"
        options={statusOptions}
      />
      <DataTableFacetedFilter
        column={table.getColumn("role")}
        title="Vai trò"
        options={roleOptions}
      />
    </>
  )}
/>;
```

### Bảng với page size tùy chỉnh

```tsx
<DataTable
  columns={columns}
  data={users}
  pageSize={20}
  pageSizeOptions={[10, 20, 50, 100]}
  searchKey="email"
/>
```

### Bảng với dòng kẻ sọc

```tsx
<DataTable columns={columns} data={users} striped />
```

### Bảng không phân trang

```tsx
<DataTable
  columns={columns}
  data={users}
  enablePagination={false}
  searchKey="name"
/>
```

### Bảng tối giản

```tsx
<DataTable
  columns={columns}
  data={users}
  enableSorting={false}
  enableFiltering={false}
  enablePagination={false}
/>
```

## Tùy chỉnh columns

### Column với sorting

```tsx
{
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Tên" />
  ),
}
```

### Column với custom cell

```tsx
{
  accessorKey: "status",
  header: "Trạng thái",
  cell: ({ row }) => {
    const status = row.getValue("status");
    return (
      <span className={status === "active" ? "text-green-600" : "text-red-600"}>
        {status}
      </span>
    );
  },
}
```

### Column với filter function

```tsx
{
  accessorKey: "role",
  header: "Vai trò",
  filterFn: (row, id, value) => {
    return value.includes(row.getValue(id));
  },
}
```

## Icons sử dụng

Component sử dụng các icons từ `@tabler/icons-react`:

- `IconSearch` - Icon tìm kiếm
- `IconX` - Icon xóa
- `IconFilter` - Icon lọc
- `IconCheck` - Icon check
- `IconArrowUp` - Icon sắp xếp tăng dần
- `IconArrowDown` - Icon sắp xếp giảm dần
- `IconArrowsSort` - Icon sắp xếp
- `IconChevronLeft` - Icon trang trước
- `IconChevronRight` - Icon trang sau
- `IconChevronsLeft` - Icon trang đầu
- `IconChevronsRight` - Icon trang cuối

## URL State Synchronization

Khi `enableUrlState={true}`, các trạng thái sau được đồng bộ với URL:

- `page` - Trang hiện tại
- `pageSize` - Số dòng mỗi trang
- `sort` - Cột và hướng sắp xếp (format: `columnId:asc` hoặc `columnId:desc`)
- `search` - Giá trị tìm kiếm

Ví dụ URL: `?page=2&pageSize=20&sort=name:asc&search=john`

## Accessibility

Component tuân thủ WCAG guidelines:

- Keyboard navigation đầy đủ
- ARIA labels và roles phù hợp
- Focus management
- Screen reader support
- High contrast mode support

## Dependencies

- `@tanstack/react-table` - Table logic
- `@tabler/icons-react` - Icons
- `nuqs` - URL state management
- `class-variance-authority` - Styling variants
- `tailwind-merge` - Tailwind class merging

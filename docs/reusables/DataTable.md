# DataTable — How To

Location: `src/components/reusables/DataTable.tsx:1`

Agnostic table built on `src/components/ui/table.tsx:1`. No domain filters, no export/date logic — consumer controls toolbar + pagination via props.

## Import

```tsx
import { DataTable, type Column } from "@/components/reusables/DataTable";
```

## Columns

```tsx
type User = { id: string; email: string; role: string };

const columns: Column<User>[] = [
  { header: "Email", accessor: "email", width: "40%" },
  { header: "Role", accessor: "role", align: "center" },
  {
    header: "Status",
    accessor: "role",
    cell: (row) => <span className="capitalize">{row.role}</span>,
  },
];
```

## Basic

```tsx
<DataTable columns={columns} data={users} />
```

## Search (internal filtering)

```tsx
<DataTable
  columns={columns}
  data={users}
  searchable
  searchPlaceholder="Search users…"
  onSearchChange={(q) => console.log(q)}
/>

// controlled:
<DataTable query={query} onSearchChange={setQuery} searchable />
// disable internal filter when server handles it:
<DataTable disableInternalFiltering searchable />
```

## Toolbar

```tsx
<DataTable
  columns={columns}
  data={users}
  cardHeaderData={<h2 className="text-lg font-semibold">Users</h2>}
  toolbarLeft={<span className="text-sm text-muted-foreground">{users.length} total</span>}
  toolbarRight={
    <>
      <SelectFilter ... />
      <ExportButton onExport={handleExport} />
    </>
  }
/>
```

## Pagination + Loading

```tsx
<DataTable
  columns={columns}
  data={pageData}
  isLoading={isPending}
  loadingItemsCount={5}
  autoIncrement
  rowActions={(row) => <Button size="sm" onClick={() => edit(row)}>Edit</Button>}
  pagination={<Pagination meta={meta} loadPage={setPage} />}
  footer={<span>Showing {meta.perPage} of {meta.total}</span>}
/>
```

## Styling Overrides

```tsx
<DataTable
  tableHeaderClassName="bg-muted"
  tableCellClassName="py-3"
  columns={[{ header:"Email", accessor:"email", headClassName:"w-[300px]", cellClassName:"font-mono" }]}
/>
```

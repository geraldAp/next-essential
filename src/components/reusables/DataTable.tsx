"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  cell?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  headClassName?: string;
  cellClassName?: string;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  caption?: string;
  emptyState?: React.ReactNode | string;
  // search
  searchable?: boolean;
  searchPlaceholder?: string;
  defaultQuery?: string;
  query?: string;
  onSearchChange?: (q: string) => void;
  disableInternalFiltering?: boolean;
  // toolbar
  toolbarLeft?: React.ReactNode;
  toolbarRight?: React.ReactNode;
  cardHeaderData?: React.ReactNode;
  cardHeaderClassName?: string;
  // styling
  tableHeaderClassName?: string;
  tableCellClassName?: string;
  // rows
  autoIncrement?: boolean;
  rowActions?: (row: T) => React.ReactNode;
  // footer / pagination - agnostic, consumer controls
  footer?: React.ReactNode;
  pagination?: React.ReactNode;
  // loading
  isLoading?: boolean;
  loadingItemsCount?: number;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  caption,
  emptyState = (
    <div className="text-center py-4 text-sm text-muted-foreground">
      No records found.
    </div>
  ),
  searchable = false,
  searchPlaceholder = "Search…",
  defaultQuery = "",
  query: controlledQuery,
  onSearchChange,
  disableInternalFiltering = false,
  toolbarLeft,
  toolbarRight,
  cardHeaderData,
  cardHeaderClassName = "",
  tableHeaderClassName,
  tableCellClassName,
  autoIncrement = false,
  rowActions,
  footer,
  pagination,
  isLoading = false,
  loadingItemsCount = 10,
}: DataTableProps<T>) {
  const [query, setQuery] = useState(defaultQuery);
  const effectiveQuery = controlledQuery ?? query;

  const filtered = useMemo(() => {
    if (disableInternalFiltering) return data;
    if (!searchable || !effectiveQuery) return data;
    const q = effectiveQuery.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.accessor];
        if (val == null) return false;
        return String(val).toLowerCase().includes(q);
      })
    );
  }, [data, effectiveQuery, searchable, columns, disableInternalFiltering]);

  const hasToolbar =
    !!cardHeaderData || searchable || !!toolbarLeft || !!toolbarRight;

  const colSpan = columns.length + (autoIncrement ? 1 : 0) + (rowActions ? 1 : 0);

  return (
    <>
      <Card className="shadow-none rounded-none border-none px-6 pt-3 gap-2">
        {hasToolbar && (
          <CardHeader className="pb-2 px-0 mb-0 flex flex-row items-center justify-between gap-2">
            <div className={cn("", cardHeaderClassName)}>{cardHeaderData}</div>
            <div className="flex items-center gap-2">
              {toolbarLeft}
              {searchable && (
                <input
                  value={effectiveQuery}
                  placeholder={searchPlaceholder}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (controlledQuery === undefined) setQuery(val);
                    onSearchChange?.(val);
                  }}
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              )}
              {toolbarRight}
            </div>
          </CardHeader>
        )}

        <Table className="table-fixed">
          {caption && <TableCaption>{caption}</TableCaption>}
          <colgroup>
            {autoIncrement && <col style={{ width: "4rem" }} />}
            {columns.map((col, i) => (
              <col
                key={`${String(col.accessor)}-${col.header}-${i}`}
                style={col.width ? { width: col.width } : undefined}
              />
            ))}
            {rowActions && <col style={{ width: "6rem" }} />}
          </colgroup>

          <TableHeader className="rounded-none border-b shadow-none">
            <TableRow>
              {autoIncrement && (
                <TableHead className="text-left border-b bg-[#FAFAFA]">#</TableHead>
              )}
              {columns.map((col, i) => (
                <TableHead
                  key={`${String(col.accessor)}-${col.header}-${i}`}
                  style={{ width: col.width }}
                  className={cn(
                    `border-b border-l bg-[#FAFAFA] first:border-l-0`,
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.align === "left" && "text-left",
                    !col.align && "text-left",
                    tableHeaderClassName,
                    col.headClassName
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
              {rowActions && (
                <TableHead className="text-center border-l bg-[#FAFAFA]">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array.from({ length: loadingItemsCount }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {autoIncrement && (
                    <TableCell className={cn("border-b", tableCellClassName)}>
                      <Skeleton className="h-6 w-full my-1" />
                    </TableCell>
                  )}
                  {columns.map((col, j) => (
                    <TableCell
                      key={`${String(col.accessor)}-${j}`}
                      className={cn("border-b", tableCellClassName, col.cellClassName)}
                    >
                      <Skeleton className="h-6 w-full my-1" />
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="text-center border-b">
                      <Skeleton className="h-6 w-full my-1" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : filtered.length ? (
              filtered.map((row, i) => (
                <TableRow key={i} className="text-xs 2xl:text-sm">
                  {autoIncrement && (
                    <TableCell className={cn("border-b", tableCellClassName)}>
                      {i + 1}
                    </TableCell>
                  )}
                  {columns.map((col, j) => (
                    <TableCell
                      key={`${String(col.accessor)}-${col.header}-${j}`}
                      className={cn(
                        "border-b rounded-none shadow-none",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                        col.align === "left" && "text-left",
                        !col.align && "text-left",
                        tableCellClassName,
                        col.cellClassName
                      )}
                    >
                      {col.cell ? col.cell(row) : String(row[col.accessor] ?? "N/A")}
                    </TableCell>
                  ))}
                  {rowActions && (
                    <TableCell className="text-center border-b">{rowActions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={colSpan} className="text-center py-4">
                  {emptyState}
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {footer && <TableFooter>{footer}</TableFooter>}
        </Table>
      </Card>

      {pagination && <div className="flex justify-center mt-4">{pagination}</div>}
    </>
  );
}

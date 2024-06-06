import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { DataTableDefaultProps, FacetedFilterType } from '@/lib/types';
import { useMemo, useState } from 'react';
import { rankItem } from '@tanstack/match-sorter-utils';
import { Card, CardTitle } from '@/components/ui/card';
import DataTableToolbar from './DataTableToolbar';
import { Input } from '@/components/ui/input';
import { ThreeDots } from '@/lib/svgs';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from '@radix-ui/react-icons';
import DataTableColumnFilter from '@/components/DataTable/DataTableColumnFilter';
import { DataTablePagination } from '@/components/DataTable/DataTablePagination';

export interface DataTableProps<TData, TValue> extends DataTableDefaultProps {
    columns: ColumnDef<TData, TValue>[];
    currentServerPage?: number;
    data: TData[];
    facetedFilters?: FacetedFilterType[];
    title?: string;
}

const DataTable = <TData, TValue>({
    title,
    columns,
    data,
    facetedFilters,
    isRefreshing = false,
    onRefresh,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [filtering, setFiltering] = useState<boolean>(false);

    const fuzzyFilter: FilterFn<TData> = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value);

        // Store the ranking info
        addMeta(itemRank);

        // Return if the item should be filtered in/out
        return itemRank.passed;
    };

    const table = useReactTable({
        state: {
            sorting,
            columnFilters,
            globalFilter,
            rowSelection,
        },

        data,
        columns: useMemo(
            () => [
                {
                    id: 'select',
                    header: ({ table }) => (
                        <Checkbox
                            className={'border-0 hover:border hover:border-gray-200'}
                            checked={table.getIsSomeRowsSelected() ? 'indeterminate' : table.getIsAllRowsSelected()}
                            onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
                        />
                    ),
                    cell: ({ row }) => (
                        <div className="px-1">
                            <Checkbox
                                className={'border-0 hover:border hover:border-gray-200'}
                                checked={row.getIsSomeSelected() ? 'indeterminate' : row.getIsSelected()}
                                onCheckedChange={row.getToggleSelectedHandler()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ],
            [columns]
        ),

        enableRowSelection: true,
        globalFilterFn: fuzzyFilter,

        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <Card className="rounded-md border-0 p-3 lg:p-6 space-y-3">
            {title && (
                <CardTitle className={'flex items-end flex-col'}>
                    <p className="text-xs lg:text-base lg:px-3">{title}</p>
                    <hr className={'w-1/2 lg:w-1/5 mt-1'} />
                </CardTitle>
            )}

            <DataTableToolbar
                table={table}
                facetedFilters={facetedFilters}
                filtering={filtering}
                setFiltering={setFiltering}
                onRefresh={onRefresh}
                isRefreshing={isRefreshing}
                globalFilter={
                    <Input
                        type={'search'}
                        placeholder={'Filter columns...'}
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                }
            />

            <div className="relative">
                <div
                    style={{
                        zIndex: 2,
                        backdropFilter: 'blur(10px)',
                        opacity: isRefreshing ? 1 : 0,
                        visibility: isRefreshing ? 'visible' : 'hidden',
                        transition: 'opacity 1s, visibility 1s',
                    }}
                    className={'absolute start-0 top-0 end-0 bottom-0 flex justify-center items-center'}
                >
                    <div className={'text-center text-muted-foreground'} style={{ fontFamily: 'Pacifico, cursive' }}>
                        <ThreeDots fill={'#0F1B4C'} />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={'text-nowrap'}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {!header.isPlaceholder && (
                                            <>
                                                <div
                                                    className="flex items-center -ml-4 h-8 px-3 data-[state=open]:bg-accent text-secondary-foreground hover:bg-secondary/80 cursor-pointer"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    <span className={'font-bold text-xs md:text-sm'}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                    {header.column.getCanSort() &&
                                                        ({
                                                            asc: <CaretUpIcon className="ml-2 h-4 w-4" />,
                                                            desc: <CaretDownIcon className="ml-2 h-4 w-4" />,
                                                        }[header.column.getIsSorted() as string] ?? (
                                                            <CaretSortIcon className="ml-2 h-4 w-4" />
                                                        ))}
                                                </div>

                                                {filtering && header.column.getCanFilter() && (
                                                    <DataTableColumnFilter table={table} column={header.column} />
                                                )}
                                            </>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className={'border-muted'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={'text-xs md:text-sm'}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </Card>
    );
};

export default DataTable;

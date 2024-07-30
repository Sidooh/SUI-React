import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTableDefaultProps } from '@/lib';
import { TbArrowBigLeftLinesFilled, TbArrowBigRightLinesFilled } from 'react-icons/tb';
import IconButton from '@/components/IconButton';
import Tooltip from '@/components/Tooltip';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface DataTablePaginationProps<TData> extends DataTableDefaultProps {
    table: Table<TData>;
}

function TotalRows<TData>({ table }: { table: Table<TData> }) {
    return (
        <div className="text-muted-foreground">
            {table.getIsSomeRowsSelected() || table.getIsAllRowsSelected() ? (
                <span>
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{' '}
                    row(s)
                </span>
            ) : (
                <span>{table.getRowCount()} Rows</span>
            )}
        </div>
    );
}

export function DataTablePagination<TData>({
    table,
    serverTotal,
    serverPageSize,
    serverPageCount,
    currentServerPage,
    onPreviousServerPage,
    onNextServerPage,
    onGoToServerPage,
    onSetServerPageSize,
}: DataTablePaginationProps<TData>) {
    const [serverPage, setServerPage] = useState(currentServerPage);

    const hasServerPagination = serverTotal && serverPageCount && currentServerPage && onPreviousServerPage;

    return (
        <div className="flex items-center justify-between px-2 overflow-x-auto gap-3 text-nowrap text-xs md:text-sm relative">
            {hasServerPagination ? (
                <div className={'flex items-center space-x-2'}>
                    <div className="space-x-1">
                        {serverPageCount && currentServerPage && onPreviousServerPage && (
                            <Tooltip title={'Previous Page'} asChild>
                                <IconButton
                                    variant="ghost"
                                    dimensions={27}
                                    disabled={currentServerPage < 2}
                                    onClick={onPreviousServerPage}
                                >
                                    <TbArrowBigLeftLinesFilled />
                                </IconButton>
                            </Tooltip>
                        )}
                        {serverPageCount && currentServerPage && onNextServerPage && (
                            <Tooltip title={'Next Page'} asChild>
                                <IconButton
                                    variant="ghost"
                                    dimensions={27}
                                    onClick={onNextServerPage}
                                    disabled={currentServerPage >= serverPageCount}
                                >
                                    <TbArrowBigRightLinesFilled />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                    <b>
                        {currentServerPage} of {serverPageCount}
                    </b>
                    {onSetServerPageSize && (
                        <Select
                            value={String(serverPageSize)}
                            onValueChange={(value) => {
                                onSetServerPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-7 lg:h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[50, 100, 200, 500, 1000].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {onGoToServerPage && serverPageCount > 3 && (
                        <>
                            <span>Go to:</span>
                            <Input
                                type="number"
                                value={serverPage}
                                step="1"
                                min="3"
                                max={serverPageCount}
                                onChange={(e) => {
                                    let page = Number(e.target.value);

                                    page = serverPageCount > page ? page : serverPageCount - 1;
                                    setServerPage(e.target.value as unknown as number);

                                    if (page > 0) onGoToServerPage(page);
                                }}
                                className="h-7 lg:h-8 w-[70px]"
                            />
                        </>
                    )}
                    {serverTotal && (
                        <span>
                            Total: <b>{serverTotal}</b>
                        </span>
                    )}
                </div>
            ) : (
                <TotalRows table={table} />
            )}
            <div className="flex items-center space-x-3">
                {hasServerPagination && <TotalRows table={table} />}
                <div className="flex items-center">
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-7 lg:h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <b>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </b>
                <div className="flex items-center space-x-2">
                    <IconButton
                        variant="ghost"
                        dimensions={27}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        dimensions={27}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        dimensions={27}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                        variant="ghost"
                        dimensions={27}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

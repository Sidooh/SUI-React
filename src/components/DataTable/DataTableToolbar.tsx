import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { Button } from '@/components/ui/button';
import { Cross2Icon, ReloadIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { FacetedFilterType } from '@/lib/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { DataTableViewOptions } from './DataTableViewOptions';
import Tooltip from '@/components/Tooltip/Tooltip';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import IconButton from "@/components/IconButton/IconButton";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    globalFilter: ReactNode;
    facetedFilters?: FacetedFilterType[];
    filtering: boolean;
    setFiltering: Dispatch<SetStateAction<boolean>>;
    isRefreshing?: boolean;
    onRefresh?: () => void;
}

export function DataTableToolbar<TData>({
    table,
    facetedFilters,
    filtering,
    setFiltering,
    globalFilter,
    isRefreshing = false,
    onRefresh,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between gap-1">
            <div className="flex flex-1 items-center space-x-2 overflow-auto">
                {globalFilter}

                {facetedFilters?.map(
                    (f) =>
                        table.getColumn(f.column_id) && (
                            <DataTableFacetedFilter
                                key={f.column_id}
                                column={table.getColumn(f.column_id)}
                                title={f.title}
                                options={f.options}
                            />
                        )
                )}
                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="px-2 lg:px-3">
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {onRefresh && (
                <Tooltip title={'Refresh'} asChild>
                    <IconButton
                        variant={'ghost'}
                        dimensions={30}
                        className={'hidden lg:flex rounded-full text-red-700 hover:text-red-700 hover:bg-red-700/10'}
                        onClick={onRefresh}
                    >
                        {isRefreshing ? <ReloadIcon className="animate-spin" /> : <TbRefresh />}
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title={'Filter columns'} asChild>
                <IconButton
                    variant="ghost"
                    dimensions={30}
                    className="ml-auto hidden lg:flex rounded-full text-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10"
                    onClick={() => setFiltering(!filtering)}
                    icon={filtering ? MdFilterAltOff : MdFilterAlt}
                />
            </Tooltip>
            <DataTableViewOptions table={table} />
        </div>
    );
}

export default DataTableToolbar;

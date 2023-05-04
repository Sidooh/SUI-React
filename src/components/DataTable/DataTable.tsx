import { MouseEventHandler, useMemo, useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from '@tanstack/react-table';
import { Col, Row, Table } from 'react-bootstrap';
import DebouncedInput from './DebouncedInput';
import { rankItem } from '@tanstack/match-sorter-utils';
import Filter from './Filter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ThreeDots } from "../../utils/svg-loaders";

export interface DataTableProps {
    title: string;
    data: any[];
    columns: ColumnDef<any>[];
    reFetching?: boolean;
    onCreateRow?: () => void;
    onRefetch?: () => void;
    onViewAll?: MouseEventHandler<HTMLButtonElement>;
    onPreviousServerPage?: () => void,
    onNextServerPage?: () => void,
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank);

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

const DataTable = ({
    title,
    data = [],
    columns = [],
    reFetching = false,
    onCreateRow,
    onViewAll,
    onRefetch,
    onPreviousServerPage,
    onNextServerPage
}: DataTableProps) => {
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState<boolean>(false);

    const table = useReactTable({
        data,
        columns: useMemo(() => [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}/>
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox {...{
                            checked: row.getIsSelected(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}/>
                    </div>
                ),
            },
            ...columns,
        ], []),
        state: {
            columnVisibility,
            globalFilter,
            columnFilters,
            sorting,
            rowSelection
        },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        globalFilterFn: fuzzyFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <Header table={table} rowSelection={rowSelection} filtering={filtering} setFiltering={setFiltering}
                    title={title} onCreateRow={onCreateRow} reFetching={reFetching} onRefetch={onRefetch}/>
            <Row>
                <Col xs="auto" sm={6} lg={4}>
                    <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                            <DebouncedInput type={'search'} value={globalFilter ?? ''}
                                            onChange={value => setGlobalFilter(String(value))} placeholder="Search..."
                                            label={'Search all columns...'}/>
                            <i className="bx bx-search-alt search-icon"/>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className={'position-relative'}>
                <div style={{
                    zIndex: 2,
                    backdropFilter: 'blur(10px)',
                    opacity: reFetching ? 1 : 0,
                    visibility: reFetching ? 'visible' : 'hidden',
                    transition: 'opacity 1s, visibility 1s'
                }}
                     className={'position-absolute start-0 top-0 end-0 bottom-0 d-flex justify-content-center align-items-center'}>
                    <div className={'text-center fs-2'} style={{ fontFamily: 'Pacifico, cursive' }}>
                        <p className={'fs-3 mb-0'}>Un Momento!</p>
                        <ThreeDots fill={'#0F1B4C'}/>
                        <p className={'fs-1'}>Por favor😁</p>
                    </div>
                </div>
                <Table>
                    <thead>
                    {table.getHeaderGroups().map((headerGroup, i) => (
                        <tr key={`thead-tr-${i}`}>
                            {headerGroup.headers.map((header, j) => (
                                <th key={`thead-th-${j}`} colSpan={header.colSpan}>
                                    {!header.isPlaceholder && (
                                        <>
                                            <div {...{
                                                className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && (
                                                    {
                                                        asc: <FontAwesomeIcon className={'ms-2'} icon={faSortUp}/>,
                                                        desc: <FontAwesomeIcon className={'ms-2'} icon={faSortDown}/>
                                                    }[header.column.getIsSorted() as string] ??
                                                    <FontAwesomeIcon className={'ms-2'} icon={faSort}/>
                                                )}
                                            </div>
                                            {filtering && header.column.getCanFilter() && (
                                                <div><Filter column={header.column} table={table}/></div>
                                            )}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row, i) => (
                        <tr key={`tbody-tr-${i}`}>
                            {row.getVisibleCells().map((cell, j) => (
                                <td key={`tbody-td-${j}`} className={'py-1'}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <Footer table={table} rowSelection={rowSelection} onViewAll={onViewAll}
                    onPreviousServerPage={onPreviousServerPage} onNextServerPage={onNextServerPage}/>
        </>
    );
};

export default DataTable;
import Flex from '../Flex/Flex';
import { Form } from 'react-bootstrap';
import { Table } from '@tanstack/react-table';
import IconButton from '../IconButton/IconButton';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
    MdReadMore,
    TbArrowBigLeftLinesFilled,
    TbArrowBigRightLinesFilled
} from "react-icons/all";
import Tooltip from "../Tooltip";

const FormSelect = styled(Form.Select)`
  background-image: none;
  padding-right: .75rem;
`;

export interface FooterProps {
    table: Table<any>,
    rowSelection: {},
    onViewAll?: MouseEventHandler<HTMLButtonElement>,
    serverTotal?: number,
    serverPageSize?: number,
    serverPageCount?: number,
    currentServerPage?: number,
    onPreviousServerPage?: () => void,
    onNextServerPage?: () => void,
    onGoToServerPage?: (page: number) => void
    onSetServerPageSize?: (page: number) => void
}

const Footer = ({
    table,
    rowSelection,
    onViewAll,
    serverTotal,
    serverPageSize,
    serverPageCount,
    currentServerPage,
    onPreviousServerPage,
    onNextServerPage,
    onGoToServerPage,
    onSetServerPageSize,
}: FooterProps) => {
    const [serverPage, setServerPage] = useState(currentServerPage)
    const selectedRowsCount = Object.keys(rowSelection).length;

    const goToPage = (e: ChangeEvent<HTMLInputElement>) => {
        let page = Number(e.target.value) - 1

        page = table.getPageCount() > page ? page : table.getPageCount() - 1
        table.setPageIndex(page)
    }

    return (
        <Flex alignItems={'center'} justifyContent={'between'}>
            <Flex alignItems="center" className="fs--1">
                {serverTotal && serverPageCount && currentServerPage && onPreviousServerPage ? (
                    <>
                        {serverPageCount && currentServerPage && onPreviousServerPage ? (
                            <Tooltip title={'Previous Page'}>
                                <IconButton size={'sm'} disabled={currentServerPage < 2} onClick={onPreviousServerPage}>
                                    <TbArrowBigLeftLinesFilled/>
                                </IconButton>
                            </Tooltip>
                        ) : ''}
                        {serverPageCount && currentServerPage && onNextServerPage ? (
                            <Tooltip title={'Next Page'}>
                                <IconButton size={'sm'} className={'ms-1'} onClick={onNextServerPage}
                                            disabled={currentServerPage >= serverPageCount}>
                                    <TbArrowBigRightLinesFilled/>
                                </IconButton>
                            </Tooltip>
                        ) : ''}
                        <p className="mb-0">
                            <span className="mx-2 border-end">&nbsp;</span>
                            <strong>{currentServerPage} of {serverPageCount}</strong>
                        </p>
                        <span className="mx-1 border-end">&nbsp;</span>
                        <FormSelect size="sm" className="w-auto mx-2 border-0"
                                    value={serverPageSize}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onSetServerPageSize && onSetServerPageSize(Number(e.target.value))}>
                            {[50, 100, 200, 500, 1000].map(pageSize => (
                                <option key={pageSize} value={pageSize}>{pageSize}</option>
                            ))}
                        </FormSelect> / Page
                        {onGoToServerPage && serverPageCount > 3 && (
                            <>
                                <span className="mx-1 border-end">&nbsp;</span>
                                <span className="flex items-center gap-1">Go to pg:</span>
                                <input type="number" value={serverPage} step="1" min="3" max={serverPageCount}
                                       onChange={e => {
                                           let page = Number(e.target.value)

                                           page = serverPageCount > page ? page : serverPageCount - 1
                                           setServerPage(page)

                                           if (page > 0) onGoToServerPage(page)
                                       }}
                                       className="form-control form-control-sm w-auto border-3 ms-2"/>
                            </>
                        )}
                        {serverTotal && (
                            <>
                                <span className="mx-1 border-end">&nbsp;</span>
                                <span>Total: <b>{serverTotal}</b></span>
                            </>
                        )}
                    </>
                ) : ''}
            </Flex>
            <Flex alignItems="center" className={'fs--1'}>
                {Boolean(selectedRowsCount) && (
                    <div className={'border-end pe-2 me-2'}>
                        {selectedRowsCount === table.getPreFilteredRowModel().rows.length
                         ? 'All rows selected'
                         : `${selectedRowsCount} of ${table.getPreFilteredRowModel().rows.length} rows selected`}
                    </div>
                )}
                <span>Total: <b>{table.getCoreRowModel().rows.length.toLocaleString()}</b></span>
                <span className="mx-1 border-end">&nbsp;</span>
                {table.getPageCount() > 3 && (
                    <>
                        <span className="flex items-center gap-1">Go to pg:</span>
                        <input type="number" value={table.getState().pagination.pageIndex + 1}
                               onChange={(e) => goToPage(e)}
                               step="1" min="1" max={table.getPageCount()}
                               className="form-control form-control-sm w-auto border-3 ms-2"/>
                        <span className="mx-1 border-end"> &nbsp;</span>
                    </>
                )}
                <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                <span className="mx-1 border-end">&nbsp;</span>
                <IconButton size={'sm'} disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                    <FaAngleDoubleLeft/>
                </IconButton>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}>
                    <FaAngleLeft/>
                </IconButton>
                <FormSelect size="sm" className="w-auto mx-2 border-0" value={table.getState().pagination.pageSize}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => table.setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))}
                </FormSelect>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}>
                    <FaAngleRight/>
                </IconButton>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    <FaAngleDoubleRight/>
                </IconButton>
                {onViewAll && (
                    <>
                        <p className="mb-0 mx-1 border-end"> &nbsp;</p>
                        <Tooltip title={'View All'}>
                            <IconButton onClick={onViewAll}><MdReadMore/></IconButton>
                        </Tooltip>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default Footer;

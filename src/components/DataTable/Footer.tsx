import Flex from '../Flex/Flex';
import { Form } from 'react-bootstrap';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import { ChangeEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { MdReadMore } from "react-icons/all";
import Tooltip from "../Tooltip";

const FormSelect = styled(Form.Select)`
  background-image: none;
  padding-right: .75rem;
`;

export interface FooterProps {
    table: Table<any>,
    rowSelection: {},
    onViewAll?: MouseEventHandler<HTMLButtonElement>
}

const Footer = ({ table, rowSelection, onViewAll }: FooterProps) => {
    const selectedRowsCount = Object.keys(rowSelection).length;

    const goToPage = (e: ChangeEvent<HTMLInputElement>) => {
        let page = Number(e.target.value) - 1

        page = table.getPageCount() > page ? page : table.getPageCount() - 1
        table.setPageIndex(page)
    }

    return (
        <Flex alignItems={'center'} justifyContent={'between'}>
            <Flex alignItems="center" className="fs--1">
                <p className="mb-0">
                    <span>Page </span>
                    <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </p>
                <p className="mb-0 mx-2 border-end"> &nbsp;</p>
                {Boolean(selectedRowsCount) && (
                    <div className={'border-end pe-2 me-2'}>
                        {selectedRowsCount === table.getPreFilteredRowModel().rows.length
                         ? 'All rows selected'
                         : `${selectedRowsCount} of ${table.getPreFilteredRowModel().rows.length} rows selected`}
                    </div>
                )}
                <span>Total: <b>{table.getCoreRowModel().rows.length.toLocaleString()}</b></span>
                {table.getPageCount() > 3 && (
                    <>
                        <span className="ms-2">| &nbsp;</span>
                        <span className="flex items-center gap-1">Go to page:</span>
                        <input type="number" value={table.getState().pagination.pageIndex + 1}
                               onChange={(e) => goToPage(e)}
                               step="1" min="1" max={table.getPageCount()}
                               className="form-control form-control-sm w-auto border-3 ms-2"/>
                    </>
                )}
            </Flex>
            <Flex alignItems="center">
                {onViewAll && (
                    <Tooltip title={'View All'}>
                        <IconButton onClick={onViewAll}><MdReadMore/></IconButton>
                    </Tooltip>
                )}
                <p className="mb-0 mx-2 border-end"> &nbsp;</p>
                <IconButton disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                    <FontAwesomeIcon icon={faAnglesLeft} fontSize={15}/>
                </IconButton>
                <IconButton className={'ms-1'} disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}>
                    <FontAwesomeIcon icon={faAngleLeft} fontSize={15}/>
                </IconButton>
                <FormSelect size="sm" className="w-auto mx-2 border-0" value={table.getState().pagination.pageSize}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => table.setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))}
                </FormSelect>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}>
                    <FontAwesomeIcon icon={faAngleRight} fontSize={15}/>
                </IconButton>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    <FontAwesomeIcon icon={faAnglesRight} fontSize={15}/>
                </IconButton>
            </Flex>
        </Flex>
    );
};

export default Footer;

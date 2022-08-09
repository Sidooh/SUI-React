import Flex from '../Flex/Flex';
import { Button, Form } from 'react-bootstrap';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
    faArrowRightLong
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '../IconButton/IconButton';
import React from 'react';

const Footer = ({
    table,
    rowSelection,
    onViewAll
}: { table: Table<any>, rowSelection: {}, onViewAll?: React.MouseEventHandler<HTMLButtonElement> }) => {
    const selectedRowsCount = Object.keys(rowSelection).length;

    return (
        <Flex alignItems={'center'} justifyContent={'between'}>
            <Flex alignItems="center" className="fs--1">
                <p className="mb-0">
                    <span>Page </span>
                    <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </p>
                <p className="mb-0 ms-2">| &nbsp;</p>
                {Boolean(selectedRowsCount) && (
                    <div>
                        {selectedRowsCount} of{' '}
                        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
                    </div>
                )}

                <span>Total: <b>{table.getRowModel().rows.length}</b></span>
            </Flex>
            <Flex>
                {
                    onViewAll &&
                    <Button size="sm" onClick={onViewAll}>
                        <span className="d-none d-sm-inline-block ms-1">View All</span>
                        <FontAwesomeIcon icon={faArrowRightLong} fontSize={15}/>
                    </Button>
                }
                <IconButton size={'sm'} disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}>
                    <FontAwesomeIcon icon={faAnglesLeft} fontSize={15}/>
                </IconButton>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                    <FontAwesomeIcon icon={faAngleLeft} fontSize={15}/>
                </IconButton>
                <Form.Select size="sm" className="w-auto mx-2 border-0" value={table.getState().pagination.pageSize}
                             onChange={e => table.setPageSize(Number(e.target.value))}>
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                    ))}
                </Form.Select>
                <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
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

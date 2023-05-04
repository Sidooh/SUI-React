import { Col, Form, Row } from 'react-bootstrap';
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
import SimpleBarReact from "simplebar-react";

const FormSelect = styled(Form.Select)`
  background-image: none;
  padding-right: .75rem;
`;

export interface FooterProps {
    table: Table<any>,
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

    const goToPage = (e: ChangeEvent<HTMLInputElement>) => {
        let page = Number(e.target.value) - 1

        page = table.getPageCount() > page ? page : table.getPageCount() - 1
        table.setPageIndex(page)
    }

    const hasServerPagination = serverTotal && serverPageCount && currentServerPage && onPreviousServerPage

    return (
        <SimpleBarReact className={'text-nowrap px-3'}>
            <Row className={'align-items-center justify-content-center g-0'}>
                {hasServerPagination ? (
                    <Col className={"d-flex align-items-center fs--1"}>
                        {serverPageCount && currentServerPage && onPreviousServerPage ? (
                            <Tooltip title={'Previous Page'}>
                                <IconButton size={'sm'} disabled={currentServerPage < 2}
                                            onClick={onPreviousServerPage}>
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
                        <span className="mx-2 border-end">&nbsp;</span>
                        <b>{currentServerPage} of {serverPageCount}</b>
                        {onSetServerPageSize && (
                            <>
                                <span className="mx-1 border-end">&nbsp;</span>
                                <FormSelect size="sm" className="w-auto border-0" value={serverPageSize}
                                            onChange={(e: ChangeEvent<HTMLSelectElement>) => onSetServerPageSize(Number(e.target.value))}>
                                    {[50, 100, 200, 500, 1000].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>{pageSize}</option>
                                    ))}
                                </FormSelect>
                            </>
                        )}
                        {onGoToServerPage && serverPageCount > 3 && (
                            <>
                                <span className="mx-1 border-end">&nbsp;</span>
                                <span className="flex items-center gap-1">Go to pg</span>
                                <input type="number" value={serverPage} step="1" min="3" max={serverPageCount}
                                       onChange={e => {
                                           let page = Number(e.target.value)

                                           page = serverPageCount > page ? page : serverPageCount - 1
                                           setServerPage(e.target.value as unknown as number)

                                           if (page > 0) onGoToServerPage(page)
                                       }}
                                       className="form-control form-control-sm w-auto ms-1"/>
                            </>
                        )}
                        {serverTotal && (
                            <>
                                <span className="mx-1 border-end">&nbsp;</span>
                                <span>Total: <b>{serverTotal}</b></span>
                            </>
                        )}
                    </Col>
                ) : ''}
                <Col
                    className={`d-flex align-items-center ${hasServerPagination ? 'justify-content-md-end' : 'justify-content-between'} fs--1`}>
                    <div className={'d-flex align-items-center'}>
                        <span>Total: <b>{table.getCoreRowModel().rows.length.toLocaleString()}</b></span>
                        <span className="mx-1 border-end">&nbsp;</span>
                        {table.getPageCount() > 3 && (
                            <>
                                <span className="flex items-center gap-1">Go to pg</span>
                                <input type="number" value={table.getState().pagination.pageIndex + 1}
                                       onChange={(e) => goToPage(e)}
                                       step="1" min="1" max={table.getPageCount()}
                                       className="form-control form-control-sm w-auto ms-1"/>
                                <span className="mx-1 border-end"> &nbsp;</span>
                            </>
                        )}
                        <b>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</b>
                    </div>
                    <div className={'d-flex align-items-center'}>
                        <span className="mx-1 border-end">&nbsp;</span>
                        <IconButton size={'sm'} disabled={!table.getCanPreviousPage()}
                                    onClick={() => table.setPageIndex(0)}>
                            <FaAngleDoubleLeft/>
                        </IconButton>
                        <IconButton size={'sm'} className={'ms-1'} disabled={!table.getCanPreviousPage()}
                                    onClick={() => table.previousPage()}>
                            <FaAngleLeft/>
                        </IconButton>
                        <FormSelect size="sm" className="w-auto mx-2 border-0" value={table.getState().pagination.pageSize}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => table.setPageSize(Number(e.target.value))}>
                            {[5, 10, 20, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>{pageSize}</option>
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
                    </div>
                </Col>
            </Row>
        </SimpleBarReact>
    );
};

export default Footer;

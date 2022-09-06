import { Button, Col, Dropdown, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import React, { Dispatch, SetStateAction, useState } from 'react';
import pluralize from 'pluralize';
import { Str } from '../../utils';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTableColumns } from '@fortawesome/free-solid-svg-icons';
import Flex from '../Flex/Flex';

interface Header {
    table: Table<any>;
    title: string;
    rowSelection: {};
    filtering: boolean;
    setFiltering: Dispatch<SetStateAction<boolean>>;
    onCreateRow?: () => void;
}

const Header = ({table, rowSelection, filtering, setFiltering, title, onCreateRow}: Header) => {
    const [action, setAction] = useState<string | undefined>(undefined);

    const selectedRowsCount = Object.keys(rowSelection).length;
    const tableTitle = pluralize(title, selectedRowsCount);

    const executeBulkAction = () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.id);

        if (action === 'delete') console.log(ids);
    };

    return (
        <Row className="justify-content-between data-tbl-header">
            <Col>
                <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                    {selectedRowsCount ? `You have selected ${selectedRowsCount} ${tableTitle}` : title}
                </h5>
            </Col>
            <Col sm="auto" className={'text-end'}>
                {selectedRowsCount ? (
                    <Flex>
                        <Form.Select size="sm" aria-label="Bulk actions" onChange={e => setAction(e.target.value)}>
                            <option value={''} hidden>Bulk Actions</option>
                            <option value="refund">Refund</option>
                            <option value="delete">Delete</option>
                        </Form.Select>
                        <Button variant="primary" size="sm" className="ms-2" onClick={() => executeBulkAction()}>
                            Apply
                        </Button>
                    </Flex>
                ) : (
                    <Flex alignItems={'center'}>
                        {onCreateRow && (
                            <Button size="sm" className="me-2" onClick={onCreateRow}>
                                <FontAwesomeIcon icon={faAdd}/> New
                            </Button>
                        )}
                        <OverlayTrigger
                            overlay={<Tooltip>{filtering ? 'Disable' : 'Enable'} Column Filtering</Tooltip>}>
                            <Form.Check type="switch" checked={filtering} onChange={() => setFiltering(!filtering)}/>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Show Columns</Tooltip>}>
                            <Dropdown className={'ms-2'} autoClose={'outside'}>
                                <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                    <FontAwesomeIcon icon={faTableColumns} size={'sm'}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={'px-3'} style={{color: '#5e6e82'}}>
                                    <Form.Check label={`Show All`} id={'toggle-all'}
                                                checked={table.getIsAllColumnsVisible()}
                                                onChange={table.getToggleAllColumnsVisibilityHandler()}
                                                className={'m-0'}/>
                                    <Dropdown.Divider className={'mt-0'}/>
                                    {table.getAllLeafColumns().map(column => (
                                        <Form.Check key={column.id} checked={column.getIsVisible()} id={column.id}
                                                    onChange={column.getToggleVisibilityHandler()}
                                                    label={typeof column.columnDef.header === 'string'
                                                        ? column.columnDef.header
                                                        : Str.headline(column.id)} className={'m-0'}/>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Flex>
                )}
            </Col>
        </Row>
    );
};

export default Header;

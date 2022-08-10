import { Button, Col, Dropdown, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import React, { Dispatch, SetStateAction, useState } from 'react';
import pluralize from 'pluralize';
import { Str } from '../../utils';
import { Table } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns } from '@fortawesome/free-solid-svg-icons';
import Flex from '../Flex/Flex';
import styled from 'styled-components';

interface Header {
    table: Table<any>;
    title: string;
    rowSelection: {};
    filtering: boolean;
    setFiltering: Dispatch<SetStateAction<boolean>>;
    onCreateRow?: () => void;
}

const DataTableHeader = styled(Row)`
  .dropdown-toggle:after {
    display: none;
  }
`;

const Header = ({table, rowSelection, filtering, setFiltering, title, onCreateRow}: Header) => {
    const [action, setAction] = useState<string | undefined>(undefined);

    const selectedRowsCount = Object.keys(rowSelection).length;
    const tableTitle = pluralize(title, selectedRowsCount);

    const executeBulkAction = () => {
        const ids = table.getSelectedRowModel().rows.map(row => row.original.id);

        if (action === 'delete') console.log(ids);
    };

    return (
        <DataTableHeader className="justify-content-between data-tbl-header">
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
                            <Button size="sm" className="me-2" onClick={onCreateRow} variant={'success'}>
                                <span className="d-none d-sm-inline-block ms-1">New</span>
                            </Button>
                        )}
                        <OverlayTrigger overlay={<Tooltip>{filtering ? 'Disable' : 'Enable'} Filtering</Tooltip>}>
                            <Form.Check type="switch" checked={filtering} onChange={() => setFiltering(!filtering)}/>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Show Columns</Tooltip>}>
                            <Dropdown className={'ms-2'} autoClose={'outside'}>
                                <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                    <FontAwesomeIcon icon={faTableColumns} size={'sm'}/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Form.Check label={`Toggle All`} checked={table.getIsAllColumnsVisible()}
                                                    onChange={table.getToggleAllColumnsVisibilityHandler()}/>
                                    </Dropdown.Item>
                                    {table.getAllLeafColumns().map(column => (
                                        <Dropdown.Item key={column.id} as={'button'}>
                                            <Form.Check checked={column.getIsVisible()}
                                                        onChange={column.getToggleVisibilityHandler()}
                                                        label={typeof column.columnDef.header === 'string'
                                                            ? column.columnDef.header
                                                            : Str.headline(column.id)}/>
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                                {/*<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(undefined)}
                                  anchorOrigin={{vertical: 'top', horizontal: 'left',}}
                                  transformOrigin={{vertical: 'top', horizontal: 'left',}}>
                                <MenuItem>
                                    <Checkbox checked={table.getIsAllColumnsVisible()}
                                              onChange={table.getToggleAllColumnsVisibilityHandler()}/>
                                    <ListItemText primary={'Toggle All'}/>
                                </MenuItem>
                                {table.getAllLeafColumns().map(column => (
                                    <MenuItem key={column.id}>
                                        <Checkbox checked={column.getIsVisible()}
                                                  onChange={column.getToggleVisibilityHandler()}/>
                                        <ListItemText primary={typeof column.columnDef.header === 'string'
                                            ? column.columnDef.header
                                            : Str.headline(column.id)}/>
                                    </MenuItem>
                                ))}
                            </Menu>*/}
                            </Dropdown>
                        </OverlayTrigger>
                    </Flex>
                )}
            </Col>
        </DataTableHeader>
    );
};

export default Header;

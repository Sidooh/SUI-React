import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Dispatch, SetStateAction, useState } from 'react';
import pluralize from 'pluralize';
import { Str } from '../../utils';
import { Table } from '@tanstack/react-table';
import Flex from '../Flex/Flex';
import Tooltip from "../Tooltip";
import { HiOutlineViewColumns, MdAddCircle, MdFilterAlt, MdFilterAltOff, TbRefresh } from "react-icons/all";
import IconButton from "../IconButton";

interface Header {
    table: Table<any>;
    title: string;
    rowSelection: {};
    filtering: boolean;
    setFiltering: Dispatch<SetStateAction<boolean>>;
    onCreateRow?: () => void;
    reFetching?: boolean;
    onRefetch?: () => void;
}

const Header = ({
    table,
    rowSelection,
    filtering,
    setFiltering,
    title,
    onCreateRow,
    reFetching = false,
    onRefetch
}: Header) => {
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
                {Boolean(selectedRowsCount) && (
                    <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">
                        {selectedRowsCount === table.getPreFilteredRowModel().rows.length
                         ? `All ${tableTitle} selected`
                         : `${selectedRowsCount} of ${table.getPreFilteredRowModel().rows.length} ${tableTitle} selected`}
                        {/*{selectedRowsCount ? `You have selected ${selectedRowsCount} of ${table.getPreFilteredRowModel().rows.length} ${tableTitle}` : title}*/}
                    </h5>
                )}
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
                             <Tooltip title={'Create new record'}>
                                 <IconButton size="sm" className={'me-2'} onClick={onCreateRow} color={'success'}>
                                     <MdAddCircle/>
                                 </IconButton>
                             </Tooltip>
                         )}
                         {onRefetch && (
                             <Tooltip title={'Refresh'}>
                                 <IconButton size="sm" className={'me-2'} onClick={onRefetch} color={'danger'}
                                             loading={reFetching}>
                                     <TbRefresh/>
                                 </IconButton>
                             </Tooltip>
                         )}
                         <Tooltip title={`${filtering ? 'Disable' : 'Enable'} column filtering`}>
                             <IconButton size={'sm'} className={'me-2'} onClick={() => setFiltering(!filtering)}
                                         color={'warning'}>
                                 {filtering ? <MdFilterAltOff/> : <MdFilterAlt/>}
                             </IconButton>
                         </Tooltip>
                         <Tooltip title={'Filter columns'}>
                             <Dropdown autoClose={'outside'}>
                                 <Dropdown.Toggle size={'sm'} as={'a'} className={'cursor-pointer'}>
                                     <IconButton size={'sm'} color={'secondary'}><HiOutlineViewColumns/></IconButton>
                                 </Dropdown.Toggle>
                                 <Dropdown.Menu className={'px-3'} style={{ color: '#5e6e82' }}>
                                     <Form.Check label={`Show All`} id={'toggle-all'} className={'m-0'}
                                                 checked={table.getIsAllColumnsVisible()}
                                                 onChange={table.getToggleAllColumnsVisibilityHandler()}/>
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
                         </Tooltip>
                     </Flex>
                 )}
            </Col>
        </Row>
    );
};

export default Header;

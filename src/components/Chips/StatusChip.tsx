import React from 'react';
import { Status } from '../../utils';
import Badge from '../Badge/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarXmark,
    faCheck,
    faCircleExclamation,
    faCircleInfo,
    faHourglassStart
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from "react-bootstrap";

const statusProps = (status: Status) => {
    let color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' = 'dark', icon;

    if ([Status.COMPLETED, Status.ACTIVE, Status.PAID].includes(status)) {
        color = 'success';
        icon = <FontAwesomeIcon icon={faCheck}/>;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = <FontAwesomeIcon icon={faHourglassStart}/>;
    } else if (status === Status.REFUNDED) {
        color = 'info';
        icon = <FontAwesomeIcon icon={faCircleInfo}/>;
    } else if ([Status.FAILED, Status.INACTIVE].includes(status)) {
        color = 'danger';
        icon = <FontAwesomeIcon icon={faCircleExclamation}/>;
    } else if ([Status.EXPIRED].includes(status)) {
        color = 'secondary';
        icon = <FontAwesomeIcon icon={faCalendarXmark}/>;
    }

    return {color, icon};
};

type StatusChipType = {
    status?: Status
    bg?: boolean
    soft?: boolean
    className?: string
    statuses?: Status[],
    onStatusChange?: (status: Status) => void
}

const StatusChip = ({status, className, soft = true, statuses = [], onStatusChange}: StatusChipType) => {
    if (!status) status = Status.FAILED;

    const {color, icon} = statusProps(status);

    const badge = <Badge soft={soft} bg={color} className={`fs-8 ${className}`} children={<span>{status}</span>}
                         icon={icon} pill/>

    if (!statuses.length) return badge

    statuses = statuses?.filter(s => s !== status)

    return (
        <Dropdown as={'span'} className={'cursor-pointer'}>
            <Dropdown.Toggle size={'sm'} as={'span'}>{badge}</Dropdown.Toggle>
            <Dropdown.Menu>
                {statuses.map((s, i) => {
                    const {color, icon} = statusProps(s);

                    return <Dropdown.Item key={`status-${i}`} className={`text-${color}`}
                                          onClick={() => onStatusChange ? onStatusChange(s) : ""}>{icon} {s}</Dropdown.Item>
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default StatusChip;

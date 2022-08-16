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

const statusProps = (status: Status) => {
    let color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' = 'dark', icon;

    if ([Status.COMPLETED, Status.ACTIVE, Status.PAID].includes(status)) {
        color = 'success';
        icon = <FontAwesomeIcon icon={faCheck}/>;
    } else if (status === Status.PENDING) {
        color = 'warning';
        icon = <FontAwesomeIcon icon={faHourglassStart}/>;
    } else if (status === Status.REFUNDED) {
        color = 'secondary';
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
}

const StatusChip = ({status, className, soft = true}: StatusChipType) => {
    if (!status) status = Status.FAILED;

    const {color, icon} = statusProps(status);

    return <Badge soft={soft} bg={color} className={`fs-8 ${className}`} children={<span>{status}</span>} icon={icon}
                  pill/>;
};

export default StatusChip;

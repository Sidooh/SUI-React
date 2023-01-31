import React from 'react';
import { getRelativeDateAndTime } from "../../utils";

const TableDate = ({ date, dateOverTime }: { date: string, dateOverTime?: boolean }) => {
    if (!date) return <>N/A</>;

    const { date: relativeDate, time } = getRelativeDateAndTime(date)

    return (
        <>
            <strong>{dateOverTime ? relativeDate : time}</strong><br/>
            <small>{dateOverTime ? time : relativeDate}</small>
        </>
    );
};

export default TableDate;

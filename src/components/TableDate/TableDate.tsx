import React from 'react';
import moment from 'moment';

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

const TableDate = ({date, dateOverTime}: { date: string, dateOverTime?: boolean }) => {
    if (!date) return <>N/A</>;

    let relativeDate;
    if (moment(date).isSame(TODAY, "d")) {
        relativeDate = "Today";
    } else if (moment(date).isSame(YESTERDAY, "d")) {
        relativeDate = "Yesterday";
    } else {
        relativeDate = moment(date).format("D.M.y");
    }

    return (
        <>
            <strong>{dateOverTime ? relativeDate : moment(date).format("hh:mm A")}</strong><br/>
            <small>{dateOverTime ? moment(date).format("hh:mm A") : relativeDate}</small>
        </>
    );
};

export default TableDate;

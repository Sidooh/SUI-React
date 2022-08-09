import React from 'react';
import moment from 'moment';

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

const TableDate = ({date}: { date: string }) => {
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
            <strong>{moment(date).format("hh:mm A")}</strong><br/>
            <small>{relativeDate}</small>
        </>
    );
};

export default TableDate;

import React from 'react';
import { getTelcoColor, getTelcoFromPhone } from '../../utils';

export interface PhoneChipType {
    phone?: string | number;
    className?: string;
}

const PhoneChip = ({phone, className}: PhoneChipType) => {
    if (!phone) return <></>;

    const telco = getTelcoFromPhone(phone);
    let color = getTelcoColor(telco),
        phoneNumber = phone ?? 'N/A';

    return (
        <span className={`fw-bolder ${className}`} style={{color}}>
            {String(phoneNumber).replace('+', '')}
        </span>
    );
};

export default PhoneChip;

import withReactContent from 'sweetalert2-react-content';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { Frequency, Period, Status, Telco } from './enums';
import pluralize from 'pluralize';
import moment from "moment/moment";

export const Str = {
    headline: (str: string) => {
        if (!str) return "";

        str = str.replaceAll('_', ' ').replaceAll('-', ' ');

        return str.replaceAll(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase());
    },
    ucFirst: (str: string) => {
        str = str.toLowerCase();

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

export const getRelativeDateAndTime = (date: string | Date) => {
    let relativeDate: string, time = moment(date).format("hh:mm A");

    if (moment(date).isSame(TODAY, "d")) {
        relativeDate = "Today";
    } else if (moment(date).isSame(YESTERDAY, "d")) {
        relativeDate = "Yesterday";
    } else {
        relativeDate = moment(date).format("D.M.y");
    }

    const toString = () => `${relativeDate} @${time}`

    return { date: relativeDate, time, toString }
}

export const getTelcoFromPhone = (phone: string | number) => {
    phone = String(phone);

    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return Telco.SAFARICOM;
    } else if (phone.match(airtelRegEx)) {
        return Telco.AIRTEL;
    } else if (phone.match(telkomRegEx)) {
        return Telco.TELKOM;
    } else if (phone.match(equitelRegEx)) {
        return Telco.EQUITEL;
    } else if (phone.match(faibaRegEx)) {
        return Telco.FAIBA;
    } else {
        return null;
    }
};

export const getItemFromStore = (key: string, defaultValue?: string | boolean, store = localStorage) => {
    try {
        return JSON.parse(String(store.getItem(key))) || defaultValue;
    } catch {
        return store.getItem(key) || defaultValue;
    }
};
export const setItemToStore = (key: string, payload: string, store = localStorage) => store.setItem(key, payload);

export const JWT = {
    decode: (token?: string) => {
        if (!token) return null;

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
};

export const capitalize = (str: string) => (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, ' ');

export const Sweet = withReactContent(Swal);

export const toast = async (data: SweetAlertOptions) => {
    const options = {
        ...data,
        icon: data.icon ?? 'success',
        timer: (data.timer ?? 7) * 1000, // 7 secs,
        position: data.position ?? 'bottom-right',
        toast: data.toast ?? true,
        title: data.title,
        showConfirmButton: data.showConfirmButton ?? false,
    };

    await Sweet.fire(options);
};

export const currencyFormat = (number?: number, currency = 'KES') => number && (new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 4
})).format(number);

export const colors = [
    '#2c7be5',
    '#00d97e',
    '#e63757',
    '#39afd1',
    '#fd7e14',
    '#02a8b5',
    '#727cf5',
    '#6b5eae',
    '#ff679b',
    '#f6c343'
];

export const hexToRgb = (hexValue: string) => {
    let hex;
    hexValue.indexOf('#') === 0
        ? (hex = hexValue.substring(1))
        : (hex = hexValue);
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b)
    );
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ]
        : null;
};

export const rgbaColor = (color = colors[0], alpha = 0.5) =>
    `rgba(${hexToRgb(color)},${alpha})`;

export const getColor = function getColor(name: string) {
    let dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--sidooh-".concat(name)).trim();
};

const vendor = ((navigator && navigator.vendor) || '').toLowerCase();
const userAgent = ((navigator && navigator.userAgent) || '').toLowerCase();

// build a 'comparator' object for various comparison checks
let comparator = {
    '<': (a: any, b: string) => a < b,
    '<=': (a: any, b: string) => a <= b,
    '>': (a: any, b: string) => a > b,
    '>=': (a: any, b: string) => a >= b
};

// helper function which compares a version to a range
function compareVersion(version: any, range?: string) {
    let string: string = (range + '');
    let n = +(string.match(/\d+/) || NaN);
    let op: string = string.match(/^[<>]=?|/) ? string.match(/^[<>]=?|/)![0] : "";

    // @ts-ignore
    return comparator[op] ? comparator[op](version, n) : (version === n);
}

export const is = {
    windows: () => {
        return navigator.userAgent.indexOf("Win") !== -1;
    },
    chrome: (range?: string): boolean => {
        let match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\/(\d+)/) : null;
        return match !== null && !is.opera() && compareVersion(match[1], range);
    },
    opera: (range?: string): boolean => {
        let match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    },
    firefox: (range?: string): boolean => {
        let match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
        return match !== null && compareVersion(match[1], range);
    }
};

export const toPlural = (word: string, count?: number, inclusive?: boolean) => pluralize(word, count, inclusive)

export const chartSelectOptions = {
    [Period.TODAY]: [Frequency.HOURLY],
    [Period.LAST_SEVEN_DAYS]: [Frequency.DAILY],
    [Period.LAST_THIRTY_DAYS]: [Frequency.DAILY, Frequency.WEEKLY],
    [Period.LAST_THREE_MONTHS]: [Frequency.WEEKLY, Frequency.MONTHLY],
    [Period.LAST_SIX_MONTHS]: [Frequency.MONTHLY],
    [Period.YTD]: [Frequency.MONTHLY, Frequency.QUARTERLY]
}

export const getStatusColor = (status: Status) => {
    let color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark' = 'dark';

    if ([Status.COMPLETED, Status.ACTIVE, Status.PAID].includes(status)) {
        color = 'success';
    } else if (status === Status.PENDING) {
        color = 'warning';
    } else if (status === Status.REFUNDED) {
        color = 'info';
    } else if ([Status.FAILED, Status.INACTIVE].includes(status)) {
        color = 'danger';
    } else if ([Status.EXPIRED].includes(status)) {
        color = 'secondary';
    }

    return color;
}

export const groupBy = (array: any[], property: string, asArray = false) => {
    let hash: any = {}, props = property.split('.');

    for (let i = 0; i < array.length; i++) {
        let key = props.reduce((acc, prop) => acc && acc[prop], array[i]);

        if (!hash[key]) hash[key] = [];

        hash[key].push(array[i]);
    }

    if(asArray) return Object.values(hash);

    return hash;
}
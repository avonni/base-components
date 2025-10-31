import { HOUR, DATE, MONTH, YEAR } from './constants';

function getStartOfWeek(date) {
    const day = date.getDay();
    const timestamp = new Date(date).setDate(date.getDate() - day);
    return new Date(timestamp);
}

function pad(value, length) {
    return (typeof value === 'number' && !isNaN(value)) || value
        ? value.toString().padStart(length, '0')
        : '';
}

function setDate(date, unit, ...value) {
    switch (unit) {
        case HOUR:
            return new Date(new Date(date).setHours(...value));
        case DATE:
            return new Date(new Date(date).setDate(...value));
        case MONTH:
            return new Date(new Date(date).setMonth(...value));
        case YEAR:
            return new Date(new Date(date).setFullYear(...value));
        default:
            return new Date(date);
    }
}

export { getStartOfWeek, pad, setDate };

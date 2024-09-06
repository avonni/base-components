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

export { getStartOfWeek, pad };

function pad(value, length) {
    return (typeof value === 'number' && !isNaN(value)) || value
        ? value.toString().padStart(length, '0')
        : '';
}

export { pad };

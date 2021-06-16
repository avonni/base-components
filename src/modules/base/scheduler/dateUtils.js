const FORMATS = [
    {
        pattern: /<ss>/g,
        rule: { second: '2-digit' }
    },
    {
        pattern: /<s>/g,
        rule: { second: 'numeric' }
    },
    {
        pattern: /<mm>/g,
        rule: { minute: '2-digit' }
    },
    {
        pattern: /<m>/g,
        rule: { minute: 'numeric' }
    },
    {
        pattern: /<HH>/g,
        rule: { hour: '2-digit' }
    },
    {
        pattern: /<H>/g,
        rule: { hour: 'numeric' }
    },
    {
        pattern: /<dddd>/g,
        rule: { weekday: 'long' }
    },
    {
        pattern: /<ddd>/g,
        rule: { weekday: 'short' }
    },
    {
        pattern: /<d>/g,
        rule: { weekday: 'narrow' }
    },
    {
        pattern: /<DD>/g,
        rule: { day: '2-digit' }
    },
    {
        pattern: /<D>/g,
        rule: { day: 'numeric' }
    },
    {
        pattern: /<MMMM>/g,
        rule: { month: 'long' }
    },
    {
        pattern: /<MMM>/g,
        rule: { month: 'short' }
    },
    {
        pattern: /<MM>/g,
        rule: { month: '2-digit' }
    },
    {
        pattern: /<M>/g,
        rule: { month: 'numeric' }
    },
    {
        pattern: /<YYYY>/g,
        rule: { year: 'numeric' }
    },
    {
        pattern: /<YY>/g,
        rule: { year: '2-digit' }
    }
];

/**
 * Converts the argument into a Date object.
 * @returns {object} Date object or false
 */
const dateObjectFrom = (date) => {
    if (date instanceof Date) return date;
    if (!isNaN(new Date(date).getTime())) return new Date(date);
    return false;
};

/**
 * Takes a timestamp and a string containing formatting rules.
 * @returns {string} Formatted string
 */
const formatTime = (time, stringToFormat) => {
    const date = new Date(time);
    let result = stringToFormat;

    FORMATS.forEach((format) => {
        const formattedDate = date.toLocaleString('default', format.rule);
        result = result.replaceAll(format.pattern, formattedDate);
    });

    return result;
};

export { formatTime, dateObjectFrom };

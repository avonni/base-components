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
 * @param time - Timestamp used as a reference by the formatter
 * @param {string} stringToFormat - String containing the formatting pattern
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

/**
 * Checks if a time is included in a time frame.
 * @param timestamp - Timestamp
 * @param {string} timeFrame - The time frame of reference, in the format '00:00-00:00'
 * @returns {boolean} true or false
 */
const isInTimeFrame = (timestamp, timeFrame) => {
    // Returns the times in the format 00:00
    const time = new Date(timestamp).toLocaleTimeString('en-GB').slice(0, 5);
    const startTime = timeFrame.match(/^([0-9]{2}:[0-9]{2})/);
    const endTime = timeFrame.match(/-([0-9]{2}:[0-9]{2})/);

    if (!startTime || !endTime) return false;
    if (time >= startTime[1] && time <= endTime[1]) return true;
    return false;
};

export { formatTime, dateObjectFrom, isInTimeFrame };

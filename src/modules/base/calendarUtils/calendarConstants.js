const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DEFAULT_DATE = new Date(new Date().setHours(0, 0, 0, 0));
const DEFAULT_MAX = new Date(2099, 11, 31);
const DEFAULT_MIN = new Date(1900, 0, 1);

const DEFAULT_WEEK_START_DAY = 0;

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const NULL_DATE = new Date('12/31/1969').setHours(0, 0, 0, 0);

const SELECTION_MODES = {
    valid: ['single', 'multiple', 'interval'],
    default: 'single'
};

export {
    DAYS,
    DEFAULT_MAX,
    DEFAULT_MIN,
    DEFAULT_DATE,
    DEFAULT_WEEK_START_DAY,
    MONTHS,
    NULL_DATE,
    SELECTION_MODES
};

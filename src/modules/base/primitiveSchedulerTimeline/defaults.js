const DEFAULT_START_DATE = new Date();
const HEADERS = {
    valid: [
        'minuteAndHour',
        'minuteHourAndDay',
        'hourAndDay',
        'hourDayAndWeek',
        'dayAndWeek',
        'dayAndMonth',
        'dayLetterAndWeek',
        'dayWeekAndMonth',
        'weekAndMonth',
        'weekMonthAndYear',
        'monthAndYear',
        'quartersAndYear',
        'fiveYears'
    ],
    default: 'hourAndDay'
};
const UNITS = ['minute', 'hour', 'day', 'week', 'month', 'year'];
const ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export { DEFAULT_START_DATE, HEADERS, UNITS, ORIENTATIONS };

const EVENTS_THEMES = {
    valid: ['default', 'transparent', 'line', 'hollow', 'rounded'],
    default: 'default'
};

const EVENTS_PALETTES = {
    valid: [
        'aurora',
        'bluegrass',
        'dusk',
        'fire',
        'heat',
        'lake',
        'mineral',
        'nightfall',
        'ocean',
        'pond',
        'sunrise',
        'water',
        'watermelon',
        'wildflowers'
    ],
    default: 'aurora'
};

const THEMES = {
    valid: ['default', 'inverse'],
    default: 'default'
};

const DEFAULT_AVAILABLE_TIME_FRAMES = ['00:00-00:00'];
const DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK = [0, 1, 2, 3, 4, 5, 6];
const DEFAULT_AVAILABLE_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const DEFAULT_END_DATE = new Date(2099, 11, 31);
const DEFAULT_START_DATE = new Date(1900, 0, 1);
const DEFAULT_VISIBLE_SPAN = {
    unit: 'hour',
    span: 12
};

const PALETTES = {
    aurora: ['#3296ed', '#77b9f2', '#9d53f2', '#c398f5', '#26aba4', '#4ed4cd'],
    bluegrass: [
        '#c7f296',
        '#94e7a8',
        '#51d2bb',
        '#27aab0',
        '#116985',
        '#053661'
    ],
    dusk: ['#98c9f5', '#bac6a4', '#e0bc3d', '#d49b08', '#966002', '#613102'],
    fire: ['#f5de98', '#f5c066', '#f59527', '#d56613', '#952f13', '#610514'],
    heat: ['#c7f296', '#d8e167', '#e3c52c', '#d19214', '#934214', '#610514'],
    lake: ['#98c9f5', '#72c9bd', '#44c972', '#38ab3d', '#4d6719', '#613102'],
    mineral: ['#529ee0', '#d9a6c2', '#08916d', '#f59b00', '#006699', '#f0e442'],
    nightfall: [
        '#faca9b',
        '#ce86bc',
        '#9232e0',
        '#5d19d4',
        '#2a2396',
        '#053661'
    ],
    ocean: ['#96f2a9', '#64cfc6', '#289ee3', '#1c6bd0', '#40308a', '#61054f'],
    pond: ['#c398f5', '#8593f5', '#358aef', '#0c7fc5', '#0a6e67', '#0a611b'],
    sunrise: ['#f5de98', '#f5c062', '#f59623', '#ce6716', '#762f3d', '#300561'],
    water: ['#96F2EE', '#68CEEE', '#2D9CED', '#0E6ECE', '#073E92', '#051C61'],
    watermelon: [
        '#f598a7',
        '#f56580',
        '#f4284e',
        '#c11c2f',
        '#5c3f22',
        '#0a611b'
    ],
    wildflowers: [
        '#00a1e0',
        '#16325c',
        '#76ded9',
        '#08a69e',
        '#e2ce7d',
        '#e69f00'
    ]
};

const UNITS_IN_MINUTES = {
    minute: 1,
    hour: 60,
    day: 1440,
    week: 10080,
    // month: 43800,
    year: 525600
};

export {
    EVENTS_THEMES,
    EVENTS_PALETTES,
    THEMES,
    DEFAULT_START_DATE,
    DEFAULT_END_DATE,
    DEFAULT_VISIBLE_SPAN,
    PALETTES,
    UNITS_IN_MINUTES,
    DEFAULT_AVAILABLE_DAYS_OF_THE_WEEK,
    DEFAULT_AVAILABLE_TIME_FRAMES,
    DEFAULT_AVAILABLE_MONTHS
};

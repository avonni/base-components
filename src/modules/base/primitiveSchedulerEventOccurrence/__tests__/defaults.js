const CELL_WIDTH = 50;
const CELL_HEIGHT = 30;
const CELL_DURATION = 3599999;
const DAY_HEADER_CELLS = [
    {
        start: new Date(2021, 7, 30).getTime(),
        end: new Date(2021, 7, 31).getTime() - 1
    },
    {
        start: new Date(2021, 7, 31).getTime(),
        end: new Date(2021, 7, 1).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1).getTime(),
        end: new Date(2021, 8, 2).getTime() - 1
    },
    {
        start: new Date(2021, 8, 2).getTime(),
        end: new Date(2021, 8, 3).getTime() - 1
    },
    {
        start: new Date(2021, 8, 3).getTime(),
        end: new Date(2021, 8, 4).getTime() - 1
    },
    {
        start: new Date(2021, 8, 4).getTime(),
        end: new Date(2021, 8, 5).getTime() - 1
    },
    {
        start: new Date(2021, 8, 5).getTime(),
        end: new Date(2021, 8, 6).getTime() - 1
    }
];
const ELEMENT_WIDTH = 30;
const ELEMENT_HEIGHT = 20;
const HOUR_HEADER_CELLS = [
    {
        start: new Date(2021, 7, 31, 6).getTime(),
        end: new Date(2021, 7, 31, 7).getTime() - 1
    },
    {
        start: new Date(2021, 7, 31, 7).getTime(),
        end: new Date(2021, 7, 31, 8).getTime() - 1
    },
    {
        start: new Date(2021, 7, 31, 8).getTime(),
        end: new Date(2021, 7, 31, 9).getTime() - 1
    },
    {
        start: new Date(2021, 7, 31, 9).getTime(),
        end: new Date(2021, 7, 31, 10).getTime() - 1
    },
    {
        start: new Date(2021, 7, 31, 10).getTime(),
        end: new Date(2021, 7, 31, 11).getTime() - 1
    }
];
const FROM = new Date(2021, 7, 31, 8);
const OFFSET_SIDE = 5;
const TO = new Date(2021, 7, 31, 10);
const RESOURCE_KEY = '3';
const RESOURCES = [
    {
        name: '1',
        height: 30,
        color: 'rgb(0, 0, 0)',
        data: {
            customField: 'Some useless string',
            overwrittenField: 'Another useless string',
            height: 30,
            name: '1',
            color: 'rgb(0, 0, 0)'
        }
    },
    {
        name: '3',
        height: 50,
        color: 'rgb(51, 51, 51)',
        data: {
            customField: 'Row field',
            overwrittenField: 'This will not show',
            height: 50,
            name: '3',
            color: 'rgb(51, 51, 51)'
        }
    }
];

export {
    CELL_DURATION,
    CELL_HEIGHT,
    CELL_WIDTH,
    ELEMENT_HEIGHT,
    ELEMENT_WIDTH,
    DAY_HEADER_CELLS,
    FROM,
    HOUR_HEADER_CELLS,
    OFFSET_SIDE,
    RESOURCE_KEY,
    RESOURCES,
    TO
};

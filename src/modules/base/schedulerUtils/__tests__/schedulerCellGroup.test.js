import { SchedulerCellGroup } from '../cellGroup';

const REFERENCE_CELLS = [
    {
        start: new Date(2021, 8, 1, 11).getTime(),
        end: new Date(2021, 8, 1, 11).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 12).getTime(),
        end: new Date(2021, 8, 1, 12).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 13).getTime(),
        end: new Date(2021, 8, 1, 13).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 14).getTime(),
        end: new Date(2021, 8, 1, 14).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 15).getTime(),
        end: new Date(2021, 8, 1, 15).getTime() - 1
    },
    {
        start: new Date(2021, 8, 1, 16).getTime(),
        end: new Date(2021, 8, 1, 16).getTime() - 1
    }
];

const EVENTS = [
    {
        from: new Date(2021, 8, 1, 11).getTime(),
        to: new Date(2021, 8, 1, 12, 30).getTime(),
        key: 'event-1'
    },
    {
        from: new Date(2021, 8, 1, 13, 12).getTime(),
        to: new Date(2021, 8, 1, 15, 30).getTime(),
        key: 'event-2'
    }
];

describe('SchedulerCellGroup class', () => {
    it('Scheduler resource: Default attributes', () => {
        const element = new SchedulerCellGroup({});

        expect(element.cells).toMatchObject([]);
        expect(element.events).toMatchObject([]);
        expect(element.referenceCells).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

    // cells
    // Depends on referenceCells
    it('Scheduler resource: cells', () => {
        const element = new SchedulerCellGroup({
            referenceCells: REFERENCE_CELLS
        });
        expect(element.cells).toHaveLength(REFERENCE_CELLS.length);
        element.cells.forEach((column, index) => {
            expect(column.start).toBe(REFERENCE_CELLS[index].start);
            expect(column.end).toBe(REFERENCE_CELLS[index].end);
        });
    });

    // events
    // Depends on referenceCells
    it('Scheduler resource: events', () => {
        const element = new SchedulerCellGroup({
            referenceCells: REFERENCE_CELLS,
            events: EVENTS
        });

        const cells = element.cells;
        EVENTS.forEach((event) => {
            cells.forEach((column) => {
                if (column.end >= event.from && column.start < event.to) {
                    expect(column.events).toContain(event);
                } else {
                    expect(column.events).not.toContain(event);
                }
            });
        });
    });

    // removeEvent()
    // Depends on referenceCells and events
    it('Scheduler resource: removeEvent method', () => {
        const element = new SchedulerCellGroup({
            referenceCells: REFERENCE_CELLS,
            events: EVENTS
        });

        const eventToRemove = EVENTS[0];
        element.removeEvent(eventToRemove);

        element.cells.forEach((column) => {
            expect(column.events).not.toContain(eventToRemove);
        });
    });

    // getCellFromStart()
    // Depends on referenceCells
    it('Scheduler resource: getCellFromStart method', () => {
        const element = new SchedulerCellGroup({
            referenceCells: REFERENCE_CELLS
        });

        const start = element.getCellFromStart(REFERENCE_CELLS[0].start);
        expect(start).toBe(element.cells[0]);
    });
});

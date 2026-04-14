import { createElement } from 'lwc';
import PrimitiveSchedulerEvent from '../primitiveSchedulerEvent';
import { dateTimeObjectFrom } from 'c/luxonDateTimeUtils';

let element;
describe('Primitive Scheduler Event', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-scheduler-event', {
            is: PrimitiveSchedulerEvent
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.cellDuration).toEqual(0);
            expect(element.cellHeight).toEqual(0);
            expect(element.cellWidth).toEqual(0);
            expect(element.color).toBeUndefined();
            expect(element.headerCells).toEqual([]);
            expect(element.timezone).toBeUndefined();
            expect(element.to).toBeUndefined();
            expect(element.x).toEqual(0);
            expect(element.y).toEqual(0);
        });

        describe('cellDuration', () => {
            it('Set cellDuration', () => {
                element.cellDuration = 30;
                return Promise.resolve().then(() => {
                    expect(element.cellDuration).toEqual(30);
                });
            });

            it('Defaults back to 0 when setting a negative value', () => {
                element.cellDuration = -30;
                return Promise.resolve().then(() => {
                    expect(element.cellDuration).toEqual(0);
                });
            });

            it('Defaults back to 0 when setting an invalid value', () => {
                element.cellDuration = 'invalid';
                return Promise.resolve().then(() => {
                    expect(element.cellDuration).toEqual(0);
                });
            });
        });

        describe('cellHeight', () => {
            it('Set cellHeight', () => {
                element.cellHeight = 20;
                return Promise.resolve().then(() => {
                    expect(element.cellHeight).toEqual(20);
                });
            });

            it('Defaults back to 0 when setting a negative value', () => {
                element.cellHeight = -20;
                return Promise.resolve().then(() => {
                    expect(element.cellHeight).toEqual(0);
                });
            });

            it('Defaults back to 0 when setting an invalid value', () => {
                element.cellHeight = 'invalid';
                return Promise.resolve().then(() => {
                    expect(element.cellHeight).toEqual(0);
                });
            });
        });

        describe('cellWidth', () => {
            it('Set cellWidth', () => {
                element.cellWidth = 10;
                return Promise.resolve().then(() => {
                    expect(element.cellWidth).toEqual(10);
                });
            });

            it('Defaults back to 0 when setting a negative value', () => {
                element.cellWidth = -10;
                return Promise.resolve().then(() => {
                    expect(element.cellWidth).toEqual(0);
                });
            });

            it('Defaults back to 0 when setting an invalid value', () => {
                element.cellWidth = 'invalid';
                return Promise.resolve().then(() => {
                    expect(element.cellWidth).toEqual(0);
                });
            });
        });

        it('Set color', () => {
            element.color = 'rgb(255, 0, 0)';
            return Promise.resolve().then(() => {
                expect(element.color).toEqual('rgb(255, 0, 0)');
            });
        });

        it('Set from', () => {
            const from = new Date('2024-01-01T10:00:00');
            element.from = from;
            return Promise.resolve().then(() => {
                expect(element.from).toEqual(dateTimeObjectFrom(from));
            });
        });

        it('Set headerCells', () => {
            const headerCells = '{"xAxis":["Header 1", "Header 2"]}';
            element.headerCells = headerCells;
            return Promise.resolve().then(() => {
                expect(element.headerCells).toEqual(JSON.parse(headerCells));
            });
        });

        it('Set to', () => {
            const to = new Date('2024-01-01T11:00:00');
            element.to = to;
            return Promise.resolve().then(() => {
                expect(element.to).toEqual(dateTimeObjectFrom(to));
            });
        });

        it('Set timezone', () => {
            element.timezone = 'America/New_York';
            return Promise.resolve().then(() => {
                expect(element.timezone).toEqual('America/New_York');
            });
        });

        describe('x', () => {
            it('Set x', () => {
                element.x = 50;
                return Promise.resolve().then(() => {
                    expect(element.x).toEqual(50);
                });
            });

            it('Set x from string', () => {
                element.x = '50';
                return Promise.resolve().then(() => {
                    expect(element.x).toEqual(50);
                });
            });
        });

        describe('y', () => {
            it('Set y', () => {
                element.y = 50;
                return Promise.resolve().then(() => {
                    expect(element.y).toEqual(50);
                });
            });

            it('Set y from string', () => {
                element.y = '50';
                return Promise.resolve().then(() => {
                    expect(element.y).toEqual(50);
                });
            });
        });
    });
});

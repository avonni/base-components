import { createElement } from 'lwc';
import Calendar from 'c/calendar';

describe('Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-calendar', {
            is: Calendar
        });

        expect(element.value).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.disabledDates).toMatchObject([]);
        expect(element.markedDates).toMatchObject([]);
        expect(element.max).toMatchObject(new Date(2099, 11, 31));
        expect(element.min).toMatchObject(new Date(1900, 0, 1));
        expect(element.weekNumber).toBeFalsy();
        expect(element.multiValue).toBeUndefined();
    });
});

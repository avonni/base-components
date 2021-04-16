import { createElement } from 'lwc';
import Calendar from 'c/calendar';

describe('Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Calendar default attributes', () => {
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

    /* ----- ATTRIBUTES ----- */

    // values
    it('Calendar values', () => {
        const element = createElement('base-calendar', {
            is: Calendar
        });
        document.body.appendChild(element);

        element.value = '04/15/2021';
        return Promise.resolve().then(() => {
            const day = element.shadowRoot.querySelector('.slds-is-selected');
            expect(day.textContent).toBe('15');
            const month = element.shadowRoot.querySelector(
                "h2[class='slds-align-middle']"
            );
            expect(month.textContent).toBe('April');
            const year = element.shadowRoot.querySelector('lightning-combobox');
            expect(year.value).toBe(2021);
        });
    });

    // disabled
    it('Calendar disabled', () => {
        const element = createElement('base-calendar', {
            is: Calendar
        });
        document.body.appendChild(element);

        element.value = '04/15/2021';
        element.disabled = true;
        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
            const combobox = element.shadowRoot.querySelector(
                'lightning-combobox'
            );
            expect(combobox.disabled).toBeTruthy();
            const tds = element.shadowRoot.querySelectorAll('td > span');
            tds.forEach((td) => {
                expect(td.className).toBe('avonni-disabled-cell');
            });
        });
    });

    // disabled dates
    it('Calendar disabled dates', () => {
        const element = createElement('base-calendar', {
            is: Calendar
        });
        document.body.appendChild(element);

        element.value = '05/09/2021';
        element.disabledDates = [5, 10, 15, 20, 25];
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');

        return Promise.resolve().then(() => {
            const dates = [];
            const disabledDates = element.shadowRoot.querySelectorAll(
                '.avonni-disabled-cell'
            );
            disabledDates.forEach((date) => {
                dates.push(date.textContent);
            });
            expect(dates.includes('5')).toBeTruthy();
            expect(dates.includes('10')).toBeTruthy();
            expect(dates.includes('15')).toBeTruthy();
            expect(dates.includes('20')).toBeTruthy();
            expect(dates.includes('25')).toBeTruthy();
        });
    });
});

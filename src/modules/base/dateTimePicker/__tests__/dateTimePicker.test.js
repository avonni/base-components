import { createElement } from 'lwc';
import DateTimePicker from 'c/dateTimePicker';

describe('DateTimePicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.hideLabel).toBeFalsy();
        expect(element.variant).toBe('daily');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toBeUndefined();
        expect(element.startTime).toBe(46800000);
        expect(element.endTime).toBe(82800000);
        expect(element.timeSlotDuration).toBe(1800000);
        expect(element.timeFormatHour).toBeUndefined();
        expect(element.timeFormatHour12).toBeUndefined();
        expect(element.timeFormatMinute).toBeUndefined();
        expect(element.timeFormatSecond).toBeUndefined();
        expect(element.dateFormatDay).toBe('numeric');
        expect(element.dateFormatMonth).toBe('long');
        expect(element.dateFormatWeekday).toBe('short');
        expect(element.dateFormatYear).toBeUndefined();
        expect(element.showEndTime).toBeUndefined();
        expect(element.showDisabledDates).toBeUndefined();
        expect(element.max).toMatchObject(
            new Date(new Date(2099, 11, 31).setHours(0, 0, 0, 0))
        );
        expect(element.min).toMatchObject(
            new Date(new Date(1900, 0, 1).setHours(0, 0, 0, 0))
        );
        expect(element.type).toBe('radio');
        expect(element.showTimeZone).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.hideDatePicker).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */
    // variant
    // it('Date time picker variant default', () => {
    //     const element = createElement('base-date-time-picker', {
    //         is: DateTimePicker
    //     });
    //     document.body.appendChild(element);

    //     element.title = 'DateTimePicker Title';

    //     return Promise.resolve().then(() => {
    //         const div = element.shadowRoot.querySelector('.doc');
    //         expect(div.className).toContain('blockquote-default');
    //     });
    // });
});

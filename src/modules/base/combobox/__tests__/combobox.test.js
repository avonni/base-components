import { createElement } from 'lwc';
import Combobox from 'c/combobox';

describe('Combobox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-combobox', {
            is: Combobox
        });

        expect(element.actions).toMatchObject([]);
    });

    // /* ----- ATTRIBUTES ----- */

    // // actions
    // it('actions', () => {
    //     const element = createElement('base-combobox', {
    //         is: Chip
    //     });
    //     document.body.appendChild(element);

    //     element.actions = [];

    //     return Promise.resolve().then(() => {

    //     });
    // });
});

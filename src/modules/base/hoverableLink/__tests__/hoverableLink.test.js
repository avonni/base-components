import { createElement } from 'lwc';
import HoverableLink from 'c/hoverableLink';

describe('HoverableLink', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-hoverable-link', {
            is: HoverableLink
        });

        expect(element.label).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    // it('label', () => {
    //     const element = createElement('base-hoverable-link', {
    //         is: HoverableLink
    //     });

    //     document.body.appendChild(element);

    //     element.label = 'A string label';

    //     return Promise.resolve().then(() => {
    //     });
    // });
});

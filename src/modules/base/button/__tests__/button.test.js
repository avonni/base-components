import { createElement } from 'lwc';
import Button from 'c/button';

let element;
describe('Button', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button', {
            is: Button
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.stretch).toBeFalsy();
        });

        it('stretch', () => {
            element.stretch = true;
            expect(element.stretch).toBeTruthy();
        });
    });
});

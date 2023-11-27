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
            expect(element.disabled).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('medium');
            expect(element.imageSrc).toBeUndefined();
            expect(element.imageVariant).toBe('square');
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.stretch).toBeFalsy();
            expect(element.type).toBe('button');
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('neutral');
        });

        it('stretch', () => {
            element.stretch = true;
            expect(element.stretch).toBeTruthy();
        });
    });
});

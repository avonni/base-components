import { createElement } from 'lwc';
import PrimitiveButton from '../primitiveButton';

let element;
describe('Primitive Button', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-button', {
            is: PrimitiveButton
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.ariaAtomic).toBeUndefined();
            expect(element.ariaBusy).toBeUndefined();
            expect(element.ariaControls).toBeUndefined();
            expect(element.ariaCurrent).toBeUndefined();
            expect(element.ariaDescribedBy).toBeUndefined();
            expect(element.ariaDetails).toBeUndefined();
            expect(element.ariaExpanded).toBeUndefined();
            expect(element.ariaFlowTo).toBeUndefined();
            expect(element.ariaHasPopup).toBeUndefined();
            expect(element.ariaHidden).toBeUndefined();
            expect(element.ariaKeyShortcuts).toBeUndefined();
            expect(element.ariaLabelledBy).toBeUndefined();
            expect(element.ariaLabel).toBeUndefined();
            expect(element.ariaLive).toBeUndefined();
            expect(element.ariaOwns).toBeUndefined();
            expect(element.ariaPressed).toBeUndefined();
            expect(element.ariaRelevant).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.groupOrder).toBe('');
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('x-small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.name).toBeUndefined();
            expect(element.stretch).toBeFalsy();
            expect(element.tabIndex).toBeUndefined();
            expect(element.title).toBeUndefined();
            expect(element.type).toBe('button');
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('neutral');
        });
    });
});

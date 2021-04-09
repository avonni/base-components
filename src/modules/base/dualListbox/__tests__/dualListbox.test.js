import { createElement } from 'lwc';
import DualListbox from 'c/dualListbox';

describe('DualListbox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        expect(element.addButtonIconName).toBe('utility:right');
        expect(element.addButtonLabel).toBeUndefined();
        expect(element.buttonSize).toBe('medium');
        expect(element.buttonVariant).toBe('border');
        expect(element.disableReordering).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.downButtonIconName).toBe('utility:down');
        expect(element.downButtonLabel).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.max).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.messageWhenRangerOverflow).toBeUndefined();
        expect(element.messageWhenRangerUnderflow).toBeUndefined();
        expect(element.messageWhenValueIsMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.required).toBeFalsy();
        expect(element.requiredOptions).toMatchObject([]);
        expect(element.searchEngine).toBeFalsy();
        expect(element.selectedLabel).toBeUndefined();
        expect(element.selectedPlaceholder).toBeUndefined();
        expect(element.sourceLabel).toBeUndefined();
        expect(element.upButtonIconName).toBe('utility:up');
        expect(element.upButtonLabel).toBeUndefined();
        expect(element.validity).toBeUndefined();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    it('Dual Listbox button size xx-small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'xx-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('xx-small');
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('xx-small');
            });
        });
    });

    it('Dual Listbox button size x-small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'x-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('x-small');
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('x-small');
            });
        });
    });

    it('Dual Listbox button size small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('small');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('small');
            });
        });
    });

    it('Dual Listbox button size medium', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'medium';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('medium');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('medium');
            });
        });
    });

    it('Dual Listbox button size large', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'large';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('large');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('large');
            });
        });
    });
});

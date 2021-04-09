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
        expect(element.disableReordering).toBe(false);
        expect(element.disabled).toBe(false);
        expect(element.downButtonIconName).toBe('utility:down');
        expect(element.downButtonLabel).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBe(false);
        expect(element.label).toBe('label');
        expect(element.max).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.messageWhenRangerOverflow).toBeUndefined();
        expect(element.messageWhenRangerUnderflow).toBeUndefined();
        expect(element.messageWhenValueIsMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.required).toBe(false);
        expect(element.requiredOptions).toMatchObject([]);
        expect(element.searchEngine).toBe(false);
        expect(element.selectedLabel).toBe('selectedLabel');
        expect(element.selectedPlaceholder).toBeUndefined();
        expect(element.showActivityIndicator).toBe(false);
        expect(element.sourceLabel).toBe('sourceLabel');
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

        const lightningButtonIcon = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );

        lightningButtonIcon.forEach((button) => {
            expect(button.size).toBe('xx-small');
        });

        element.buttonSize = 'xx-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('xx-small');
        });
    });

    it('Dual Listbox button size x-small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const lightningButtonIcon = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );

        lightningButtonIcon.forEach((button) => {
            expect(button.size).toBe('x-small');
        });

        element.buttonSize = 'x-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('x-small');
        });
    });

    it('Dual Listbox button size small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const lightningButtonIcon = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );

        lightningButtonIcon.forEach((button) => {
            expect(button.size).toBe('small');
        });

        element.size = 'small';

        return Promise.resolve().then(() => {
            expect(element.size).toBe('small');
        });
    });

    it('Dual Listbox button size medium', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const lightningButtonIcon = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );

        lightningButtonIcon.forEach((button) => {
            expect(button.size).toBe('medium');
        });

        element.size = 'medium';

        return Promise.resolve().then(() => {
            expect(element.size).toBe('medium');
        });
    });

    it('Dual Listbox button size large', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const lightningButtonIcon = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );

        lightningButtonIcon.forEach((button) => {
            expect(button.size).toBe('large');
        });

        element.size = 'large';

        return Promise.resolve().then(() => {
            expect(element.size).toBe('large');
        });
    });
});

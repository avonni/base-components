import { createElement } from 'lwc';
import DualListbox from 'c/dualListbox';

describe('DualListbox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Dual Listbox Default attributes', () => {
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
    // need to but label to get the right button icon, testing addButtonIconLabel as well
    it('Dual Listbox add button icon name', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.addButtonIconName = 'utility:add';
        element.addButtonLabel = 'add';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='add']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:add');
            expect(lightningButtonIcon.title).toBe('add');
        });
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

    it('Dual Listbox button variant bare', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'bare';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('bare');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare');
            });
        });
    });

    it('Dual Listbox button variant container', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'container';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('container');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('container');
            });
        });
    });

    it('Dual Listbox button variant brand', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'brand';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('brand');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('brand');
            });
        });
    });

    it('Dual Listbox button variant border-filled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'border-filled';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('border-filled');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-filled');
            });
        });
    });

    it('Dual Listbox button variant bare-inverse', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('bare-inverse');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare-inverse');
            });
        });
    });

    it('Dual Listbox button variant border-inverse', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            expect(element.buttonVariant).toBe('border-inverse');

            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-inverse');
            });
        });
    });

    it('Dual Listbox disable reordering', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.disableReordering = true;
        element.addButtonLabel = 'add';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            expect(element.disableReordering).toBe(true);
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            expect(lightningButtonIcon.length).toBe(2);
            expect(lightningButtonIcon[0].title).toBe('add');
            expect(lightningButtonIcon[1].title).toBe('remove');
        });
    });

    it('Dual Listbox label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });
});

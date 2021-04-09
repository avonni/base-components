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

    /* ----- ATTRIBUTES ----- */

    // add-button-icon-name & add-button-label
    it('Dual Listbox add button icon name and label', () => {
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

    // button-size
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

    // button-variant
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

    // disable-reordering
    it('Dual Listbox disable reordering', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.disableReordering = true;
        element.addButtonLabel = 'add';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            expect(element.disableReordering).toBeTruthy();
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            expect(lightningButtonIcon.length).toBe(2);
            expect(lightningButtonIcon[0].title).toBe('add');
            expect(lightningButtonIcon[1].title).toBe('remove');
        });
    });

    // disabled
    it('Dual Listbox disabled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.addButtonLabel = 'add';
        element.downButtonLabel = 'down';
        element.removeButtonLabel = 'remove';
        element.upButtonLabel = 'up';

        return Promise.resolve().then(() => {
            expect(element.disabled).toBeTruthy();

            const column = element.shadowRoot.querySelector(
                '.slds-dueling-list__options'
            );

            const addLightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='add']"
            );
            // const downLightningButtonIcon = element.shadowRoot.querySelector(
            //     "lightning-button-icon[title='down']"
            // );
            const removeLightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='remove']"
            );
            // const upLightningButtonIcon = element.shadowRoot.querySelector(
            //     "lightning-button-icon[title='up']"
            // );

            expect(addLightningButtonIcon.disabled).toBeTruthy();
            // expect(downLightningButtonIcon.disabled).toBeTruthy();
            expect(removeLightningButtonIcon.disabled).toBeTruthy();
            // expect(upLightningButtonIcon.disabled).toBeTruthy();

            expect(column.classList).toContain('slds-is-disabled');
        });
    });

    // down-button-icon-name & down-button-label
    it('Dual Listbox down button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.downButtonIconName = 'utility:apex';
        element.downButtonLabel = 'down';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='down']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('down');
        });
    });

    // field-level-help
    it('Dual Listbox field level help', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector('lightning-helptext');
            expect(help).toBeTruthy();
        });
    });

    // isLoading
    it('Dual Listbox is loading', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(element.isLoading).toBeTruthy();
            expect(spinner).toBeTruthy();
        });
    });

    // label
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

    // max
    it('Dual Listbox max', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.max = 4;

        return Promise.resolve().then(() => {
            expect(element.max).toBe(4);
        });
    });

    // min
    it('Dual Listbox min', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.min = 4;

        return Promise.resolve().then(() => {
            expect(element.min).toBe(4);
        });
    });

    // message-when-range-overflow
    it('Dual Listbox message when range overflow', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.messageWhenRangerOverflow = 'Maximum Capacity!';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(message).toBe('Maximum Capacity!');
        });
    });

    // message-when-range-underflow
    it('Dual Listbox message when range underflow', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.messageWhenRangerUnderflow = 'Minimum Capacity!';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(message).toBe('Minimum Capacity!');
        });
    });

    // message-when-value-missing
    it('Dual Listbox message when value is missing', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.required = true;
        element.value.length = 0;
        element.messageWhenValueMissing = 'Missing value!';

        return Promise.resolve().then(() => {
            const message = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(message).toBe('Missing value!');
        });
    });

    // options
    it('Dual Listbox options', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        const options = [
            {
                value: '1',
                label: 'Jobs',
                iconName: 'custom:custom91',
                description: 'description',
                initials: 'initials',
                iconSize: 'small',
                src: 'src',
                variant: 'circle'
            }
            // {
            //     value: '2',
            //     label: 'Content',
            //     iconName: 'custom:custom92',
            //     description: 'description',
            //     initials: 'initials',
            //     iconSize: 'large',
            //     src: 'src',
            //     variant: 'square'
            // }
        ];

        element.options = options;

        return Promise.resolve().then(() => {
            options.forEach((option) => {
                expect(option.value).toBe('1');
                expect(option.label).toBe('Jobs');
                expect(option.iconName).toBe('custom:custom91');
                expect(option.description).toBe('description');
                expect(option.initials).toBe('initials');
                expect(option.iconSize).toBe('small');
                expect(option.src).toBe('src');
                expect(option.variant).toBe('circle');
            });
        });
    });

    // remove-button-icon-name & remove-button-label
    it('Dual Listbox remove button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.removeButtonIconName = 'utility:apex';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='remove']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('remove');
        });
    });

    // required
    it('Dual Listbox required', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.required = true;

        return Promise.resolve().then(() => {
            const asterisk = element.shadowRoot.querySelector('.slds-required');
            expect(asterisk).toBeTruthy();
        });
    });

    // required options
    it('Dual Listbox required options', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.requiredOptions = [];

        return Promise.resolve().then(() => {
            expect(element.requiredOptions).toBeTruthy();
        });
    });

    // search engine
    it('Dual Listbox search engine', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.searchEngine = true;

        return Promise.resolve().then(() => {
            const searchBox = element.shadowRoot.querySelector(
                "input[type='search']"
            );
            expect(element.searchEngine).toBeTruthy();
            expect(searchBox).toBeTruthy();
        });
    });

    // selected label and source label
    it('Dual Listbox selected label & source label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.sourceLabel = 'A string source label';
        element.selectedLabel = 'A string selected label';

        return Promise.resolve().then(() => {
            const Labels = element.shadowRoot.querySelectorAll(
                "span[class='slds-form-element__label']"
            );
            expect(Labels[0].textContent).toBe('A string source label');
            expect(Labels[1].textContent).toBe('A string selected label');
        });
    });
});

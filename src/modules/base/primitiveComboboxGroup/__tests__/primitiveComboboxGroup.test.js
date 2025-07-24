import { createElement } from 'lwc';
import { groups, options } from './data';
import PrimitiveComboboxGroup from 'c/primitiveComboboxGroup';

let element;
describe('PrimitiveComboboxGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.groups).toMatchObject([]);
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.options).toMatchObject([]);
            expect(element.removeSelectedOptions).toBeFalsy();
        });

        describe('groups', () => {
            it('Passed to the component', () => {
                element.groups = groups;

                return Promise.resolve().then(() => {
                    const childGroups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-combobox-group"]'
                    );
                    expect(childGroups).toHaveLength(groups.length);

                    childGroups.forEach((group, index) => {
                        expect(group.name).toBe(groups[index].name);
                        expect(group.label).toBe(groups[index].label);
                        expect(group.options).toMatchObject(
                            groups[index].options || []
                        );
                        expect(group.groups).toMatchObject(
                            groups[index].groups || []
                        );
                    });
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="h3"]'
                    );
                    expect(label).toBeTruthy();
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('options', () => {
            it('Passed to the component', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    const optionElements =
                        element.shadowRoot.querySelectorAll(
                            'li[role="option"]'
                        );
                    expect(optionElements).toHaveLength(options.length);

                    optionElements.forEach((option, index) => {
                        const optionObject = options[index];
                        expect(option.ariaDisabled).toBe(
                            optionObject.disabled ? 'true' : 'false'
                        );
                        expect(option.className).toBe(
                            optionObject.computedClass
                        );
                        expect(option.dataset.value).toBe(optionObject.value);

                        const checkmark = option.querySelector(
                            '.slds-listbox__option-icon lightning-icon'
                        );
                        expect(!!checkmark).toBe(!!optionObject.showCheckmark);

                        const avatar = option.querySelector(
                            '[data-element-id="avonni-avatar"]'
                        );
                        expect(!!avatar).toBe(!!optionObject.hasAvatar);

                        const label = option.querySelector(
                            '.slds-listbox__option-text'
                        );
                        expect(label.textContent).toBe(optionObject.label);

                        const secondaryText = option.querySelector(
                            '.slds-listbox__option-meta'
                        );
                        expect(
                            optionObject.secondaryText
                                ? secondaryText.textContent ===
                                      optionObject.secondaryText
                                : !secondaryText
                        ).toBeTruthy();

                        const childrenChevron = option.querySelector(
                            '.slds-media__figure_reverse lightning-icon'
                        );
                        expect(!!childrenChevron).toBe(
                            !!optionObject.options.length
                        );
                    });
                });
            });
        });

        describe('removeSelectedOptions', () => {
            // depends on groups and options
            it('Passed to the component when removeSelectedOptions = false', () => {
                element.groups = groups;
                element.options = options;
                element.removeSelectedOptions = false;

                return Promise.resolve().then(() => {
                    const childGroups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-combobox-group"]'
                    );
                    childGroups.forEach((group) => {
                        expect(group.removeSelectedOptions).toBeFalsy();
                    });

                    const optionElements =
                        element.shadowRoot.querySelectorAll(
                            'li[role="option"]'
                        );
                    optionElements.forEach((option, index) => {
                        const checkmark = option.querySelector(
                            '.slds-listbox__option-icon lightning-icon'
                        );
                        expect(!!checkmark).toBe(
                            !!options[index].showCheckmark
                        );
                    });
                });
            });

            it('Passed to the component when removeSelectedOptions = true', () => {
                element.groups = groups;
                element.options = options;
                element.removeSelectedOptions = true;

                return Promise.resolve().then(() => {
                    const childGroups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-combobox-group"]'
                    );
                    childGroups.forEach((group) => {
                        expect(group.removeSelectedOptions).toBeTruthy();
                    });

                    const checkmarks = element.shadowRoot.querySelectorAll(
                        '.slds-listbox__option-icon lightning-icon'
                    );
                    expect(checkmarks).toHaveLength(0);
                });
            });
        });
    });

    describe('Computed public variables', () => {
        describe('optionElements', () => {
            it('Passed to the component', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    const optionElements = element.optionElements;
                    expect(optionElements).toHaveLength(3);
                });
            });
        });

        describe('titleElement', () => {
            it('Passed to the component', () => {
                element.label = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.titleElement;
                    expect(title).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('privateoptionclick', () => {
            it('Passed to the component', () => {
                element.options = options;
                element.name = 'string-name';
                const handler = jest.fn();
                element.addEventListener('privateoptionclick', handler);

                return Promise.resolve().then(() => {
                    const option =
                        element.shadowRoot.querySelector('li[role="option"]');
                    option.click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.id).toBe(
                        'string-name-0'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('event disabled', () => {
                element.options = options;
                element.name = 'string-name';
                const handler = jest.fn();
                element.addEventListener('privateoptionclick', handler);

                return Promise.resolve().then(() => {
                    const option =
                        element.shadowRoot.querySelectorAll(
                            'li[role="option"]'
                        )[2];
                    option.click();

                    expect(handler).toHaveBeenCalledTimes(0);
                });
            });
        });

        describe('privateoptionmouseenter', () => {
            it('Passed to the component', () => {
                element.options = options;
                element.name = 'string-name';
                const handler = jest.fn();
                element.addEventListener('privateoptionmouseenter', handler);

                return Promise.resolve().then(() => {
                    const option =
                        element.shadowRoot.querySelector('li[role="option"]');
                    option.dispatchEvent(new CustomEvent('mouseenter'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.id).toBe(
                        'string-name-0'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });
    });
});

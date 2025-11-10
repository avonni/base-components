import { createElement } from 'lwc';
import FilterMenu from '../filterMenu';

// Not tested:
// tooltip with horizontal variant (is injected outside of shadow dom)
// auto positionning
// Deprecated attributes

const ITEMS = [
    {
        label: 'Item 1',
        value: 'item-1',
        disabled: true
    },
    {
        label: 'Item 2',
        value: 'item-2',
        iconName: 'utility:user',
        prefixIconName: 'standard:apps'
    },
    {
        label: 'Item 3 with more searchable text',
        value: 'item-3'
    },
    {
        label: 'Item 4',
        value: 'item-4',
        enableInfiniteLoading: true,
        items: [
            {
                value: 'item-4-1',
                label: 'Item 4.1',
                items: [
                    {
                        value: 'item-4-1-1',
                        label: 'Item 4.1.1',
                        enableInfiniteLoading: true
                    }
                ]
            }
        ]
    },
    {
        label: 'Item 5',
        value: 'item-5'
    },
    {
        label: 'Item 6',
        value: 'item-6'
    }
];

const VALUE = ['item-1', 'item-2'];

let element;
describe('Filter Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        window.requestAnimationFrame.mockRestore();
        jest.clearAllTimers();
    });

    beforeEach(() => {
        element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBe('Show Menu');
            expect(element.applyButtonLabel).toBe('Apply');
            expect(element.buttonVariant).toBe('border');
            expect(element.closed).toBeFalsy();
            expect(element.collapsible).toBeFalsy();
            expect(element.disabled).toBeFalsy();
            expect(element.dropdownAlignment).toBe('left');
            expect(element.dropdownNubbin).toBeFalsy();
            expect(element.hideApplyButton).toBeFalsy();
            expect(element.hideApplyResetButtons).toBeFalsy();
            expect(element.hideSelectedItems).toBeFalsy();
            expect(element.iconName).toBe('utility:down');
            expect(element.iconSize).toBe('medium');
            expect(element.isLoading).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.name).toBeUndefined();
            expect(element.resetButtonLabel).toBe('Clear selection');
            expect(element.showClearButton).toBeFalsy();
            expect(element.title).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.type).toBe('list');
            expect(element.typeAttributes).toEqual({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('horizontal');
            expect(element.weekStartDay).toBe(0);
        });

        describe('Access Key', () => {
            it('AccessKey', () => {
                element.accessKey = 'K';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Alternative Text', () => {
            it('alternativeText', () => {
                element.alternativeText = 'A string alt text';

                return Promise.resolve().then(() => {
                    const altText = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    expect(altText.textContent).toBe('A string alt text');
                });
            });
        });

        describe('Apply Button Label', () => {
            it('applyButtonLabel', () => {
                element.typeAttributes = { items: ITEMS };
                element.applyButtonLabel = 'A string label';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const submitButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    expect(submitButton.label).toBe('A string label');
                });
            });
        });

        describe('Button Variant', () => {
            // Depends on iconName and label
            it('border', () => {
                element.buttonVariant = 'border';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-border'
                    );
                });
            });

            it('border, with label', () => {
                element.buttonVariant = 'border';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_neutral'
                    );
                });
            });

            it('border, with icon', () => {
                element.buttonVariant = 'border';
                element.iconName = 'utility:user';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon slds-button_icon-more'
                    );
                });
            });

            it('bare', () => {
                element.buttonVariant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-bare'
                    );
                });
            });

            it('bare, with label', () => {
                element.buttonVariant = 'bare';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate'
                    );
                });
            });

            it('bare, with icon', () => {
                element.buttonVariant = 'bare';
                element.iconName = 'standard:user';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon slds-button_icon-bare slds-button_icon-more'
                    );
                });
            });

            it('container', () => {
                element.buttonVariant = 'container';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-container'
                    );
                });
            });

            it('container, with label', () => {
                element.buttonVariant = 'container';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate'
                    );
                });
            });

            it('container, with icon', () => {
                element.buttonVariant = 'container';
                element.icon = 'utility:user';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-container'
                    );
                });
            });

            it('border-filled', () => {
                element.buttonVariant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-border-filled'
                    );
                });
            });

            it('border-filled, with label', () => {
                element.buttonVariant = 'border-filled';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate'
                    );
                });
            });

            it('border-filled, with icon', () => {
                element.buttonVariant = 'border-filled';
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
                    );
                });
            });

            it('bare-inverse', () => {
                element.buttonVariant = 'bare-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-bare slds-button_icon-inverse'
                    );
                });
            });

            it('bare-inverse, with label', () => {
                element.buttonVariant = 'bare-inverse';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate'
                    );
                });
            });

            it('bare-inverse, with icon', () => {
                element.buttonVariant = 'bare-inverse';
                element.iconName = 'standard:apps';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
                    );
                });
            });

            it('border-inverse', () => {
                element.buttonVariant = 'border-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-border-inverse'
                    );
                });
            });

            it('border-inverse, with label', () => {
                element.buttonVariant = 'border-inverse';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_inverse'
                    );
                });
            });

            it('border-inverse, with icon', () => {
                element.buttonVariant = 'border-inverse';
                element.icon = 'utility:apps';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_icon-border-inverse'
                    );
                });
            });

            it('outline-brand, with label', () => {
                element.buttonVariant = 'outline-brand';
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList.value).toBe(
                        'slds-button slds-truncate slds-button_outline-brand'
                    );
                });
            });
        });

        describe('Collapsible', () => {
            // Depends on label and variant
            it('collapsible true', () => {
                element.label = 'Some title';
                element.variant = 'vertical';
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-toggle"]'
                    );
                    expect(icon).toBeTruthy();
                });
            });

            it('collapsible false', () => {
                element.label = 'Some title';
                element.collapsible = false;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-toggle"]'
                    );
                    expect(icon).toBeFalsy();
                });
            });

            it('collapsible true click', () => {
                element.label = 'Some title';
                element.variant = 'vertical';
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-toggle"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(element.closed).toBeFalsy();
                    icon.click();
                    return Promise.resolve().then(() => {
                        expect(element.closed).toBeTruthy();
                    });
                });
            });
        });

        describe('Disabled', () => {
            it('disabled = false', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.disabled).toBeFalsy();
                });
            });

            it('disabled = true', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Dropdown Alignment & Dropdown Nubbin', () => {
            it('left and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'left';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_left');
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('auto and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'auto';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_left');
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('center and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'center';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_left'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('right and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'right';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_right');
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('bottom-left and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'bottom-left';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_left');
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_right'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('bottom-center and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'bottom-center';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_right'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).toContain('slds-nubbin_bottom');
                });
            });

            it('bottom-right and dropdownNubbin = true', () => {
                element.dropdownAlignment = 'bottom-right';
                element.dropdownNubbin = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_center'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_right');
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_bottom'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_bottom-left'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });

            it('dropdownNubbin = false', () => {
                element.dropdownNubbin = false;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );

                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_top-right'
                    );
                    expect(dropdown.classList).not.toContain('slds-nubbin_top');
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-left'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom-right'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-nubbin_bottom'
                    );
                });
            });
        });

        describe('Hide Apply Button', () => {
            // Depends on variant
            it('false, with horizontal variant', () => {
                element.hideApplyButton = false;
                element.typeAttributes = { items: ITEMS };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });

            it('false, with vertical variant', () => {
                element.hideApplyButton = false;
                element.typeAttributes = { items: ITEMS };
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });

            it('true, with horizontal variant', () => {
                element.hideApplyButton = true;
                element.typeAttributes = { items: ITEMS };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(1);
                });
            });

            it('true, with vertical variant', () => {
                element.hideApplyButton = true;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(1);
                });
            });
        });

        describe('Hide Apply Reset Buttons', () => {
            // Depends on variant
            it('false, with horizontal variant', () => {
                element.hideApplyResetButtons = false;
                element.typeAttributes = { items: ITEMS };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });

            it('false, with vertical variant', () => {
                element.hideApplyResetButtons = false;
                element.typeAttributes = { items: ITEMS };
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });

            it('true, with horizontal variant', () => {
                element.hideApplyResetButtons = true;

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(0);
                });
            });

            it('true, with vertical variant', () => {
                element.hideApplyResetButtons = true;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(0);
                });
            });
        });

        describe('Hide Selected Items', () => {
            // Depends on items, value and variant
            it('false, with horizontal variant', () => {
                element.hideSelectedItems = false;
                element.typeAttributes = { items: ITEMS };
                element.value = VALUE;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    expect(pills).toBeTruthy();
                });
            });

            it('false, with vertical variant', () => {
                element.hideSelectedItems = false;
                element.variant = 'vertical';
                element.typeAttributes = { items: ITEMS };
                element.value = VALUE;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    expect(pills).toBeTruthy();
                });
            });

            it('true, with horizontal variant', () => {
                element.hideSelectedItems = true;
                element.typeAttributes = { items: ITEMS };
                element.value = VALUE;

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    expect(pills).toBeFalsy();
                });
            });

            it('true, with vertical variant', () => {
                element.hideSelectedItems = true;
                element.variant = 'vertical';
                element.typeAttributes = { items: ITEMS };
                element.value = VALUE;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    expect(pills).toBeFalsy();
                });
            });
        });

        describe('Icon', () => {
            it('iconName is down arrow', () => {
                element.iconName = 'utility:chevrondown';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-primitive-icon"]'
                    );
                    expect(icons).toHaveLength(1);
                    expect(icons[0].iconName).toBe('utility:chevrondown');
                    expect(button.classList).not.toContain('slds-button_icon');
                });
            });

            it('iconName is not down arrow', () => {
                element.iconName = 'standard:user';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-primitive-icon"]'
                    );
                    expect(icons).toHaveLength(2);
                    expect(icons[0].iconName).toBe('standard:user');
                    expect(icons[1].iconName).toBe('utility:down');
                    expect(button.classList).toContain('slds-button_icon');
                });
            });

            describe('iconSize', () => {
                it('xx-small', () => {
                    element.iconSize = 'xx-small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-xx-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-x-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-large'
                        );
                    });
                });

                it('x-small', () => {
                    element.iconSize = 'x-small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-xx-small'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-x-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-large'
                        );
                    });
                });

                it('medium', () => {
                    element.iconSize = 'medium';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-xx-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-x-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-large'
                        );
                    });
                });

                it('large', () => {
                    element.iconSize = 'large';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-xx-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-x-small'
                        );
                        expect(button.classList).not.toContain(
                            'slds-button_icon-small'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-large'
                        );
                    });
                });
            });
        });

        describe('Is Loading', () => {
            it('isLoading = false', () => {
                element.isLoading = false;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );

                    expect(spinner).toBeFalsy();
                });
            });

            it('isLoading = true', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'A string alt text';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
                    expect(spinner.alternativeText).toBe('A string alt text');
                });
            });
        });

        describe('Items', () => {
            it('items', () => {
                element.typeAttributes = { items: ITEMS };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const apply = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    const reset = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    const noResultMessage = element.shadowRoot.querySelector(
                        '[data-element-id="p-no-results-message"]'
                    );

                    expect(apply).toBeTruthy();
                    expect(reset).toBeTruthy();
                    expect(noResultMessage).toBeFalsy();
                    expect(items).toHaveLength(6);

                    items.forEach((item, index) => {
                        const label = item.querySelector(
                            '[data-element-id="lightning-formatted-rich-text-item-label"]'
                        );
                        const disabled = ITEMS[index].disabled ? 'true' : null;
                        expect(item.dataset.value).toBe(ITEMS[index].value);
                        expect(item.ariaDisabled).toBe(disabled);
                        expect(label.value).toBe(ITEMS[index].label);
                    });

                    const prefixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-prefix"]'
                    );
                    const suffixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-suffix"]'
                    );
                    expect(prefixIcon).toBeTruthy();
                    expect(suffixIcon).toBeTruthy();
                    expect(items[1].tabIndex).toBe(0);

                    [0, 2, 3, 4, 5].forEach((index) => {
                        const prefix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-prefix"]'
                        );
                        const suffix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-suffix"]'
                        );
                        expect(prefix).toBeFalsy();
                        expect(suffix).toBeFalsy();
                        expect(items[index].tabIndex).toBe(-1);
                    });
                });
            });

            it('items, hide apply button', () => {
                element.hideApplyButton = true;
                element.typeAttributes = { items: ITEMS };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const apply = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    const reset = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    const noResultMessage = element.shadowRoot.querySelector(
                        '[data-element-id="p-no-results-message"]'
                    );

                    expect(apply).toBeFalsy();
                    expect(reset).toBeTruthy();
                    expect(noResultMessage).toBeFalsy();
                    expect(items).toHaveLength(6);

                    items.forEach((item, index) => {
                        const label = item.querySelector(
                            '[data-element-id="lightning-formatted-rich-text-item-label"]'
                        );
                        const disabled = ITEMS[index].disabled ? 'true' : null;
                        expect(item.dataset.value).toBe(ITEMS[index].value);
                        expect(item.ariaDisabled).toBe(disabled);
                        expect(label.value).toBe(ITEMS[index].label);
                    });

                    const prefixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-prefix"]'
                    );
                    const suffixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-suffix"]'
                    );
                    expect(prefixIcon).toBeTruthy();
                    expect(suffixIcon).toBeTruthy();
                    expect(items[1].tabIndex).toBe(0);

                    [0, 2, 3, 4, 5].forEach((index) => {
                        const prefix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-prefix"]'
                        );
                        const suffix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-suffix"]'
                        );
                        expect(prefix).toBeFalsy();
                        expect(suffix).toBeFalsy();
                        expect(items[index].tabIndex).toBe(-1);
                    });
                });
            });

            it('items with group items', () => {
                const itemMap = ITEMS.reduce((acc, item, index) => {
                    acc[item.value] = index;
                    return acc;
                }, {});
                element.typeAttributes = { items: ITEMS, itemCounts: itemMap };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const apply = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    const reset = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    const noResultMessage = element.shadowRoot.querySelector(
                        '[data-element-id="p-no-results-message"]'
                    );

                    expect(apply).toBeTruthy();
                    expect(reset).toBeTruthy();
                    expect(noResultMessage).toBeFalsy();
                    expect(items).toHaveLength(6);

                    items.forEach((item, index) => {
                        const label = item.querySelector(
                            '[data-element-id="lightning-formatted-rich-text-item-label"]'
                        );
                        const countLabel = item.querySelector(
                            '[data-element-id="lightning-formatted-rich-text-count-label"]'
                        );
                        const disabled = ITEMS[index].disabled ? 'true' : null;
                        expect(item.dataset.value).toBe(ITEMS[index].value);
                        expect(item.ariaDisabled).toBe(disabled);
                        expect(label.value).toBe(`${ITEMS[index].label}`);
                        expect(countLabel.value).toBe(`(${index})`);
                    });

                    const prefixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-prefix"]'
                    );
                    const suffixIcon = items[1].querySelector(
                        '[data-element-id="avonni-primitive-icon-suffix"]'
                    );
                    expect(prefixIcon).toBeTruthy();
                    expect(suffixIcon).toBeTruthy();
                    expect(items[1].tabIndex).toBe(0);

                    [0, 2, 3, 4, 5].forEach((index) => {
                        const prefix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-prefix"]'
                        );
                        const suffix = items[index].querySelector(
                            '[data-element-id="avonni-primitive-icon-suffix"]'
                        );
                        expect(prefix).toBeFalsy();
                        expect(suffix).toBeFalsy();
                        expect(items[index].tabIndex).toBe(-1);
                    });
                });
            });

            it('items with colors', () => {
                const colorItems = [
                    { label: 'Item 1', value: '1', color: 'tomato' },
                    { label: 'Item 2', value: '2', color: 'green' },
                    { label: 'Item 3', value: '3', color: 'blue' }
                ];
                element.typeAttributes = { items: colorItems };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );

                    items.forEach((item, index) => {
                        const color = item.querySelector(
                            '[data-element-id="avonni-primitive-icon-color"]'
                        );
                        expect(color).toBeTruthy();
                        expect(color.style.color).toBe(colorItems[index].color);
                    });
                });
            });

            it('No items shows empty message and hides buttons', () => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
                element.typeAttributes = {
                    noResultsMessage: 'A string no results message for test'
                };

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-formatted-rich-text-item-label"]'
                    );
                    const apply = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    const reset = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    const noResultMessage = element.shadowRoot.querySelector(
                        '[data-element-id="p-no-results-message"]'
                    );

                    expect(apply).toBeFalsy();
                    expect(reset).toBeFalsy();
                    expect(noResultMessage).toBeTruthy();
                    expect(noResultMessage.textContent).toBe(
                        'A string no results message for test'
                    );
                    expect(items).toHaveLength(0);
                });
            });
        });

        describe('Label', () => {
            it('label', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.textContent).toContain('A string label');
                });
            });
        });

        describe('Loading State Alternative Text', () => {
            // Depends in isLoading
            it('loadingStateAlternativeText', () => {
                element.loadingStateAlternativeText = 'A string alt text';
                element.isLoading = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner.alternativeText).toBe('A string alt text');
                });
            });
        });

        describe('Name', () => {
            it('name horizontal', () => {
                element.name = 'A string name';
                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.name).toBe('A string name');
                });
            });

            it('name vertical', () => {
                element.name = 'A string name';
                element.variant = 'vertical';
                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    expect(input.name).toBe('A string name');
                });
            });
        });

        describe('Reset Button Label', () => {
            it('resetButtonLabel', () => {
                element.typeAttributes = { items: ITEMS };
                element.resetButtonLabel = 'A string label';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const resetButton = element.shadowRoot.querySelector(
                        '.slds-dropdown lightning-button:first-of-type'
                    );
                    expect(resetButton.label).toBe('A string label');
                });
            });
        });

        describe('Show Clear Button', () => {
            it('showClearButton, true', () => {
                element.showClearButton = true;
                element.variant = 'vertical';
                element.value = ITEMS;

                return Promise.resolve().then(() => {
                    const buttonClear = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-clear"]'
                    );
                    expect(buttonClear).toBeTruthy();
                });
            });

            it('showClearButton, false', () => {
                element.showClearButton = false;
                element.variant = 'vertical';
                element.value = ITEMS;

                return Promise.resolve().then(() => {
                    const buttonClear = element.shadowRoot.querySelector(
                        '[data-element-id="span-menu-selected-labels"]'
                    );
                    expect(buttonClear).toBeFalsy();
                });
            });
        });

        describe('Title', () => {
            it('title', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.title).toBe('A string title');
                });
            });
        });

        describe('Tooltip', () => {
            // Depends on variant
            it('tooltip with vertical variant', () => {
                element.tooltip = 'A string tooltip';
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(help).toBeTruthy();
                    expect(help.content).toBe('A string tooltip');
                });
            });
        });

        describe('Type & Type Attributes', () => {
            it('type = list', () => {
                element.type = 'list';
                element.typeAttributes = { items: ITEMS };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    expect(tree).toBeFalsy();
                    expect(items).toHaveLength(ITEMS.length);
                });
            });

            it('type = list, nested items', () => {
                element.type = 'list';
                element.typeAttributes = { items: ITEMS, hasNestedItems: true };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    expect(items).toHaveLength(0);
                    expect(tree).toBeTruthy();
                    expect(tree.items).toHaveLength(ITEMS.length);
                });
            });

            it('type = list, vertical variant', () => {
                element.type = 'list';
                element.variant = 'vertical';
                element.typeAttributes = { items: ITEMS };

                return Promise.resolve().then(() => {
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    const choiceSet = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    expect(tree).toBeFalsy();
                    expect(choiceSet).toBeTruthy();
                    expect(choiceSet.options).toHaveLength(ITEMS.length);
                });
            });

            it('type = list, nested items and vertical variant', () => {
                element.type = 'list';
                element.variant = 'vertical';
                element.typeAttributes = { items: ITEMS, hasNestedItems: true };

                return Promise.resolve().then(() => {
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    const choiceSet = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    expect(choiceSet).toBeFalsy();
                    expect(tree).toBeTruthy();
                    expect(tree.items).toHaveLength(ITEMS.length);
                });
            });

            it('type = date-range', () => {
                element.type = 'date-range';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_large');

                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange).toBeTruthy();
                });
            });

            it('type = date-range, vertical variant', () => {
                element.type = 'date-range';
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange).toBeTruthy();
                });
            });

            it('type = range', () => {
                element.type = 'range';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_small');

                    const range = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-slider"]'
                    );
                    expect(range).toBeTruthy();
                });
            });

            it('type = range, vertical variant', () => {
                element.type = 'range';
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const range = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-slider"'
                    );
                    expect(range).toBeTruthy();
                });
            });

            // type-attributes
            it('typeAttributes for date-range', () => {
                const typeAttributes = {
                    dateStyle: 'long',
                    labelEndDate: 'End date',
                    labelStartDate: 'Start date',
                    labelStartTime: 'Start time',
                    labelEndTime: 'End time',
                    timeStyle: 'long',
                    timezone: 'Pacific/Noumea',
                    type: 'datetime'
                };
                element.type = 'date-range';
                element.typeAttributes = typeAttributes;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange.dateStyle).toBe(typeAttributes.dateStyle);
                    expect(dateRange.labelEndDate).toBe(
                        typeAttributes.labelEndDate
                    );
                    expect(dateRange.labelStartDate).toBe(
                        typeAttributes.labelStartDate
                    );
                    expect(dateRange.labelEndTime).toBe(
                        typeAttributes.labelEndTime
                    );
                    expect(dateRange.labelStartTime).toBe(
                        typeAttributes.labelStartTime
                    );
                    expect(dateRange.timeStyle).toBe(typeAttributes.timeStyle);
                    expect(dateRange.timezone).toBe(typeAttributes.timezone);
                    expect(dateRange.type).toBe(typeAttributes.type);
                });
            });

            it('typeAttributes for list, allowSearch and searchInputPlaceholder', () => {
                let input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input).toBeFalsy();

                element.typeAttributes = {
                    allowSearch: true,
                    searchInputPlaceholder: 'A string placeholder'
                };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(input).toBeTruthy();
                    expect(input.placeholder).toBe('A string placeholder');
                });
            });

            it('typeAttributes for list, dropdownLength = 7-items', () => {
                element.typeAttributes = {
                    dropdownLength: '7-items'
                };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const itemList = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown-content"]'
                    );
                    expect(itemList.classList).toContain(
                        'slds-dropdown_length-with-icon-7'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-5'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-10'
                    );
                });
            });

            it('typeAttributes for list, dropdownLength = 5-items', () => {
                element.typeAttributes = {
                    dropdownLength: '5-items'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const itemList = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown-content"]'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-7'
                    );
                    expect(itemList.classList).toContain(
                        'slds-dropdown_length-with-icon-5'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-10'
                    );
                });
            });

            it('typeAttributes for list, dropdownLength = 10-items', () => {
                element.typeAttributes = {
                    dropdownLength: '10-items'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const itemList = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown-content"]'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-7'
                    );
                    expect(itemList.classList).not.toContain(
                        'slds-dropdown_length-with-icon-5'
                    );
                    expect(itemList.classList).toContain(
                        'slds-dropdown_length-with-icon-10'
                    );
                });
            });

            it('typeAttributes for list, dropdownWidth = small', () => {
                element.typeAttributes = {
                    dropdownWidth: 'small'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_small');
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_xx-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_x-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_medium'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_large'
                    );
                });
            });

            it('typeAttributes for list, dropdownWidth = xx-small', () => {
                element.typeAttributes = {
                    dropdownWidth: 'xx-small'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_small'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_xx-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_x-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_medium'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_large'
                    );
                });
            });

            it('typeAttributes for list, dropdownWidth = x-small', () => {
                element.typeAttributes = {
                    dropdownWidth: 'x-small'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_xx-small'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_x-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_medium'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_large'
                    );
                });
            });

            it('typeAttributes for list, dropdownWidth = medium', () => {
                element.typeAttributes = {
                    dropdownWidth: 'medium'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_xx-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_x-small'
                    );
                    expect(dropdown.classList).toContain(
                        'slds-dropdown_medium'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_large'
                    );
                });
            });

            it('typeAttributes for list, dropdownWidth = large', () => {
                element.typeAttributes = {
                    dropdownWidth: 'large'
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_xx-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_x-small'
                    );
                    expect(dropdown.classList).not.toContain(
                        'slds-dropdown_medium'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_large');
                });
            });

            it('typeAttributes for list, isMultiSelect = false', () => {
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: false
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="2"]'
                        );
                        item.click();
                        expect(handler.mock.calls[0][0].detail.value).toEqual([
                            ITEMS[2].value
                        ]);
                    })
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="1"]'
                        );
                        item.click();
                        expect(handler.mock.calls[1][0].detail.value).toEqual([
                            ITEMS[1].value
                        ]);
                    });
            });

            it('typeAttributes for list, isMultiSelect = false, hideApplyButton = true', () => {
                element.hideApplyButton = true;
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: false
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="2"]'
                        );
                        item.click();
                        expect(handler.mock.calls[0][0].detail.value).toEqual([
                            ITEMS[2].value
                        ]);
                    })
                    .then(() => {
                        button.click();
                    })
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="1"]'
                        );
                        item.click();
                        expect(handler.mock.calls[1][0].detail.value).toEqual([
                            ITEMS[1].value
                        ]);
                    });
            });

            it('typeAttributes for list, isMultiSelect = false, vertical variant', () => {
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: false
                };
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const choiceSet = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    expect(choiceSet.isMultiSelect).toBeFalsy();
                });
            });

            it('typeAttributes for list, isMultiSelect = true', () => {
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: true
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="2"]'
                        );
                        item.click();
                        expect(handler.mock.calls[0][0].detail.value).toEqual([
                            ITEMS[2].value
                        ]);
                    })
                    .then(() => {
                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="a-list-item"][data-index="1"]'
                        );
                        item.click();
                        expect(handler.mock.calls[1][0].detail.value).toEqual([
                            ITEMS[1].value,
                            ITEMS[2].value
                        ]);
                    });
            });

            it('typeAttributes for list, isMultiSelect = true, vertical variant', () => {
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: true
                };
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const choiceSet = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    expect(choiceSet.isMultiSelect).toBeTruthy();
                });
            });

            it('typeAttributes for range', () => {
                const typeAttributes = {
                    hideMinMaxValues: true,
                    isPercentage: true,
                    max: 117,
                    min: -45,
                    showPin: true,
                    showTickMarks: true,
                    step: 3,
                    tickMarkStyle: 'dot',
                    unit: 'currency',
                    unitAttributes: {
                        currencyCode: 'CAD'
                    }
                };
                element.type = 'range';
                element.typeAttributes = typeAttributes;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const slider = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-slider"]'
                    );
                    expect(slider.hideMinMaxValues).toBeTruthy();
                    expect(slider.isPercentage).toBeTruthy();
                    expect(slider.max).toBe(117);
                    expect(slider.min).toBe(-45);
                    expect(slider.showPin).toBeTruthy();
                    expect(slider.showTickMarks).toBeTruthy();
                    expect(slider.step).toBe(3);
                    expect(slider.tickMarkStyle).toBe('dot');
                    expect(slider.unit).toBe('currency');
                    expect(slider.unitAttributes).toEqual(
                        typeAttributes.unitAttributes
                    );
                    expect(slider.value).toEqual([-45, 117]);
                });
            });
        });

        describe('Value', () => {
            // Depends on items
            it('value', () => {
                element.value = VALUE;
                element.typeAttributes = { items: ITEMS, isMultiSelect: true };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    expect(items[0].classList).toContain('slds-is-selected');
                    expect(items[1].classList).toContain('slds-is-selected');
                    expect(items[2].classList).not.toContain(
                        'slds-is-selected'
                    );

                    const pillContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    expect(pillContainer.items).toEqual([
                        {
                            label: 'Item 1',
                            name: 'item-1'
                        },
                        {
                            label: 'Item 2',
                            name: 'item-2'
                        }
                    ]);
                });
            });

            it('value, date range type', () => {
                element.value = [new Date(2020, 0, 1), new Date(2020, 0, 31)];
                element.type = 'date-range';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange.startDate).toEqual(new Date(2020, 0, 1));
                    expect(dateRange.endDate).toEqual(new Date(2020, 0, 31));
                });
            });

            it('value, range type', () => {
                element.value = [0.35, 67];
                element.type = 'range';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const slider = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-slider"]'
                    );
                    expect(slider.value).toEqual([0.35, 67]);
                });
            });

            it('Selected value is not erased if same value is passed', () => {
                element.value = VALUE;
                element.typeAttributes = { items: ITEMS, isMultiSelect: true };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[0].ariaChecked).toBe('true');
                        expect(items[1].ariaChecked).toBe('true');
                        expect(items[2].ariaChecked).toBe('false');

                        items[2].click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[0].ariaChecked).toBe('true');
                        expect(items[1].ariaChecked).toBe('true');
                        expect(items[2].ariaChecked).toBe('true');

                        element.value = JSON.parse(JSON.stringify(VALUE));
                    })
                    .then(() => {
                        // Selected items were not erased
                        // because the new value was identical
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[0].ariaChecked).toBe('true');
                        expect(items[1].ariaChecked).toBe('true');
                        expect(items[2].ariaChecked).toBe('true');

                        element.value = [VALUE[0]];
                    })
                    .then(() => {
                        // Selected items were erased
                        // because the new value was different
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[0].ariaChecked).toBe('true');
                        expect(items[1].ariaChecked).toBe('false');
                        expect(items[2].ariaChecked).toBe('false');
                    });
            });
        });

        describe('Week Start Day', () => {
            it('Horizontal variant', () => {
                element.type = 'date-range';
                element.weekStartDay = 4;
                element.variant = 'horizontal';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="div-dropdown"]'
                    );
                    expect(dropdown.classList).toContain('slds-dropdown_large');

                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange.weekStartDay).toBe(4);
                });
            });

            it('Vertical variant', () => {
                element.type = 'date-range';
                element.weekStartDay = 4;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    expect(dateRange.weekStartDay).toBe(4);
                });
            });
        });

        describe('Variant', () => {
            it('variant = horizontal', () => {
                element.variant = 'horizontal';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button).toBeTruthy();
                });
            });

            it('variant = vertical', () => {
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const checkbox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );

                    expect(checkbox).toBeTruthy();
                    expect(element.shadowRoot.host.classList).not.toContain(
                        'slds-dropdown-trigger'
                    );
                    expect(element.shadowRoot.host.classList).not.toContain(
                        'slds-dropdown-trigger_click'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('Apply', () => {
            // Depends on value and items
            it('apply method', () => {
                element.value = VALUE;
                element.typeAttributes = { items: ITEMS };

                return Promise.resolve()
                    .then(() => {
                        element.apply();
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container"]'
                        );
                        expect(pills).toBeTruthy();
                    });
            });
        });

        describe('Focus', () => {
            // Depends on variant
            it('Horizontal variant', () => {
                const handler = jest.fn();
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.addEventListener('focus', handler);

                element.focus();
                expect(handler).toHaveBeenCalled();
            });

            it('Vertical variant', () => {
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const inputChoiceSet = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );
                    const spy = jest.spyOn(inputChoiceSet, 'focus');

                    element.focus();
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('Nested items', () => {
                element.variant = 'vertical';
                element.typeAttributes = { hasNestedItems: true };

                return Promise.resolve().then(() => {
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    const spy = jest.spyOn(tree, 'focus');

                    element.focus();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('Focus search input', () => {
            it('Horizontal variant', () => {
                element.typeAttributes = { allowSearch: true };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const search = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    const spy = jest.spyOn(search, 'focus');
                    element.focusSearchInput();
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('Vertical variant', () => {
                element.variant = 'vertical';
                element.typeAttributes = { allowSearch: true };

                return Promise.resolve().then(() => {
                    const search = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    const spy = jest.spyOn(search, 'focus');
                    element.focusSearchInput();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });

    describe('Events', () => {
        describe('Loadmore', () => {
            it('loadmore event', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                expect(handler).not.toHaveBeenCalled();

                element.typeAttributes = {
                    enableInfiniteLoading: true
                };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
                return Promise.resolve()
                    .then(() => {
                        // Dispatch loadmore when there are no items on opening
                        expect(handler).toHaveBeenCalledTimes(1);
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeTruthy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                    })
                    .then(() => {
                        // Dispatch loadmore when reaching the end of the list
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown-content"]'
                        );
                        jest.spyOn(
                            dropdown,
                            'scrollHeight',
                            'get'
                        ).mockReturnValue(100);
                        jest.spyOn(
                            dropdown,
                            'offsetHeight',
                            'get'
                        ).mockReturnValue(80);
                        dropdown.scrollTop = 20;

                        dropdown.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalledTimes(2);

                        element.isLoading = true;
                    })
                    .then(() => {
                        // Do not dispatch loadmore when loading
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown-content"]'
                        );
                        jest.spyOn(
                            dropdown,
                            'scrollHeight',
                            'get'
                        ).mockReturnValue(100);
                        jest.spyOn(
                            dropdown,
                            'offsetHeight',
                            'get'
                        ).mockReturnValue(80);
                        dropdown.scrollTop = 20;

                        dropdown.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalledTimes(2);
                    });
            });

            it('loadmore event, vertical variant', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                expect(handler).not.toHaveBeenCalled();

                element.variant = 'vertical';
                element.typeAttributes = {
                    enableInfiniteLoading: true
                };

                return Promise.resolve()
                    .then(() => {
                        // Dispatch loadmore when there are no items
                        expect(handler).toHaveBeenCalledTimes(1);
                    })
                    .then(() => {
                        // Dispatch loadmore when clicking on the load more button
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-load-more"]'
                        );
                        expect(button).toBeTruthy();
                        button.click();
                        expect(handler).toHaveBeenCalledTimes(2);

                        element.isLoading = true;
                    })
                    .then(() => {
                        // Do not show the load more button when loading
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-load-more"]'
                        );
                        expect(button).toBeFalsy();
                    });
            });

            it('loadmore event, nested items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.variant = 'vertical';
                element.typeAttributes = {
                    hasNestedItems: true,
                    items: ITEMS,
                    enableInfiniteLoading: true
                };

                return Promise.resolve().then(() => {
                    const tree = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-tree"]'
                    );
                    tree.dispatchEvent(
                        new CustomEvent('loadmore', {
                            detail: {
                                levelPath: [3]
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalledTimes(1);
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.item).toMatchObject(ITEMS[3]);
                });
            });
        });

        describe('Select', () => {
            // Depends on items and variant
            it('Horizontal variant', () => {
                const handler = jest.fn();
                element.addEventListener('select', handler);

                const applyHandler = jest.fn();
                element.addEventListener('apply', applyHandler);

                element.typeAttributes = {
                    items: ITEMS
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[2].ariaChecked).toBe('false');
                        items[2].click();

                        expect(applyHandler).not.toHaveBeenCalled();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeTruthy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                        expect(call.detail.value).toEqual(['item-3']);
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[2].ariaChecked).toBe('true');
                        items[2].click();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items[2].ariaChecked).toBe('false');
                    });
            });

            it('Vertical variant', () => {
                const handler = jest.fn();
                element.addEventListener('select', handler);
                element.variant = 'vertical';
                element.typeAttributes = { items: ITEMS };

                return Promise.resolve().then(() => {
                    const checkbox = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-choice-set"]'
                    );

                    checkbox.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: ['item-3']
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        'item-3'
                    ]);
                });
            });

            it('Date-range type', () => {
                const handler = jest.fn();
                element.addEventListener('select', handler);

                element.type = 'date-range';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-input-date-range"]'
                    );
                    const startDate = new Date(2022, 3, 4).toISOString();
                    const endDate = new Date(2022, 3, 5).toISOString();
                    dateRange.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                startDate,
                                endDate
                            }
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        startDate,
                        endDate
                    ]);
                });
            });

            it('Range type', () => {
                const handler = jest.fn();
                element.addEventListener('select', handler);

                element.type = 'range';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const dateRange = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-slider"]'
                    );
                    dateRange.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                value: [20, 80]
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        20, 80
                    ]);
                });
            });

            describe('Nested items', () => {
                it('Select root item', () => {
                    const handler = jest.fn();
                    element.addEventListener('select', handler);
                    element.variant = 'vertical';
                    element.typeAttributes = {
                        items: ITEMS,
                        hasNestedItems: true
                    };

                    return Promise.resolve().then(() => {
                        const tree = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-tree"]'
                        );

                        tree.dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    selectedItems: [ITEMS[1].value]
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toEqual([ITEMS[1].value]);
                    });
                });

                it('Select nested item', () => {
                    const handler = jest.fn();
                    element.addEventListener('select', handler);
                    element.variant = 'vertical';
                    element.typeAttributes = {
                        items: ITEMS,
                        hasNestedItems: true
                    };

                    return Promise.resolve().then(() => {
                        const tree = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-tree"]'
                        );

                        tree.dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    levelPath: [3, 0, 0],
                                    selectedItems: ['item-4-1-1']
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toEqual(['item-4-1-1']);
                    });
                });

                it('Select all child items', () => {
                    const handler = jest.fn();
                    element.addEventListener('select', handler);
                    element.variant = 'vertical';
                    element.typeAttributes = {
                        items: ITEMS,
                        hasNestedItems: true
                    };

                    return Promise.resolve().then(() => {
                        const tree = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-tree"]'
                        );

                        tree.dispatchEvent(
                            new CustomEvent('actionclick', {
                                detail: {
                                    levelPath: [3],
                                    name: 'select-all'
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toEqual([
                            'item-4',
                            'item-4-1',
                            'item-4-1-1'
                        ]);
                    });
                });
            });
        });

        describe('Apply', () => {
            // Depends on items and value
            it('apply event', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);

                element.typeAttributes = {
                    items: ITEMS
                };
                element.value = VALUE;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        items[3].click();
                        const applyButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-apply"]'
                        );
                        applyButton.click();

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.value).toEqual([
                            'item-4'
                        ]);
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(element.value).toEqual(['item-4']);
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeFalsy();
                    });
            });

            it('apply event, hideApplyButton = true', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);
                element.hideApplyButton = true;
                element.typeAttributes = {
                    items: ITEMS
                };
                element.value = VALUE;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        items[3].click();
                        const applyButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-apply"]'
                        );
                        expect(applyButton).toBeFalsy();

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.value).toEqual([
                            'item-4'
                        ]);
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(element.value).toEqual(['item-4']);
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeFalsy();
                    });
            });

            it('apply event on select, when hideapplyResetButtons is true', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);

                element.hideApplyResetButtons = true;
                element.typeAttributes = {
                    items: ITEMS
                };
                element.value = VALUE;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    items[3].click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        'item-4'
                    ]);
                    expect(element.value).toEqual(['item-4']);
                });
            });

            it('apply event on selected item removal', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);

                element.typeAttributes = {
                    items: ITEMS
                };
                element.value = [ITEMS[1].value, ITEMS[0].value];

                return Promise.resolve().then(() => {
                    const pillContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container"]'
                    );
                    pillContainer.dispatchEvent(
                        new CustomEvent('actionclick', {
                            detail: {
                                targetName: ITEMS[1].value,
                                index: 0
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        ITEMS[0].value
                    ]);
                    expect(element.value).toEqual([ITEMS[0].value]);
                });
            });

            it('apply event, multi-select', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);

                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: true
                };
                element.value = VALUE;

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    items[3].click();
                    const applyButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    applyButton.click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        ...VALUE,
                        'item-4'
                    ]);
                });
            });
            it('apply event, multi-select, hideApplyButton', () => {
                const handler = jest.fn();
                element.addEventListener('apply', handler);

                element.hideApplyButton = true;
                element.typeAttributes = {
                    items: ITEMS,
                    isMultiSelect: true
                };
                element.value = VALUE;

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    items[3].click();
                    const applyButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    expect(applyButton).toBeFalsy();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toEqual([
                        ...VALUE,
                        'item-4'
                    ]);
                });
            });
        });

        describe('Reset', () => {
            // Depends on items and value
            it('reset event', () => {
                const handler = jest.fn();
                element.addEventListener('reset', handler);

                element.typeAttributes = {
                    items: ITEMS
                };
                element.value = VALUE;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const resetButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-reset"]'
                        );
                        resetButton.click();

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        items.forEach((item) => {
                            expect(item.checked).toBeFalsy();
                        });
                    });
            });
        });
        describe('Close & Open', () => {
            it('close and open event', () => {
                const closeHandler = jest.fn();
                const openHandler = jest.fn();
                element.addEventListener('close', closeHandler);
                element.addEventListener('open', openHandler);

                let dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeFalsy();

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        expect(openHandler).toHaveBeenCalled();
                        expect(
                            openHandler.mock.calls[0][0].bubbles
                        ).toBeTruthy();
                        expect(
                            openHandler.mock.calls[0][0].cancelable
                        ).toBeFalsy();
                        expect(
                            openHandler.mock.calls[0][0].composed
                        ).toBeFalsy();

                        dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();

                        button.click();
                    })
                    .then(() => {
                        expect(closeHandler).toHaveBeenCalled();
                        expect(
                            closeHandler.mock.calls[0][0].bubbles
                        ).toBeTruthy();
                        expect(
                            closeHandler.mock.calls[0][0].cancelable
                        ).toBeFalsy();
                        expect(
                            closeHandler.mock.calls[0][0].composed
                        ).toBeFalsy();

                        dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeFalsy();
                    });
            });

            it('close and open event, vertical variant', () => {
                const closeHandler = jest.fn();
                const openHandler = jest.fn();
                element.addEventListener('close', closeHandler);
                element.addEventListener('open', openHandler);
                element.variant = 'vertical';
                element.collapsible = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-toggle"]'
                        );
                        const div = element.shadowRoot.querySelector(
                            '[data-element-id="div-vertical-list"]'
                        );
                        expect(div).toBeTruthy();

                        button.click();
                        expect(closeHandler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-icon-toggle"]'
                        );
                        const div = element.shadowRoot.querySelector(
                            '[data-element-id="div-vertical-list"]'
                        );
                        expect(div).toBeFalsy();

                        button.click();
                        expect(openHandler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const div = element.shadowRoot.querySelector(
                            '[data-element-id="div-vertical-list"]'
                        );
                        expect(div).toBeTruthy();
                    });
            });

            it('dropdown closes on blur', () => {
                const handler = jest.fn();
                element.addEventListener('close', handler);

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();

                        // Blur and immediately focus: the dropdown should not close
                        dropdown.dispatchEvent(new CustomEvent('focusout'));
                        dropdown.dispatchEvent(new CustomEvent('focusin'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();

                        // Blur without focusing: the dropdown should close
                        dropdown.dispatchEvent(new CustomEvent('focusout'));
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeFalsy();
                        expect(handler).toHaveBeenCalled();
                    });
            });

            it('dropdown closes on Escape key', () => {
                const handler = jest.fn();
                element.addEventListener('close', handler);

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();

                        // For any other key, the drodpown should not close
                        const keyEvent = new CustomEvent('keyup');
                        keyEvent.key = 'Space';
                        dropdown.dispatchEvent(keyEvent);
                        expect(handler).not.toHaveBeenCalled();

                        // For Escape key, the drodpown should close
                        keyEvent.key = 'Escape';
                        dropdown.dispatchEvent(keyEvent);
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeFalsy();
                    });
            });
        });

        describe('Search', () => {
            // Depends on items and allowSearch
            it('search event', () => {
                const handler = jest.fn();
                element.addEventListener('search', handler);
                jest.useFakeTimers();

                element.typeAttributes = {
                    items: ITEMS,
                    allowSearch: true
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input"]'
                        );
                        input.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: 'Searchable'
                                }
                            })
                        );

                        jest.runAllTimers();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toBe('Searchable');
                        expect(call.bubbles).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                        expect(call.cancelable).toBeFalsy();
                    })
                    .then(() => {
                        const items = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-list-item"]'
                        );
                        expect(items).toHaveLength(1);
                        expect(items[0].dataset.value).toBe('item-3');
                    });
            });

            it('Search expands nested items', () => {
                const handler = jest.fn();
                element.addEventListener('search', handler);
                jest.useFakeTimers();

                element.typeAttributes = {
                    items: ITEMS,
                    allowSearch: true,
                    hasNestedItems: true
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-input"]'
                        );
                        input.dispatchEvent(
                            new CustomEvent('change', {
                                detail: {
                                    value: '1'
                                }
                            })
                        );

                        jest.runAllTimers();
                    })
                    .then(() => {
                        const tree = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-tree"]'
                        );
                        expect(tree.items).toHaveLength(2);
                        expect(tree.items[0]).toMatchObject(ITEMS[0]);
                        expect(tree.items[1]).toMatchObject({
                            label: 'Item 4',
                            value: 'item-4',
                            enableInfiniteLoading: true,
                            expanded: true,
                            items: [
                                {
                                    label: 'Item 4.1',
                                    value: 'item-4-1',
                                    expanded: true,
                                    items: [
                                        {
                                            value: 'item-4-1-1',
                                            label: 'Item 4.1.1',
                                            enableInfiniteLoading: true
                                        }
                                    ]
                                }
                            ]
                        });
                    });
            });
        });

        describe('Blur', () => {
            // blur
            it('blur event (button blur)', () => {
                const handler = jest.fn();
                element.addEventListener('blur', handler);

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.focus();
                button.blur();
                expect(handler).toHaveBeenCalled();
            });

            // content blur
            // Depends on items
            it('blur of an inside element', () => {
                element.typeAttributes = {
                    items: ITEMS
                };
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve()
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();

                        const item = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-formatted-rich-text-item-label"]'
                        );
                        item.dispatchEvent(
                            new CustomEvent('privatefocus', {
                                bubbles: true,
                                cancelable: true,
                                detail: {
                                    value: item.value
                                }
                            })
                        );
                        item.dispatchEvent(
                            new CustomEvent('privateblur', {
                                composed: true,
                                bubbles: true,
                                cancelable: true
                            })
                        );
                    })
                    .then(() => {
                        const dropdown = element.shadowRoot.querySelector(
                            '[data-element-id="div-dropdown"]'
                        );
                        expect(dropdown).toBeTruthy();
                    });
            });
        });

        describe('Private Button Register', () => {
            it('privatebuttonregister event', () => {
                element = createElement('base-filter-menu', {
                    is: FilterMenu
                });

                const mockDeRegistrationCallback = jest.fn();

                const handler = jest.fn().mockImplementation((event) => {
                    event.detail.callbacks.setDeRegistrationCallback(
                        mockDeRegistrationCallback
                    );
                });
                element.addEventListener('privatebuttonregister', handler);

                document.body.appendChild(element);

                expect(handler).toHaveBeenCalled();
                expect(
                    handler.mock.calls[0][0].detail.callbacks
                        .setDeRegistrationCallback
                ).toBeTruthy();
                expect(
                    handler.mock.calls[0][0].detail.callbacks.setOrder
                ).toBeTruthy();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();

                while (document.body.firstChild) {
                    document.body.removeChild(document.body.firstChild);
                }

                expect(mockDeRegistrationCallback).toHaveBeenCalled();
            });
        });

        describe('Keyboard navigation', () => {
            it('Keyboard navigation between the list items', () => {
                element.typeAttributes = { items: ITEMS };

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-list-item"]'
                    );
                    const secondItemSpy = jest.spyOn(items[1], 'focus');
                    const firstItemSpy = jest.spyOn(items[0], 'focus');
                    const lastItemSpy = jest.spyOn(
                        items[items.length - 1],
                        'focus'
                    );
                    const keyEvent = new CustomEvent('keydown');
                    keyEvent.key = 'ArrowDown';
                    items[0].dispatchEvent(keyEvent);
                    expect(secondItemSpy).toHaveBeenCalled();
                    expect(firstItemSpy).not.toHaveBeenCalled();
                    expect(lastItemSpy).not.toHaveBeenCalled();

                    keyEvent.key = 'ArrowUp';
                    items[1].dispatchEvent(keyEvent);
                    expect(firstItemSpy).toHaveBeenCalled();
                    expect(lastItemSpy).not.toHaveBeenCalled();

                    keyEvent.key = 'ArrowUp';
                    items[0].dispatchEvent(keyEvent);
                    expect(lastItemSpy).toHaveBeenCalled();
                });
            });
        });
    });
});

import FilterMenuGroup from 'c/filterMenuGroup';
import { createElement } from 'lwc';
import { MENUS, VALUE } from './data';

let element;
describe('FilterMenuGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-filter-menu-group', {
            is: FilterMenuGroup
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.applyButtonLabel).toBe('Apply');
            expect(element.hideApplyButton).toBeFalsy();
            expect(element.hideApplyResetButtons).toBeFalsy();
            expect(element.hideSelectedItems).toBeFalsy();
            expect(element.isToggleButtonVariant).toBeFalsy();
            expect(element.menus).toMatchObject([]);
            expect(element.offsetFilterWidth).toBe(0);
            expect(element.resetButtonLabel).toBe('Clear selection');
            expect(element.showClearButton).toBeFalsy();
            expect(element.showSelectedFilterValueCount).toBeFalsy();
            expect(element.value).toEqual({});
            expect(element.variant).toBe('horizontal');
            expect(element.wrapperWidth).toBe(0);
        });

        describe('applyButtonLabel', () => {
            // Depends on variant
            it('applyButtonLabel, with horizontal variant', () => {
                element.applyButtonLabel = 'Save';
                element.variant = 'horizontal';

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.applyButtonLabel).toBe('Save');
                    });
                });
            });
        });

        describe('hideApplyResetButtons', () => {
            it('Passed to the component as false', () => {
                element.menus = MENUS;
                element.hideApplyResetButtons = false;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.hideApplyResetButtons).toBeFalsy();
                    });
                });
            });

            it('Passed to the component as true', () => {
                element.menus = MENUS;
                element.hideApplyResetButtons = true;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.hideApplyResetButtons).toBeTruthy();
                    });
                });
            });

            it('hideApplyResetButtons, vertical variant', () => {
                element.menus = MENUS;
                element.hideApplyResetButtons = true;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const apply = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-apply"]'
                    );
                    const reset = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    expect(apply).toBeFalsy();
                    expect(reset).toBeFalsy();
                });
            });
        });

        describe('hideSelectedItems', () => {
            it('Passed to the component as false', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.hideSelectedItems = false;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container-horizontal"]'
                    );
                    expect(pills).toBeTruthy();
                });
            });

            it('Passed to the component as true', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.hideSelectedItems = true;

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container-horizontal"]'
                    );
                    expect(pills).toBeFalsy();
                });
            });

            it('Passed to the component as false, vertical variant', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.hideSelectedItems = false;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container-vertical"]'
                    );
                    expect(pills).toBeTruthy();
                });
            });

            it('Passed to the component as true, vertical variant', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.hideSelectedItems = true;
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container-vertical"]'
                    );
                    expect(pills).toBeFalsy();
                });
            });
        });

        describe('isToggleButtonVariant', () => {
            it('isToggleButtonVariant, true', () => {
                element.isToggleButtonVariant = true;
                expect(element.isToggleButtonVariant).toBeTruthy();
            });

            it('isToggleButtonVariant, false', () => {
                element.isToggleButtonVariant = false;
                expect(element.isToggleButtonVariant).toBeFalsy();
            });
        });

        describe('menus', () => {
            it('Passed to the component', () => {
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    expect(menus).toHaveLength(MENUS.length);
                    menus.forEach((menu, i) => {
                        expect(menu.accessKey).toBe(MENUS[i].accessKey);
                        expect(menu.alternativeText).toBe(
                            MENUS[i].alternativeText
                        );
                        expect(menu.closed).toBe(MENUS[i].closed);
                        expect(menu.collapsible).toBe(MENUS[i].collapsible);
                        expect(menu.disabled).toBe(MENUS[i].disabled);
                        expect(menu.iconName).toBe(MENUS[i].iconName);
                        expect(menu.iconSize).toBe(MENUS[i].iconSize);
                        expect(menu.isLoading).toBe(MENUS[i].isLoading);
                        expect(menu.label).toBe(MENUS[i].label);
                        expect(menu.loadingStateAlternativeText).toBe(
                            MENUS[i].loadingStateAlternativeText
                        );
                        expect(menu.type).toBe(MENUS[i].type);
                        expect(menu.typeAttributes).toEqual(
                            MENUS[i].typeAttributes
                        );
                        expect(menu.title).toBe(MENUS[i].title);
                        expect(menu.tooltip).toBe(MENUS[i].tooltip);
                        expect(menu.value).toEqual([]);
                        expect(menu.buttonVariant).toBe(MENUS[i].buttonVariant);
                        expect(menu.dropdownAlignment).toBe(
                            MENUS[i].dropdownAlignment
                        );
                        expect(menu.name).toBe(MENUS[i].name);
                    });
                });
            });
        });

        describe('offsetFilterWidth', () => {
            it('offsetFilterWidth = null', () => {
                element.offsetFilterWidth = null;
                expect(element.offsetFilterWidth).toBe(0);
            });

            it('offsetFilterWidth = undefined', () => {
                element.offsetFilterWidth = undefined;
                expect(element.offsetFilterWidth).toBe(0);
            });

            it('offsetFilterWidth = -1', () => {
                element.offsetFilterWidth = -1;
                expect(element.offsetFilterWidth).toBe(0);
            });

            it('offsetFilterWidth = 1', () => {
                element.offsetFilterWidth = 1;
                expect(element.offsetFilterWidth).toBe(1);
            });
        });

        describe('resetButtonLabel', () => {
            it('Passed to the component with horizontal variant', () => {
                element.resetButtonLabel = 'Erase';
                element.variant = 'horizontal';

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.resetButtonLabel).toBe('Erase');
                    });
                });
            });

            it('Passed to the component with vertical variant', () => {
                element.resetButtonLabel = 'Erase';
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    expect(button.label).toBe('Erase');
                });
            });
        });

        describe('showClearButton', () => {
            it('Passed to the component as true', () => {
                element.showClearButton = true;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.showClearButton).toBeTruthy();
                    });
                });
            });

            it('Passed to the component as false', () => {
                element.showClearButton = false;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.showClearButton).toBeFalsy();
                    });
                });
            });
        });

        describe('showSelectedFilterValueCount', () => {
            it('Passed to the component as true', () => {
                element.showSelectedFilterValueCount = true;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.showSelectedFilterValueCount).toBeTruthy();
                    });
                });
            });

            it('Passed to the component as false', () => {
                element.showSelectedFilterValueCount = false;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.showSelectedFilterValueCount).toBeFalsy();
                    });
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = VALUE;
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    expect(menus[0].value).toEqual([VALUE.contact]);
                    expect(menus[2].value).toEqual(VALUE.editions);
                    expect(menus[4].value).toEqual(VALUE.publication);
                    [1, 3].forEach((i) => {
                        expect(menus[i].value).toEqual([]);
                    });

                    const pills = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-pill-container-horizontal"]'
                    );
                    expect(pills.items).toHaveLength(4);
                });
            });
        });

        describe('variant', () => {
            it('Passed to the component as horizontal', () => {
                element.variant = 'horizontal';
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.hideApplyResetButtons).toBeFalsy();
                    });

                    const buttonGroupRow = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );
                    expect(buttonGroupRow.classList).toContain('slds-grid');

                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-button-reset"]'
                    );
                    expect(buttons).toHaveLength(0);
                });
            });

            it('Passed to the component as vertical', () => {
                element.variant = 'vertical';
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menus = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="avonni-filter-menu"]'
                    );
                    menus.forEach((menu) => {
                        expect(menu.hideApplyResetButtons).toBeTruthy();
                    });

                    const buttonGroupRow = element.shadowRoot.querySelector(
                        '[data-element-id="ul"]'
                    );
                    expect(buttonGroupRow.classList).not.toContain('slds-grid');

                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });
        });

        describe('wrapperWidth', () => {
            it('wrapperWidth = null', () => {
                element.wrapperWidth = null;
                expect(element.wrapperWidth).toBe(0);
            });

            it('wrapperWidth = undefined', () => {
                element.wrapperWidth = undefined;
                expect(element.wrapperWidth).toBe(0);
            });

            it('wrapperWidth = -1', () => {
                element.wrapperWidth = -1;
                expect(element.wrapperWidth).toBe(0);
            });

            it('wrapperWidth = 1', () => {
                element.wrapperWidth = 1;
                expect(element.wrapperWidth).toBe(1);
            });

            it('wrapperWidth  = 100000', () => {
                element.menus = MENUS;
                element.wrapperWidth = 100000;
                expect(element.wrapperWidth).toBe(100000);
                return Promise.resolve()
                    .then(() => {
                        jest.runAllTimers();
                        expect(element.wrapperWidth).toBe(100000);
                    })
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-filter-menu"]'
                        );
                        expect(menus).toHaveLength(MENUS.length);
                        menus.forEach((menu, i) => {
                            expect(menu.accessKey).toBe(MENUS[i].accessKey);
                            expect(menu.alternativeText).toBe(
                                MENUS[i].alternativeText
                            );
                            expect(menu.closed).toBe(MENUS[i].closed);
                            expect(menu.collapsible).toBe(MENUS[i].collapsible);
                            expect(menu.disabled).toBe(MENUS[i].disabled);
                            expect(menu.iconName).toBe(MENUS[i].iconName);
                            expect(menu.iconSize).toBe(MENUS[i].iconSize);
                            expect(menu.isLoading).toBe(MENUS[i].isLoading);
                            expect(menu.label).toBe(MENUS[i].label);
                            expect(menu.loadingStateAlternativeText).toBe(
                                MENUS[i].loadingStateAlternativeText
                            );
                            expect(menu.type).toBe(MENUS[i].type);
                            expect(menu.typeAttributes).toEqual(
                                MENUS[i].typeAttributes
                            );
                            expect(menu.title).toBe(MENUS[i].title);
                            expect(menu.tooltip).toBe(MENUS[i].tooltip);
                            expect(menu.value).toEqual([]);
                            expect(menu.buttonVariant).toBe(
                                MENUS[i].buttonVariant
                            );
                            expect(menu.dropdownAlignment).toBe(
                                MENUS[i].dropdownAlignment
                            );
                            expect(menu.name).toBe(MENUS[i].name);
                        });
                    });
            });
        });
    });

    describe('Methods', () => {
        describe('apply', () => {
            it('apply method', () => {
                element.menus = MENUS;

                return Promise.resolve()
                    .then(() => {
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menu.dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(element.value).toEqual({});
                        element.apply();
                        expect(element.value).toEqual({ contact: ['call'] });
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });
        });

        describe('focus', () => {
            it('focus method', () => {
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    const spy = jest.spyOn(menu, 'focus');
                    element.focus();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('focusSearchInput', () => {
            it('focusSearchInput method', () => {
                element.menus = MENUS;

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"][data-name="price"]'
                    );
                    const spy = jest.spyOn(menu, 'focusSearchInput');
                    element.focusSearchInput('price');
                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('reset', () => {
            it('reset method', () => {
                element.menus = MENUS;
                element.value = VALUE;

                return Promise.resolve()
                    .then(() => {
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        expect(menu.value).toEqual(['other']);
                        element.reset();
                    })
                    .then(() => {
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        expect(menu.value).toEqual([]);
                        expect(element.value).toEqual(VALUE);
                    });
            });
        });
    });

    describe('Events', () => {
        describe('apply', () => {
            it('apply event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('apply', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toEqual({
                            contact: ['call']
                        });
                        expect(call.detail.name).toBe('contact');
                        expect(call.bubbles).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                        expect(call.cancelable).toBeFalsy();
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, vertical variant', () => {
                element.menus = MENUS;
                element.variant = 'vertical';
                element.value = {
                    editions: ['professional', 'enterprise'],
                    contact: 'other',
                    publication: [
                        '2019-01-01T00:00:00.000Z',
                        '2019-01-31T13:40:00.000Z'
                    ]
                };

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        menus[1].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: [2, 45]
                                },
                                bubbles: true
                            })
                        );
                        const applyButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-apply"]'
                        );
                        applyButton.click();

                        expect(handler).toHaveBeenCalled();
                        expect(element.value).toEqual({
                            editions: ['professional', 'enterprise'],
                            contact: ['call'],
                            price: [2, 45],
                            publication: [
                                '2019-01-01T00:00:00.000Z',
                                '2019-01-31T13:40:00.000Z'
                            ]
                        });
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-vertical"]'
                        );
                        expect(pills.items).toHaveLength(5);
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, hideApplyResetButtons', () => {
                element.menus = MENUS;
                element.hideApplyResetButtons = true;

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('apply', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.value).toEqual({
                            contact: ['call']
                        });
                        expect(detail.name).toBe('contact');
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items).toHaveLength(1);
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, hideApplyButton', () => {
                element.menus = MENUS;
                element.hideApplyButton = true;

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('apply', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(2);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.value).toEqual({
                            contact: ['call']
                        });
                        expect(detail.name).toBe('contact');
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items).toHaveLength(1);
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, hideApplyResetButtons with vertical variant', () => {
                element.menus = MENUS;
                element.hideApplyResetButtons = true;
                element.variant = 'vertical';

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('apply', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.value).toEqual({
                            contact: ['call']
                        });
                        expect(detail.name).toBe('contact');
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-vertical"]'
                        );
                        expect(pills.items).toHaveLength(1);
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, hideApplyButton with vertical variant', () => {
                element.menus = MENUS;
                element.hideApplyButton = true;
                element.variant = 'vertical';

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('select', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );
                        menus[0].dispatchEvent(
                            new CustomEvent('apply', {
                                detail: {
                                    value: ['call']
                                },
                                bubbles: true
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.value).toEqual({
                            contact: ['call']
                        });
                        expect(detail.name).toBe('contact');
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-vertical"]'
                        );
                        expect(pills.items).toHaveLength(1);
                        expect(pills.items[0].name).toBe('contact.call');
                    });
            });

            it('apply event, remove a selected item', () => {
                element.menus = MENUS;
                element.value = VALUE;

                const handler = jest.fn();
                element.addEventListener('apply', handler);

                return Promise.resolve()
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items).toHaveLength(4);
                        pills.dispatchEvent(
                            new CustomEvent('actionclick', {
                                detail: {
                                    index: 1
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.value).toEqual({
                            editions: ['enterprise'],
                            contact: 'other',
                            publication: [
                                '2019-01-01T00:00:00.000Z',
                                '2019-01-31T13:40:00.000Z'
                            ]
                        });
                    })
                    .then(() => {
                        const pills = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-pill-container-horizontal"]'
                        );
                        expect(pills.items).toHaveLength(3);
                    });
            });
        });

        describe('close', () => {
            it('close event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('close', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('close', {
                            detail: {
                                name: MENUS[0].name
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe(MENUS[0].name);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('loadmore', () => {
            it('loadmore event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('loadmore', {
                            detail: { item: MENUS[0].typeAttributes.items[0] },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.item).toEqual(
                        MENUS[0].typeAttributes.items[0]
                    );
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('loadtotalcount', () => {
            it('loadtotalcount event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('loadtotalcount', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('loadtotalcount', {
                            detail: {
                                name: MENUS[0].name
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe(MENUS[0].name);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('open', () => {
            it('open event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('open', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('open', {
                            detail: {
                                name: MENUS[0].name
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe(MENUS[0].name);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('reset', () => {
            it('reset event', () => {
                element.menus = MENUS;
                element.value = VALUE;

                const handler = jest.fn();
                element.addEventListener('reset', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('reset', { bubbles: true })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();

                    expect(element.value).toEqual(VALUE);
                });
            });

            it('reset event, vertical variant, showClearButton = false', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.variant = 'vertical';
                element.showClearButton = false;

                const handler = jest.fn();
                element.addEventListener('reset', handler);

                return Promise.resolve()
                    .then(() => {
                        const resetButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-reset"]'
                        );
                        resetButton.click();

                        expect(handler).toHaveBeenCalled();
                        expect(
                            handler.mock.calls[0][0].detail.name
                        ).toBeUndefined();
                    })
                    .then(() => {
                        const menus = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-filter-menu"]'
                        );
                        menus.forEach((menu) => {
                            expect(menu.value).toEqual([]);
                        });
                        expect(element.value).toEqual(VALUE);
                    });
            });

            it('reset event, vertical variant, showClearButton = true', () => {
                element.menus = MENUS;
                element.value = VALUE;
                element.variant = 'vertical';
                element.showClearButton = true;

                const handler = jest.fn();
                element.addEventListener('reset', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('reset', { bubbles: true })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();

                    expect(element.value).toEqual(VALUE);
                });
            });
        });

        describe('search', () => {
            it('search event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('search', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('search', {
                            detail: {
                                value: 'some research'
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.value).toBe('some research');
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });
        });

        describe('select', () => {
            it('select event', () => {
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('select', {
                            detail: {
                                value: ['call']
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.value).toEqual(['call']);
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(element.value).toEqual({});
                });
            });

            it('select event, hideApplyButton', () => {
                element.hideApplyButton = true;
                element.menus = MENUS;

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve().then(() => {
                    const menu = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-filter-menu"]'
                    );
                    menu.dispatchEvent(
                        new CustomEvent('select', {
                            detail: {
                                value: ['call']
                            },
                            bubbles: true
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.value).toEqual(['call']);
                    expect(call.detail.name).toBe('contact');
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(element.value).toEqual({ contact: ['call'] });
                });
            });
        });
    });
});

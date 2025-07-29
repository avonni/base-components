import { createElement } from 'lwc';
import MenuItemDialog from 'c/menuItemDialog';

let element;
describe('MenuItemDialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.draftAlternativeText).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.isDraft).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.prefixIconName).toBeUndefined();
            expect(element.tabIndex).toBe('0');
            expect(element.value).toBeUndefined();
        });

        describe('accessKey', () => {
            it('Passed to the component', () => {
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a"]'
                );
                element.accessKey = 'K';

                return Promise.resolve().then(() => {
                    expect(link.accessKey).toBe('K');
                });
            });
        });

        describe('disabled', () => {
            it('false', () => {
                let eventDispatched = false;
                element.disabled = false;
                element.addEventListener('privateselect', () => {
                    eventDispatched = true;
                });

                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a"]'
                );
                link.click();

                return Promise.resolve().then(() => {
                    expect(eventDispatched).toBeTruthy();
                });
            });

            it('true', () => {
                let eventDispatched = false;
                element.disabled = true;
                element.addEventListener('privateselect', () => {
                    eventDispatched = true;
                });

                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a"]'
                );
                link.click();

                return Promise.resolve().then(() => {
                    expect(eventDispatched).toBeFalsy();
                });
            });
        });

        describe('draftAlternativeText', () => {
            it('Passed to the component', () => {
                element.draftAlternativeText = 'A string alternative text';
                element.isDraft = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr.title).toBe('A string alternative text');
                });
            });
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon).toBeTruthy();
                });
            });
        });

        describe('isDraft', () => {
            it('false', () => {
                element.isDraft = false;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeFalsy();
                });
            });

            it('true', () => {
                element.isDraft = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeTruthy();
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(span.textContent).toBe('A string label');
                    expect(span.title).toBe('A string label');
                });
            });
        });

        describe('prefixIconName', () => {
            it('Passed to the component', () => {
                element.prefixIconName = 'standard:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-prefix"]'
                    );
                    expect(icon).toBeTruthy();
                });
            });
        });

        describe('tabIndex', () => {
            it('Passed to the component', () => {
                element.tabIndex = '-1';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    expect(link.getAttribute('tabindex')).toBe('-1');
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                let eventDetailValue;
                element.value = 'a-string-value';
                element.addEventListener('privateselect', (event) => {
                    eventDetailValue = event.detail.value;
                });

                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a"]'
                );
                link.click();

                return Promise.resolve().then(() => {
                    expect(eventDetailValue).toBe('a-string-value');
                });
            });
        });
    });

    describe('Methods', () => {
        describe('focus', () => {
            it('Dispatches a focus event', () => {
                let focusEvent = false;
                element.addEventListener('focus', () => {
                    focusEvent = true;
                });

                element.focus();

                return Promise.resolve().then(() => {
                    expect(focusEvent).toBeTruthy();
                });
            });
        });
    });
});

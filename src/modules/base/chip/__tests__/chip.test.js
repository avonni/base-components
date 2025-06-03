import { createElement } from 'lwc';
import Chip from 'c/chip';

let element;
describe('Chip', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-chip', {
            is: Chip
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.backgroundColor).toBeUndefined();
            expect(element.hideText).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.outline).toBeFalsy();
            expect(element.textColor).toBeUndefined();
            expect(element.variant).toBe('base');
        });

        describe('backgroundColor', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';
                element.backgroundColor = 'red';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(
                        span.style.getPropertyValue(
                            '--avonni-chip-base-color-background'
                        )
                    ).toBe('red');
                });
            });

            it('Outline is set to true', () => {
                element.label = 'This is a label';
                element.outline = true;
                element.backgroundColor = 'red';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(
                        span.style.getPropertyValue(
                            '--avonni-chip-base-outline-color'
                        )
                    ).toBe('red');
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.textContent).toBe('This is a label');
                });
            });
        });

        describe('variant', () => {
            it('alt-inverse', () => {
                element.variant = 'alt-inverse';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-alt-inverse'
                    );
                });
            });

            it('base', () => {
                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-base'
                    );
                });
            });

            it('brand', () => {
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-brand'
                    );
                });
            });

            it('error', () => {
                element.variant = 'error';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-error'
                    );
                });
            });

            it('info', () => {
                element.variant = 'info';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-info'
                    );
                });
            });

            it('inverse', () => {
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-inverse'
                    );
                });
            });

            it('offline', () => {
                element.variant = 'offline';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-offline'
                    );
                });
            });

            it('success', () => {
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-success'
                    );
                });
            });

            it('warning', () => {
                element.variant = 'warning';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-wrapper"]'
                    );
                    expect(span.className).toBe(
                        'avonni-chip avonni-chip_theme-warning'
                    );
                });
            });
        });

        it('outline', () => {
            element.outline = true;

            return Promise.resolve().then(() => {
                const span = element.shadowRoot.querySelector(
                    '[data-element-id="span-wrapper"]'
                );
                expect(span.className).toContain('avonni-chip_outline');
            });
        });
    });

    describe('Slots', () => {
        it('left slot visibility', () => {
            const leftSlot = element.shadowRoot.querySelector(
                '[data-element-id="slot-left"]'
            );
            expect(leftSlot.classList).toContain('slds-hide');

            leftSlot.assignedElements = jest.fn(() => {
                return 1;
            });
            leftSlot.dispatchEvent(new CustomEvent('slotchange'));
            expect(leftSlot.classList).not.toContain('slds-hide');
        });

        it('right slot visibility', () => {
            const rightSlot = element.shadowRoot.querySelector(
                '[data-element-id="slot-right"]'
            );
            expect(rightSlot.classList).toContain('slds-hide');

            rightSlot.assignedElements = jest.fn(() => {
                return 1;
            });
            rightSlot.dispatchEvent(new CustomEvent('slotchange'));
            expect(rightSlot.classList).not.toContain('slds-hide');
        });
    });
});

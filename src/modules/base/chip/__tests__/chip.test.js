

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

    it('Chip: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.outline).toBeFalsy();
        expect(element.variant).toBe('base');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // label
    it('Chip: label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.textContent).toBe('This is a label');
        });
    });

    // variant
    it('Chip: variant base', () => {
        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-base');
        });
    });

    it('Chip: variant brand', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-brand');
        });
    });

    it('Chip: variant inverse', () => {
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

    it('Chip: variant alt-inverse', () => {
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

    it('Chip: variant success', () => {
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

    it('Chip: variant info', () => {
        element.variant = 'info';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-info');
        });
    });

    it('Chip: variant warning', () => {
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

    it('Chip: variant error', () => {
        element.variant = 'error';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toBe('avonni-chip avonni-chip_theme-error');
        });
    });

    it('Chip: variant offline', () => {
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

    // outline
    it('Chip: outline', () => {
        element.outline = true;

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '[data-element-id="span-wrapper"]'
            );
            expect(span.className).toContain('avonni-chip_outline');
        });
    });

    /*
     * ------------------------------------------------------------
     *  SLOTS
     * -------------------------------------------------------------
     */

    // Left slot visibility
    it('Chip: left slot visibility', () => {
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

    // Right slot visibility
    it('Chip: right slot visibility', () => {
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

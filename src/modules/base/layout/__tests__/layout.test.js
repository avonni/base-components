import { createElement } from 'lwc';
import Layout from '../layout';

// NOT TESTED:
// Resize observer
// sizechange event (depends on the resize observer)

let element;
describe('Layout', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-layout', {
            is: Layout
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.direction).toBe('row');
        expect(element.horizontalAlign).toBe('start');
        expect(element.multipleRows).toBeFalsy();
        expect(element.verticalAlign).toBe('stretch');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // direction
    it('Layout: direction = row', () => {
        element.direction = 'row';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe('slds-grid avonni-layout-wrapper');
        });
    });

    it('Layout: direction = column', () => {
        element.direction = 'column';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_vertical'
            );
        });
    });

    it('Layout: direction = row-reverse', () => {
        element.direction = 'row-reverse';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_reverse'
            );
        });
    });

    it('Layout: direction = column-reverse', () => {
        element.direction = 'column-reverse';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_vertical-reverse'
            );
        });
    });

    // horizontal-align
    it('Layout: horizontalAlign = start', () => {
        element.horizontalAlign = 'start';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe('slds-grid avonni-layout-wrapper');
        });
    });

    it('Layout: horizontalAlign = center', () => {
        element.horizontalAlign = 'center';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_align-center'
            );
        });
    });

    it('Layout: horizontalAlign = end', () => {
        element.horizontalAlign = 'end';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_align-end'
            );
        });
    });

    it('Layout: horizontalAlign = space', () => {
        element.horizontalAlign = 'space';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_align-space'
            );
        });
    });

    it('Layout: horizontalAlign = spread', () => {
        element.horizontalAlign = 'spread';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_align-spread'
            );
        });
    });

    // multiple-rows
    it('Layout: multipleRows = false', () => {
        element.multipleRows = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe('slds-grid avonni-layout-wrapper');
        });
    });

    it('Layout: multipleRows = true', () => {
        element.multipleRows = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-wrap'
            );
        });
    });

    // vertical-align
    it('Layout: verticalAlign = stretch', () => {
        element.verticalAlign = 'stretch';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe('slds-grid avonni-layout-wrapper');
        });
    });

    it('Layout: verticalAlign = start', () => {
        element.verticalAlign = 'start';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_vertical-align-start'
            );
        });
    });

    it('Layout: verticalAlign = end', () => {
        element.verticalAlign = 'end';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_vertical-align-end'
            );
        });
    });

    it('Layout: verticalAlign = center', () => {
        element.verticalAlign = 'center';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.className).toBe(
                'slds-grid avonni-layout-wrapper slds-grid_vertical-align-center'
            );
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // item connected
    it('Layout: set container size on item connexion', () => {
        const callback = jest.fn();
        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.dispatchEvent(
            new CustomEvent('privatelayoutitemconnected', {
                detail: {
                    name: 'numberOne',
                    callbacks: {
                        setContainerSize: callback
                    }
                }
            })
        );
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0][0]).toBe('default');
    });
});

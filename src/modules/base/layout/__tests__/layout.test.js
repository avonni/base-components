/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { createElement } from 'lwc';
import Layout from '../layout';

// NOT TESTED:
// Resize observer

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
        // The width is not defined yet
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0][0]).toBeUndefined();

        wrapper.style.width = '2000px';
        return Promise.resolve(() => {
            // The width is set and passed to the items on render
            expect(callback).toHaveBeenCalledTimes(2);
            expect(callback.mock.calls[1][0]).toBe('large');
        });
    });
});

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
import LayoutItem from '../layoutItem';

let element;
describe('Layout Item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-layout-item', {
            is: LayoutItem
        });
    });

    it('Default attributes', () => {
        document.body.appendChild(element);
        expect(element.alignmentBump).toBeUndefined();
        expect(element.largeContainerOrder).toBeUndefined();
        expect(element.largeContainerSize).toBeUndefined();
        expect(element.mediumContainerOrder).toBeUndefined();
        expect(element.mediumContainerSize).toBeUndefined();
        expect(element.order).toBeUndefined();
        expect(element.size).toBeUndefined();
        expect(element.smallContainerOrder).toBeUndefined();
        expect(element.smallContainerSize).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // alignment-bump
    it('Layout Item: alignmentBump = left', () => {
        document.body.appendChild(element);
        element.alignmentBump = 'left';
        expect(element.shadowRoot.host.classList).toContain(
            'slds-col_bump-left'
        );
    });

    it('Layout Item: alignmentBump = right', () => {
        document.body.appendChild(element);
        element.alignmentBump = 'right';
        expect(element.shadowRoot.host.classList).toContain(
            'slds-col_bump-right'
        );
    });

    it('Layout Item: alignmentBump = top', () => {
        document.body.appendChild(element);
        element.alignmentBump = 'top';
        expect(element.shadowRoot.host.classList).toContain(
            'slds-col_bump-top'
        );
    });

    it('Layout Item: alignmentBump = bottom', () => {
        document.body.appendChild(element);
        element.alignmentBump = 'bottom';
        expect(element.shadowRoot.host.classList).toContain(
            'slds-col_bump-bottom'
        );
    });

    // Container orders
    it('Layout Item: container orders', () => {
        let setContainerSize;
        element.addEventListener('privatelayoutitemconnected', (event) => {
            setContainerSize = event.detail.callbacks.setContainerSize;
        });
        document.body.appendChild(element);
        expect(element.shadowRoot.host.style.order).toBe('0');

        element.largeContainerOrder = 3;
        element.mediumContainerOrder = 2;
        element.smallContainerOrder = 1;
        element.order = 6;

        expect(element.shadowRoot.host.style.order).toBe('6');
        setContainerSize('large');
        expect(element.shadowRoot.host.style.order).toBe('3');
        setContainerSize('medium');
        expect(element.shadowRoot.host.style.order).toBe('2');
        setContainerSize('small');
        expect(element.shadowRoot.host.style.order).toBe('1');
    });

    // Container sizes
    it('Layout Item: container sizes', () => {
        let setContainerSize;
        element.addEventListener('privatelayoutitemconnected', (event) => {
            setContainerSize = event.detail.callbacks.setContainerSize;
        });
        document.body.appendChild(element);
        expect(element.shadowRoot.host.style.flexBasis).toBe('auto');

        element.largeContainerSize = '3';
        element.mediumContainerSize = 12;
        element.smallContainerSize = 'auto';
        element.size = '4rem';

        expect(element.shadowRoot.host.style.flexBasis).toBe('4rem');
        setContainerSize('large');
        expect(element.shadowRoot.host.style.flexBasis).toBe('25%');
        setContainerSize('medium');
        expect(element.shadowRoot.host.style.flexBasis).toBe('100%');
        setContainerSize('small');
        expect(element.shadowRoot.host.style.flexBasis).toBe('auto');
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // Connected and disconnected event
    it('Layout Item: connected and disconnected events', () => {
        const connectedHandler = jest.fn();
        const disconnectedHandler = jest.fn();
        element.addEventListener(
            'privatelayoutitemconnected',
            connectedHandler
        );
        element.addEventListener(
            'privatelayoutitemdisconnected',
            disconnectedHandler
        );
        document.body.appendChild(element);

        expect(connectedHandler).toHaveBeenCalled();
        const connectedCall = connectedHandler.mock.calls[0][0];
        expect(connectedCall.detail.name).toBeTruthy();
        expect(typeof connectedCall.detail.name).toBe('string');
        expect(connectedCall.detail.callbacks.setContainerSize).toBeInstanceOf(
            Function
        );
        expect(connectedCall.bubbles).toBeTruthy();
        expect(connectedCall.composed).toBeFalsy();
        expect(connectedCall.cancelable).toBeFalsy();

        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        expect(disconnectedHandler).toHaveBeenCalled();
        const disconnectedCall = connectedHandler.mock.calls[0][0];
        expect(disconnectedCall.detail.name).toBeTruthy();
        expect(typeof disconnectedCall.detail.name).toBe('string');
        expect(disconnectedCall.bubbles).toBeTruthy();
        expect(disconnectedCall.composed).toBeFalsy();
        expect(disconnectedCall.cancelable).toBeFalsy();
    });
});

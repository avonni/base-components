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
import Separator from 'c/separator';

describe('Separator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        expect(element.label).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition.default).toBe('left');
        expect(element.iconSize.default).toBe('small');
        expect(element.orientation.default).toBe('horizontal');
        expect(element.alignContent.default).toBe('center');
    });

    it('Label', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.label = 'Today';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector('h1');
            expect(header.textContent).toBe('Today');
        });
    });

    it('IconName', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.iconName = 'utility:check';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:check');
        });
    });

    it('IconPosition', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.iconName = 'utility:check';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-separator_content'
            );
            expect(content.classList).toContain('slds-grid_reverse');
        });
    });

    it('IconSize', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.iconName = 'utility:check';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector('lightning-icon');
            expect(content.size).toBe('x-small');
        });
    });

    it('Orientation', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-separator_container'
            );
            expect(container.classList).toContain('slds-grid_vertical');
        });
    });

    it('Align Content start', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.iconName = 'utility:check';
        element.iconSize = 'x-small';
        element.alignContent = 'start';

        return Promise.resolve().then(() => {
            const lineOne = element.shadowRoot.querySelector(
                '.avonni-separator_line-one'
            );
            expect(lineOne.classList).toContain('slds-hide');
        });
    });

    it('Align Content end', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.iconName = 'utility:check';
        element.iconSize = 'x-small';
        element.alignContent = 'end';

        return Promise.resolve().then(() => {
            const lineTwo = element.shadowRoot.querySelector(
                '.avonni-separator_line-two'
            );
            expect(lineTwo.classList).toContain('slds-hide');
        });
    });

    it('Icon Margin left', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.label = 'Tester';
        element.iconName = 'utility:check';
        element.iconSize = 'small';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.classList).toContain('slds-m-right_x-small');
        });
    });

    it('Icon Margin Right', () => {
        const element = createElement('base-separator', {
            is: Separator
        });

        document.body.appendChild(element);

        element.label = 'Tester';
        element.iconName = 'utility:check';
        element.iconSize = 'small';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.classList).toContain('slds-m-left_x-small');
        });
    });
});

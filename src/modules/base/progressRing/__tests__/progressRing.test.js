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
import ProgressRing from 'c/progressRing';

describe('ProgressRing', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        expect(element.direction).toBe('fill');
        expect(element.hideIcon).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.value).toBe(0);
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // direction and value
    it('direction = fill, value = 34', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.direction = 'fill';
        element.value = 34;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector('path');
            const arcx = Math.cos(2 * Math.PI * 0.34);
            const arcy = Math.sin(2 * Math.PI * 0.34) * -1;

            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 0 0 ${arcx} ${arcy} L 0 0`
            );
        });
    });

    it('direction = drain, value = 87', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.direction = 'drain';
        element.value = 87;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector('path');
            const arcx = Math.cos(2 * Math.PI * 0.87);
            const arcy = Math.sin(2 * Math.PI * 0.87);

            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 1 1 ${arcx} ${arcy} L 0 0`
            );
        });
    });

    // hide-icon
    // Depends on variant
    it('hideIcon = false', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.hideIcon = false;
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(icon).toBeTruthy();
        });
    });

    it('hideIcon = true', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.hideIcon = true;
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(icon).toBeFalsy();
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.size = 'medium';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );

            expect(wrapper.classList).not.toContain('slds-progress-ring_large');
        });
    });

    it('size = large', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.size = 'large';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );

            expect(wrapper.classList).toContain('slds-progress-ring_large');
        });
    });

    // variant
    // Depends on value
    it('variant = base', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_warning'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_expired'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_complete'
            );
            expect(icon).toBeFalsy();
        });
    });

    it('variant = active-step', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'active-step';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_warning'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_expired'
            );
            expect(wrapper.classList).toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_complete'
            );
            expect(icon).toBeFalsy();
        });
    });

    it('variant = warning', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).toContain('slds-progress-ring_warning');
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_expired'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_complete'
            );
            expect(icon).toBeTruthy();
            expect(icon.classList).toContain('slds-icon-utility-warning');
            expect(icon.classList).not.toContain('slds-icon-utility-error');
            expect(icon.classList).not.toContain('slds-icon-utility-check');
            expect(icon.alternativeText).toBe('Warning');
            expect(icon.iconName).toBe('utility:warning');
        });
    });

    it('variant = expired', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'expired';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_warning'
            );
            expect(wrapper.classList).toContain('slds-progress-ring_expired');
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_complete'
            );
            expect(icon).toBeTruthy();
            expect(icon.classList).not.toContain('slds-icon-utility-warning');
            expect(icon.classList).toContain('slds-icon-utility-error');
            expect(icon.classList).not.toContain('slds-icon-utility-check');
            expect(icon.alternativeText).toBe('Expired');
            expect(icon.iconName).toBe('utility:error');
        });
    });

    it('variant = base-autocomplete', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'base-autocomplete';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_warning'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_expired'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_complete'
            );
            expect(icon).toBeFalsy();
        });
    });

    it('variant = base-autocomplete, with value = 100', () => {
        const element = createElement('base-progress-ring', {
            is: ProgressRing
        });

        document.body.appendChild(element);

        element.variant = 'base-autocomplete';
        element.value = 100;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-progress-ring'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_warning'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_expired'
            );
            expect(wrapper.classList).not.toContain(
                'slds-progress-ring_active-step'
            );
            expect(wrapper.classList).toContain('slds-progress-ring_complete');
            expect(icon).toBeTruthy();
            expect(icon.classList).not.toContain('slds-icon-utility-warning');
            expect(icon.classList).not.toContain('slds-icon-utility-error');
            expect(icon.classList).toContain('slds-icon-utility-check');
            expect(icon.alternativeText).toBe('Complete');
            expect(icon.iconName).toBe('utility:check');
        });
    });
});

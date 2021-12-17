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
import PrimitiveRelationshipGraphItem from 'c/primitiveRelationshipGraphItem';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc
// customActions
// defaultActions
// hideDefaultActions
// actionclick event

describe('PrimitiveRelationshipGraphItem', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        expect(element.activeSelection).toBeFalsy();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.contentData).toBeUndefined();
        expect(element.customActions).toMatchObject([]);
        expect(element.defaultActions).toMatchObject([]);
        expect(element.groups).toMatchObject([]);
        expect(element.hideDefaultActions).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.selected).toBeFalsy();
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // active-selection
    it('actionSelection = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.activeSelection = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-active');
        });
    });

    it('actionSelection = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.activeSelection = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-active');
        });
    });

    // contenData
    it('contenData', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        const data = [
            {
                label: 'Label 1',
                value: 'value-1'
            },
            {
                label: 'Label 2',
                value: 'value-2'
            }
        ];

        element.contentData = data;

        return Promise.resolve().then(() => {
            const labels = element.shadowRoot.querySelectorAll('dt');
            const values = element.shadowRoot.querySelectorAll('dd');

            data.forEach((item, index) => {
                expect(labels[index].textContent).toBe(item.label);
                expect(values[index].textContent).toBe(item.value);
            });
        });
    });

    // groups
    it('groups', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.groups = [
            {
                label: 'Label 1',
                name: 'name-1',
                items: [
                    {
                        label: 'Item 1',
                        name: 'item-1'
                    }
                ]
            },
            {
                label: 'Label 2',
                name: 'name-2'
            }
        ];

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_has-groups');
            expect(wrapper.classList).toContain('item_has-children');
        });
    });

    // href
    it('href', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '.slds-text-heading_small a'
            );
            expect(link).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(title).toBeTruthy();
        });
    });

    // selected
    it('selected = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.selected = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_is-selected');
        });
    });

    it('selected = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.selected = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_is-selected');
        });
    });

    // variant
    it('variant = horizontal', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).toContain('item_horizontal');
        });
    });

    it('variant = vertical', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.item');
            expect(wrapper.classList).not.toContain('item_horizontal');
        });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on name
    it('select event', () => {
        const element = createElement(
            'data-primitive-relationship-graph-item',
            {
                is: PrimitiveRelationshipGraphItem
            }
        );

        document.body.appendChild(element);

        element.name = 'a-string-name';

        const handler = jest.fn();
        element.addEventListener('select', handler);

        const wrapper = element.shadowRoot.querySelector('.item');
        wrapper.click();

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('a-string-name');

            expect(element.selected).toBeTruthy();
            expect(element.activeSelection).toBeTruthy();
        });
    });
});

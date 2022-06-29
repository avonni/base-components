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
import PrimitiveCarouselItem from 'c/primitiveCarouselItem';

const bareActions = [
    {
        name: 'action-add',
        iconName: 'utility:add'
    },
    {
        name: 'action-pin',
        iconName: 'utility:pin'
    },
    {
        name: 'action-priority',
        iconName: 'utility:priority'
    }
];

const menuActions = [
    {
        name: 'action-add',
        iconName: 'utility:add',
        label: 'Add'
    },
    {
        name: 'action-pin',
        iconName: 'utility:pin',
        label: 'Pin'
    },
    {
        name: 'action-priority',
        iconName: 'utility:priority',
        label: 'Prioritize'
    }
];

const ex = [
    {
        title: 'Visit App Exchange',
        name: 'someName',
        description: 'Extend Salesforce with the #1 business marketplace.',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    }
];

let element;
describe('Primitive Carousel Item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-carousel-item', {
            is: PrimitiveCarouselItem
        });
        document.body.appendChild(element);
    });

    it('Primitive Carousel Item: Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.description).toBeUndefined();
        expect(element.infos).toBeUndefined();
        expect(element.imageAssistiveText).toBeUndefined();
        expect(element.href).toBeUndefined();
        expect(element.src).toBeUndefined();
        expect(element.actions).toMatchObject([]);
        expect(element.actionsPosition).toBe('bottom-center');
        expect(element.actionsVariant).toBe('border');
    });

    // actions variant
    it('Primitive Carousel Item: actions variant bare without label', () => {
        element.actions = bareActions;
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-actions"]'
            );
            expect(action.variant).toBe('bare');
        });
    });

    it('Primitive Carousel Item: actions variant border without label', () => {
        element.actions = bareActions;
        element.actionsVariant = 'border';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-actions"]'
            );
            expect(action.variant).toBe('border-filled');
        });
    });

    it('Primitive Carousel Item:actions variant bare with label', () => {
        element.actions = menuActions;
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-actions"]'
            );
            expect(action.variant).toBe('base');
        });
    });

    it('Primitive Carousel Item: actions variant border with label', () => {
        element.actions = menuActions;
        element.actionsVariant = 'border';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-actions"]'
            );
            expect(action.variant).toBe('neutral');
        });
    });

    it('Primitive Carousel Item: actions variant menu', () => {
        element.actions = menuActions;
        element.actionsVariant = 'menu';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"]'
            );
            expect(action).toBeTruthy();
            expect(action.menuAlignment).toBe('auto');
        });
    });

    it('Primitive Carousel Item: HTML with tag should have buttons and button menus with class slds-show_small and slds-hide_small', () => {
        element.href = 'example.com';
        element.actions = menuActions;
        // element.actionsPosition = 'top-center';
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-bare-border"]'
            );
            const buttonMenu = element.shadowRoot.querySelector(
                '[data-element-id="button-menu"]'
            );
            const lightningButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-actions"'
            );
            const lightningButtonMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"'
            );
            expect(button.className).toBe('slds-show_small');
            expect(buttonMenu.className).toBe('slds-hide_small');
            expect(button.contains(lightningButton)).toBeTruthy();
            expect(buttonMenu.contains(lightningButtonMenu)).toBeTruthy();
        });
    });

    it('Primitive Carousel Item: HTML with no tag should have buttons and button menus with class slds-show_small and slds-hide_small', () => {
        element.href = null;
        element.actions = menuActions;
        // element.actionsPosition = 'top-center';
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-bare-border"]'
            );
            const buttonMenu = element.shadowRoot.querySelector(
                '[data-element-id="button-menu"]'
            );
            const lightningButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-actions"'
            );
            const lightningButtonMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"'
            );
            expect(button.className).toBe('slds-show_small');
            expect(buttonMenu.className).toBe('slds-hide_small');
            expect(button.contains(lightningButton)).toBeTruthy();
            expect(buttonMenu.contains(lightningButtonMenu)).toBeTruthy();
        });
    });

    // render html variant
    it('Primitive Carousel Item: tag variant', () => {
        element.href = 'example.com';

        return Promise.resolve().then(() => {
            const tag = element.shadowRoot.querySelector(
                '[data-element-id="a-actions-tag"]'
            );
            expect(tag).toBeTruthy();
        });
    });

    it('Primitive Carousel Item: noTag variant', () => {
        element.href = null;

        return Promise.resolve().then(() => {
            const noTag = element.shadowRoot.querySelector(
                '[data-element-id="a-actions-noTag"]'
            );
            expect(noTag).toBeTruthy();
        });
    });

    // actions position
    it('Primitive Carousel Item: actions position bottom-center', () => {
        element.actions = bareActions;
        element.actionsPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-bottom-center'
            );
        });
    });

    it('Primitive Carousel Item: actions position bottom-right', () => {
        element.actions = bareActions;
        element.actionsPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-right'
            );
        });
    });

    it('Primitive Carousel Item: actions position bottom-left', () => {
        element.actions = bareActions;
        element.actionsPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-left'
            );
        });
    });

    it('Primitive Carousel Item: actions position top-left', () => {
        element.actions = bareActions;
        element.actionsPosition = 'top-left';

        return Promise.resolve().then(() => {
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-left'
            );
        });
    });

    it('Primitive Carousel Item: actions position top-right', () => {
        element.actions = bareActions;
        element.actionsPosition = 'top-right';

        return Promise.resolve().then(() => {
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-right'
            );
        });
    });

    // Content height based on actions or not
    it('Primitive Carousel Item: content height with actions', () => {
        element.actions = bareActions;

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(carouselContent.style.height).toBe('7.5rem');
        });
    });

    it('Primitive Carousel Item: content height without actions', () => {
        element.actionsVariant = 'menu';

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(carouselContent.style.height).toBe('6.625rem');
        });
    });

    /* ----- EVENTS ----- */

    // Itemclick
    it('Primitive Carousel Item: item click', () => {
        const handler = jest.fn();
        element.addEventListener('itemclick', handler);
        element.title = 'Visit App Exchange';
        element.name = 'someName';
        element.description =
            'Extend Salesforce with the #1 business marketplace.';
        element.imageAssistiveText = 'Appy';
        element.src =
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
        element.href = 'https://www.salesforce.com';
        element.actions = bareActions;

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                '[data-element-id="a-actions-tag"]'
            );
            item.click();
            expect(handler).toHaveBeenCalled();
            expect([handler.mock.calls[0][0].detail.item]).toMatchObject(ex);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // Actionclick
    it('Primitive Carousel Item: actionclick', () => {
        element.title = 'Visit App Exchange';
        element.description =
            'Extend Salesforce with the #1 business marketplace.';
        element.imageAssistiveText = 'Appy';
        element.src =
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
        element.href = 'https://www.salesforce.com';
        element.actions = bareActions;
        element.name = 'someName';

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-actions"]'
            );
            action.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('action-add');
            expect([handler.mock.calls[0][0].detail.item]).toMatchObject(ex);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // Actionclick on menu
    it('Primitive Carousel Item: menu actionclick', () => {
        element.title = 'Visit App Exchange';
        element.description =
            'Extend Salesforce with the #1 business marketplace.';
        element.imageAssistiveText = 'Appy';
        element.src =
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
        element.href = 'https://www.salesforce.com';
        element.actions = bareActions;
        element.name = 'someName';

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"]'
            );
            action.dispatchEvent(new CustomEvent('select'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe(undefined);
            expect([handler.mock.calls[0][0].detail.item]).toMatchObject(ex);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // PreventDefault on menu
    it('Primitive Carousel Item: menu preventDefault', () => {
        element.title = 'Visit App Exchange';
        element.description =
            'Extend Salesforce with the #1 business marketplace.';
        element.imageAssistiveText = 'Appy';
        element.src =
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
        element.href = 'https://www.salesforce.com';
        element.actions = bareActions;
        element.name = 'someName';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu"]'
            );
            const customEvent = new CustomEvent('click', {
                bubbles: true,
                composed: true,
                cancelable: true
            });
            action.dispatchEvent(customEvent);
            expect(customEvent.defaultPrevented).toBeTruthy();
        });
    });
});

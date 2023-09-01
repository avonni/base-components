

import { createElement } from 'lwc';
import FocusTrap from 'c/focusTrap';

let element;
describe('FocusTrap', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-builder-focus-trap', {
            is: FocusTrap
        });
        document.body.appendChild(element);
    });

    it('handleFocusIn', () => {
        const slot = element.shadowRoot.querySelector('slot');

        return Promise.resolve()
            .then(() => {
                slot.dispatchEvent(new CustomEvent('focusin'));
            })
            .then(() => {
                const startNode =
                    element.shadowRoot.querySelector('[data-start]');
                const endNode = element.shadowRoot.querySelector('[data-end]');
                expect(startNode.tabIndex).toBe(0);
                expect(endNode.tabIndex).toBe(0);
            });
    });

    it('handleFocusOut', () => {
        const slot = element.shadowRoot.querySelector('slot');

        return Promise.resolve()
            .then(() => {
                slot.dispatchEvent(new CustomEvent('focusout'));
            })
            .then(() => {
                const startNode =
                    element.shadowRoot.querySelector('[data-start]');
                const endNode = element.shadowRoot.querySelector('[data-end]');
                expect(startNode.tabIndex).toBe(-1);
                expect(endNode.tabIndex).toBe(-1);
            });
    });

    it('focus()', () => {
        return Promise.resolve()
            .then(() => {
                element.focus();
            })
            .then(() => {
                const startNode =
                    element.shadowRoot.querySelector('[data-start]');
                const endNode = element.shadowRoot.querySelector('[data-end]');
                expect(startNode.tabIndex).toBe(-1);
                expect(endNode.tabIndex).toBe(-1);
            });
    });
});

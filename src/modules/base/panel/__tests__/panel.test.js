import { createElement } from 'lwc';
import Panel from 'c/panel';

let element;
describe('Panel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);
    });

    it('Panel: Default attributes', () => {
        expect(element.position).toBe('right');
        expect(element.title).toBeUndefined();
        expect(element.showPanel).toBeFalsy();
        expect(element.size).toBe('medium');
    });

    /* ---- ATTRIBUTES ----- */

    // position
    it('Panel: position = right', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'right';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-right');
            expect(wrapper.classList).not.toContain('slds-panel_docked-left');
        });
    });

    it('Panel: position = left', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'left';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-left');
            expect(wrapper.classList).not.toContain('slds-panel_docked-right');
        });
    });

    // title
    it('Panel: title', () => {
        const title = element.shadowRoot.querySelector(
            '[data-element-id="h1"]'
        );
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            expect(title.textContent).toContain('A string title');
        });
    });

    // showPanel
    it('Panel: showPanel = true', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.showPanel = true;

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-is-open');
        });
    });

    // size
    it('Panel: size = medium', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'medium';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('Panel: size = small', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'small';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('Panel: size = large', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'large';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('Panel: size = x-large', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'x-large';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('Panel: size = full', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'full';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).toContain('slds-size_full');
        });
    });

    /* ---- METHODS ----- */

    // toggle
    it('Panel: method toggle', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        expect(wrapper.classList).toContain('slds-is-hidden');

        element.toggle();

        return Promise.resolve()
            .then(() => {
                expect(wrapper.classList).toContain('slds-is-open');
                expect(wrapper.classList).not.toContain('slds-is-hidden');

                element.toggle();
            })
            .then(() => {
                expect(wrapper.classList).not.toContain('slds-is-open');
                expect(wrapper.classList).toContain('slds-is-hidden');
            });
    });

    // open and close
    it('Panel: methods open and close', () => {
        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        expect(wrapper.classList).toContain('slds-is-hidden');

        element.open();

        return Promise.resolve()
            .then(() => {
                expect(wrapper.classList).toContain('slds-is-open');
                expect(wrapper.classList).not.toContain('slds-is-hidden');

                element.close();
            })
            .then(() => {
                expect(wrapper.classList).not.toContain('slds-is-open');
                expect(wrapper.classList).toContain('slds-is-hidden');
            });
    });
});

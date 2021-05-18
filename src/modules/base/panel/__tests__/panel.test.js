import { createElement } from 'lwc';
import Panel from 'c/panel';

describe('Panel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-panel', {
            is: Panel
        });

        expect(element.position).toBe('right');
        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
    });

    /* ---- ATTRIBUTES ----- */

    // position
    it('position = right', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'right';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-right');
            expect(wrapper.classList).not.toContain('slds-panel_docked-left');
        });
    });

    it('position = left', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'left';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-left');
            expect(wrapper.classList).not.toContain('slds-panel_docked-right');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const title = element.shadowRoot.querySelector('h1');
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            expect(title.textContent).toContain('A string title');
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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

    it('size = small', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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

    it('size = large', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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

    it('size = x-large', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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

    it('size = full', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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
    it('method: toggle', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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
    it('methods: open and close', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

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

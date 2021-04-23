import { createElement } from 'lwc';
import VisualPickerLink from 'c/visualPickerLink';

describe('VisualPickerLink', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        expect(element.completed).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.infoOnly).toBeFalsy();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // completed
    it('completed = false', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.completed = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile'
            );
            expect(wrapper.classList).not.toContain(
                'slds-welcome-mat__tile_complete'
            );
        });
    });

    it('completed = true', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.completed = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile'
            );
            expect(wrapper.classList).toContain(
                'slds-welcome-mat__tile_complete'
            );
        });
    });

    // href
    it('href', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-icon-container lightning-icon:first-of-type'
            );

            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    it('no iconName', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(tileBody.classList).not.toContain(
                'avonni-welcome-mat__tile-no-icon'
            );
        });
    });

    // icon-position
    // Depends on iconName
    it('iconPosition = left', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const iconLeft = element.shadowRoot.querySelector(
                'a div:first-of-type.slds-media__figure'
            );
            const iconRight = element.shadowRoot.querySelector(
                '.avonni-media__figure-right'
            );
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(iconLeft).toBeTruthy();
            expect(iconRight).toBeFalsy();
            expect(tileBody.classList).not.toContain(
                'avonni-welcome-mat__tile-body-right'
            );
        });
    });

    it('iconPosition = right', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const iconLeft = element.shadowRoot.querySelector(
                'a div:first-of-type.slds-media__figure'
            );
            const iconRight = element.shadowRoot.querySelector(
                '.avonni-media__figure-right'
            );
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(iconLeft).toBeFalsy();
            expect(iconRight).toBeTruthy();
            expect(tileBody.classList).toContain(
                'avonni-welcome-mat__tile-body-right'
            );
        });
    });

    // info-only
    it('infoOnly = false', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.infoOnly = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile'
            );
            const link = element.shadowRoot.querySelector('a');

            expect(link).toBeTruthy();
            expect(wrapper.classList).not.toContain(
                'slds-welcome-mat__tile_info-only'
            );
        });
    });

    it('infoOnly = true', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.infoOnly = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile'
            );
            const link = element.shadowRoot.querySelector('a');

            expect(link).toBeFalsy();
            expect(wrapper.classList).toContain(
                'slds-welcome-mat__tile_info-only'
            );
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-title'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    /* ----- EVENTS ----- */

    // click
    it('click event', () => {
        const element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('click', handler);

        const link = element.shadowRoot.querySelector('a');
        link.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});

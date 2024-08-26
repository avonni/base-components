import { createElement } from 'lwc';
import Card from '../card';

// Not tested: displaying the correct default slot, as it depends on inserting html into the DOM.

let element;
describe('Card', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-card', {
            is: Card
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.mediaPosition).toBe('top');
        expect(element.mediaSrc).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // title
    it('Card: title', () => {
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-title"]'
            );
            const titleSlot = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-title-slot"]'
            );
            expect(title.textContent).toBe('This is a title text');
            expect(titleSlot).toBeFalsy();
        });
    });

    // iconName
    it('Card: iconName', () => {
        element.iconName = 'utility:account';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-header-icon"]'
            );
            expect(icon.iconName).toBe('utility:account');
        });
    });

    // mediaSrc
    it('Card: mediaSrc without mediaPosition', () => {
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain('avonni-card__media-top');
            expect(mediaImage).toBeTruthy();
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    // mediaPosition
    it('Card: mediaPosition = left', () => {
        element.mediaPosition = 'left';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-left'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = right', () => {
        element.mediaPosition = 'right';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-right'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = top', () => {
        element.mediaPosition = 'top';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain('avonni-card__media-top');
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = center', () => {
        element.mediaPosition = 'center';
        element.mediaSrc = 'https://via.placeholder.com/300x200';
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            const defaultSlot = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-default-slot"]'
            );
            expect(bodyContainer.classList).toContain('slds-grid_vertical');
            expect(defaultSlot).toBeFalsy();
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = bottom', () => {
        element.mediaPosition = 'bottom';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'slds-grid_vertical-reverse'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = background', () => {
        element.mediaPosition = 'background';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-background'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    it('Card: mediaPosition = overlay', () => {
        element.mediaPosition = 'overlay';
        element.mediaSrc = 'https://via.placeholder.com/300x200';

        return Promise.resolve().then(() => {
            const bodyContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-body-container"]'
            );
            const mediaImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-card-media-image"]'
            );
            expect(bodyContainer.classList).toContain(
                'avonni-card__media-overlay'
            );
            expect(mediaImage.src).toBe('https://via.placeholder.com/300x200');
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // privatecardrendered
    it('Card: privatecardrendered event', () => {
        const handler = jest.fn();
        element.addEventListener('privatecardrendered', handler);
        element.title = 'some title';
        expect(handler).not.toHaveBeenCalled();

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });
});

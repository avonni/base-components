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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.title).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.mediaPosition).toBe('top');
            expect(element.mediaSrc).toBeUndefined();
        });

        describe('Icon name', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:account';
                element.title = 'This is a title text';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-header-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:account');
                });
            });
        });

        describe('Media Position', () => {
            it('Left', () => {
                element.title = 'This is a title text';
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
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Right', () => {
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
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Top', () => {
                element.mediaPosition = 'top';
                element.mediaSrc = 'https://via.placeholder.com/300x200';

                return Promise.resolve().then(() => {
                    const bodyContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-body-container"]'
                    );
                    const mediaImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-media-image"]'
                    );
                    expect(bodyContainer.classList).toContain(
                        'avonni-card__media-top'
                    );
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Center', () => {
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
                    expect(bodyContainer.classList).toContain(
                        'slds-grid_vertical'
                    );
                    expect(defaultSlot).toBeFalsy();
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Bottom', () => {
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
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Background', () => {
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
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });

            it('Overlay', () => {
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
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });
        });

        describe('Media Source', () => {
            it('Without mediaPosition', () => {
                element.mediaSrc = 'https://via.placeholder.com/300x200';

                return Promise.resolve().then(() => {
                    const bodyContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-body-container"]'
                    );
                    const mediaImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-media-image"]'
                    );
                    expect(bodyContainer.classList).toContain(
                        'avonni-card__media-top'
                    );
                    expect(mediaImage).toBeTruthy();
                    expect(mediaImage.src).toBe(
                        'https://via.placeholder.com/300x200'
                    );
                });
            });
        });

        describe('Title', () => {
            it('Passed to the component', () => {
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
        });
    });

    describe('Events', () => {
        it('Privatecardrendered event', () => {
            const handler = jest.fn();
            element.addEventListener('privatecardrendered', handler);
            element.title = 'some title';
            expect(handler).not.toHaveBeenCalled();

            return Promise.resolve().then(() => {
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
        });
    });
});

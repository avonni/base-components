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
            expect(element.iconName).toBeUndefined();
            expect(element.mediaAlternativeText).toBe('Card media');
            expect(element.mediaPosition).toBe('top');
            expect(element.mediaSrc).toBeUndefined();
            expect(element.title).toBeUndefined();
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:account';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-card-header-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:account');
                });
            });
        });

        describe('mediaSrc', () => {
            it('Passed to the component', () => {
                element.mediaSrc = 'https://via.placeholder.com/300x200';
                element.mediaAlternativeText = 'Card media alternative text';

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
                    expect(mediaImage.alt).toBe('Card media alternative text');
                });
            });
        });

        describe('mediaPosition', () => {
            it('Left', () => {
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

        describe('title', () => {
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
        describe('privatecardrendered', () => {
            it('privatecardrendered event', () => {
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
    });
});

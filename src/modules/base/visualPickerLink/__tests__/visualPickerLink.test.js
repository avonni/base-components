import { createElement } from 'lwc';
import VisualPickerLink from 'c/visualPickerLink';

let element;
describe('VisualPickerLink', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.completed).toBeFalsy();
            expect(element.completedIconAlternativeText).toBe('Completed');
            expect(element.href).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.infoOnly).toBeFalsy();
            expect(element.disabled).toBeFalsy();
            expect(element.title).toBeUndefined();
        });

        describe('Completed', () => {
            it('Passed to the component as false', () => {
                element.completed = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__tile'
                    );
                    expect(wrapper.classList).not.toContain(
                        'slds-welcome-mat__tile_complete'
                    );
                });
            });

            it('Passed to the component as true', () => {
                element.completed = true;
                element.completedIconAlternativeText = 'Completed text';
                element.iconName = 'utility:check';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__tile'
                    );
                    expect(wrapper.classList).toContain(
                        'slds-welcome-mat__tile_complete'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="completed-icon"]'
                    );
                    expect(icon.alternativeText).toBe('Completed text');
                });
            });
        });

        describe('Disabled', () => {
            it('true', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );

                    expect(link.classList).toContain(
                        'avonni-visual-picker-link_disabled'
                    );
                });
            });

            it('false', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );

                    expect(link.classList).not.toContain(
                        'avonni-visual-picker-link_disabled'
                    );
                });
            });
        });

        describe('Href', () => {
            it('Passed to the component', () => {
                element.href = 'https://www.avonni.app/';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    expect(link.href).toBe('https://www.avonni.app/');
                });
            });
        });

        describe('Icon', () => {
            it('iconName', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );

                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe('utility:apps');
                });
            });

            it('no iconName', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const tileBody = element.shadowRoot.querySelector(
                        '.slds-welcome-mat__tile-body'
                    );

                    expect(tileBody.classList).not.toContain(
                        'avonni-visual-picker-link__tile-no-icon'
                    );
                });
            });

            it('iconPosition = left', () => {
                element.iconName = 'utility:apps';
                element.iconPosition = 'left';

                return Promise.resolve().then(() => {
                    const iconLeft = element.shadowRoot.querySelector(
                        'a div:first-of-type.slds-media__figure'
                    );
                    const iconRight = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__figure-right'
                    );
                    const tileBody = element.shadowRoot.querySelector(
                        '.slds-welcome-mat__tile-body'
                    );

                    expect(iconLeft).toBeTruthy();
                    expect(iconRight).toBeFalsy();
                    expect(tileBody.classList).not.toContain(
                        'avonni-visual-picker-link__tile-body-right'
                    );
                });
            });

            it('iconPosition = right', () => {
                element.iconName = 'utility:apps';
                element.iconPosition = 'right';

                return Promise.resolve().then(() => {
                    const iconRight = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__figure-right'
                    );
                    const tileBody = element.shadowRoot.querySelector(
                        '.slds-welcome-mat__tile-body'
                    );

                    expect(iconRight).toBeTruthy();
                    expect(tileBody.classList).toContain(
                        'avonni-visual-picker-link__tile-body-right'
                    );
                });
            });
        });

        describe('Info only', () => {
            it('false', () => {
                element.infoOnly = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__tile'
                    );
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );

                    expect(link).toBeTruthy();
                    expect(wrapper.classList).not.toContain(
                        'avonni-visual-picker-link__tile_info-only'
                    );
                });
            });

            it('true', () => {
                element.infoOnly = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__tile'
                    );
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );

                    expect(link).toBeFalsy();
                    expect(wrapper.classList).toContain(
                        'avonni-visual-picker-link__tile_info-only'
                    );
                });
            });
        });

        describe('Title', () => {
            it('A string title', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '.avonni-visual-picker-link__tile-title'
                    );
                    expect(title.textContent).toBe('A string title');
                });
            });
        });
    });

    describe('Events', () => {
        it('Click', () => {
            const handler = jest.fn();
            element.addEventListener('click', handler);

            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            link.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});

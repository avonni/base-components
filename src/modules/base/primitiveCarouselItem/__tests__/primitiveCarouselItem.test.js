import PrimitiveCarouselItem from 'c/primitiveCarouselItem';
import { createElement } from 'lwc';

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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toMatchObject([]);
            expect(element.actionsPosition).toBe('bottom-center');
            expect(element.actionsVariant).toBe('border');
            expect(element.cropFit).toBe('cover');
            expect(element.description).toBeUndefined();
            expect(element.href).toBeUndefined();
            expect(element.imageAssistiveText).toBeUndefined();
            expect(element.imageErrorLabel).toBe('No Preview Available');
            expect(element.imagePosition).toBe('top');
            expect(element.infos).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.noImageLabel).toBe('No Image Source Provided');
            expect(element.panelIndex).toBeUndefined();
            expect(element.panelItems).toBeUndefined();
            expect(element.src).toBeUndefined();
            expect(element.title).toBeUndefined();
        });

        describe('Action Variant', () => {
            it('Bare with label', () => {
                element.actions = menuActions;
                element.actionsVariant = 'bare';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-actions"]'
                    );
                    expect(action.variant).toBe('base');
                });
            });

            it('Bare without label', () => {
                element.actions = bareActions;
                element.actionsVariant = 'bare';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-icon-actions"]'
                    );
                    expect(action.variant).toBe('base');
                });
            });

            it('Border with label', () => {
                element.actions = menuActions;
                element.actionsVariant = 'border';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-actions"]'
                    );
                    expect(action.variant).toBe('neutral');
                });
            });

            it('Border without label', () => {
                element.actions = bareActions;
                element.actionsVariant = 'border';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-icon-actions"]'
                    );
                    expect(action.variant).toBe('neutral');
                });
            });

            it('HTML with no tag should have buttons and button menus with class slds-show_small and slds-hide_small', () => {
                element.href = null;
                element.actions = menuActions;
                element.actionsPosition = 'top-center';
                element.actionsVariant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-bare-border"]'
                    );
                    const lightningButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-actions"'
                    );
                    expect(button.className).toBe(
                        'slds-show_small slds-grid slds-grid_vertical-align-center'
                    );
                    expect(button.contains(lightningButton)).toBeTruthy();
                });
            });

            it('HTML with tag should have buttons and button menus with class slds-show_small and slds-hide_small', () => {
                element.href = 'example.com';
                element.actions = menuActions;
                element.actionsPosition = 'top-center';
                element.actionsVariant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-bare-border"]'
                    );
                    const lightningButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-actions"'
                    );
                    expect(button.className).toBe(
                        'slds-show_small slds-grid slds-grid_vertical-align-center'
                    );
                    expect(button.contains(lightningButton)).toBeTruthy();
                });
            });

            it('Menu', () => {
                element.actions = menuActions;
                element.actionsVariant = 'menu';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-button-menu"]'
                    );
                    expect(action).toBeTruthy();
                });
            });
        });

        describe('Actions Positions', () => {
            it('Bottom-center', () => {
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
                        '.avonni-carousel__actions-container'
                    );
                    expect(actionContainer.className).toContain(
                        'avonni-carousel__actions-bottom-center'
                    );
                });
            });

            it('Bottom-left', () => {
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
                        '.avonni-carousel__actions-container'
                    );
                    expect(actionContainer.className).toContain(
                        'avonni-carousel__actions-left'
                    );
                });
            });

            it('Bottom-right', () => {
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
                        '.avonni-carousel__actions-container'
                    );
                    expect(actionContainer.className).toContain(
                        'avonni-carousel__actions-right'
                    );
                });
            });

            it('Top-left', () => {
                element.actions = bareActions;
                element.actionsPosition = 'top-left';

                return Promise.resolve().then(() => {
                    const actionContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__actions-container'
                    );
                    expect(actionContainer.className).toContain(
                        'avonni-carousel__actions-left'
                    );
                });
            });

            it('Top-right', () => {
                element.actions = bareActions;
                element.actionsPosition = 'top-right';

                return Promise.resolve().then(() => {
                    const actionContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__actions-container'
                    );
                    expect(actionContainer.className).toContain(
                        'avonni-carousel__actions-right'
                    );
                });
            });
        });

        describe('Content Height', () => {
            it('Without content', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="a-actions-noTag"]'
                );
                expect(wrapper.className).not.toContain(
                    'avonni-carousel__panel-action_with-content'
                );

                element.href = 'example.com';
                return Promise.resolve().then(() => {
                    const tagWrapper = element.shadowRoot.querySelector(
                        '[data-element-id="a-actions-tag"]'
                    );
                    expect(tagWrapper.className).not.toContain(
                        'avonni-carousel__panel-action_with-content'
                    );
                });
            });

            it('With title', () => {
                element.title = 'Some item title';

                return Promise.resolve()
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="a-actions-noTag"]'
                        );
                        expect(wrapper.className).toContain(
                            'avonni-carousel__panel-action_with-content'
                        );

                        element.href = 'example.com';
                    })
                    .then(() => {
                        const tagWrapper = element.shadowRoot.querySelector(
                            '[data-element-id="a-actions-tag"]'
                        );
                        expect(tagWrapper.className).toContain(
                            'avonni-carousel__panel-action_with-content'
                        );
                    });
            });
        });

        describe('Crop Fit', () => {
            it('Contain', () => {
                element.cropFit = 'contain';

                return Promise.resolve().then(() => {
                    const image = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(image.className).toContain(
                        'avonni-carousel__image-object-fit_contain'
                    );
                });
            });

            it('Cover', () => {
                element.cropFit = 'cover';

                return Promise.resolve().then(() => {
                    const image = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(image.className).toContain(
                        'avonni-carousel__image-object-fit_cover'
                    );
                });
            });

            it('Fill', () => {
                element.cropFit = 'fill';

                return Promise.resolve().then(() => {
                    const image = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(image.className).toContain(
                        'avonni-carousel__image-object-fit_fill'
                    );
                });
            });

            it('None', () => {
                element.cropFit = 'none';

                return Promise.resolve().then(() => {
                    const image = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(image.className).toContain(
                        'avonni-carousel__image-object-fit_none'
                    );
                });
            });
        });

        describe('Description', () => {
            it('Plain Text', () => {
                element.description = 'Content';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('Content');
                    expect(description.title).toBe('Content');
                });
            });

            it('Rich Text', () => {
                element.description = '<b>Content</b>';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('<b>Content</b>');
                    expect(description.title).toBe('Content');
                });
            });
        });

        describe('Image Positions', () => {
            it('Top', () => {
                element.imagePosition = 'top';

                return Promise.resolve().then(() => {
                    const carouselContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__panel-action'
                    );
                    expect(carouselContainer.className).toContain(
                        'avonni-carousel__image-top'
                    );
                });
            });

            it('Bottom', () => {
                element.imagePosition = 'bottom';

                return Promise.resolve().then(() => {
                    const carouselContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__panel-action'
                    );
                    expect(carouselContainer.className).toContain(
                        'avonni-carousel__image-bottom'
                    );
                });
            });

            it('Left', () => {
                element.imagePosition = 'left';

                return Promise.resolve().then(() => {
                    const carouselContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__panel-action'
                    );
                    expect(carouselContainer.className).toContain(
                        'avonni-carousel__image-left'
                    );
                });
            });

            it('Right', () => {
                element.imagePosition = 'right';

                return Promise.resolve().then(() => {
                    const carouselContainer = element.shadowRoot.querySelector(
                        '.avonni-carousel__panel-action'
                    );
                    expect(carouselContainer.className).toContain(
                        'avonni-carousel__image-right'
                    );
                });
            });
        });

        describe('src', () => {
            it('Error Handling', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jg';
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));

                return Promise.resolve().then(() => {
                    const illustration = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-illustration-image-error"]'
                    );
                    expect(illustration).toBeTruthy();
                });
            });
        });

        describe('Tag Variant', () => {
            it('Tag variant', () => {
                element.href = 'example.com';

                return Promise.resolve().then(() => {
                    const tag = element.shadowRoot.querySelector(
                        '[data-element-id="a-actions-tag"]'
                    );
                    expect(tag).toBeTruthy();
                });
            });

            it('No Tag Variant', () => {
                element.href = null;

                return Promise.resolve().then(() => {
                    const noTag = element.shadowRoot.querySelector(
                        '[data-element-id="a-actions-noTag"]'
                    );
                    expect(noTag).toBeTruthy();
                });
            });
        });
    });

    describe('Methods', () => {
        it('Focus', () => {
            element.href = 'https://www.avonni.app/';

            return Promise.resolve().then(() => {
                const tag = element.shadowRoot.querySelector(
                    '[data-element-id="a-actions-tag"]'
                );
                const focusSpy = jest.spyOn(tag, 'focus');
                element.focus();
                expect(focusSpy).toHaveBeenCalled();
            });
        });
    });

    describe('Events', () => {
        it('Action click', () => {
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
                const actions = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-button-icon-actions"]'
                );
                const action = actions[0];
                action.dispatchEvent(new CustomEvent('click'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe('action-add');
                expect([handler.mock.calls[0][0].detail.item]).toMatchObject(
                    ex
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('Blur', () => {
            element.href = 'https://www.avonni.app/';

            const handler = jest.fn();
            element.addEventListener('blur', handler);

            return Promise.resolve().then(() => {
                const tag = element.shadowRoot.querySelector(
                    '[data-element-id="a-actions-tag"]'
                );
                tag.dispatchEvent(new CustomEvent('blur'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('Focus', () => {
            element.href = 'https://www.avonni.app/';

            const handler = jest.fn();
            element.addEventListener('focus', handler);

            return Promise.resolve().then(() => {
                const tag = element.shadowRoot.querySelector(
                    '[data-element-id="a-actions-tag"]'
                );
                tag.dispatchEvent(new CustomEvent('focus'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('Item click', () => {
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
                expect([handler.mock.calls[0][0].detail.item]).toMatchObject(
                    ex
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('Menu Actionclick', () => {
            element.title = 'Visit App Exchange';
            element.description =
                'Extend Salesforce with the #1 business marketplace.';
            element.imageAssistiveText = 'Appy';
            element.src =
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
            element.href = 'https://www.salesforce.com';
            element.actions = bareActions;
            element.actionsVariant = 'menu';
            element.name = 'someName';

            const handler = jest.fn();
            element.addEventListener('actionclick', handler);

            return Promise.resolve().then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-button-menu"]'
                );
                action.dispatchEvent(new CustomEvent('select'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe(undefined);
                expect([handler.mock.calls[0][0].detail.item]).toMatchObject(
                    ex
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('Menu PreventDefault', () => {
            element.title = 'Visit App Exchange';
            element.description =
                'Extend Salesforce with the #1 business marketplace.';
            element.imageAssistiveText = 'Appy';
            element.src =
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
            element.href = 'https://www.salesforce.com';
            element.actions = bareActions;
            element.name = 'someName';
            element.actionsVariant = 'menu';

            return Promise.resolve().then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-button-menu"]'
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
});

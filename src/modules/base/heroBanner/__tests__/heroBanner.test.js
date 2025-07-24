import { createElement } from 'lwc';
import HeroBanner from 'c/heroBanner';

// not tested
// src & linear gradient

let element;
describe('Hero Banner', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-hero-banner', {
            is: HeroBanner
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.caption).toBeUndefined();
            expect(element.contentHorizontalAlignment).toBe('left');
            expect(element.contentVerticalAlignment).toBe('center');
            expect(element.contentWidth).toBe(100);
            expect(element.height).toBe(400);
            expect(element.imageLayout).toBe('scale-to-fill');
            expect(element.imagePosition).toBe('center');
            expect(element.maxWidth).toBe(960);
            expect(element.primaryButtonAlternativeText).toBeUndefined();
            expect(element.primaryButtonIconName).toBeUndefined();
            expect(element.primaryButtonIconPosition).toBe('left');
            expect(element.primaryButtonIconSize).toBe('medium');
            expect(element.primaryButtonLabel).toBeUndefined();
            expect(element.primaryButtonVariant).toBe('neutral');
            expect(element.secondaryButtonAlternativeText).toBeUndefined();
            expect(element.secondaryButtonIconName).toBeUndefined();
            expect(element.secondaryButtonIconPosition).toBe('left');
            expect(element.secondaryButtonIconSize).toBe('medium');
            expect(element.secondaryButtonLabel).toBeUndefined();
            expect(element.secondaryButtonVariant).toBe('neutral');
            expect(element.src).toBeUndefined();
            expect(element.subtitle).toBeUndefined();
            expect(element.title).toBeUndefined();
        });

        describe('caption', () => {
            it('Passed to the component', () => {
                element.caption = 'This is a caption text';

                return Promise.resolve().then(() => {
                    const caption = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-caption"]'
                    );
                    expect(caption.textContent).toBe('This is a caption text');
                });
            });
        });

        describe('contentHorizontalAlignment', () => {
            it('Passed to the component as center', () => {
                element.title = 'This is a title text';
                element.contentHorizontalAlignment = 'center';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-width"]'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__horizontal-alignment_center'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_right'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_left'
                    );
                });
            });

            it('Passed to the component as left', () => {
                element.title = 'This is a title text';
                element.contentHorizontalAlignment = 'left';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-width"]'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_center'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_right'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__horizontal-alignment_left'
                    );
                });
            });

            it('Passed to the component as right', () => {
                element.title = 'This is a title text';
                element.contentHorizontalAlignment = 'right';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-width"]'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_center'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__horizontal-alignment_right'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__horizontal-alignment_left'
                    );
                });
            });
        });

        describe('contentVerticalAlignment', () => {
            it('Passed to the component as center', () => {
                element.title = 'This is a title text';
                element.contentVerticalAlignment = 'center';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-container"]'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__vertical-alignment_center'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_bottom'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_top'
                    );
                });
            });

            it('Passed to the component as top', () => {
                element.title = 'This is a title text';
                element.contentVerticalAlignment = 'top';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-container"]'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_center'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_bottom'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__vertical-alignment_top'
                    );
                });
            });

            it('Passed to the component as bottom', () => {
                element.title = 'This is a title text';
                element.contentVerticalAlignment = 'bottom';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-container"]'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_center'
                    );
                    expect(textContainer.className).toContain(
                        'avonni-hero-banner__vertical-alignment_bottom'
                    );
                    expect(textContainer.className).not.toContain(
                        'avonni-hero-banner__vertical-alignment_top'
                    );
                });
            });
        });

        describe('contentWidth', () => {
            it('Passed to the component', () => {
                element.title = 'This is a title text';
                element.contentWidth = 10;
                const contentWidth = '10%';

                return Promise.resolve().then(() => {
                    const textContainer = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content"]'
                    );
                    expect(textContainer.style.width).toBe(contentWidth);
                });
            });
        });

        describe('height', () => {
            it('Passed to the component', () => {
                const height = '200px';
                element.height = 200;

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '.avonni-hero-banner__background'
                    );
                    expect(background.style.height).toBe(height);
                });
            });
        });

        describe('imageLayout', () => {
            it('Passed to the component as scale-to-fill', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imageLayout = 'scale-to-fill';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        '/ cover'
                    );
                });
            });

            it('Passed to the component as fit', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imageLayout = 'fit';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        '/ contain no-repeat'
                    );
                });
            });

            it('Passed to the component as tile', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imageLayout = 'tile';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'repeat'
                    );
                });
            });

            it('Passed to the component as tile-horizontally', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imageLayout = 'tile-horizontally';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'repeat-x'
                    );
                });
            });

            it('Passed to the component as tile-vertically', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imageLayout = 'tile-vertically';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'repeat-y'
                    );
                });
            });
        });

        describe('imagePosition', () => {
            it('Passed to the component as center', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'center';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'center center'
                    );
                });
            });

            it('Passed to the component as right', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'right';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'center right'
                    );
                });
            });

            it('Passed to the component as left', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'left';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'center left'
                    );
                });
            });

            it('Passed to the component as top center', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'top-center';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'top center'
                    );
                });
            });

            it('Passed to the component as top right', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'top-right';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'top right'
                    );
                });
            });

            it('Passed to the component as top left', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'top-left';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'top left'
                    );
                });
            });

            it('Passed to the component as bottom center', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'bottom-center';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'bottom center'
                    );
                });
            });

            it('Passed to the component as bottom right', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'bottom-right';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'bottom right'
                    );
                });
            });

            it('Passed to the component as bottom left', () => {
                element.src =
                    'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png';
                element.imagePosition = 'bottom-left';

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-background"]'
                    );
                    expect(background.getAttribute('style')).toContain(
                        'bottom left'
                    );
                });
            });
        });

        describe('maxWidth', () => {
            it('Passed to the component', () => {
                const maxWidth = '50px';
                element.maxWidth = 50;

                return Promise.resolve().then(() => {
                    const background = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-content-width"]'
                    );
                    expect(background.style.width).toBe(maxWidth);
                });
            });
        });

        describe('primaryButtonAlternativeText', () => {
            it('Passed to the component', () => {
                element.primaryButtonIconName = 'utility:pin';
                element.primaryButtonAlternativeText = 'Pinned';

                return Promise.resolve().then(() => {
                    const primaryButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button-icon"]'
                    );
                    const primaryIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button"]'
                    );
                    const primaryIconAssistiveText =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-hero-banner-primary-button-icon-assistive-text"]'
                        );

                    expect(primaryButtonIcon).toBeTruthy();
                    expect(primaryIcon.iconName).toBe('utility:pin');
                    expect(primaryIconAssistiveText.textContent).toBe('Pinned');
                });
            });
        });

        describe('primaryButtonIconName', () => {
            it('Passed to the component', () => {
                element.primaryButtonIconName = 'utility:down';

                return Promise.resolve().then(() => {
                    const primaryButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button-icon"]'
                    );
                    const primaryIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button"]'
                    );

                    expect(primaryButtonIcon).toBeTruthy();
                    expect(primaryIcon.iconName).toBe('utility:down');
                });
            });
        });

        describe('primaryButtonIconPosition', () => {
            it('Passed to the component as left', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconPosition = 'left';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    const primaryIconRight = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-right"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft.iconName).toBe('utility:down');
                    expect(primaryIconRight).toBeFalsy();
                });
            });

            it('Passed to the component as right', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    const primaryIconRight = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-right"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft).toBeFalsy();
                    expect(primaryIconRight.iconName).toBe('utility:down');
                });
            });
        });

        describe('primaryButtonIconSize', () => {
            it('Passed to the component as x-small', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft.svgClass).toContain(
                        'slds-button__icon_x-small'
                    );
                });
            });

            it('Passed to the component as small', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconSize = 'small';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft.svgClass).toContain(
                        'slds-button__icon_small'
                    );
                });
            });

            it('Passed to the component as medium', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconSize = 'medium';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft.svgClass).toBe(
                        'slds-button__icon slds-button__icon_left'
                    );
                });
            });

            it('Passed to the component as large', () => {
                element.primaryButtonIconName = 'utility:down';
                element.primaryButtonLabel = 'Primary button';
                element.primaryButtonIconSize = 'large';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    const primaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-primary-button-left"]'
                    );
                    expect(primaryButton).toBeTruthy();
                    expect(primaryIconLeft.svgClass).toContain(
                        'slds-button__icon_large'
                    );
                });
            });
        });

        describe('primaryButtonLabel', () => {
            it('Passed to the component', () => {
                element.primaryButtonLabel = 'This is a primary button label';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.textContent).toBe(
                        'This is a primary button label'
                    );
                });
            });
        });

        describe('primaryButtonVariant', () => {
            it('Passed to the component as neutral', () => {
                element.primaryButtonLabel = 'This is a primary button label';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-neutral'
                    );
                });
            });

            it('Passed to the component as base', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'base';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toBe(
                        'avonni-hero-banner__primary-button'
                    );
                });
            });

            it('Passed to the component as brand', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-brand'
                    );
                });
            });

            it('Passed to the component as brand outline', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-outline-brand'
                    );
                });
            });

            it('Passed to the component as destructive', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'destructive';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-destructive'
                    );
                });
            });

            it('Passed to the component as destructive text', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-text-destructive'
                    );
                });
            });

            it('Passed to the component as inverse', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'inverse';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-inverse'
                    );
                });
            });

            it('Passed to the component as success', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.primaryButtonVariant = 'success';

                return Promise.resolve().then(() => {
                    const primaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-primary-button"]'
                    );
                    expect(primaryButton.className).toContain(
                        'avonni-hero-banner__primary-button_variant-success'
                    );
                });
            });
        });

        describe('secondaryButtonAlternativeText', () => {
            it('Passed to the component', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:pin';
                element.secondaryButtonAlternativeText = 'Pinned';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button-icon"]'
                    );
                    const secondaryIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button"]'
                    );
                    const primaryIconAssistiveText =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-hero-banner-secondary-button-icon-assistive-text"]'
                        );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIcon.iconName).toBe('utility:pin');
                    expect(primaryIconAssistiveText.textContent).toBe('Pinned');
                });
            });
        });

        describe('secondaryButtonIconName', () => {
            it('Passed to the component', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button-icon"]'
                    );
                    const secondaryIcon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIcon.iconName).toBe('utility:down');
                });
            });
        });

        describe('secondaryButtonIconPosition', () => {
            it('Passed to the component as left', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconPosition = 'left';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    const secondaryIconRight = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-right"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft.iconName).toBe('utility:down');
                    expect(secondaryIconRight).toBeFalsy();
                });
            });

            it('Passed to the component as right', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    const secondaryIconRight = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-right"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft).toBeFalsy();
                    expect(secondaryIconRight.iconName).toBe('utility:down');
                });
            });
        });

        describe('secondaryButtonIconSize', () => {
            it('Passed to the component as x-small', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft.svgClass).toContain(
                        'slds-button__icon_x-small'
                    );
                });
            });

            it('Passed to the component as small', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconSize = 'small';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft.svgClass).toContain(
                        'slds-button__icon_small'
                    );
                });
            });

            it('Passed to the component as medium', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconSize = 'medium';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft.svgClass).toBe(
                        'slds-button__icon slds-button__icon_left'
                    );
                });
            });

            it('Passed to the component as large', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonIconName = 'utility:down';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonIconSize = 'large';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    const secondaryIconLeft = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-secondary-button-left"]'
                    );
                    expect(secondaryButton).toBeTruthy();
                    expect(secondaryIconLeft.svgClass).toContain(
                        'slds-button__icon_large'
                    );
                });
            });
        });

        describe('secondaryButtonLabel', () => {
            it('Passed to the component', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.textContent).toBe(
                        'This is a secondary button label'
                    );
                });
            });
        });

        describe('secondaryButtonVariant', () => {
            it('Passed to the component as neutral', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-neutral'
                    );
                });
            });

            it('Passed to the component as base', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'base';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toBe(
                        'avonni-hero-banner__secondary-button slds-m-left_x-small'
                    );
                });
            });

            it('Passed to the component as brand', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-brand'
                    );
                });
            });

            it('Passed to the component as brand outline', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-outline-brand'
                    );
                });
            });

            it('Passed to the component as destructive', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'destructive';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-destructive'
                    );
                });
            });

            it('Passed to the component as destructive text', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-text-destructive'
                    );
                });
            });

            it('Passed to the component as inverse', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'inverse';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-inverse'
                    );
                });
            });

            it('Passed to the component as success', () => {
                element.primaryButtonLabel = 'This is a primary button label';
                element.secondaryButtonLabel =
                    'This is a secondary button label';
                element.secondaryButtonVariant = 'success';

                return Promise.resolve().then(() => {
                    const secondaryButton = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-secondary-button"]'
                    );
                    expect(secondaryButton.className).toContain(
                        'avonni-hero-banner__secondary-button_variant-success'
                    );
                });
            });
        });

        describe('subtitle', () => {
            it('Passed to the component', () => {
                element.subtitle = 'This is a subtitle text';

                return Promise.resolve().then(() => {
                    const subtitle = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-subtitle"]'
                    );
                    expect(subtitle.textContent).toBe(
                        'This is a subtitle text'
                    );
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'This is a title text';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-hero-banner-title"]'
                    );
                    expect(title.textContent).toBe('This is a title text');
                });
            });
        });
    });

    describe('Events', () => {
        it('primary button click event', () => {
            element.primaryButtonLabel = 'This is a primary button label';

            const handler = jest.fn();
            element.addEventListener('primarybuttonclick', handler);

            return Promise.resolve().then(() => {
                const primaryButton = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-hero-banner-primary-button"]'
                );
                primaryButton.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('secondary button click event', () => {
            element.primaryButtonLabel = 'This is a primary button label';
            element.secondaryButtonLabel = 'This is a secondary button label';

            const handler = jest.fn();
            element.addEventListener('secondarybuttonclick', handler);

            return Promise.resolve().then(() => {
                const secondaryButton = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-hero-banner-secondary-button"]'
                );
                secondaryButton.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });
    });
});

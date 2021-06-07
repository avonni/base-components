import { createElement } from 'lwc';
import Carousel from 'c/carousel';

// not tested
// scroll duration
// isInfinite

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

const items = [
    {
        id: 1,
        title: 'Visit App Exchange',
        description: 'Extend Salesforce with the #1 business marketplace.',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 2,
        title: 'Click to Customize',
        description:
            'Use the Object Manager to add fields, build layouts, and more.',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 3,
        title: 'Download Salesforce Apps',
        description: "Get the mobile app that's just for Salesforce admins.",
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 4,
        title: 'Carousel Item 4',
        description: 'Description for carousel item #4',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 5,
        title: 'Carousel Item 5',
        description: 'Description for carousel item #5',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 6,
        title: 'Carousel Item 6',
        description: 'Description for carousel item #6',
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 7,
        title: 'Carousel Item 7',
        description: 'Description for carousel item #7',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    }
];

describe('Carousel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    // const flushPromises = () => new Promise(setImmediate);

    it('Default attributes', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });

        expect(element.assistiveText).toMatchObject({
            autoplayButton: 'Start / Stop auto-play',
            nextPanel: 'Next Panel',
            previousPanel: 'Previous Panel'
        });
        expect(element.items).toMatchObject([]);
        expect(element.disableAutoRefresh).toBeFalsy();
        expect(element.disableAutoScroll).toBeFalsy();
        expect(element.scrollDuration).toBe(5);
        expect(element.indicatorVariant).toBe('base');
        expect(element.isIfinite).toBeFalsy();
        expect(element.currentPanel).toBeUndefined();
        expect(element.hideIndicator).toBeFalsy();
        expect(element.hidePreviousNextPanelNavigation).toBeFalsy();
        expect(element.itemsPerPanel).toBe(1);
    });

    /* ----- ATTRIBUTES ----- */

    // assistive-text
    it('Carousel assistive-text with indicator', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.assistiveText = {
            nextPanel: 'Next Panel Assistive Text',
            previousPanel: 'Previous Panel Assistive Text',
            autoplayButton: 'Start / Stop auto-play Panel Assistive Text'
        };
        element.hideIndicator = false;

        return Promise.resolve().then(() => {
            const panelButtons = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__nav-button'
            );
            expect(panelButtons[0].title).toBe('Previous Panel Assistive Text');
            expect(panelButtons[1].title).toBe('Next Panel Assistive Text');
            const autoPlayButton = element.shadowRoot.querySelector(
                '.avonni-carousel__autoscroll-button-with-indicator'
            );
            expect(autoPlayButton.title).toBe(
                'Start / Stop auto-play Panel Assistive Text'
            );
        });
    });

    it('Carousel assistive-text without indicator', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.assistiveText = {
            nextPanel: 'Next Panel Assistive Text',
            previousPanel: 'Previous Panel Assistive Text',
            autoplayButton: 'Start / Stop auto-play Panel Assistive Text'
        };
        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const panelButtons = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__nav-button'
            );
            expect(panelButtons[0].title).toBe('Previous Panel Assistive Text');
            expect(panelButtons[1].title).toBe('Next Panel Assistive Text');
            const autoPlayButton = element.shadowRoot.querySelector(
                '.avonni-carousel__autoscroll-button-without-indicator'
            );
            expect(autoPlayButton.title).toBe(
                'Start / Stop auto-play Panel Assistive Text'
            );
        });
    });

    // disable auto refresh
    it('Carousel disable auto refresh', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.disableAutoRefresh = true;

        return Promise.resolve()
            .then(() => {
                const panelButtons = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__nav-button'
                );
                const nextButton = panelButtons[0];
                nextButton.click();
            })
            .then(() => {
                const autoPlayButton = element.shadowRoot.querySelector(
                    '.avonni-carousel__autoscroll-button-with-indicator'
                );
                expect(autoPlayButton.iconName).toBe('utility:play');
            });
    });

    // disable auto scrollable
    it('Carousel disable auto scrollable with indicator', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.disableAutoScroll = true;
        element.hideIndicator = false;

        return Promise.resolve().then(() => {
            const autoPlayButton = element.shadowRoot.querySelector(
                '.avonni-carousel__autoscroll-button-with-indicator'
            );
            expect(autoPlayButton).toBeFalsy();
        });
    });

    it('Carousel disable auto scrollable without indicator', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.disableAutoScroll = true;
        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const autoPlayButton = element.shadowRoot.querySelector(
                '.avonni-carousel__autoscroll-button-without-indicator'
            );
            expect(autoPlayButton).toBeFalsy();
        });
    });

    // indicator variant
    it('Carousel indicator variant base', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.hideIndicator = false;

        return Promise.resolve().then(() => {
            const activeIndicator = element.shadowRoot.querySelector(
                '.slds-is-active'
            );
            expect(activeIndicator.className).not.toContain(
                'avonni-carousel-progress-indicator-shaded-active'
            );
            const indicators = element.shadowRoot.querySelectorAll(
                '.slds-carousel__indicator-action'
            );
            indicators.forEach((indicator) => {
                expect(indicator.className).not.toContain(
                    'avonni-carousel-progress-indicator-shaded-inactive'
                );
            });
        });
    });

    it('Carousel indicator variant shaded', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.indicatorVariant = 'shaded';
        element.items = items;

        return Promise.resolve().then(() => {
            const activeIndicator = element.shadowRoot.querySelector(
                '.avonni-carousel-progress-indicator-shaded-active'
            );
            expect(activeIndicator.className).toBeTruthy();
            const indicators = element.shadowRoot.querySelectorAll(
                '.slds-carousel__indicator-action'
            );
            indicators.forEach((indicator) => {
                expect(indicator.className).toContain(
                    'avonni-carousel-progress-indicator-shaded-inactive'
                );
            });
        });
    });

    // current panel
    it('Carousel current panel', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.currentPanel = 2;
        element.items = items;

        return Promise.resolve()
            .then(() => {})
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const thirdPanel = panels[2];
                expect(thirdPanel.ariaHidden).toBe('false');
            });
    });

    // hide indicator
    it('Carousel hide indicator', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const indicators = element.shadowRoot.querySelectorAll('li');
            expect(indicators).toHaveLength(0);
        });
    });

    // hide previous next panel navigation
    it('Carousel hide previous next panel navigation', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.hidePreviousNextPanelNavigation = true;

        return Promise.resolve().then(() => {
            // only the autoplay button is present
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            expect(buttons).toHaveLength(1);
        });
    });

    // items per panel
    it('Carousel items per panel not a number', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.itemsPerPanel = 'hello';

        return Promise.resolve().then(() => {
            const panels = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__panel'
            );
            expect(element.itemsPerPanel).toBe(1);
            expect(panels).toHaveLength(7);
        });
    });

    it('Carousel items per panel', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.itemsPerPanel = 2;
        element.items = items;

        return Promise.resolve().then(() => {
            const panels = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__panel'
            );
            expect(panels).toHaveLength(4);
        });
    });

    // items
    it('Carousel items', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                buttonLabel: 'Get Started',
                buttonIconName: 'utility:close',
                buttonVariant: 'neutral',
                buttonIconPosition: 'left',
                secondaryButtonLabel: 'Learn more',
                secondaryButtonIconName: 'utility:check',
                secondaryButtonVariant: 'neutral',
                secondaryButtonIconPosition: 'left',
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            }
        ];

        element.items = example;

        return Promise.resolve().then(() => {
            const item = example[0];
            const a = element.shadowRoot.querySelector(
                '.slds-carousel__panel-action'
            );
            expect(a.href).toBe(item.href);
            const button = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(button[0].label).toBe(item.buttonLabel);
            expect(button[0].iconName).toBe(item.buttonIconName);
            expect(button[0].variant).toBe(item.buttonVariant);
            expect(button[0].iconPosition).toBe(item.buttonIconPosition);
            expect(button[1].label).toBe(item.secondaryButtonLabel);
            expect(button[1].iconName).toBe(item.secondaryButtonIconName);
            expect(button[1].variant).toBe(item.secondaryButtonVariant);
            expect(button[1].iconPosition).toBe(
                item.secondaryButtonIconPosition
            );
            const description = element.shadowRoot.querySelector(
                '.slds-carousel__content > p'
            );
            expect(description.textContent).toBe(
                'Extend Salesforce with the #1 business marketplace.'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-carousel__content-title'
            );
            expect(title.textContent).toBe('Visit App Exchange');
            const img = element.shadowRoot.querySelector('img');
            expect(img.src).toBe(
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
            );
        });
    });

    /* ----- JS ----- */

    // handle indicator click
    it('Carousel handle indicator click base', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });

        element.items = items;

        document.body.appendChild(element);

        const indicators = element.shadowRoot.querySelectorAll('li');

        return Promise.resolve()
            .then(() => {
                const secondIndicator = indicators[1];
                secondIndicator.click();
            })
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const secondPanel = panels[1];
                expect(secondPanel.getAttribute('aria-hidden')).toBe('false');
            });
    });

    it('Carousel handle indicator click shaded', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });

        element.items = items;
        element.indicatorVariant = 'shaded';

        document.body.appendChild(element);

        const indicators = element.shadowRoot.querySelectorAll(
            '.slds-carousel__indicator-action'
        );

        return Promise.resolve()
            .then(() => {
                const secondIndicator = indicators[1];
                secondIndicator.click();
            })
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const secondPanel = panels[1];
                expect(secondPanel.getAttribute('aria-hidden')).toBe('false');
            });
    });

    // Scroll right
    it('Carousel handle scroll right', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        const buttons = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );
        const nextButton = buttons[2];

        return Promise.resolve()
            .then(() => {
                nextButton.click();
            })
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const secondPanel = panels[1];
                expect(secondPanel.ariaHidden).toBe('false');
            });
    });

    // Scroll left
    it('Carousel handle scroll left', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });

        document.body.appendChild(element);

        element.items = items;
        const buttons = element.shadowRoot.querySelectorAll(
            'lightning-button-icon'
        );
        const nextButton = buttons[2];
        const previousButton = buttons[0];

        return Promise.resolve()
            .then(() => {
                nextButton.click();
            })
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const secondPanel = panels[1];
                expect(secondPanel.ariaHidden).toBe('false');
            })
            .then(() => {
                previousButton.click();
            })
            .then(() => {
                const panels = element.shadowRoot.querySelectorAll(
                    '.avonni-carousel__panel'
                );
                const secondPanel = panels[1];
                const firstPanel = panels[0];
                expect(secondPanel.ariaHidden).toBe('true');
                expect(firstPanel.ariaHidden).toBe('false');
            });
    });

    // Carousel content height based on number of buttons ( 4 scenarios )
    it('Carousel content height with 2 buttons on 1 item', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example1 = [
            {
                buttonLabel: 'Get Started',
                buttonIconName: 'utility:close',
                buttonVariant: 'neutral',
                buttonIconPosition: 'left',
                secondaryButtonLabel: 'Learn more',
                secondaryButtonIconName: 'utility:check',
                secondaryButtonVariant: 'neutral',
                secondaryButtonIconPosition: 'left',
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            }
        ];

        element.items = example1;

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelector(
                '.avonni-carousel__content'
            );
            expect(carouselContent.style.height).toBe('12rem');
        });
    });

    it('Carousel content height with 2 buttons on 1 item and 1 button on second item', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example2 = [
            {
                buttonLabel: 'Get Started',
                buttonIconName: 'utility:close',
                buttonVariant: 'neutral',
                buttonIconPosition: 'left',
                secondaryButtonLabel: 'Learn more',
                secondaryButtonIconName: 'utility:check',
                secondaryButtonVariant: 'neutral',
                secondaryButtonIconPosition: 'left',
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            },
            {
                buttonLabel: 'Get Started',
                buttonIconName: 'utility:close',
                buttonVariant: 'neutral',
                buttonIconPosition: 'left',
                id: 2,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            }
        ];

        element.items = example2;

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__content'
            );
            carouselContent.forEach((content) => {
                expect(content.style.height).toBe('12rem');
            });
        });
    });

    it('Carousel content height with 1 button on 1 item and no button on second item', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example3 = [
            {
                buttonLabel: 'Get Started',
                buttonIconName: 'utility:close',
                buttonVariant: 'neutral',
                buttonIconPosition: 'left',
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            },
            {
                id: 2,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            }
        ];

        element.items = example3;

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__content'
            );
            carouselContent.forEach((content) => {
                expect(content.style.height).toBe('8.5rem');
            });
        });
    });
    it('Carousel content height with no buttons', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example4 = [
            {
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            },
            {
                id: 2,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com/'
            }
        ];

        element.items = example4;

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__content'
            );
            carouselContent.forEach((content) => {
                expect(content.style.height).toBe('6.625rem');
            });
        });
    });

    /* ----- EVENTS ----- */

    // carousel itemclick
    it('Carousel item click', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                buttonLabel: 'Get Started',
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com'
            }
        ];

        element.items = items;

        const handler = jest.fn();
        element.addEventListener('itemclick', handler);

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                '.slds-carousel__panel-action'
            );
            item.click();
            expect(handler).toHaveBeenCalled();
            expect([handler.mock.calls[0][0].detail.item]).toMatchObject(
                example
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});

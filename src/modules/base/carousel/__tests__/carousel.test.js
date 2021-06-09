import { createElement } from 'lwc';
import Carousel from 'c/carousel';

// not tested
// scroll duration

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
        expect(element.actionsVariant).toBe('border');
        expect(element.actionsPosition).toBe('bottom-center');
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

        element.items = [
            {
                id: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com'
            }
        ];
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
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
            const description = element.shadowRoot.querySelector(
                '.avonni-carousel__content-description'
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
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button-icon'
            );
            expect(action.name).toBe('action-add');
            expect(action.iconName).toBe('utility:add');
        });
    });

    // actions variant
    it('Carousel actions variant bare without label', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button-icon'
            );
            expect(action.variant).toBe('bare');
        });
    });

    it('Carousel actions variant border without label', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsVariant = 'border';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button-icon'
            );
            expect(action.variant).toBe('border');
        });
    });

    it('Carousel actions variant bare with label', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [
                    {
                        name: 'action-add',
                        iconName: 'utility:add',
                        label: 'add'
                    }
                ],
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
        element.actionsVariant = 'bare';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button'
            );
            expect(action.variant).toBe('base');
        });
    });

    it('Carousel actions variant border with label', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [
                    {
                        name: 'action-add',
                        iconName: 'utility:add',
                        label: 'add'
                    }
                ],
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
        element.actionsVariant = 'border';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button'
            );
            expect(action.variant).toBe('neutral');
        });
    });

    it('Carousel actions variant menu', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [
                    {
                        name: 'action-add',
                        iconName: 'utility:add',
                        label: 'add'
                    }
                ],
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
        element.actionsVariant = 'menu';

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button-menu'
            );
            expect(action).toBeTruthy();
        });
    });

    // actions position
    it('Carousel actions position bottom-center', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-bottom-center'
            );
            expect(actionContainer.className).toContain('slds-m-top_x-small');
        });
    });

    it('Carousel actions position bottom-right', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-right'
            );
            expect(actionContainer.className).toContain('slds-m-top_x-small');
        });
    });

    it('Carousel actions position bottom-left', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const contentContainer = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(contentContainer.className).toContain(
                'avonni-carousel__content-bottom'
            );
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-left'
            );
            expect(actionContainer.className).toContain('slds-m-top_x-small');
        });
    });

    it('Carousel actions position top-left', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsPosition = 'top-left';

        return Promise.resolve().then(() => {
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-left'
            );
            expect(actionContainer.className).toContain(
                'slds-m-bottom_x-small'
            );
        });
    });

    it('Carousel actions position top-right', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [{ name: 'action-add', iconName: 'utility:add' }],
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
        element.actionsPosition = 'top-right';

        return Promise.resolve().then(() => {
            const actionContainer = element.shadowRoot.querySelector(
                '.avonni-carousel__actions'
            );
            expect(actionContainer.className).toContain(
                'avonni-carousel__actions-right'
            );
            expect(actionContainer.className).toContain(
                'slds-m-bottom_x-small'
            );
        });
    });

    // carousel infinite last goes back to first
    it('Carousel infinite last goes back to first', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.hideIndicator = false;
        element.isIfinite = true;
        const lastItem = items.length - 1;

        return Promise.resolve()
            .then(() => {
                element.last();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[lastItem].className).toContain(
                    'slds-is-active'
                );
                element.next();
                expect(indicators[0].className).toContain('slds-is-active');
            });
    });

    // carousel infinite first goes back to last
    it('Carousel infinite first goes back to last', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        element.items = items;
        element.hideIndicator = false;
        element.isIfinite = true;
        const lastItem = items.length - 1;

        return Promise.resolve()
            .then(() => {
                element.first();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[0].className).toContain('slds-is-active');
                element.previous();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[lastItem].className).toContain(
                    'slds-is-active'
                );
            });
    });

    /* ----- METHODS ----- */

    // carousel next & previous
    it('Carousel next & previous methods', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);
        element.items = items;
        element.hideIndicator = false;
        return Promise.resolve()
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[0].className).toContain('slds-is-active');
                expect(indicators[1].className).not.toContain('slds-is-active');
                element.next();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[0].className).not.toContain('slds-is-active');
                expect(indicators[1].className).toContain('slds-is-active');
                element.previous();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[0].className).toContain('slds-is-active');
                expect(indicators[1].className).not.toContain('slds-is-active');
            });
    });

    // carousel first & last
    it('Carousel first & last methods', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);
        element.items = items;
        element.hideIndicator = false;
        const lastItem = items.length - 1;
        return Promise.resolve()
            .then(() => {
                element.last();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    'li > a'
                );
                expect(indicators[lastItem].className).toContain(
                    'slds-is-active'
                );
                element.first();
                expect(indicators[0].className).toContain('slds-is-active');
            });
    });

    // carousel start & pause
    it('Carousel start & pause methods', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);
        element.items = items;
        element.hideIndicator = false;
        element.pause();
        return Promise.resolve()
            .then(() => {
                const autoPlayButton = element.shadowRoot.querySelector(
                    '.avonni-carousel__autoscroll-button-with-indicator'
                );
                expect(autoPlayButton.iconName).toBe('utility:play');
                element.start();
            })
            .then(() => {
                const autoPlayButton = element.shadowRoot.querySelector(
                    '.avonni-carousel__autoscroll-button-with-indicator'
                );
                expect(autoPlayButton.iconName).toBe('utility:pause');
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

    // Carousel content height based on actions or not
    it('Carousel content height with actions', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
                actions: [
                    {
                        name: 'action-add',
                        iconName: 'utility:add',
                        label: 'add'
                    }
                ],
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
        element.actionsVariant = 'menu';

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(carouselContent.style.height).toBe('8.5rem');
        });
    });

    it('Carousel content height without actions', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = [
            {
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
        element.actionsVariant = 'menu';

        return Promise.resolve().then(() => {
            const carouselContent = element.shadowRoot.querySelector(
                '.slds-carousel__content'
            );
            expect(carouselContent.style.height).toBe('6.625rem');
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
                key: 1,
                title: 'Visit App Exchange',
                description:
                    'Extend Salesforce with the #1 business marketplace.',
                imageAssistiveText: 'Appy',
                src:
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                href: 'https://www.salesforce.com',
                actions: bareActions
            }
        ];

        element.items = items;

        const handler = jest.fn();
        element.addEventListener('itemclick', handler);

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector('a');
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

    // carousel actionclick
    it('Carousel actionclick', () => {
        const element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);

        const example = {
            key: 1,
            title: 'Visit App Exchange',
            description: 'Extend Salesforce with the #1 business marketplace.',
            imageAssistiveText: 'Appy',
            src:
                'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
            href: 'https://www.salesforce.com',
            actions: bareActions
        };

        element.items = items;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '.avonni-carousel__actions > lightning-button-icon'
            );
            action.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('action-add');
            expect(handler.mock.calls[0][0].detail.item).toMatchObject(example);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});

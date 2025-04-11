import { createElement } from 'lwc';
import Carousel from 'c/carousel';

// Not tested:
// * scroll duration,
// * smallItemsPerPanel, mediumItemsPerPanel, largeItemsPerPanel as they depend on the resize observer
// * The maxIndicatorItems animations are not fully tested, as it is mostly a visual effect. We only check that the process of adding/removing classes is present.

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
        name: '1',
        title: 'Visit App Exchange',
        description: 'Extend Salesforce with the #1 business marketplace.',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '2',
        title: 'Click to Customize',
        description:
            'Use the Object Manager to add fields, build layouts, and more.',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '3',
        title: 'Download Salesforce Apps',
        description: "Get the mobile app that's just for Salesforce admins.",
        imageAssistiveText: 'Salesforce Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '4',
        title: 'Carousel Item 4',
        description: 'Description for carousel item #4',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '5',
        title: 'Carousel Item 5',
        description: 'Description for carousel item #5',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '6',
        title: 'Carousel Item 6',
        description: 'Description for carousel item #6',
        imageAssistiveText: 'Salesforce Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        name: '7',
        title: 'Carousel Item 7',
        description: 'Description for carousel item #7',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
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

describe('Carousel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-carousel', {
            is: Carousel
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actionsPosition).toBe('bottom-center');
            expect(element.actionsVariant).toBe('border');
            expect(element.assistiveText).toMatchObject({
                autoplayButton: 'Play / Stop auto-play',
                nextPanel: 'Next Panel',
                previousPanel: 'Previous Panel'
            });
            expect(element.cropFit).toBe('cover');
            expect(element.currentPanel).toBeUndefined();
            expect(element.disableAutoRefresh).toBeFalsy();
            expect(element.disableAutoScroll).toBeFalsy();
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.hideIndicator).toBeFalsy();
            expect(element.hidePreviousNextPanelNavigation).toBeFalsy();
            expect(element.items).toMatchObject([]);
            expect(element.imagePosition).toBe('top');
            expect(element.indicatorVariant).toBe('base');
            expect(element.isInfinite).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.itemsPerPanel).toBe(1);
            expect(element.largeItemsPerPanel).toBeUndefined();
            expect(element.loadMoreOffset).toBe(1);
            expect(element.maxIndicatorItems).toBeUndefined();
            expect(element.mediumItemsPerPanel).toBeUndefined();
            expect(element.scrollDuration).toBe(5);
            expect(element.smallItemsPerPanel).toBeUndefined();
        });

        describe('Action Variant', () => {
            it('Bare without label', () => {
                element.items = items;
                element.actionsVariant = 'bare';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        'c-primitive-carousel-item'
                    );
                    expect(action.actionsVariant).toBe('bare');
                });
            });
        });

        describe('Action positions', () => {
            it('Actions position top-center', () => {
                element.items = items;
                element.actionsPosition = 'top-left';

                return Promise.resolve().then(() => {
                    const action = element.shadowRoot.querySelector(
                        'c-primitive-carousel-item'
                    );
                    expect(action.actionsPosition).toBe('top-left');
                });
            });
        });

        describe('Image crop fit', () => {
            it('Image crop fit contain', () => {
                element.items = items;
                element.cropFit = 'contain';

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-carousel-item'
                    );
                    expect(item.cropFit).toBe('contain');
                });
            });
        });

        describe('Image positions', () => {
            it('Image position left', () => {
                element.items = items;
                element.imagePosition = 'left';

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-carousel-item'
                    );
                    expect(item.imagePosition).toBe('left');
                });
            });
        });

        describe('Assistive Text', () => {
            it('Assistive-text with indicator', () => {
                element.items = items;
                element.assistiveText = {
                    nextPanel: 'Next Panel Assistive Text',
                    previousPanel: 'Previous Panel Assistive Text',
                    autoplayButton:
                        'Start / Stop auto-play Panel Assistive Text'
                };
                element.hideIndicator = false;

                return Promise.resolve().then(() => {
                    const panelButtons = element.shadowRoot.querySelectorAll(
                        '.avonni-carousel__nav-button'
                    );
                    expect(panelButtons[0].title).toBe(
                        'Previous Panel Assistive Text'
                    );
                    expect(panelButtons[1].title).toBe(
                        'Next Panel Assistive Text'
                    );
                    const autoPlayButton = element.shadowRoot.querySelector(
                        '.avonni-carousel__autoscroll-button-with-indicator'
                    );
                    expect(autoPlayButton.title).toBe(
                        'Start / Stop auto-play Panel Assistive Text'
                    );
                });
            });

            it('Assistive-text without indicator', () => {
                element.items = items;
                element.assistiveText = {
                    nextPanel: 'Next Panel Assistive Text',
                    previousPanel: 'Previous Panel Assistive Text',
                    autoplayButton:
                        'Start / Stop auto-play Panel Assistive Text'
                };
                element.hideIndicator = true;

                return Promise.resolve().then(() => {
                    const panelButtons = element.shadowRoot.querySelectorAll(
                        '.avonni-carousel__nav-button'
                    );
                    expect(panelButtons[0].title).toBe(
                        'Previous Panel Assistive Text'
                    );
                    expect(panelButtons[1].title).toBe(
                        'Next Panel Assistive Text'
                    );
                    const autoPlayButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(autoPlayButton.title).toBe(
                        'Start / Stop auto-play Panel Assistive Text'
                    );
                });
            });
        });

        describe('Disable Auto Refresh', () => {
            it('Disable auto refresh', () => {
                element.items = items;
                element.disableAutoRefresh = true;

                return Promise.resolve()
                    .then(() => {
                        const panelButtons =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-carousel__nav-button'
                            );
                        const nextButton = panelButtons[1];
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
            it('Disable auto scrollable with indicator', () => {
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

            it('Disable auto scrollable without indicator', () => {
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
        });

        describe('Indicator variant', () => {
            it('Indicator variant base', () => {
                element.items = items;
                element.hideIndicator = false;

                return Promise.resolve().then(() => {
                    const activeIndicator =
                        element.shadowRoot.querySelector('.slds-is-active');
                    expect(activeIndicator.className).not.toContain(
                        'avonni-carousel__progress-indicator_shaded-active'
                    );
                    const indicators = element.shadowRoot.querySelectorAll(
                        '.slds-carousel__indicator-action'
                    );
                    indicators.forEach((indicator) => {
                        expect(indicator.className).not.toContain(
                            'avonni-carousel__progress-indicator_shaded-inactive'
                        );
                    });
                });
            });

            it('Indicator variant shaded', () => {
                element.indicatorVariant = 'shaded';
                element.items = items;

                return Promise.resolve().then(() => {
                    const activeIndicator = element.shadowRoot.querySelector(
                        '.avonni-carousel__progress-indicator_shaded-active'
                    );
                    expect(activeIndicator.className).toBeTruthy();
                    const indicators = element.shadowRoot.querySelectorAll(
                        '.slds-carousel__indicator-action'
                    );
                    indicators.forEach((indicator) => {
                        expect(indicator.className).toContain(
                            'avonni-carousel__progress-indicator_shaded-inactive'
                        );
                    });
                });
            });
        });

        describe('Current Panel', () => {
            it('Current panel', () => {
                element.currentPanel = '3';
                element.items = items;

                return Promise.resolve().then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const thirdPanel = panels[2];
                    expect(thirdPanel.ariaHidden).toBe('false');
                });
            });

            it('Current panel, more than one item per panel', () => {
                element.currentPanel = '3';
                element.items = items;
                element.itemsPerPanel = 2;

                return Promise.resolve().then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    expect(secondPanel.ariaHidden).toBe('false');
                });
            });

            it('Current panel is set automatically on navigation', () => {
                element.items = items;
                element.itemsPerPanel = 2;

                return Promise.resolve().then(() => {
                    expect(element.currentPanel).toBeUndefined();
                    const next = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-next"]'
                    );
                    next.click();
                    expect(element.currentPanel).toBe('3');
                });
            });
        });

        describe('Hide Indicator', () => {
            it('hide indicator', () => {
                element.items = items;
                element.hideIndicator = true;

                return Promise.resolve().then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="li-pagination"]'
                    );
                    expect(indicators).toHaveLength(0);
                });
            });
        });

        describe('hide previous next panel navigation', () => {
            it('hide previous next panel navigation', () => {
                element.items = [
                    {
                        name: '1',
                        title: 'Visit App Exchange',
                        description:
                            'Extend Salesforce with the #1 business marketplace.',
                        imageAssistiveText: 'Appy',
                        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                        href: 'https://www.salesforce.com'
                    }
                ];
                element.hidePreviousNextPanelNavigation = true;

                return Promise.resolve().then(() => {
                    // only the autoplay button is present
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    expect(buttons).toHaveLength(1);
                });
            });
        });

        describe('Items per panel', () => {
            it('items per panel not a number', () => {
                element.items = items;
                element.itemsPerPanel = 'hello';

                return Promise.resolve().then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    expect(element.itemsPerPanel).toBe(1);
                    expect(panels).toHaveLength(7);
                });
            });

            it('items per panel', () => {
                element.itemsPerPanel = 2;
                element.items = items;

                return Promise.resolve().then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    expect(panels).toHaveLength(4);
                });
            });
        });

        describe('Infinite', () => {
            it('Infinite last goes back to first', () => {
                element.items = items;
                element.hideIndicator = false;
                element.isInfinite = true;
                const lastItem = items.length - 1;

                return Promise.resolve()
                    .then(() => {
                        element.last();
                    })
                    .then(() => {
                        const indicators = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="a-pagination"]'
                        );
                        expect(indicators[lastItem].className).toContain(
                            'slds-is-active'
                        );
                        element.next();
                        expect(indicators[0].className).toContain(
                            'slds-is-active'
                        );
                    });
            });

            it('Infinite first goes back to last', () => {
                element.items = items;
                element.hideIndicator = false;
                element.isInfinite = true;
                const lastItem = items.length - 1;

                return Promise.resolve()
                    .then(() => {
                        element.first();
                    })
                    .then(() => {
                        const indicators = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="a-pagination"]'
                        );
                        expect(indicators[0].className).toContain(
                            'slds-is-active'
                        );
                        element.previous();
                    })
                    .then(() => {
                        const indicators = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="a-pagination"]'
                        );
                        expect(indicators[lastItem].className).toContain(
                            'slds-is-active'
                        );
                    });
            });
        });

        describe('Max indicator items', () => {
            it('Only the maximum number of items is shown', () => {
                element.items = items;

                return Promise.resolve()
                    .then(() => {
                        const paginationItems =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="a-pagination"]'
                            );
                        expect(paginationItems).toHaveLength(items.length);
                        element.maxIndicatorItems = 3;
                    })
                    .then(() => {
                        const paginationItems =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="a-pagination"]'
                            );
                        // Two items are added to make the scroll work
                        expect(paginationItems).toHaveLength(5);
                    });
            });

            it('Items are animated on next button click', () => {
                element.maxIndicatorItems = 4;
                element.items = items;

                return Promise.resolve().then(() => {
                    // No animation class
                    const paginationItems = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-pagination"]'
                    );
                    expect(paginationItems[1].classList).not.toContain(
                        'avonni-carousel__progress-indicator_to-small'
                    );
                    expect(paginationItems[1].classList).toContain(
                        'slds-is-active'
                    );

                    // On click on next, the animation class is added
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-next"]'
                    );
                    nextButton.click();

                    expect(paginationItems[1].classList).toContain(
                        'avonni-carousel__progress-indicator_to-small'
                    );
                    expect(paginationItems[1].classList).not.toContain(
                        'slds-is-active'
                    );
                    expect(paginationItems[2].classList).toContain(
                        'slds-is-active'
                    );

                    // On animation end, the class is removed
                    paginationItems[1].dispatchEvent(
                        new CustomEvent('animationend')
                    );
                    expect(paginationItems[1].classList).not.toContain(
                        'avonni-carousel__progress-indicator_to-small'
                    );
                    expect(paginationItems[2].classList).toContain(
                        'slds-is-active'
                    );
                });
            });

            describe('Set active item', () => {
                it('The first item is displayed as active by default', () => {
                    element.items = items;

                    return Promise.resolve()
                        .then(() => {
                            const paginationItems =
                                element.shadowRoot.querySelectorAll(
                                    '[data-element-id="a-pagination"]'
                                );
                            expect(paginationItems[0].classList).toContain(
                                'slds-is-active'
                            );
                            [1, 2, 3, 4, 5, 6].forEach((index) => {
                                expect(
                                    paginationItems[index].classList
                                ).not.toContain('slds-is-active');
                            });

                            element.maxIndicatorItems = 4;
                        })
                        .then(() => {
                            const paginationItems =
                                element.shadowRoot.querySelectorAll(
                                    '[data-element-id="a-pagination"]'
                                );
                            expect(paginationItems[1].classList).toContain(
                                'slds-is-active'
                            );
                            [0, 2, 3, 4, 5].forEach((index) => {
                                expect(
                                    paginationItems[index].classList
                                ).not.toContain('slds-is-active');
                            });
                        });
                });
            });

            it('Set current panel on second', () => {
                element.items = items;
                element.maxIndicatorItems = 4;
                element.currentPanel = '2';

                return Promise.resolve().then(() => {
                    const paginationItems = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-pagination"]'
                    );
                    expect(paginationItems[2].classList).toContain(
                        'slds-is-active'
                    );
                    [0, 1, 3, 4, 5].forEach((index) => {
                        expect(paginationItems[index].classList).not.toContain(
                            'slds-is-active'
                        );
                    });
                });
            });

            it('Set current panel on third, all items are visible', () => {
                element.items = items;
                element.currentPanel = '3';

                return Promise.resolve().then(() => {
                    const paginationItems = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-pagination"]'
                    );
                    expect(paginationItems[2].classList).toContain(
                        'slds-is-active'
                    );
                    [0, 1, 3, 4, 5].forEach((index) => {
                        expect(paginationItems[index].classList).not.toContain(
                            'slds-is-active'
                        );
                    });
                });
            });

            it('Set a future panel as active', () => {
                element.items = items;
                element.maxIndicatorItems = 4;

                return Promise.resolve()
                    .then(() => {
                        element.currentPanel = '3';
                    })
                    .then(() => {
                        const paginationItems =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="a-pagination"]'
                            );
                        expect(paginationItems[2].classList).toContain(
                            'slds-is-active'
                        );
                        [0, 1, 3, 4, 5].forEach((index) => {
                            expect(
                                paginationItems[index].classList
                            ).not.toContain('slds-is-active');
                        });
                    });
            });

            it('Set the last panel as active', () => {
                element.items = items;
                element.maxIndicatorItems = 4;
                element.currentPanel = items[items.length - 1].name;

                return Promise.resolve().then(() => {
                    const paginationItems = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-pagination"]'
                    );
                    expect(paginationItems[4].classList).toContain(
                        'slds-is-active'
                    );
                });
            });

            it('Set a previous panel as active', () => {
                element.items = items;
                element.maxIndicatorItems = 4;
                element.currentPanel = items[items.length - 1].name;

                return Promise.resolve()
                    .then(() => {
                        element.currentPanel = items[3].name;
                    })
                    .then(() => {
                        const paginationItems =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="a-pagination"]'
                            );
                        expect(paginationItems[3].classList).toContain(
                            'slds-is-active'
                        );
                    });
            });
        });
    });

    describe('Is loading', () => {
        it('false', () => {
            element.items = items;
            element.isLoading = false;

            return Promise.resolve().then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner).toBeFalsy();
            });
        });

        it('true', () => {
            element.items = items;
            element.isLoading = true;

            return Promise.resolve().then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner).toBeTruthy();
            });
        });
    });

    describe('Methods', () => {
        it('next & previous', () => {
            element.items = items;
            element.hideIndicator = false;
            return Promise.resolve()
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-pagination"]'
                    );
                    expect(indicators[0].className).toContain('slds-is-active');
                    expect(indicators[1].className).not.toContain(
                        'slds-is-active'
                    );
                    element.next();
                })
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-pagination"]'
                    );
                    expect(indicators[0].className).not.toContain(
                        'slds-is-active'
                    );
                    expect(indicators[1].className).toContain('slds-is-active');
                    element.previous();
                })
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-pagination"]'
                    );
                    expect(indicators[0].className).toContain('slds-is-active');
                    expect(indicators[1].className).not.toContain(
                        'slds-is-active'
                    );
                });
        });

        it('first & last methods', () => {
            element.items = items;
            element.hideIndicator = false;
            const lastItem = items.length - 1;
            return Promise.resolve()
                .then(() => {
                    element.last();
                })
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-pagination"]'
                    );
                    expect(indicators[lastItem].className).toContain(
                        'slds-is-active'
                    );
                    element.first();
                    expect(indicators[0].className).toContain('slds-is-active');
                });
        });

        it('play & pause methods', () => {
            element.items = items;
            element.hideIndicator = false;
            element.pause();
            return Promise.resolve()
                .then(() => {
                    const autoPlayButton = element.shadowRoot.querySelector(
                        '.avonni-carousel__autoscroll-button-with-indicator'
                    );
                    expect(autoPlayButton.iconName).toBe('utility:play');
                    element.play();
                })
                .then(() => {
                    const autoPlayButton = element.shadowRoot.querySelector(
                        '.avonni-carousel__autoscroll-button-with-indicator'
                    );
                    expect(autoPlayButton.iconName).toBe('utility:pause');
                });
        });
    });

    describe('Javascript', () => {
        it('handle indicator click base', () => {
            element.items = items;

            return Promise.resolve()
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-pagination"]'
                    );
                    const secondIndicator = indicators[1];
                    secondIndicator.click();
                })
                .then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    expect(secondPanel.getAttribute('aria-hidden')).toBe(
                        'false'
                    );
                });
        });

        it('handle indicator click shaded', () => {
            element.items = items;
            element.indicatorVariant = 'shaded';

            return Promise.resolve()
                .then(() => {
                    const indicators = element.shadowRoot.querySelectorAll(
                        '.slds-carousel__indicator-action'
                    );
                    const secondIndicator = indicators[1];
                    secondIndicator.click();
                })
                .then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    expect(secondPanel.getAttribute('aria-hidden')).toBe(
                        'false'
                    );
                });
        });

        it('handle scroll right', () => {
            element.items = items;
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-next"]'
            );

            return Promise.resolve()
                .then(() => {
                    nextButton.click();
                })
                .then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    expect(secondPanel.ariaHidden).toBe('false');
                });
        });

        it('handle scroll left', () => {
            element.items = items;
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-next"]'
            );
            const previousButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-previous"]'
            );

            return Promise.resolve()
                .then(() => {
                    nextButton.click();
                })
                .then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    expect(secondPanel.ariaHidden).toBe('false');
                })
                .then(() => {
                    previousButton.click();
                })
                .then(() => {
                    const panels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-panel"]'
                    );
                    const secondPanel = panels[1];
                    const firstPanel = panels[0];
                    expect(secondPanel.ariaHidden).toBe('true');
                    expect(firstPanel.ariaHidden).toBe('false');
                });
        });
    });

    describe('Events', () => {
        it('actionclick', () => {
            element.items = items;

            const handler = jest.fn();
            element.addEventListener('actionclick', handler);

            return Promise.resolve().then(() => {
                const item = element.shadowRoot.querySelector(
                    'c-primitive-carousel-item'
                );
                item.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            name: 'action-name',
                            item: ex
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    'action-name'
                );
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(ex);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('currentpanelchange', () => {
            element.items = items;

            const handler = jest.fn();
            element.addEventListener('currentpanelchange', handler);

            return Promise.resolve().then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-pagination"]'
                );
                const secondIndicator = indicators[1];
                secondIndicator.click();
                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(items[1].name);
                expect(call.detail.item).toMatchObject(items[1]);
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });
        });

        it('item click', () => {
            const handler = jest.fn();
            element.addEventListener('itemclick', handler);
            element.items = items;

            return Promise.resolve().then(() => {
                const item = element.shadowRoot.querySelector(
                    'c-primitive-carousel-item'
                );
                item.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: ex
                        }
                    })
                );
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(ex);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        describe('Infinite loading', () => {
            it('Fired on render if there are no items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.itemsPerPanel = 3;
                element.enableInfiniteLoading = true;

                return Promise.resolve().then(() => {
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });

            it('Fired if the number of items is below the loadMoreOffset', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.items = items;
                element.itemsPerPanel = 3;
                element.enableInfiniteLoading = true;

                return Promise.resolve().then(() => {
                    expect(handler).not.toHaveBeenCalled();

                    element.loadMoreOffset = 2;
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Fired if the number of items per panel changes', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.items = items;
                element.enableInfiniteLoading = true;

                return Promise.resolve().then(() => {
                    expect(handler).not.toHaveBeenCalled();

                    element.itemsPerPanel = 4;
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Fired on click on the next button', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.items = items;
                element.enableInfiniteLoading = true;
                element.itemsPerPanel = 2;

                return Promise.resolve()
                    .then(() => {
                        // Items 1-2 visible, three hidden panels
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-next"]'
                        );
                        button.click();
                        expect(handler).not.toHaveBeenCalled();
                    })
                    .then(() => {
                        // Items 3-4 visible, two hidden panel
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-next"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                    });
            });
        });
    });
});

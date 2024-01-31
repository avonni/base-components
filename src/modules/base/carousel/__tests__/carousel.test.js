import { createElement } from 'lwc';
import Carousel from 'c/carousel';

// not tested
// scroll duration,
// smallItemsPerPanel, mediumItemsPerPanel, largeItemsPerPanel as they depend on the resize observer

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
            expect(element.assistiveText).toMatchObject({
                autoplayButton: 'Play / Stop auto-play',
                nextPanel: 'Next Panel',
                previousPanel: 'Previous Panel'
            });
            expect(element.items).toMatchObject([]);
            expect(element.disableAutoRefresh).toBeFalsy();
            expect(element.disableAutoScroll).toBeFalsy();
            expect(element.scrollDuration).toBe(5);
            expect(element.indicatorVariant).toBe('base');
            expect(element.isInfinite).toBeFalsy();
            expect(element.currentPanel).toBeUndefined();
            expect(element.hideIndicator).toBeFalsy();
            expect(element.hidePreviousNextPanelNavigation).toBeFalsy();
            expect(element.itemsPerPanel).toBe(1);
            expect(element.smallItemsPerPanel).toBeUndefined();
            expect(element.mediumItemsPerPanel).toBeUndefined();
            expect(element.largeItemsPerPanel).toBeUndefined();
            expect(element.actionsVariant).toBe('border');
            expect(element.actionsPosition).toBe('bottom-center');
            expect(element.imagePosition).toBe('top');
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
                        '.avonni-carousel__autoscroll-button-without-indicator'
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
                        '.avonni-carousel__panel'
                    );
                    const thirdPanel = panels[2];
                    expect(thirdPanel.ariaHidden).toBe('false');
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
                        '.avonni-carousel__panel'
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
                        '.avonni-carousel__panel'
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
                        '.avonni-carousel__panel'
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
                        '.avonni-carousel__panel'
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
                        '.avonni-carousel__panel'
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
    });

    describe('Events', () => {
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
    });
});

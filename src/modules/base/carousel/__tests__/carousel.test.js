/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 2,
        title: 'Click to Customize',
        description:
            'Use the Object Manager to add fields, build layouts, and more.',
        imageAssistiveText: 'Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 3,
        title: 'Download Salesforce Apps',
        description: "Get the mobile app that's just for Salesforce admins.",
        imageAssistiveText: 'Salesforce Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 4,
        title: 'Carousel Item 4',
        description: 'Description for carousel item #4',
        imageAssistiveText: 'Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 5,
        title: 'Carousel Item 5',
        description: 'Description for carousel item #5',
        imageAssistiveText: 'Appy',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 6,
        title: 'Carousel Item 6',
        description: 'Description for carousel item #6',
        imageAssistiveText: 'Salesforce Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com',
        actions: bareActions
    },
    {
        id: 7,
        title: 'Carousel Item 7',
        description: 'Description for carousel item #7',
        imageAssistiveText: 'Apps',
        src: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
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

    // const flushPromises = () => new Promise(setImmediate);

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
        element.items = items;
        element.hideIndicator = false;

        return Promise.resolve().then(() => {
            const activeIndicator =
                element.shadowRoot.querySelector('.slds-is-active');
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
        element.items = items;
        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const indicators = element.shadowRoot.querySelectorAll(
                '[data-element-id^="li-pagination"]'
            );
            expect(indicators).toHaveLength(0);
        });
    });

    // hide previous next panel navigation
    it('Carousel hide previous next panel navigation', () => {
        element.items = [
            {
                id: 1,
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

    // items per panel
    it('Carousel items per panel not a number', () => {
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
        element.itemsPerPanel = 2;
        element.items = items;

        return Promise.resolve().then(() => {
            const panels = element.shadowRoot.querySelectorAll(
                '.avonni-carousel__panel'
            );
            expect(panels).toHaveLength(4);
        });
    });

    // // items
    // it('Carousel items', () => {
    //     element.items = example;

    //     return Promise.resolve().then(() => {
    //         const item = example[0];
    //         const a = element.shadowRoot.querySelector(
    //             '.slds-carousel__panel-action'
    //         );
    //         expect(a.href).toBe(item.href);
    //         const description = element.shadowRoot.querySelector(
    //             '.avonni-carousel__content-description'
    //         );
    //         expect(description.textContent).toBe(
    //             'Extend Salesforce with the #1 business marketplace.'
    //         );
    //         const title = element.shadowRoot.querySelector(
    //             '.slds-carousel__content-title'
    //         );
    //         expect(title.textContent).toBe('Visit App Exchange');
    //         const img = element.shadowRoot.querySelector('[data-element-id="img"]');
    //         expect(img.src).toBe(
    //             'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
    //         );
    //         const action = element.shadowRoot.querySelector(
    //             '[data-element-id="lightning-button-icon-actions"]'
    //         );
    //         expect(action.name).toBe('action-add');
    //         expect(action.iconName).toBe('utility:add');
    //     });
    // });

    // carousel infinite last goes back to first
    it('Carousel infinite last goes back to first', () => {
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
                    '[data-element-id^="a-pagination"]'
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
                    '[data-element-id^="a-pagination"]'
                );
                expect(indicators[0].className).toContain('slds-is-active');
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

    /* ----- METHODS ----- */

    // carousel next & previous
    it('Carousel next & previous methods', () => {
        element.items = items;
        element.hideIndicator = false;
        return Promise.resolve()
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="a-pagination"]'
                );
                expect(indicators[0].className).toContain('slds-is-active');
                expect(indicators[1].className).not.toContain('slds-is-active');
                element.next();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="a-pagination"]'
                );
                expect(indicators[0].className).not.toContain('slds-is-active');
                expect(indicators[1].className).toContain('slds-is-active');
                element.previous();
            })
            .then(() => {
                const indicators = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="a-pagination"]'
                );
                expect(indicators[0].className).toContain('slds-is-active');
                expect(indicators[1].className).not.toContain('slds-is-active');
            });
    });

    // carousel first & last
    it('Carousel first & last methods', () => {
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

    // carousel play & pause
    it('Carousel play & pause methods', () => {
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

    /* ----- JS ----- */

    // handle indicator click
    it('Carousel handle indicator click base', () => {
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
                expect(secondPanel.getAttribute('aria-hidden')).toBe('false');
            });
    });

    it('Carousel handle indicator click shaded', () => {
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
                expect(secondPanel.getAttribute('aria-hidden')).toBe('false');
            });
    });

    // Scroll right
    it('Carousel handle scroll right', () => {
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

    // Scroll left
    it('Carousel handle scroll left', () => {
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

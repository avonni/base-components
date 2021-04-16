import { createElement } from 'lwc';
import Carousel from 'c/carousel';

const items = [
    {
        buttonLabel: 'Get Started',
        id: 1,
        heading: 'Visit App Exchange',
        description: 'Extend Salesforce with the #1 business marketplace.',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        id: 2,
        heading: 'Click to Customize',
        description:
            'Use the Object Manager to add fields, build layouts, and more.',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        id: 3,
        heading: 'Download Salesforce Apps',
        description: "Get the mobile app that's just for Salesforce admins.",
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        id: 4,
        heading: 'Carousel Item 4',
        description: 'Description for carousel item #4',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        id: 5,
        heading: 'Carousel Item 5',
        description: 'Description for carousel item #5',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        id: 6,
        heading: 'Carousel Item 6',
        description: 'Description for carousel item #6',
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        id: 7,
        heading: 'Carousel Item 7',
        description: 'Description for carousel item #7',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    }
];

describe('Carousel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

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

    // disable auto scrollable
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
    // it('Carousel indicator variant base', () => {
    //     const element = createElement('base-carousel', {
    //         is: Carousel
    //     });
    //     document.body.appendChild(element);

    //     element.items = items
    //     element.hideIndicator = false

    //     return Promise.resolve().then(() => {
    //         const indicator = element.shadowRoot.querySelector('li');
    //         expect(indicator).toBe('gello');
    //     });
    // });
});

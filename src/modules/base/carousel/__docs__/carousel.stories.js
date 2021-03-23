import { Carousel } from '../__examples__/carousel';

export default {
    title: 'Example/Carousel',
    argTypes: {
        scrollDuration: {
            control: {
                type: 'number'
            },
            defaultValue: 5,
            table: {
                defaultValue: { summary: 5 }
            }
        },
        currentPanel: {
            control: {
                type: 'number'
            }
        },
        itemsPerPanel: {
            control: {
                type: 'number'
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: 1 }
            }
        },
        disableAutoRefresh: {
            control: {
                type: 'boolean'
            }
        },
        disableAutoScroll: {
            control: {
                type: 'boolean'
            }
        },
        indicatorVariant: {
            control: {
                type: 'select',
                options: ['base', 'shaded']
            },
            defaultValue: 'base',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        isInfinite: {
            control: {
                type: 'boolean'
            }
        },
        hideIndicator: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        hidePreviousNextPanelNavigation: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            table: {
                defaultValue: { summary: false }
            }
        },
        items: {
            control: {
                type: 'object'
            }
        },
        assistiveText: {
            control: {
                type: 'object'
            },
            table: {
                defaultValue: {
                    summary: `{
                        nextPanel: 'Next Panel',
                        previousPanel: 'Previous Panel',
                        autoplayButton: 'Start / Stop auto-play'
                    }`
                }
            }
        }
    }
};

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

const assistiveText = {
    nextPanel: 'Next Panel',
    previousPanel: 'Previous Panel',
    autoplayButton: 'Start / Stop auto-play'
};

const Template = (args) => Carousel(args);

export const Base = Template.bind({});
Base.args = {
    items: items,
    assistiveText: assistiveText
};

export const BaseWithNoProgressIndicator = Template.bind({});
BaseWithNoProgressIndicator.args = {
    items: items,
    assistiveText: assistiveText,
    hideIndicator: 'true'
};

export const BaseWithTwoItemsPerPanel = Template.bind({});
BaseWithTwoItemsPerPanel.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '2'
};

export const BaseWithThreeItemsPerPanelAndVariantShaded = Template.bind({});
BaseWithThreeItemsPerPanelAndVariantShaded.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '3',
    indicatorVariant: 'shaded'
};

export const BaseWithFiveItemsPerPanel = Template.bind({});
BaseWithFiveItemsPerPanel.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '5'
};

export const WithoutPanelNavigation = Template.bind({});
WithoutPanelNavigation.args = {
    items: items,
    assistiveText: assistiveText,
    hidePreviousNextPanelNavigation: 'true'
};

export const WithoutPanelNavigationWithTwoItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithTwoItemsPerPanel.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '2',
    hidePreviousNextPanelNavigation: 'true'
};

export const WithoutPanelNavigationWithThreeItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithThreeItemsPerPanel.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '3',
    hidePreviousNextPanelNavigation: 'true'
};

export const WithoutPanelNavigationWithFiveItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithFiveItemsPerPanel.args = {
    items: items,
    assistiveText: assistiveText,
    itemsPerPanel: '5',
    hidePreviousNextPanelNavigation: 'true'
};

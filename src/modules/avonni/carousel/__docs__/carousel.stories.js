import { Carousel } from '../__examples__/carousel';

export default {
    title: 'Example/Carousel',
    argTypes: {
        assistiveText: {
            control: {
                type: 'object'
            },
            defaultValue: {
                nextPanel: 'Next Panel',
                previousPanel: 'Previous Panel'
            },
            table: {
                defaultValue: {
                    summary: `{
                        nextPanel: 'Next Panel',
                        previousPanel: 'Previous Panel'
                    }`
                }
            }
        },
        items: {
            control: {
                type: 'object'
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
        scrollDuration: {
            control: {
                type: 'number'
            },
            defaultValue: 5,
            table: {
                defaultValue: { summary: 5 }
            }
        },
        isInfinite: {
            control: {
                type: 'boolean'
            }
        },
        currentPanel: {
            control: {
                type: 'number'
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
        itemsPerPanel: {
            control: {
                type: 'number'
            },
            defaultValue: 1,
            table: { 
                defaultValue: { summary: 1 }
            }
        }
    }
};

const Template = (args) => Carousel(args);

export const Base = Template.bind({});
Base.args = {
    items: [
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
            description:
                "Get the mobile app that's just for Salesforce admins.",
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
    ]
};

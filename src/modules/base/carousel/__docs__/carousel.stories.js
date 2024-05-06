import { Carousel } from '../__examples__/carousel';
import { InfiniteLoadingCarousel } from '../__examples__/infiniteLoadingCarousel';
import { items, menuItems, imageItems } from './data';

export default {
    title: 'Example/Carousel',
    argTypes: {
        scrollDuration: {
            name: 'scroll-duration',
            control: {
                type: 'number'
            },
            description:
                'The auto scroll duration. The default is 5 seconds, after that the next image is displayed.',
            table: {
                defaultValue: { summary: 5 },
                type: { summary: 'number' },
                category: 'Behavior'
            }
        },
        currentPanel: {
            name: 'current-panel',
            control: {
                type: 'text'
            },
            description:
                'Dictates the currently active/visible carousel panel. Use item’s name to select current panel.',
            table: {
                type: { summary: 'number' },
                category: 'Content'
            }
        },
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the carousel items can be loaded dynamically. As a consequence, the navigation is not disabled when the end of the items is reached, the indicator is always hidden, and is-infinite is ignored. Use in conjunction with load-more-offset to determine when the loadmore event should be fired.',
            readOnly: true,
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the carousel is in a loading state and shows the loading spinner.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        itemsPerPanel: {
            name: 'items-per-panel',
            control: {
                type: 'number'
            },
            description:
                'Number of items to be displayed at a time in the carousel.',
            table: {
                defaultValue: { summary: 1 },
                type: { summary: 'number' },
                category: 'Layout'
            }
        },
        loadMoreOffset: {
            name: 'load-more-offset',
            control: {
                type: 'number'
            },
            description:
                'Number of hidden panels left when the loadmore event should be fired. For example, if the value is 2, the loadmore event will be fired when the user clicks on the “next” navigation button, and from this screen, they could click two more times on “next” before reaching the end of the items. Depends on enable-infinite-loading being true.',
            table: {
                defaultValue: { summary: 3 },
                type: { summary: 'number' }
            }
        },
        smallItemsPerPanel: {
            name: 'small-items-per-panel',
            control: {
                type: 'number'
            },
            description:
                'Number of items to be displayed at a time in the carousel.',
            table: {
                type: { summary: 'number' },
                category: 'Layout'
            }
        },
        mediumItemsPerPanel: {
            name: 'medium-items-per-panel',
            control: {
                type: 'number'
            },
            description:
                'Number of items to be displayed at a time in the carousel.',
            table: {
                type: { summary: 'number' },
                category: 'Layout'
            }
        },
        largeItemsPerPanel: {
            name: 'large-items-per-panel',
            control: {
                type: 'number'
            },
            description:
                'Number of items to be displayed at a time in the carousel.',
            table: {
                type: { summary: 'number' },
                category: 'Layout'
            }
        },
        disableAutoRefresh: {
            name: 'disable-auto-refresh',
            control: {
                type: 'boolean'
            },
            description:
                "If present, the carousel doesn't loop after the last image is displayed.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior'
            }
        },
        disableAutoScroll: {
            name: 'disable-auto-scroll',
            control: {
                type: 'boolean'
            },
            description:
                'If present, images do not automatically scroll and users must click the indicators to scroll.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior'
            }
        },
        hideIndicator: {
            name: 'hide-indicator',
            control: {
                type: 'boolean'
            },
            description: 'Boolean for displaying the progress indicators.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Layout'
            }
        },
        hidePreviousNextPanelNavigation: {
            name: 'hide-previous-next-panel-navigation',
            control: {
                type: 'boolean'
            },
            description:
                'Boolean for displaying the navigation indicators (left/right arrows) of the carousel.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
                category: 'Layout'
            }
        },
        isInfinite: {
            name: 'is-infinite',
            control: {
                type: 'boolean'
            },
            description:
                'Boolean for infinite loop navigation. Note: if not true autoplay will stop automatically at the last panel.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior'
            }
        },
        indicatorVariant: {
            name: 'indicator-variant',
            control: {
                type: 'radio'
            },
            description:
                'Changes the appearance of the progress indicators. Valid values are base or shaded.',
            options: ['base', 'shaded'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Layout'
            }
        },
        items: {
            control: {
                type: 'object'
            },
            type: { required: true },
            description:
                'Array of item objects used by the default carousel item renderer. ',
            table: {
                type: { summary: 'object []' },
                category: 'Content'
            }
        },
        assistiveText: {
            name: 'assistive-text',
            control: {
                type: 'object'
            },
            description:
                'Description of the carousel items for screen-readers.',
            table: {
                defaultValue: {
                    summary: `{
                        nextPanel: 'Next Panel',
                        previousPanel: 'Previous Panel',
                        autoplayButton: 'Start / Stop auto-play'
                    }`
                },
                type: { summary: 'object' },
                category: 'Content'
            }
        },
        actionsPosition: {
            name: 'actions-position',
            control: {
                type: 'select'
            },
            description:
                'Position of the actions. Valid values include top-left, top-right, bottom-left, bottom-right and bottom-center.',
            options: [
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
                'bottom-center'
            ],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottom-center' },
                category: 'Layout'
            }
        },
        actionsVariant: {
            name: 'actions-variant',
            control: {
                type: 'select'
            },
            description:
                'Changes the appearance of the actions. Valid values include bare, border, menu and stretch.',
            options: ['bare', 'border', 'menu', 'stretch'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' },
                category: 'Layout'
            }
        },
        imagePosition: {
            name: 'image-position',
            control: {
                type: 'select'
            },
            description:
                'Position of the image. Valid values include top, left, right and bottom.',
            options: ['top', 'left', 'right', 'bottom'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' },
                category: 'Layout'
            }
        }
    },

    args: {
        actionsPosition: 'bottom-center',
        actionsVariant: 'border',
        assistiveText: {
            nextPanel: 'Next Panel',
            previousPanel: 'Previous Panel',
            autoplayButton: 'Start / Stop auto-play'
        },
        disableAutoRefresh: false,
        disableAutoScroll: false,
        hideIndicator: false,
        hidePreviousNextPanelNavigation: false,
        indicatorVariant: 'base',
        loadMoreOffset: 3,
        isInfinite: false,
        itemsPerPanel: 1,
        scrollDuration: 5,
        imagePosition: 'top'
    }
};

const assistiveText = {
    nextPanel: 'Next',
    previousPanel: 'Previous',
    autoplayButton: 'Start / Stop auto-play'
};

const Template = (args) => Carousel(args);
const TemplateInfiniteLoading = (args) => InfiniteLoadingCarousel(args);

export const Base = Template.bind({});
Base.args = {
    items: items
};

export const OnlyImage = Template.bind({});
OnlyImage.args = {
    items: imageItems
};

export const BaseWithNoProgressIndicator = Template.bind({});
BaseWithNoProgressIndicator.args = {
    items: items,
    hideIndicator: true,
    assistiveText: assistiveText,
    actionsPosition: 'top-right'
};

export const BaseWithTwoItemsPerPanel = Template.bind({});
BaseWithTwoItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 2,
    actionsPosition: 'top-left',
    actionsVariant: 'bare'
};

export const BaseWithThreeItemsPerPanelAndVariantShaded = Template.bind({});
BaseWithThreeItemsPerPanelAndVariantShaded.args = {
    items: items,
    itemsPerPanel: 3,
    indicatorVariant: 'shaded',
    actionsPosition: 'bottom-left'
};

export const WithoutPanelNavigation = Template.bind({});
WithoutPanelNavigation.args = {
    items: menuItems,
    hidePreviousNextPanelNavigation: true
};

export const WithoutPanelNavigationWithTwoItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithTwoItemsPerPanel.args = {
    items: menuItems,
    itemsPerPanel: 2,
    hidePreviousNextPanelNavigation: true,
    actionsVariant: 'bare',
    actionsPosition: 'bottom-left'
};

export const WithoutPanelNavigationWithThreeItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithThreeItemsPerPanel.args = {
    items: menuItems,
    itemsPerPanel: 3,
    hidePreviousNextPanelNavigation: true,
    actionsPosition: 'bottom-right'
};

export const WithoutPanelNavigationWithFiveItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithFiveItemsPerPanel.args = {
    items: menuItems,
    itemsPerPanel: 5,
    hidePreviousNextPanelNavigation: true,
    actionsVariant: 'menu',
    actionsPosition: 'top-right'
};

export const ResponsiveItemsPerPanel = Template.bind({});
ResponsiveItemsPerPanel.args = {
    items: items,
    disableAutoScroll: true,
    itemsPerPanel: 1,
    smallItemsPerPanel: 3,
    mediumItemsPerPanel: 4,
    largeItemsPerPanel: 5,
    actionsVariant: 'menu',
    actionsPosition: 'top-right'
};

export const ResponsiveWithStretchButtons = Template.bind({});
ResponsiveWithStretchButtons.args = {
    items: menuItems,
    disableAutoScroll: true,
    itemsPerPanel: 1,
    smallItemsPerPanel: 2,
    mediumItemsPerPanel: 2,
    largeItemsPerPanel: 2,
    actionsVariant: 'stretch',
    actionsPosition: 'bottom-center'
};

export const ImagePositionLeft = Template.bind({});
ImagePositionLeft.args = {
    items: items,
    itemsPerPanel: 2,
    imagePosition: 'left'
};

export const InfiniteLoading = TemplateInfiniteLoading.bind({});
InfiniteLoading.args = {
    itemsPerPanel: 3,
    disableAutoScroll: true
};

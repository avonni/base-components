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

import { Carousel } from '../__examples__/carousel';

export default {
    title: 'Base/Carousel',
    argTypes: {
        scrollDuration: {
            name: 'scroll-duration',
            control: {
                type: 'number'
            },
            defaultValue: 5,
            description:
                'The auto scroll duration. The default is 5 seconds, after that the next image is displayed.',
            table: {
                defaultValue: { summary: 5 },
                type: { summary: 'number' }
            }
        },
        currentPanel: {
            name: 'current-panel',
            control: {
                type: 'number'
            },
            description:
                'Dictates the currently active/visible carousel panel.',
            table: {
                type: { summary: 'number' }
            }
        },
        itemsPerPanel: {
            name: 'items-per-panel',
            control: {
                type: 'number'
            },
            description:
                'Number of items to be displayed at a time in the carousel.',
            defaultValue: 1,
            table: {
                defaultValue: { summary: 1 },
                type: { summary: 'number' }
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
                defaultValue: { summary: 'false' }
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
                defaultValue: { summary: 'false' }
            }
        },
        hideIndicator: {
            name: 'hide-indicator',
            control: {
                type: 'boolean'
            },
            description: 'Boolean for displaying the progress indicators.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        hidePreviousNextPanelNavigation: {
            name: 'hide-previous-next-panel-navigation',
            control: {
                type: 'boolean'
            },
            description:
                'Boolean for displaying the navigation indicators (left/right arrows) of the carousel.',
            defaultValue: false,
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
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
                defaultValue: { summary: 'false' }
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
            defaultValue: 'base',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
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
                type: { summary: 'object []' }
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
                type: { summary: 'object' }
            }
        }
    },
    args: {
        disableAutoRefresh: false,
        disableAutoScroll: false,
        isInfinite: false,
        hideIndicator: false,
        hidePreviousNextPanelNavigation: false
    }
};

const items = [
    {
        buttonLabel: 'Get Started',
        secondaryButtonLabel: 'Subscribe',
        id: 1,
        title: 'Visit App Exchange',
        description: 'Extend Salesforce with the #1 business marketplace.',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        secondaryButtonLabel: 'Subscribe',
        id: 2,
        title: 'Click to Customize',
        description:
            'Use the Object Manager to add fields, build layouts, and more.',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        secondaryButtonLabel: 'Subscribe',
        id: 3,
        title: 'Download Salesforce Apps',
        description: "Get the mobile app that's just for Salesforce admins.",
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Get Started',
        secondaryButtonLabel: 'Subscribe',
        id: 4,
        title: 'Carousel Item 4',
        description: 'Description for carousel item #4',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        secondaryButtonLabel: 'Not interested',
        id: 5,
        title: 'Carousel Item 5',
        description: 'Description for carousel item #5',
        imageAssistiveText: 'Appy',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        secondaryButtonLabel: 'Not interested',
        id: 6,
        title: 'Carousel Item 6',
        description: 'Description for carousel item #6',
        imageAssistiveText: 'Salesforce Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        href: 'https://www.salesforce.com'
    },
    {
        buttonLabel: 'Learn More',
        secondaryButtonLabel: 'Not interested',
        id: 7,
        title: 'Carousel Item 7',
        description: 'Description for carousel item #7',
        imageAssistiveText: 'Apps',
        src:
            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        href: 'https://www.salesforce.com'
    }
];

const assistiveText = {
    nextPanel: 'Next',
    previousPanel: 'Previous',
    autoplayButton: 'Start / Stop auto-play'
};

const Template = (args) => Carousel(args);

export const Base = Template.bind({});
Base.args = {
    items: items
};

export const BaseWithNoProgressIndicator = Template.bind({});
BaseWithNoProgressIndicator.args = {
    items: items,
    hideIndicator: true,
    assistiveText: assistiveText
};

export const BaseWithTwoItemsPerPanel = Template.bind({});
BaseWithTwoItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 2
};

export const BaseWithThreeItemsPerPanelAndVariantShaded = Template.bind({});
BaseWithThreeItemsPerPanelAndVariantShaded.args = {
    items: items,
    itemsPerPanel: 3,
    indicatorVariant: 'shaded'
};

export const BaseWithFiveItemsPerPanel = Template.bind({});
BaseWithFiveItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 5,
    assistiveText: assistiveText
};

export const WithoutPanelNavigation = Template.bind({});
WithoutPanelNavigation.args = {
    items: items,
    hidePreviousNextPanelNavigation: true
};

export const WithoutPanelNavigationWithTwoItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithTwoItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 2,
    hidePreviousNextPanelNavigation: true
};

export const WithoutPanelNavigationWithThreeItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithThreeItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 3,
    hidePreviousNextPanelNavigation: true
};

export const WithoutPanelNavigationWithFiveItemsPerPanel = Template.bind({});
WithoutPanelNavigationWithFiveItemsPerPanel.args = {
    items: items,
    itemsPerPanel: 5,
    hidePreviousNextPanelNavigation: true
};

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

import { HeroBanner } from '../__examples__/heroBanner';
import { HeroBannerWithButton } from '../__examples__/heroBannerWithButton';
import { HeroBannerWithSearchBarInDefault } from '../__examples__/heroBannerWithSearchBarInDefault';
import { HeroBannerWithSearchBarInFooter } from '../__examples__/heroBannerWithSearchBarInFooter';
import { HeroBannerWithTwoSlots } from '../__examples__/heroBannerWithTwoSlots';

export default {
    title: 'Example/Hero Banner',
    argTypes: {
        caption: {
            control: {
                type: 'text'
            },
            description:
                'The caption can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' },
                category: 'Text'
            }
        },
        contentHorizontalAlignment: {
            name: 'content-horizontal-alignment',
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right'],
            description:
                'Defines the horizontal alignment of the title, caption and description. Valid values include left, center and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Layout'
            }
        },
        contentVerticalAlignment: {
            name: 'content-vertical-alignment',
            control: {
                type: 'select'
            },
            options: ['top', 'center', 'bottom'],
            description:
                'Defines the vertical alignment of the title, caption and description. Valid values include top, center and bottom.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' },
                category: 'Layout'
            }
        },
        contentWidth: {
            name: 'content-width',
            control: {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            },
            description:
                'Defines the width of the content inside of the banner in percentage.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 100 },
                category: 'Layout'
            }
        },
        height: {
            control: {
                type: 'number'
            },
            description: 'Defines the height of the banner. ',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 400 },
                category: 'Layout'
            }
        },
        imageLayout: {
            name: 'image-layout',
            control: {
                type: 'select'
            },
            options: [
                'scale-to-fill',
                'fit',
                'tile',
                'tile-horizontally',
                'tile-vertically'
            ],
            description:
                'Defines the layout of the background image. Valid layouts include scale-to-fill, fit, tile, tile-horizontally, tile-vertically.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'scale-to-fill' },
                category: 'Background'
            }
        },
        imagePosition: {
            name: 'image-position',
            control: {
                type: 'select'
            },
            options: [
                'center',
                'left',
                'right',
                'top-center',
                'top-left',
                'top-right',
                'bottom-center',
                'bottom-left',
                'bottom-right'
            ],
            description:
                'Defines the position of the background image. Valid positions include center, left, right, top-left, top-center, top-right, bottom-left, bottom-center, bottom-right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' },
                category: 'Background'
            }
        },
        maxWidth: {
            name: 'max-width',
            control: {
                type: 'number'
            },
            description:
                'Defines the width inside of the banner in percentage.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 960 },
                category: 'Layout'
            }
        },
        primaryButtonIconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' },
                category: 'primary button'
            }
        },
        primaryButtonIconPosition: {
            name: 'icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body of the primary button. Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'primary button'
            }
        },
        primaryButtonIconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon inside the primary button. Valid values include xx-small, x-small, small, medium, or large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'primary button'
            }
        },
        primaryButtonLabel: {
            name: 'label',
            control: {
                type: 'text'
            },
            description: 'The text to be displayed inside the primary button.',
            table: {
                type: { summary: 'string' },
                category: 'primary button'
            }
        },
        primaryButtonVariant: {
            name: 'variant',
            control: {
                type: 'select'
            },
            options: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ],
            description:
                'The variant changes the appearance of the primary button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'primary button'
            }
        },
        secondaryButtonIconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' },
                category: 'secondary button'
            }
        },
        secondaryButtonIconPosition: {
            name: 'icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body of the secondary button. Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'secondary button'
            }
        },
        secondaryButtonIconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon inside the secondary button. Valid values include xx-small, x-small, small, medium, or large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'secondary button'
            }
        },
        secondaryButtonLabel: {
            name: 'label',
            control: {
                type: 'text'
            },
            description:
                'The text to be displayed inside the secondary button.',
            table: {
                type: { summary: 'string' },
                category: 'secondary button'
            }
        },
        secondaryButtonVariant: {
            name: 'variant',
            control: {
                type: 'select'
            },
            options: [
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ],
            description:
                'The variant changes the appearance of the secondary button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'secondary button'
            }
        },
        src: {
            control: {
                type: 'text'
            },
            description: 'URL for the background image.',
            table: {
                type: { summary: 'string' },
                category: 'Background'
            }
        },
        subtitle: {
            control: {
                type: 'text'
            },
            description:
                'The subtitle can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' },
                category: 'Text'
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the banner.',
            table: {
                type: { summary: 'string' },
                category: 'Text'
            }
        }
    },
    args: {
        contentHorizontalAlignment: 'left',
        contentVerticalAlignment: 'center',
        contentWidth: 100,
        height: 400,
        imageLayout: 'scale-to-fill',
        imagePosition: 'center',
        maxWidth: 960,
        primaryButtonIconPosition: 'left',
        primaryButtonIconSize: 'medium',
        primaryButtonVariant: 'neutral',
        secondaryButtonIconPosition: 'left',
        secondaryButtonIconSize: 'medium',
        secondaryButtonVariant: 'neutral'
    }
};

const Template = (args) => HeroBanner(args);
const TemplateWithButton = (args) => HeroBannerWithButton(args);
const TemplateWithSearchBarInDefault = (args) =>
    HeroBannerWithSearchBarInDefault(args);
const TemplateWithSearchBarInFooter = (args) =>
    HeroBannerWithSearchBarInFooter(args);
const TemplateWithTwoSlots = (args) => HeroBannerWithTwoSlots(args);

export const Base = Template.bind({});
Base.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300
};

export const BaseAbsoluteCenter = Template.bind({});
BaseAbsoluteCenter.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'center',
    contentWidth: 100,
    maxWidth: 2000
};

export const BaseTopLeftWithMaxWidth = Template.bind({});
BaseTopLeftWithMaxWidth.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    maxWidth: 2000
};

export const BaseTopCenterWithButtons = Template.bind({});
BaseTopCenterWithButtons.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'center',
    primaryButtonLabel: 'Primary Button',
    secondaryButtonLabel: 'Secondary Button',
    maxWidth: 2000
};

export const BaseTopCenterWithButtonIcons = Template.bind({});
BaseTopCenterWithButtonIcons.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'center',
    primaryButtonIconName: 'utility:pin',
    primaryButtonVariant: 'brand',
    secondaryButtonIconName: 'utility:question',
    secondaryButtonVariant: 'brand',
    maxWidth: 2000
};

export const BaseTopRight = Template.bind({});
BaseTopRight.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'right'
};

export const BaseBottomLeft = Template.bind({});
BaseBottomLeft.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom'
};

export const BaseBottomCenter = Template.bind({});
BaseBottomCenter.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom',
    contentHorizontalAlignment: 'center'
};

export const BaseBottomRight = Template.bind({});
BaseBottomRight.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom',
    contentHorizontalAlignment: 'right'
};

export const withButtonInFooterSlot = TemplateWithButton.bind({});
withButtonInFooterSlot.args = {
    title: 'Trailblazer Community Group',
    subtitle: 'Summer camp',
    src: 'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 350,
    maxWidth: 2000,
    contentHorizontalAlignment: 'center'
};

export const withSearchBarInDefaultSlot = TemplateWithSearchBarInDefault.bind(
    {}
);
withSearchBarInDefaultSlot.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src: 'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    maxWidth: 2000,
    height: 200,
    contentHorizontalAlignment: 'center'
};

export const withSearchBarInFooterSlot = TemplateWithSearchBarInFooter.bind({});
withSearchBarInFooterSlot.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src: 'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 500,
    maxWidth: 2000,
    contentHorizontalAlignment: 'center'
};

export const withTwoSlots = TemplateWithTwoSlots.bind({});
withTwoSlots.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src: 'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 300,
    contentHorizontalAlignment: 'center',
    maxWidth: 2000
};

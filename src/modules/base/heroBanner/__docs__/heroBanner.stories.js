import { HeroBanner } from '../__examples__/heroBanner';
import { HeroBannerWithButton } from '../__examples__/heroBannerWithButton';
import { HeroBannerWithSearchBarInDefault } from '../__examples__/heroBannerWithSearchBarInDefault';
import { HeroBannerWithSearchBarInFooter } from '../__examples__/heroBannerWithSearchBarInFooter';
import { HeroBannerWithTwoSlots } from '../__examples__/heroBannerWithTwoSlots';

export default {
    title: 'Base/Hero Banner',
    argTypes: {
        caption: {
            control: {
                type: 'text'
            },
            description:
                'The caption can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the banner.',
            table: {
                type: { summary: 'string' }
            }
        },
        subtitle: {
            control: {
                type: 'text'
            },
            description:
                'The subtitle can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' }
            }
        },
        src: {
            control: {
                type: 'text'
            },
            description: 'URL for the background image.',
            table: {
                type: { summary: 'string' }
            }
        },
        height: {
            control: {
                type: 'number'
            },
            defaultValue: 400,
            description: 'Defines the height of the banner. ',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 400 },
                category: 'Layout'
            }
        },
        contentHorizontalAlignment: {
            name: 'content-horizontal-alignment',
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right'],
            defaultValue: 'left',
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
            defaultValue: 'center',
            description:
                'Defines the vertical alignment of the title, caption and description. Valid values include top, center and bottom.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' },
                category: 'Layout'
            }
        },
        maxWidth: {
            name: 'max-width',
            control: {
                type: 'number'
            },
            defaultValue: 960,
            description:
                'Defines the width inside of the banner in percentage.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 960 },
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
            defaultValue: 100,
            description:
                'Defines the width of the content inside of the banner in percentage.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 100 },
                category: 'Layout'
            }
        },
        primaryButtonLabel: {
            name: 'primary-button-label',
            control: {
                type: 'text'
            },
            description: 'The text to be displayed inside the primary button.',
            table: {
                type: { summary: 'string' }
            }
        },
        secondaryButtonLabel: {
            name: 'secondary-button-label',
            control: {
                type: 'text'
            },
            description:
                'The text to be displayed inside the secondary button.',
            table: {
                type: { summary: 'string' }
            }
        }
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
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300
};

export const BaseAbsoluteCenterWithContentWidth = Template.bind({});
BaseAbsoluteCenterWithContentWidth.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'center',
    contentWidth: 15
};

export const BaseCenteredRight = Template.bind({});
BaseCenteredRight.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300
};

export const BaseTopLeftWithMaxWidth = Template.bind({});
BaseTopLeftWithMaxWidth.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    maxWidth: 2000
};

export const BaseTopCenterWithButtons = Template.bind({});
BaseTopCenterWithButtons.args = {
    caption: 'This is a caption',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'center',
    primaryButtonLabel: 'Primary Button',
    secondaryButtonLabel: 'Secondary Button'
};

export const BaseTopRight = Template.bind({});
BaseTopRight.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'right'
};

export const BaseBottomLeft = Template.bind({});
BaseBottomLeft.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom'
};

export const BaseBottomCenter = Template.bind({});
BaseBottomCenter.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom',
    contentHorizontalAlignment: 'center'
};

export const BaseBottomRight = Template.bind({});
BaseBottomRight.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom',
    contentHorizontalAlignment: 'right'
};

export const withButtonInFooterSlot = TemplateWithButton.bind({});
withButtonInFooterSlot.args = {
    title: 'Trailblazer Community Group',
    subtitle: 'Summer camp',
    src:
        'https://backofficethinking.com/sites/default/files/styles/title_banner/public/images/Basic%20page/hero/salesforce-trail.jpg?itok=56jumEDa',
    height: 350,
    contentHorizontalAlignment: 'center'
};

export const withSearchBarInDefaultSlot = TemplateWithSearchBarInDefault.bind(
    {}
);
withSearchBarInDefaultSlot.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 200,
    contentHorizontalAlignment: 'center'
};

export const withSearchBarInFooterSlot = TemplateWithSearchBarInFooter.bind({});
withSearchBarInFooterSlot.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 500,
    contentHorizontalAlignment: 'center'
};

export const withTwoSlots = TemplateWithTwoSlots.bind({});
withTwoSlots.args = {
    title: 'Looking for a vacation?',
    subtitle: 'Find the right one',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 300,
    contentHorizontalAlignment: 'center'
};

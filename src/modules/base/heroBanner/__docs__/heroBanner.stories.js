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
                category: 'Caption'
            }
        },
        captionColor: {
            name: 'caption-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the caption.',
            table: {
                type: { summary: 'color' },
                category: 'Caption'
            }
        },
        captionFontFamily: {
            name: 'caption-font-family',
            control: {
                type: 'text'
            },
            defaultValue: "'Salesforce Sans', Arial, sans-serif",
            description: 'Defines the font family of the caption.',
            table: {
                type: { summary: 'text' },
                defaultValue: {
                    summary: "'Salesforce Sans', Arial, sans-serif"
                },
                category: 'Caption'
            }
        },
        captionFontSize: {
            name: 'caption-font-size',
            control: {
                type: 'select'
            },
            options: [
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large',
                'xxx-large',
                'xxxx-large'
            ],
            defaultValue: 'small',
            description:
                'Defines the size of the caption. Valid values include small, medium, large, x-large, xx-large, xxx-large and xxxx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' },
                category: 'Caption'
            }
        },
        captionFontWeight: {
            name: 'caption-font-weight',
            control: {
                type: 'select'
            },
            options: ['light', 'normal', 'bold'],
            defaultValue: 'light',
            description:
                'Defines the font weight of the caption. Valid values include light, normal and bold.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'light' },
                category: 'Caption'
            }
        },
        captionShadowColor: {
            name: 'caption-shadow-color',
            control: {
                type: 'text'
            },
            defaultValue: '1px 1px 0 rgb(0 0 0 / 50%)',
            description: 'Defines the text shadow of the caption.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' },
                category: 'Caption'
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
                category: 'Title'
            }
        },
        titleColor: {
            name: 'title-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the title.',
            table: {
                type: { summary: 'color' },
                category: 'Title'
            }
        },
        titleFontFamily: {
            name: 'title-font-family',
            control: {
                type: 'text'
            },
            defaultValue: "'Salesforce Sans', Arial, sans-serif",
            description: 'Defines the font family of the title.',
            table: {
                type: { summary: 'text' },
                defaultValue: {
                    summary: "'Salesforce Sans', Arial, sans-serif"
                },
                category: 'Title'
            }
        },
        titleFontSize: {
            name: 'title-font-size',
            control: {
                type: 'select'
            },
            options: [
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large',
                'xxx-large',
                'xxxx-large'
            ],
            defaultValue: 'large',
            description:
                'Valid values include small, medium, large, x-large, xx-large, xxx-large and xxxx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'large' },
                category: 'Title'
            }
        },
        titleFontWeight: {
            name: 'title-font-weight',
            control: {
                type: 'select'
            },
            options: ['light', 'normal', 'bold'],
            defaultValue: 'normal',
            description:
                'Defines the font weight of the title. Valid values include light, normal and bold.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'normal' },
                category: 'Title'
            }
        },
        titleShadowColor: {
            name: 'title-shadow-color',
            control: {
                type: 'text'
            },
            defaultValue: '1px 1px 0 rgb(0 0 0 / 50%)',
            description: 'Defines the text shadow of the title.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' },
                category: 'Title'
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
                category: 'Subtitle'
            }
        },
        subtitleColor: {
            name: 'subtitle-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the subtitle.',
            table: {
                type: { summary: 'color' },
                category: 'Subtitle'
            }
        },
        subtitleFontFamily: {
            name: 'subtitle-font-family',
            control: {
                type: 'text'
            },
            defaultValue: "'Salesforce Sans', Arial, sans-serif",
            description: 'Defines the font family of the subtitle.',
            table: {
                type: { summary: 'text' },
                defaultValue: {
                    summary: "'Salesforce Sans', Arial, sans-serif"
                },
                category: 'Subtitle'
            }
        },
        subtitleFontSize: {
            name: 'subtitle-font-size',
            control: {
                type: 'select'
            },
            options: [
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large',
                'xxx-large',
                'xxxx-large'
            ],
            defaultValue: 'medium',
            description:
                'Defines the size of the subtitle. Valid values include small, medium, large, x-large, xx-large, xxx-large and xxxx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'Subtitle'
            }
        },
        subtitleFontWeight: {
            name: 'subtitle-font-weight',
            control: {
                type: 'select'
            },
            options: ['light', 'normal', 'bold'],
            defaultValue: 'normal',
            description:
                'Defines the font weight of the subtitle. Valid values include light, normal and bold.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'normal' },
                category: 'Subtitle'
            }
        },
        subtitleShadowColor: {
            name: 'subtitle-shadow-color',
            control: {
                type: 'text'
            },
            defaultValue: '1px 1px 0 rgb(0 0 0 / 50%)',
            description: 'Defines the text shadow of the subtitle.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' },
                category: 'Subtitle'
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
        backgroundColor: {
            name: 'background-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the background color if there is no image.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Background'
            }
        },
        linearGradient: {
            name: 'linear-gradient',
            control: {
                type: 'text'
            },
            defaultValue: 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)',
            description:
                'Defines the linear-gradient for the background image.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' },
                category: 'Background'
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
                type: { summary: 'string' },
                category: 'Primary button'
            }
        },
        primaryButtonTextColor: {
            name: 'primary-button-text-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the text color of the primary button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Primary button'
            }
        },
        primaryButtonTextHoverColor: {
            name: 'primary-button-text-hover-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the text hover color of the primary button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Primary button'
            }
        },
        primaryButtonBackgroundColor: {
            name: 'primary-button-background-color',
            control: {
                type: 'color'
            },
            defaultValue: '#0070d2',
            description: 'Defines the primary button background color.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#0070d2' },
                category: 'Primary button'
            }
        },
        primaryButtonBackgroundHoverColor: {
            name: 'primary-button-background-hover-color',
            control: {
                type: 'color'
            },
            defaultValue: '#005fb2',
            description: 'Defines the primary button background hover color.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#005fb2' },
                category: 'Primary button'
            }
        },
        primaryButtonBorderColor: {
            name: 'primary-button-border-color',
            control: {
                type: 'color'
            },
            description: 'Defines the primary button border color.',
            table: {
                type: { summary: 'string' },
                category: 'Primary button'
            }
        },
        primaryButtonBorderRadius: {
            name: 'primary-button-border-radius',
            control: {
                type: 'range',
                min: 0,
                max: 50,
                step: 1
            },
            defaultValue: 4,
            description: 'Defines the primary button border radius in px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 4 },
                category: 'Primary button'
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
                type: { summary: 'string' },
                category: 'Secondary button'
            }
        },
        secondaryButtonTextColor: {
            name: 'secondary-button-text-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the text color of the secondary button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Secondary button'
            }
        },
        secondaryButtonTextHoverColor: {
            name: 'secondary-button-text-hover-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description:
                'Defines the text hover color of the secondary button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' },
                category: 'Secondary button'
            }
        },
        secondaryButtonBackgroundColor: {
            name: 'secondary-button-background-color',
            control: {
                type: 'color'
            },
            defaultValue: '#0070d2',
            description: 'Defines the secondary button background color.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#0070d2' },
                category: 'Secondary button'
            }
        },
        secondaryButtonBackgroundHoverColor: {
            name: 'secondary-button-background-hover-color',
            control: {
                type: 'color'
            },
            defaultValue: '#005fb2',
            description: 'Defines the secondary button background hover color.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#005fb2' },
                category: 'Secondary button'
            }
        },
        secondaryButtonBorderColor: {
            name: 'secondary-button-border-color',
            control: {
                type: 'color'
            },
            description: 'Defines the secondary button border color.',
            table: {
                type: { summary: 'string' },
                category: 'Secondary button'
            }
        },
        secondaryButtonBorderRadius: {
            name: 'secondary-button-border-radius',
            control: {
                type: 'range',
                min: 0,
                max: 50,
                step: 1
            },
            defaultValue: 4,
            description: 'Defines the secondary button border radius in px.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 4 },
                category: 'Secondary button'
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

export const BaseAbsoluteCenterWithCursiveTitleAndContentWidth = Template.bind(
    {}
);
BaseAbsoluteCenterWithCursiveTitleAndContentWidth.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    titleFontSize: 'xx-large',
    titleFontWeight: 'normal',
    titleFontFamily: 'cursive',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'center',
    contentWidth: 15
};

export const BaseCenteredRightWithLinearGradient = Template.bind({});
BaseCenteredRightWithLinearGradient.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    titleFontSize: 'xxx-large',
    titleFontWeight: 'bold',
    subtitle: 'This is a subtitle',
    subtitleFontFamily: 'monospace',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'right',
    linearGradient: 'rgba(0,0,0,0), rgba(0,0,0,0)'
};

export const BaseTopLeftWithMaxWidth = Template.bind({});
BaseTopLeftWithMaxWidth.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    titleFontSize: 'xxxx-large',
    titleFontWeight: 'bold',
    titleFontFamily: 'Tahoma, sans-serif',
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
    title: 'This is a title',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'center',
    primaryButtonLabel: 'Primary Button',
    secondaryButtonLabel: 'Secondary Button'
};

export const BaseTopRightWithGreenButton = Template.bind({});
BaseTopRightWithGreenButton.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'right',
    primaryButtonLabel: 'Green Button',
    primaryButtonBackgroundColor: '#2e844a',
    primaryButtonBorderColor: '#2e844a',
    primaryButtonBackgroundHoverColor: '#194e31'
};

export const BaseBottomLeft = Template.bind({});
BaseBottomLeft.args = {
    caption: 'This is a caption',
    title: 'This is a title',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'This is a subtitle',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom'
};

export const BaseBottomCenterWithGreenCaption = Template.bind({});
BaseBottomCenterWithGreenCaption.args = {
    caption: 'This is a caption',
    captionFontSize: 'large',
    captionColor: 'green',
    title: 'This is a title',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
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
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
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
    titleColor: '#4aca82',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Summer camp',
    subtitleFontSize: 'large',
    subtitleFontWeight: 'light',
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
    titleColor: '#2b98c7',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find the right one',
    subtitleFontSize: 'small',
    subtitleFontWeight: 'bold',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 200,
    contentHorizontalAlignment: 'center'
};

export const withSearchBarInFooterSlot = TemplateWithSearchBarInFooter.bind({});
withSearchBarInFooterSlot.args = {
    title: 'Looking for a vacation?',
    titleColor: '#2b98c7',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find the right one',
    subtitleFontSize: 'small',
    subtitleFontWeight: 'bold',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 500,
    contentHorizontalAlignment: 'center'
};

export const withTwoSlots = TemplateWithTwoSlots.bind({});
withTwoSlots.args = {
    title: 'Looking for a vacation?',
    titleColor: '#2b98c7',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find the right one',
    subtitleFontSize: 'small',
    subtitleFontWeight: 'bold',
    src:
        'https://res.cloudinary.com/hy4kyit2a/image/upload/2019-10-Developer_Website_Hero_Banner-1280%C3%97248%20%281%29.png',
    height: 300,
    contentHorizontalAlignment: 'center'
};

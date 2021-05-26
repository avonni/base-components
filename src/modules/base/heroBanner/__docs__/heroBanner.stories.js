import { HeroBanner } from '../__examples__/heroBanner';
import { HeroBannerWithButton } from '../__examples__/heroBannerWithButton';
import { HeroBannerWithSearchBar } from '../__examples__/heroBannerWithSearchBar';
import { HeroBannerWithTwoSlots } from '../__examples__/heroBannerWithTwoSlots';

export default {
    title: 'Example/Hero Banner',
    argTypes: {
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
        titleColor: {
            name: 'title-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the title.',
            table: {
                type: { summary: 'color' }
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
                }
            }
        },
        titleFontSize: {
            name: 'title-font-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'xx-large'],
            defaultValue: 'large',
            description:
                'Valid values include small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'large' }
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
                defaultValue: { summary: 'normal' }
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
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' }
            }
        },
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
        captionColor: {
            name: 'caption-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the caption.',
            table: {
                type: { summary: 'color' }
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
                }
            }
        },
        captionFontSize: {
            name: 'caption-font-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'xx-large'],
            defaultValue: 'small',
            description:
                'Defines the size of the caption. Valid values include small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' }
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
                defaultValue: { summary: 'light' }
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
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' }
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
        subtitleColor: {
            name: 'subtitle-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the font color of the subtitle.',
            table: {
                type: { summary: 'color' }
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
                }
            }
        },
        subtitleFontSize: {
            name: 'subtitle-font-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'xx-large'],
            defaultValue: 'medium',
            description:
                'Defines the size of the subtitle. Valid values include small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
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
                defaultValue: { summary: 'normal' }
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
                defaultValue: { summary: '1px 1px 0 rgb(0 0 0 / 50%)' }
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
        backgroundColor: {
            name: 'background-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the background color if there is no image.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' }
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
                defaultValue: { summary: 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)' }
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
                defaultValue: { summary: 400 }
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
                defaultValue: { summary: 'left' }
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
                defaultValue: { summary: 'center' }
            }
        },
        maxWidth: {
            name: 'max-width',
            control: {
                type: 'range',
                min: 0,
                max: 100,
                step: 1
            },
            defaultValue: 100,
            description:
                'Defines the width inside of the banner in percentage.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 100 }
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
                defaultValue: { summary: 100 }
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
        primaryButtonTextColor: {
            name: 'primary-button-text-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: 'Defines the text color of the primary button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#ffffff' }
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
                defaultValue: { summary: '#ffffff' }
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
                defaultValue: { summary: '#0070d2' }
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
                defaultValue: { summary: '#005fb2' }
            }
        },
        primaryButtonBorderColor: {
            name: 'primary-button-border-color',
            control: {
                type: 'color'
            },
            defaultValue: '#0070d2',
            description: 'Defines the primary button border color.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '#0070d2' }
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
                defaultValue: { summary: 4 }
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
                defaultValue: { summary: '#ffffff' }
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
                defaultValue: { summary: '#ffffff' }
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
                defaultValue: { summary: '#0070d2' }
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
                defaultValue: { summary: '#005fb2' }
            }
        },
        secondaryButtonBorderColor: {
            name: 'secondary-button-border-color',
            control: {
                type: 'color'
            },
            defaultValue: '#0070d2',
            description: 'Defines the secondary button border color.',
            table: {
                type: { summary: 'string' }
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
                defaultValue: { summary: 4 }
            }
        }
    }
};

const Template = (args) => HeroBanner(args);
const TemplateWithButton = (args) => HeroBannerWithButton(args);
const TemplateWithSearchBar = (args) => HeroBannerWithSearchBar(args);
const TemplateWithTwoSlots = (args) => HeroBannerWithTwoSlots(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Lost In The Woods',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300
};

export const BaseAbsoluteCenter = Template.bind({});
BaseAbsoluteCenter.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'normal',
    titleFontFamily: 'cursive',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'center'
};

export const BaseCenteredRight = Template.bind({});
BaseCenteredRight.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
    subtitleFontFamily: 'monospace',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentHorizontalAlignment: 'right',
    linearGradient: 'rgba(0,0,0,0), rgba(0,0,0,0)'
};

export const BaseTopLeft = Template.bind({});
BaseTopLeft.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    titleFontFamily: 'Tahoma, sans-serif',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top'
};

export const BaseTopCenter = Template.bind({});
BaseTopCenter.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'center'
};

export const BaseTopRight = Template.bind({});
BaseTopRight.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'top',
    contentHorizontalAlignment: 'right'
};

export const BaseBottomLeft = Template.bind({});
BaseBottomLeft.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom'
};

export const BaseBottomCenter = Template.bind({});
BaseBottomCenter.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
    src:
        'https://help.salesforce.com/resource/HelpStaticResource/assets/images/hero_large.png',
    height: 300,
    contentVerticalAlignment: 'bottom',
    contentHorizontalAlignment: 'center'
};

export const BaseBottomRight = Template.bind({});
BaseBottomRight.args = {
    title: 'Lost In The Woods',
    titleFontSize: 'xx-large',
    titleFontWeight: 'bold',
    subtitle: 'Find your true self',
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

export const withSearchBarInFooterSlot = TemplateWithSearchBar.bind({});
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

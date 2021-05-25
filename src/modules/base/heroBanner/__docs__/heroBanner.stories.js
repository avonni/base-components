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
        src: {
            control: {
                type: 'text'
            },
            description: 'URL for the background image.',
            table: {
                type: { summary: 'string' }
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
                type: 'text'
            },
            defaultValue: '400',
            description: 'Defines the height of the banner. ',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '400' }
            }
        },
        textHorizontalAlignment: {
            name: 'text-horizontal-alignment',
            control: {
                type: 'select'
            },
            options: ['left', 'center', 'right'],
            defaultValue: 'left',
            description: 'Valid values include left, center and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        textVerticalAlignment: {
            name: 'text-vertical-alignment',
            control: {
                type: 'select'
            },
            options: ['top', 'center', 'bottom'],
            defaultValue: 'center',
            description: 'Valid values include top, center and bottom.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' }
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
    textHorizontalAlignment: 'center'
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
    textHorizontalAlignment: 'right',
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
    textVerticalAlignment: 'top'
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
    textVerticalAlignment: 'top',
    textHorizontalAlignment: 'center'
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
    textVerticalAlignment: 'top',
    textHorizontalAlignment: 'right'
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
    textVerticalAlignment: 'bottom'
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
    textVerticalAlignment: 'bottom',
    textHorizontalAlignment: 'center'
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
    textVerticalAlignment: 'bottom',
    textHorizontalAlignment: 'right'
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
    textHorizontalAlignment: 'center'
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
    textHorizontalAlignment: 'center'
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
    textHorizontalAlignment: 'center'
};

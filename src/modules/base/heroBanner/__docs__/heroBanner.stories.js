import { HeroBanner } from '../__examples__/heroBanner';

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
        titleFontColor: {
            name: 'title-font-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: '',
            table: {
                type: { summary: 'color' }
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
        description: {
            control: {
                type: 'text'
            },
            description:
                'The description can include text, and is displayed under the title.',
            table: {
                type: { summary: 'string' }
            }
        },
        descriptionFontColor: {
            name: 'description-font-color',
            control: {
                type: 'color'
            },
            defaultValue: '#ffffff',
            description: '',
            table: {
                type: { summary: 'color' }
            }
        },
        descriptionFontSize: {
            name: 'description-font-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'xx-large'],
            defaultValue: 'medium',
            description:
                'Defines the size of the description. Valid values include small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        descriptionFontWeight: {
            name: 'description-font-weight',
            control: {
                type: 'select'
            },
            options: ['light', 'normal', 'bold'],
            defaultValue: 'normal',
            description:
                'Defines the font weight of the description. Valid values include light, normal and bold.',
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

export const Base = Template.bind({});
Base.args = {
    title: 'This is a title',
    description: 'This is the description',
    src:
        'https://acadienouvelle-6143.kxcdn.com/wp-content/uploads/2020/06/moon-416973_1280.jpg.gallery.jpg'
};

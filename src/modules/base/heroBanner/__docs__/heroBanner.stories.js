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
            options: [
                'x-small',
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large'
            ],
            defaultValue: 'large',
            description:
                'Valid values include x-small, small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'large' }
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
            options: [
                'x-small',
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large'
            ],
            defaultValue: 'medium',
            description:
                'Valid values include x-small, small, medium, large, x-large, xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
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
    title: 'THIS IS A TITLE',
    description: 'This is the description',
    src:
        'https://acadienouvelle-6143.kxcdn.com/wp-content/uploads/2020/06/moon-416973_1280.jpg.gallery.jpg'
};

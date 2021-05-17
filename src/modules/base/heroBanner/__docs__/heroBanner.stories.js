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
Base.args = {};

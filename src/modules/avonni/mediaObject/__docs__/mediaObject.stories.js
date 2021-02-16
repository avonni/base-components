import { MediaObject } from '../__examples__/mediaObject';

export default {
    title: 'Example/Media Object',
    argTypes: {
        verticalAlign: {
            control: {
                type: 'select',
                options: ['start', 'center', 'end']
            },
            defaultValue: 'start',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'start' }
            }
        },
        responsive: {
            control: {
                type: 'boolean'
            },
            table: {
                type: { summary: 'Boolean' },
                defaultValue: { summary: 'False' }
            }
        },
        inline: {
            control: {
                type: 'boolean'
            },
            table: {
                type: { summary: 'Boolean' },
                defaultValue: { summary: 'False' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['medium', 'small', 'large']
            },
            defaultValue: 'medium',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => MediaObject(args);

export const Base = Template.bind({});
Base.args = {
    verticalAlign: 'start',
    size: 'slds-media_medium'
};

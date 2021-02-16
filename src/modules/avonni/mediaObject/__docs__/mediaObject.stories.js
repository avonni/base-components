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
                defaultValue: { summary: 'start' }
            }
        },
        responsive: {
            control: {
                type: 'boolean'
            }
        },
        inline: {
            control: {
                type: 'boolean'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
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

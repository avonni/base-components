import { MediaObject } from '../__examples__/mediaObject';

export default {
    title: 'Example/Media Object',
    argTypes: {
        verticalAlign: {
            control: {
                type: 'select',
                options: ['start', 'center', 'end']
            },
            defaultValue: 'start'
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
                options: [
                    'slds-media_small',
                    'slds-media_medium',
                    'slds-media_large'
                ]
            },
            defaultValue: 'slds-media_medium'
        }
    }
};

const Template = (args) => MediaObject(args);

export const Base = Template.bind({});
Base.args = {
    verticalAlign: 'start',
    size: 'slds-media_medium'
};

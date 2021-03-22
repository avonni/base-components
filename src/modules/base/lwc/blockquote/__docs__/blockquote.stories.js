import { Blockquote } from '../__examples__/blockquote';

export default {
    title: 'Example/Blockquote',
    argTypes: {
        title: {
            control: {
                type: 'text'
            }
        },
        iconName: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['default', 'brand', 'warning', 'error', 'success']
            },
            defaultValue: 'default',
            table: {
                defaultValue: { summary: 'default' }
            }
        },
        iconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'small',
            table: {
                defaultValue: { summary: 'small' }
            }
        }
    }
};

const Template = (args) => Blockquote(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Keep in mind',
    iconName: 'utility:animal_and_nature'
};

import { Avatar } from '../__examples__/avatar';

export default {
    title: 'Example/Avatar',
    argTypes: {
        alternativeText: {
            control: {
                type: 'text'
            }
        },
        fallbackIconName: {
            control: {
                type: 'text'
            }
        },
        initials: {
            control: {
                type: 'text'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        status: {
            control: {
                type: 'select',
                options: ['approved', 'locked', 'declined', 'unknown']
            }
        },
        statusPosition: {
            control: {
                type: 'select',
                options: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
            },
            defaultValue: 'top-right',
            table: {
                defaultValue: { summary: 'top-right' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['circle', 'square']
            },
            defaultValue: 'square',
            table: {
                defaultValue: { summary: 'square' }
            }
        }
    }
};

const Template = (args) => Avatar(args);

export const Base = Template.bind({});
Base.args = {
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    fallbackIconName: 'standard:avatar',
    initials: 'JD',
    status: 'approved'
};

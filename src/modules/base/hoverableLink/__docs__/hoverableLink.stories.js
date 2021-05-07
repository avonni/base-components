import { HoverableLink } from '../__examples__/hoverableLink';

export default {
    title: 'Example/Hoverable Link',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label of the hoverable link. If no label is given, the href attribute will be used as a label.',
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description:
                'href property of the link. If no label is given, the href will also be used as a label.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description: 'Title of the popover.',
            table: {
                type: { summary: 'string' }
            }
        },
        titleHref: {
            name: 'title-href',
            control: {
                type: 'text'
            },
            description:
                'href property of the popover title. If present, the title will be a link.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarSrc: {
            name: 'avatar-src',
            control: {
                type: 'text'
            },
            description:
                'Image URL for the avatar displayed before the popover title.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarFallbackIconName: {
            name: 'avatar-fallback-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the avatar image fails to load. \nSpecify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description: 'Array of field objects to display in the popover.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        popoverSize: {
            name: 'popover-size',
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Width of the popover. Accepted values include small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        placement: {
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'right',
                'center',
                'bottom-left',
                'bottom-right',
                'bottom-center'
            ],
            defaultValue: 'left',
            description:
                'Determines the alignment of the popover relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the popover based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            defaultValue: 'Loading',
            description:
                'Message displayed while the popover is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' }
            }
        },
        theme: {
            control: {
                type: 'select'
            },
            options: ['default', 'shade', 'inverse'],
            defaultValue: 'default',
            description:
                'Theme of the popover. Valid values include default, shade and inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
            }
        }
    }
};

const fields = [
    {
        label: 'Account Name',
        value: 'Jane Doe Inc.',
        type: 'text'
    },
    {
        label: 'Phone',
        value: '514-222-3333',
        type: 'phone'
    },
    {
        label: 'Close date',
        value: new Date(),
        type: 'date',
        typeAttributes: {
            day: 'numeric',
            month: 'long'
        }
    }
];

const Template = (args) => HoverableLink(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Hoverable link',
    href: 'https://www.avonni.app/',
    title: 'Title of the popover',
    titleHref: 'https://www.avonni.app/',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
    avatarFallbackIconName: 'standard:user',
    fields: fields,
    popoverSize: 'large',
    theme: 'shade'
};

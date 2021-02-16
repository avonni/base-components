import { DynamicMenu } from '../__examples__/dynamicMenu';

export default {
    title: 'Example/Dynamic Menu',
    argTypes: {
        value: {
            control: {
                type: 'text'
            }
        },
        alternativeText: {
            control: {
                type: 'text'
            }
        },
        loadingStateAlternativeText: {
            control: {
                type: 'text'
            }
        },
        label: {
            control: {
                type: 'text'
            }
        },
        accessKey: {
            control: {
                type: 'text'
            }
        },
        title: {
            control: {
                type: 'text'
            }
        },
        searchInputPlaceholder: {
            control: {
                type: 'text'
            },
            defaultValue: 'Search…',
            table: {
                defaultValue: { summary: 'Search…' }
            }
        },
        tooltip: {
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
                options: [
                    'border',
                    'border-inverse',
                    'border-filled',
                    'bare',
                    'bare-inverse',
                    'container'
                ]
            },
            defaultValue: 'border',
            table: {
                defaultValue: { summary: 'border' }
            }
        },
        menuAlignment: {
            control: {
                type: 'select',
                options: [
                    'left',
                    'center',
                    'right',
                    'bottom-left',
                    'bottom-center',
                    'bottom-right'
                ]
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        withSearch: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        items: {
            control: {
                type: 'object'
            }
        }
    }
};

const items = [
    {
        label: 'Acme',
        meta: ['Account', 'San Francisco'],
        id: 0,
        value: 'acme',
        avatar: {
            fallbackIconName: 'standard:account',
            alternativeText: 'Account'
        }
    },
    {
        label: 'Remo',
        meta: ['Contact', 'San Francisco'],
        id: 1,
        value: 'remo',
        avatar: {
            fallbackIconName: 'standard:contact',
            alternativeText: 'Contact'
        }
    },
    {
        label: 'Niko',
        meta: ['Lead', 'San Francisco'],
        id: 2,
        value: 'niko',
        avatar: {
            fallbackIconName: 'standard:lead',
            alternativeText: 'Lead'
        }
    }
];

const Template = (args) => DynamicMenu(args);

export const Base = Template.bind({});
Base.args = {
    items: items,
    iconName: 'utility:favorite'
};

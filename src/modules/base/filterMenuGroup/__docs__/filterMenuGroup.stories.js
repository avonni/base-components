import { FilterMenuGroup } from '../__examples__/filterMenuGroup';

export default {
    title: 'Example/Filter Menu Group',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const contact = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'standard:call',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    }
];

const prices = [
    {
        label: 'Free',
        value: 'free'
    },
    {
        label: 'Paid',
        value: 'paid'
    }
];

const editions = [
    {
        label: 'Essentials',
        value: 'essentials'
    },
    {
        label: 'Professional',
        value: 'professional'
    },
    {
        label: 'Enterprise',
        value: 'enterprise'
    },
    {
        label: 'Unlimited',
        value: 'unlimited'
    },
    {
        label: 'Force.com',
        value: 'forcecom'
    },
    {
        label: 'Developer',
        value: 'developer'
    },
    {
        label: 'Performance',
        value: 'performance'
    }
];

const languages = [
    {
        label: 'Dutch',
        value: 'dutch'
    },
    {
        label: 'English',
        value: 'english'
    },
    {
        label: 'Finnish',
        value: 'finnish'
    },
    {
        label: 'French',
        value: 'french'
    },
    {
        label: 'German',
        value: 'german'
    },
    {
        label: 'Danish',
        value: 'danish'
    },
    {
        label: 'Italian',
        value: 'italian'
    },
    {
        label: 'Japanese',
        value: 'japanese'
    },
    {
        label: 'Korean',
        value: 'korean'
    },
    {
        label: 'Portuguese',
        value: 'portuguese'
    }
];

const items = [
    {
        name: 'contact',
        accessKey: 'k',
        alternativeText: 'Open contact filter',
        iconName: 'standard:log_a_call',
        iconSize: 'small',
        items: contact,
        title: 'Contact filter',
        tooltip: 'Contact filter',
        value: ['email', 'meeting'],
        searchInputPlaceholder: 'Search for contact types',
        showSearchBox: true,
        submitButtonLabel: 'Save selection',
        resetButtonLabel: 'Reset selection',
        nubbin: true
    },
    {
        name: 'prices',
        disabled: true,
        label: 'Prices',
        items: prices,
        menuWidth: 'large',
        nubbin: true,
        hideSelectedItems: true
    },
    {
        name: 'editions',
        items: editions,
        label: 'Editions',
        variant: 'bare',
        showSearchBox: true,
        menuLength: '5-items'
    },
    {
        name: 'ratings',
        isLoading: true,
        loadingStateAlternativeText: 'Waiting for the items to load...'
    },
    {
        name: 'languages',
        items: languages,
        label: 'Laguages',
        showSearchBox: true,
        menuLength: '10-items'
    }
];

const Template = (args) => FilterMenuGroup(args);

export const Base = Template.bind({});
Base.args = {
    items: items
};

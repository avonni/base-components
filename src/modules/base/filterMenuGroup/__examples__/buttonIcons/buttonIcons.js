import { LightningElement } from 'lwc';

const LANGUAGES = [
    {
        label: 'Arabic',
        value: 'arabic'
    },
    {
        label: 'Bengali',
        value: 'bengali'
    },
    {
        label: 'Danish',
        value: 'danish'
    },
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
        label: 'Hindi',
        value: 'hindi'
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
        label: 'Mandarin',
        value: 'mandarin'
    },
    {
        label: 'Marathi',
        value: 'marathi'
    },
    {
        label: 'Portuguese',
        value: 'portuguese'
    },
    {
        label: 'Russian',
        value: 'russian'
    },
    {
        label: 'Spanish',
        value: 'spanish'
    },
    {
        label: 'Tamil',
        value: 'tamil'
    },
    {
        label: 'Telugu',
        value: 'telugu'
    },
    {
        label: 'Turkish',
        value: 'turkish'
    },
    {
        label: 'Ukrainian',
        value: 'ukrainian'
    },
    {
        label: 'Vietnamese',
        value: 'vietnamese'
    },
    {
        label: 'Wu Chinese',
        value: 'wuChinese'
    },
    {
        label: 'Yue Chinese',
        value: 'yueChinese'
    }
];

const CONTACT = [
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

const EDITIONS = [
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

const MENUS = [
    {
        name: 'contact',
        iconName: 'utility:call',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        typeAttributes: {
            items: CONTACT,
            dropdownWidth: 'large',
            droddownNubbin: true
        },
        tooltip: 'Type of contact',
        buttonVariant: 'brand'
    },
    {
        name: 'price',
        disabled: true,
        label: 'Price',
        iconName: 'utility:currency',
        type: 'range',
        typeAttributes: {
            showPin: true,
            unit: 'currency',
            unitAttributes: {
                currencyCode: 'CAD'
            }
        }
    },
    {
        name: 'editions',
        label: 'Editions',
        iconName: 'utility:knowledge_base',
        typeAttributes: {
            items: EDITIONS,
            allowSearch: true,
            isMultiSelect: true
        }
    },
    {
        name: 'languages',
        label: 'Languages',
        iconName: 'utility:world',
        typeAttributes: {
            enableInfiniteLoading: true,
            dropdownLength: '5-items',
            isMultiSelect: true
        }
    },
    {
        name: 'publication',
        label: 'Publication',
        iconName: 'utility:date_input',
        type: 'date-range',
        typeAttributes: {
            type: 'datetime'
        }
    }
];

export default class FilterMenuGroupButtonIcons extends LightningElement {
    menus = MENUS;

    value = {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    };

    _loadMoreTimeout;

    handleLoadMore(event) {
        // Set the menu to loading state
        const name = event.detail.name;
        const menu = this.menus.find((m) => m.name === name);
        menu.isLoading = true;
        this.menus = [...this.menus];

        clearTimeout(this._loadMoreTimeout);
        this._loadMoreTimeout = setTimeout(() => {
            // Add more items to the menu and remove the loading state
            const previousItems = Array.isArray(menu.typeAttributes.items)
                ? menu.typeAttributes.items
                : [];
            const newItems = LANGUAGES.slice(
                previousItems.length,
                previousItems.length + 10
            );
            menu.typeAttributes.items = [...previousItems, ...newItems];
            menu.isLoading = false;

            if (menu.typeAttributes.items.length === LANGUAGES.length) {
                // If all the items have been loaded, remove the infinite load
                menu.typeAttributes.enableInfiniteLoading = false;
            }
            this.menus = [...this.menus];
        }, 1000);
    }
}

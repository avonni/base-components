import { LightningElement, api } from 'lwc';
import { deepCopy, normalizeArray, normalizeObject } from 'c/utils';

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

export default class FilterMenuGroup extends LightningElement {
    @api applyButtonLabel;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api isToggleButtonVariant;
    @api offsetFilterWidth;
    @api resetButtonLabel;
    @api showSelectedFilterValueCount;
    @api variant;
    @api wrapperWidth;

    _menus = [];
    _value = {};

    _loadMoreTimeout;

    @api
    get menus() {
        return this._menus;
    }
    set menus(value) {
        this._menus = normalizeArray(deepCopy(value));
    }

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = normalizeObject(deepCopy(value));
    }

    handleLoadMore(event) {
        // Set the menu to loading state
        const name = event.detail.name;
        const menu = this.menus.find((m) => m.name === name);
        menu.isLoading = true;
        this._menus = [...this.menus];

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
            this._menus = [...this.menus];
        }, 1000);
    }
}

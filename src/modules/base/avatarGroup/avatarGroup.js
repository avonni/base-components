import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString, normalizeArray } from 'c/utilsPrivate';

const validSizes = {
    valid: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    default: 'medium'
};
const validLayouts = { valid: ['stack', 'grid', 'list'], default: 'stack' };

const validVariants = {
    valid: ['empty', 'square', 'circle'],
    default: 'square'
};

const validButtonIconPositions = { valid: ['left', 'right'], default: 'left' };

const validButtonVariants = {
    valid: [
        'neutral',
        'base',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

export default class AvatarGroup extends LightningElement {
    @api actionIconName;
    @api listButtonLabel = 'Show more';
    @api listButtonIconName;
    @api name;

    _items = [];
    _maxCount;
    _size = validSizes.default;
    _layout = validLayouts.default;
    _allowBlur = false;
    _listButtonVariant = validButtonVariants.default;
    _listButtonIconPosition = validButtonIconPositions.default;
    _variant = validVariants.default;
    showPopover = false;
    hiddenItems = [];

    connectedCallback() {
        if (!this.maxCount) {
            this._maxCount = this.layout === 'stack' ? 5 : 11;
        }
    }

    renderedCallback() {
        if (!this.isClassic) {
            let avatars = this.template.querySelectorAll(
                '.avonni-avatar-group__avatar'
            );

            avatars.forEach((avatar, index) => {
                avatar.style.zIndex = avatars.length - index;
            });
        }
    }

    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = normalizeArray(value);
    }

    @api
    get maxCount() {
        return this._maxCount;
    }

    set maxCount(value) {
        this._maxCount = value;
    }

    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: validSizes.default,
            validValues: validSizes.valid
        });
    }

    @api get layout() {
        return this._layout;
    }

    set layout(value) {
        this._layout = normalizeString(value, {
            fallbackValue: validLayouts.default,
            validValues: validLayouts.valid
        });
    }

    @api get listButtonVariant() {
        return this._listButtonVariant;
    }

    set listButtonVariant(value) {
        this._listButtonVariant = normalizeString(value, {
            fallbackValue: validButtonVariants.default,
            validValues: validButtonVariants.valid
        });
    }

    @api get listButtonIconPosition() {
        return this._listButtonIconPosition;
    }

    set listButtonIconPosition(value) {
        this._listButtonIconPosition = normalizeString(value, {
            fallbackValue: validButtonIconPositions.default,
            validValues: validButtonIconPositions.valid
        });
    }

    @api get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });
    }

    get primaryItem() {
        if (this.items.length === 2) {
            return this.items[0];
        }

        return {};
    }

    get secondaryItem() {
        if (this.items.length === 2) {
            return this.items[1];
        }

        return {};
    }

    get listItems() {
        let length = this.items.length;
        let maxCount = this.maxCount;
        let items = JSON.parse(JSON.stringify(this.items));

        if (isNaN(maxCount)) {
            maxCount = this.layout === 'stack' ? 5 : 11;
        }

        if (length > maxCount) {
            items = items.slice(0, maxCount);

            items.push({
                initials: `+${length - maxCount}`,
                showMore: true
            });
        }

        items.forEach((item, index) => {
            item.key = 'avatar-key-' + index;
        });

        return items;
    }

    get listHiddenItems() {
        let length = this.items.length;
        let maxCount = this.maxCount;
        let items = JSON.parse(JSON.stringify(this.items));

        if (isNaN(maxCount)) {
            maxCount = 11;
        }

        if (length > maxCount) {
            items = items.slice(maxCount);
            items.forEach((item, index) => {
                item.key = 'avatar-key-hidden-' + index;
            });

            return items;
        }

        return [];
    }

    get avatarGroupClass() {
        return classSet('slds-avatar-group avonni-avatar-group__avatar')
            .add({
                'slds-avatar-group_x-small': this.size === 'x-small',
                'slds-avatar-group_small': this.size === 'small',
                'slds-avatar-group_medium': this.size === 'medium',
                'slds-avatar-group_large': this.size === 'large',
                'avonni-avatar-group_x-large': this.size === 'x-large',
                'avonni-avatar-group_xx-large': this.size === 'xx-large',
                'avonni-avatar-group_circle': this.variant === 'circle'
            })
            .toString();
    }

    get avatarInlineClass() {
        return classSet('avonni-avatar-group__avatar')
            .add({
                'avonni-avatar-group_in-line': this.layout === 'stack',
                'circleBorder' : this.layout === 'stack' && this.variant === 'circle',
                'squareBorder' : this.layout === 'stack' && this.variant === 'square',
            })
            .add(`avonni-avatar-${this.size}`)
            .toString();
    }

    get avatarInlinePlusClass() {
        return classSet('avonni-avatar-group__avatar avonni-avatar-group__plus')
            .add({
                'avonni-avatar-group_in-line': this.layout === 'stack'
            })
            .add(`avonni-avatar-${this.size}`)
            .toString();
    }

    get avatarWrapperClass() {
        return classSet('avonni-avatar-group__avatar-container').add({
            'slds-show': this.layout === 'list',
            'avonni-avatar-group_circle': this.variant === 'circle'
        });
    }

    get actionButtonClass() {
        return classSet('avonni-avatar-group__action-button')
            .add({
                'avonni-avatar-group_action-button-in-line':
                    this.layout === 'stack'
            })
            .add({
                'avonni-avatar-group__action-button_circle':
                    this.variant === 'circle',
                'avonni-avatar-group__action-button_square':
                    this.variant === 'square',
                'avonni-avatar-group__action-button_x-large':
                    this.size === 'x-large',
                'avonni-avatar-group__action-button_xx-large':
                    this.size === 'xx-large',
                'avonni-avatar-group__action-button_large':
                    this.size === 'large',
                'avonni-avatar-group__action-button_medium':
                    this.size === 'medium',
                'avonni-avatar-group__action-button_small':
                    this.size === 'small',
                'avonni-avatar-group__action-button_x-small':
                    this.size === 'x-small'
            })
            .toString();
    }

    get actionButtonBaseLayoutClass() {
        return classSet(
            'avonni-avatar-group__action-button-base-layout'
        ).toString();
    }

    get actionButtonListClass() {
        return classSet('avonni-avatar-group__action-button-list').add({
            'slds-show': this.layout === 'list'
        });
    }

    get actionButtonInlineClass() {
        return classSet('avonni-avatar-group__action-button-base-layout')
            .add({
                'avonni-avatar-group_action-button-in-line':
                    this.layout === 'stack'
            })
            .add(`avonni-action-button-${this.size}`)
            .toString();
    }

    get actionButtonLayoutClass() {
        if (this.layout === 'list') {
            return this.actionButtonListClass;
        } else if (this.layout === 'stack') {
            return this.actionButtonInlineClass;
        }
        return this.actionButtonBaseLayoutClass;
    }

    get actionButtonIconSize() {
        switch (this.size) {
            case 'x-small':
            case 'small':
            case 'medium':
                return 'x-small';
            case 'xx-large':
                return 'medium';
            default:
                return 'small';
        }
    }

    get isClassic() {
        return (
            this.layout === 'stack' &&
            this.items.length === 2 &&
            !this.actionIconName
        );
    }

    get isNotList() {
        return !(this.layout === 'list');
    }

    allowBlur() {
        this._allowBlur = true;
    }

    cancelBlur() {
        this._allowBlur = false;
    }

    handleBlur() {
        if (!this._allowBlur) {
            return;
        }

        this.showPopover = false;
    }

    handleAvatarClick(event) {
        if (event.type === 'keyup' && event.key !== 'Enter') return;

        const itemId = event.target.dataset.itemId;
        const type = event.target.dataset.type;
        let item;

        if (type === 'show') {
            item = this.listItems[itemId];
        } else {
            item = this.listHiddenItems[itemId];
        }

        if (item.showMore) {
            this.showPopover = true;
            this.template.querySelector('.slds-dropdown-trigger').focus();
            this.allowBlur();
        } else {
            this.dispatchEvent(
                new CustomEvent('avatarclick', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        item
                    }
                })
            );

            this.showPopover = false;
            this.cancelBlur();
        }
    }

    actionClick() {
        // * action event *
        const name = this.name;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                bubbles: true,
                cancelable: true,
                detail: {
                    name
                }
            })
        );
    }
}

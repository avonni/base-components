import {
    classSet,
    normalizeAriaAttribute,
    normalizeArray,
    normalizeBoolean
} from 'c/utils';

/**
 * Option
 *
 * @class
 * @property {object} avatar An object with item fields to be rendered as an avatar.
 * @property {string[]} groups Array of group names this option belongs to.
 * @property {string} label Label of the option.
 * @property {object[]} options Array of option objects. If present:
 * * The icon utility:chevronright will be displayed to the right of the option to indicate it has children.
 * * The option is not selectable. On click on it, the children options will replace the current options in the drop-down.
 * @property {string} secondaryText Secondary text to display below the label.
 * @property {string} value Required. A unique value for the option.
 * @property {boolean} hasAvatar Present if avatarFallbackIconName or avatarSrc
 */
export default class Option {
    constructor(option, levelPath) {
        this.avatar = option.avatar || {};
        this.avatarFallbackIconName = option.avatarFallbackIconName
            ? option.avatarFallbackIconName
            : this.avatar && this.avatar.fallbackIconName
            ? this.avatar.fallbackIconName
            : undefined;
        this.avatarInitials = option.avatarInitials
            ? option.avatarInitials
            : this.avatar && this.avatar.initials
            ? this.avatar.initials
            : undefined;
        this.avatarSrc = option.avatarSrc
            ? option.avatarSrc
            : this.avatar && this.avatar.src
            ? this.avatar.src
            : undefined;
        this.disabled = normalizeBoolean(option.disabled);
        this.groups = normalizeArray(option.groups);
        this.iconName = option.iconName;
        this.isLoading = normalizeBoolean(option.isLoading);
        this.label = option.label;
        this.levelPath = levelPath;
        this.options = normalizeArray(option.options);
        this.secondaryText = option.secondaryText;
        this.value = option.value;

        if (this.hasAvatar) {
            this.avatar = {
                fallbackIconName: this.avatarFallbackIconName,
                initials: this.avatar?.initials
                    ? this.avatar.initials
                    : undefined,
                presence: this.avatar?.presence
                    ? this.avatar.presence
                    : undefined,
                presencePosition: this.avatar?.presencePosition
                    ? this.avatar.presencePosition
                    : 'bottom-right',
                src: this.avatarSrc,
                variant: this.avatar?.variant ? this.avatar.variant : 'square'
            };
        }
    }

    /**
     * String of true or false.
     *
     * @type {string}
     */
    get computedAriaDisabled() {
        return normalizeAriaAttribute(this.disabled.toString());
    }

    /**
     * Return the icon chosen or utility:check.
     *
     * @type {string}
     */
    get computedCheckmarkIconName() {
        return this.iconName || 'utility:check';
    }

    /**
     * Class of the option.
     *
     * @type {string}
     */
    get computedClass() {
        return classSet(
            'slds-media slds-media_small slds-media_center slds-listbox__item slds-listbox__option slds-listbox__option_plain slds-listbox__option_entity avonni-primitive-combobox__option'
        )
            .add({
                'avonni-primitive-combobox__option_disabled': this.disabled,
                'slds-is-selected': this.selected || this.hasSelectedChildren()
            })
            .toString();
    }

    /**
     * Class of the option's icon.
     *
     * @type {string}
     */
    get computedIconClass() {
        return this.selected || this.hasSelectedChildren()
            ? 'slds-current-color'
            : undefined;
    }

    /**
     * Returns true if the option has an avatar.
     *
     * @type {boolean}
     */
    get hasAvatar() {
        return (
            this.avatarFallbackIconName || this.avatarSrc || this.avatarInitials
        );
    }

    /**
     * True if the option has children or is loading.
     *
     * @type {boolean}
     */
    get hasChildren() {
        return this.options.length || this.isLoading;
    }

    /**
     * True if selected, options or icon-name.
     *
     * @type {boolean}
     */
    get showCheckmark() {
        return (
            this.selected ||
            (this.options.length && this.hasSelectedChildren()) ||
            this.iconName
        );
    }

    /**
     * Array of option's options.
     *
     * @param {object[]} options Array of option objects.
     * @returns {object[]} Array of option's options
     */
    hasSelectedChildren(options = this.options) {
        return options.some((option) => {
            return (
                option.selected ||
                (option.options.length &&
                    this.hasSelectedChildren(option.options))
            );
        });
    }
}

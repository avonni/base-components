import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString as normalize } from 'c/utils';
import standardTemplate from './primitiveIcon.html';
import {
    fetchIconLibrary,
    hasIconLibrary,
    getIconLibrary,
    getName,
    isValidName,
    polyfill
} from 'c/iconUtils';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};
const ICON_VARIANTS = {
    valid: ['bare', 'error', 'inverse', 'warning', 'success'],
    default: ''
};

export default class PrimitiveIcon extends LightningElement {
    @api src;
    @api svgClass;
    @api svgStyle;
    @api size = ICON_SIZES.default;
    @api variant;

    iconLibrary = null;
    _iconName = null;

    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        if (value !== this._iconName) {
            this._iconName = value;
            this.requestIconTemplates();
        }
    }

    get category() {
        if (isValidName(this._iconName)) {
            const [spriteName] = this._iconName.split(':');
            return spriteName;
        }
        return null;
    }

    get isReady() {
        return !!this.iconLibrary;
    }

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async requestIconTemplates() {
        if (hasIconLibrary('ltr', this.category)) {
            this.iconLibrary = getIconLibrary('ltr', this.category);
            return;
        }

        if (this.category) {
            try {
                this.iconLibrary = null;
                this.iconLibrary = await fetchIconLibrary('ltr', this.category);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn(
                    `<avonni-primitive-icon> failed to dynamically import icon templates for ${this.category}: ${e.message}`
                );
            }
        }
    }

    renderedCallback() {
        if (this.isReady || this.iconName !== this.prevIconName) {
            this.prevIconName = this.iconName;
            const svgElement = this.template.querySelector('svg');
            polyfill(svgElement);
        }
    }

    render() {
        if (this.isReady) {
            if (!this.src) {
                const name = this.iconName;
                if (isValidName(name)) {
                    const [spriteName, iconName] = name.split(':');
                    const template =
                        this.iconLibrary[`${spriteName}_${iconName}`];
                    if (template) {
                        return template;
                    }
                }
            }
        }
        return standardTemplate;
    }

    get href() {
        return this.src || '';
    }

    get name() {
        return getName(this.iconName);
    }

    get normalizedSize() {
        return normalize(this.size, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    get normalizedVariant() {
        return normalize(this.variant, {
            fallbackValue: ICON_VARIANTS.default,
            validValues: ICON_VARIANTS.valid
        });
    }

    get computedClass() {
        const { normalizedSize, normalizedVariant } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
            classes.add('slds-icon');
        }

        switch (normalizedVariant) {
            case 'error':
                classes.add('slds-icon-text-error');
                break;
            case 'warning':
                classes.add('slds-icon-text-warning');
                break;
            case 'success':
                classes.add('slds-icon-text-success');
                break;
            case 'inverse':
            case 'bare':
                break;
            default:
                if (!this.src) {
                    classes.add('slds-icon-text-default');
                }
        }

        if (normalizedSize !== 'medium') {
            classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
    }
}

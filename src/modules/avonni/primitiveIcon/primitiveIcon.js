import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString as normalize } from 'avonni/utilsPrivate';

import standardTemplate from './primitiveIcon.html';

import { getName, isValidName, polyfill } from 'avonni/iconUtils';
import { fetchIconLibrary, hasIconLibrary, getIconLibrary } from './fetch';

export default class LightningPrimitiveIcon extends LightningElement {
    @api src;
    @api svgClass;
    @api size = 'medium';
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
                    `<lightning-primitive-icon> failed to dynamically import icon templates for ${this.category}: ${e.message}`
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
            // If src is present, should use default template reply on given svg src
            if (!this.src) {
                const name = this.iconName;
                if (isValidName(name)) {
                    const [spriteName, iconName] = name.split(':');
                    const template = this.iconLibrary[
                        `${spriteName}_${iconName}`
                    ];
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
            fallbackValue: 'medium',
            validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
    }

    get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalize(this.variant, {
            fallbackValue: '',
            validValues: ['bare', 'error', 'inverse', 'warning', 'success']
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
                // if custom icon is set, we don't want to set
                // the text-default class
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

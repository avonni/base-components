import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { NavigationMixin } from 'lightning/navigation';

const VALID_ICON_POSITIONS = ['left', 'right'];
const VALID_VARIANTS = [
    'base',
    'neutral',
    'brand',
    'brand-outline',
    'destructive',
    'destructive-text',
    'inverse',
    'success'
];
const VALID_TYPES = [
    'standard__app',
    'standard__component',
    'standard__knowledgeArticlePage',
    'comm__loginPage',
    'comm__namedPage',
    'standard__namedPage',
    'comm__namedPage',
    'standard__navItemPage',
    'standard__objectPage',
    'standard__recordPage',
    'standard__recordRelationshipPage',
    'standard__webPage'
];

export default class ButtonNavigation extends NavigationMixin(
    LightningElement
) {
    @api accessKey;
    @api iconName;
    @api label;
    @api name;

    @api attributeAppTarget;
    @api attributePageRef;
    @api attributeComponentName;
    @api attributeArticleType;
    @api attributeUrlName;
    @api attributeName;
    @api attributePageName;
    @api attributeApiName;
    @api attributeActionName;
    @api attributeObjectApiName;
    @api attributeRecordId;
    @api attributeRelationshipApiName;
    @api attributeUrl;

    @api stateNoOverride;
    @api stateFilterName = 'Recent';
    @api stateDefaultFieldValues;

    _iconPosition = 'left';
    _variant = 'neutral';
    _type;
    _disabled;

    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(value) {
        this._iconPosition = normalizeString(value, {
            fallbackValue: 'left',
            validValues: VALID_ICON_POSITIONS
        });
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: 'neutral',
            validValues: VALID_VARIANTS
        });
    }

    @api
    get type() {
        return this._type;
    }

    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: '',
            validValues: VALID_TYPES,
            toLowerCase: false
        });
    }

    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    get attributesConfig() {
        let attributes = {
            appTarget: this.attributeAppTarget,
            pageRef: this.attributePageRef,
            componentName: this.attributeComponentName,
            articleType: this.attributeArticleType,
            urlName: this.attributeUrlName,
            name: this.attributeName,
            pageName: this.attributePageName,
            apiName: this.attributeApiName,
            actionName: this.attributeActionName,
            objectApiName: this.attributeObjectApiName,
            recordId: this.attributeRecordId,
            relationshipApiName: this.attributeRelationshipApiName,
            url: this.attributeUrl
        };

        for (const key of Object.keys(attributes)) {
            if (!attributes[key]) {
                delete attributes[key];
            }
        }

        return attributes;
    }

    get stateConfig() {
        let state = {
            noOverride: this.stateNoOverride,
            filterName: this.stateFilterName,
            defaultFieldValues: this.stateDefaultFieldValues
        };

        for (const key of Object.keys(state)) {
            if (!state[key]) {
                delete state[key];
            }
        }

        return state;
    }

    @api
    click() {
        this.template.querySelector('lightning-button').click();
    }

    @api
    focus() {
        this.template.querySelector('lightning-button').focus();
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: this.type,
            attributes: this.attributesConfig,
            state: this.stateConfig
        });
    }
}

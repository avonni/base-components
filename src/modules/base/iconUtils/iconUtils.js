

import { getPathPrefix, getToken } from 'lightning/configProvider';
import isIframeInEdge from './isIframeInEdge';
import { IconSVGCreator } from './iconSVGCreator';
export { fetchIconLibrary, hasIconLibrary, getIconLibrary } from './fetch';

const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
const underscoreRe = /_/g;

let pathPrefix;

const tokenNameMap = Object.assign(Object.create(null), {
    action: 'lightning.actionSprite',
    custom: 'lightning.customSprite',
    doctype: 'lightning.doctypeSprite',
    standard: 'lightning.standardSprite',
    utility: 'lightning.utilitySprite'
});

const tokenNameMapRtl = Object.assign(Object.create(null), {
    action: 'lightning.actionSpriteRtl',
    custom: 'lightning.customSpriteRtl',
    doctype: 'lightning.doctypeSpriteRtl',
    standard: 'lightning.standardSpriteRtl',
    utility: 'lightning.utilitySpriteRtl'
});

const defaultTokenValueMap = Object.assign(Object.create(null), {
    'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
    'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
    'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
    'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
    'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
    'lightning.doctypeSpriteRtl':
        '/assets/icons/doctype-sprite/svg/symbols.svg',
    'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
    'lightning.standardSpriteRtl':
        '/assets/icons/standard-sprite/svg/symbols.svg',
    'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
    'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
});

const getDefaultBaseIconPath = (category, nameMap) =>
    defaultTokenValueMap[nameMap[category]];

const getBaseIconPath = (category, direction) => {
    const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
    return (
        getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap)
    );
};

const getMatchAtIndex = (index) => (iconName) => {
    const result = validNameRe.exec(iconName);
    return result ? result[index] : '';
};

const getCategory = getMatchAtIndex(1);
const getName = getMatchAtIndex(2);
export { getCategory, getName };

export const isValidName = (iconName) => validNameRe.test(iconName);

export const getIconPath = (iconName, direction = 'ltr') => {
    pathPrefix = pathPrefix !== undefined ? pathPrefix : getPathPrefix();

    if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);
        if (baseIconPath) {
            if (isIframeInEdge) {
                const origin = `${window.location.protocol}//${window.location.host}`;
                return `${origin}${pathPrefix}${baseIconPath}#${getName(
                    iconName
                )}`;
            }
            return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
    }
    return '';
};

export const computeSldsClass = (iconName) => {
    if (isValidName(iconName)) {
        const category = getCategory(iconName);
        const name = getName(iconName).replace(underscoreRe, '-');
        return `slds-icon-${category}-${name}`;
    }
    return '';
};

export { polyfill } from './polyfill';

let iconCreator;

// SALESFORCE ?
// export const createSVGIcon = (iconInformation, foreignObjectForIcon, resetMethodOfView) => {
//     if(!iconCreator){
//         iconCreator = new IconSVGCreator(resetMethodOfView);
//     }

//     iconInformation.xLinkHref = getIconPath(`${iconInformation.category}:${iconInformation.iconName}`);
//     return iconCreator.createIconFromDefaultPath(foreignObjectForIcon, iconInformation);
// }

/**
 * Create specific svg icon to append in a foreign object.
 * @param {object} iconInformation Information to create specific icon. Valid keys include iconName, category and categoryIconClass.
 * @param {object} foreignObjectForIcon Foreign object that will contain icon's svg.
 * @param resetMethodOfView this method will be called if no path are available and the icon needs to be created from template. Since there is a delay,
 * it will allow to refresh the icons when the libraries are ready.
 * @returns {object} icon's svg created
 */
export const createSVGIcon = (
    iconInformation,
    foreignObjectForIcon,
    resetMethodOfView
) => {
    if (!iconCreator) {
        iconCreator = new IconSVGCreator(resetMethodOfView);
    }

    let iconSVG;
    if (!iconCreator.isIconPathAvailable) {
        iconSVG = iconCreator.createIconFromTemplate(
            foreignObjectForIcon,
            iconInformation
        );
    } else {
        iconInformation.xLinkHref = iconCreator.getIconXLinkHref(
            iconInformation.category,
            iconInformation.iconName
        );
        iconSVG = iconCreator.createIconFromDefaultPath(
            foreignObjectForIcon,
            iconInformation
        );
    }

    return iconSVG;
};

export const isActionIconType = (iconName) => {
    return typeof iconName === 'string' && iconName.startsWith('action');
};

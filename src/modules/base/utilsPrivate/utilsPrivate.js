export { hasAnimation } from './animation';
export { EventEmitter } from './eventEmitter';
export { toNorthAmericanPhoneNumber } from './phonify';
export * from './linkUtils';
export { arraysEqual, ArraySlice, equal, objectsEqual } from './utility';
export { classListMutation } from './classListMutation';
export {
    camelCase,
    capitalize,
    kebabCase,
    lowerCase,
    startCase,
    upperCase,
    upperFirst
} from './fontCase';
export {
    keyCodes,
    runActionOnBufferedTypedCharacters,
    normalizeKeyValue,
    isShiftMetaOrControlKey
} from './keyboard';
export { getListHeight } from './listHeight';
export { raf } from './scroll';
export { isChrome, isIE11, isSafari } from './browser';
export { observePosition } from './observers';
import { smartSetAttribute } from './smartSetAttribute';
export { isCSR } from './ssr';

export function synchronizeAttrs(element, values) {
    if (!element) {
        return;
    }
    const attributes = Object.keys(values);
    attributes.forEach((attribute) => {
        smartSetAttribute(element, attribute, values[attribute]);
    });
}

export function getRealDOMId(el) {
    if (el && typeof el === 'string') {
        return el;
    } else if (el) {
        return el.getAttribute('id');
    }
    return null;
}

const URL_CHECK_REGEX = /^(\/+|\.+|ftp|http(s?):\/\/)/i;

export function isAbsoluteUrl(url) {
    return URL_CHECK_REGEX.test(url);
}

export function getShadowActiveElement() {
    let activeElement = document.activeElement;
    while (activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
}

export function getShadowActiveElements() {
    let activeElement = document.activeElement;
    const shadowActiveElements = [];
    while (
        activeElement &&
        activeElement.shadowRoot &&
        activeElement.shadowRoot.activeElement
    ) {
        shadowActiveElements.push(activeElement);
        activeElement = activeElement.shadowRoot.activeElement;
    }
    if (activeElement) {
        shadowActiveElements.push(activeElement);
    }
    return shadowActiveElements;
}

export function isRTL() {
    return document.dir === 'rtl';
}

export function isUndefinedOrNull(value) {
    return value === null || value === undefined;
}

export function isNotUndefinedOrNull(value) {
    return !isUndefinedOrNull(value);
}

const DEFAULT_ZINDEX_BASELINE = 9000;

export function getZIndexBaseline() {
    const value = (
        window.getComputedStyle(document.documentElement) ||
        document.documentElement.style
    ).getPropertyValue('--lwc-zIndexModal');

    const base = parseInt(value, 10);

    return isNaN(base) ? DEFAULT_ZINDEX_BASELINE : base;
}

export function timeout(interval) {
    return new Promise((resolve) => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(resolve, interval);
    });
}

export function animationFrame() {
    return new Promise((resolve) => {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        window.requestAnimationFrame(resolve);
    });
}

export const BUTTON_GROUP_ORDER = {
    FIRST: 'first',
    MIDDLE: 'middle',
    LAST: 'last',
    ONLY: 'only'
};

/**
 * returns the SLDS class for the given group order
 * @param groupOrder
 * @returns {string}
 */
export function buttonGroupOrderClass(groupOrder) {
    return {
        [BUTTON_GROUP_ORDER.FIRST]: 'slds-button_first',
        [BUTTON_GROUP_ORDER.MIDDLE]: 'slds-button_middle',
        [BUTTON_GROUP_ORDER.LAST]: 'slds-button_last',
        [BUTTON_GROUP_ORDER.ONLY]: 'single-button'
    }[groupOrder];
}

/**
 * Checks if the given component is native
 * @param {Object} cmp Component instance
 * @returns {Boolean} Whether the component is native
 */
export function isNativeComponent(cmp) {
    if (cmp && cmp.template && cmp.template.constructor) {
        return !!String(cmp.template.constructor).match(/\[native code\]/);
    }
    return false;
}

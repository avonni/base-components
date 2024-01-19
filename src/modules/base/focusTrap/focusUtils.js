const BUBBLE_PREFIX = `salesforce-lightning-tooltip-bubble`;
const IGNORE_AUTOFOCUS = 'ignore-autofocus';

/**
 *
 * Returns all tabbable elements within a containing element. Tabbable elements are:
 * a visible/non-disabled element that has a tabIndex of 0 and is not within a custom
 * element with tabindex attribute of “-1" on it.
 *
 * @param {Element} container The element to search for tabbable element.
 * @returns {Array} Tabbable elements.
 */
export function findAllTabbableElements(container) {
    const result = [];

    traverseActiveTreeRecursively(container, (element) => {
        // Remove the try/catch once https://github.com/salesforce/lwc/issues/1421 is fixed
        try {
            if (
                isTabbable({ element, rootContainer: container }) ||
                (element.hasAttribute('data-is-focusable') && !element.disabled)
            ) {
                result.push(element);
            }
        } catch (e) {
            console.warn(e);
        }
    });

    return result;
}

const FOCUSABLE_NODES = /^input$|^select$|^textarea$|^a$|^button$/;

/**
 * Returns all focusable nodes within a containing element. Focusable nodes are
 * those which have a focus() method specified in the object definition spec:
 * https://www.w3.org/TR/DOM-Level-2-HTML/html.html
 *
 * Exception: button - Browsers today allow setting focus programmatically
 * on button elements + autofocus attribute present on HTMLButtonElement
 *
 * @param {Element} container The element to search for focusable nodes.
 * @returns {Array} Focusable elements.
 */
export function findAllFocusableNodes(container) {
    const result = [];

    traverseActiveTreeRecursively(container, (element) => {
        if (FOCUSABLE_NODES.test(element.tagName.toLowerCase())) {
            result.push(element);
        }
    });

    return result;
}

/**
 * Finds the element that currently has focus, even when the element is part of a shadow root or iframe.
 *
 * @returns {Element} Element that has focus.
 */
export function getElementWithFocus() {
    let currentFocusedElement = document.activeElement;

    while (currentFocusedElement) {
        if (currentFocusedElement.shadowRoot) {
            let nextFocusedElement =
                currentFocusedElement.shadowRoot.activeElement;
            if (nextFocusedElement) {
                currentFocusedElement = nextFocusedElement;
            } else {
                return currentFocusedElement;
            }
        } else if (currentFocusedElement.contentDocument) {
            let nextFocusedElement =
                currentFocusedElement.contentDocument.activeElement;
            if (nextFocusedElement) {
                currentFocusedElement = nextFocusedElement;
            } else {
                return currentFocusedElement;
            }
        } else {
            return currentFocusedElement;
        }
    }

    return undefined;
}

/**
 * Recursively traverse an active tree and run callback on each non-inert node element.
 *
 * @param {Node} node The starting node to recursively traverse.
 * @param {Function} callback Function to call on each node element.
 */
function traverseActiveTreeRecursively(node, callback) {
    if (!node) {
        return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        // inert is only supported by Chrome for now (behind a flag)
        if (node.hasAttribute('inert')) {
            return;
        }
        if (isIframe(node)) {
            if (isIframeOfSameOrigin(node)) {
                // for a same-origin iframe, we don't want to include the
                // iframe itself in the list, since we can see any of the
                // frames focusable children. So, skip calling callback on
                // the iframe node, and proceed to traverse it's children.
                traverseActiveTreeRecursively(node.contentDocument, callback);
            } else {
                // a non same-origin iframe is totally opaque, so include the
                // iframe in the results, but do no try to traverse into the
                // iframes children
                if (callback) {
                    callback(node);
                }
            }
            return;
        }
        if (callback) {
            callback(node);
        }
        // If the element has a shadow root, traverse that
        if (node.shadowRoot) {
            traverseActiveTreeRecursively(node.shadowRoot, callback);
            return;
        }
        // if it's a slot element, get all assigned nodes and traverse them
        if (node.localName === 'slot') {
            const slottedNodes = node.assignedNodes({ flatten: true });
            for (let i = 0; i < slottedNodes.length; i++) {
                traverseActiveTreeRecursively(slottedNodes[i], callback);
            }
            return;
        }
    }

    let child = node.firstChild;
    while (child !== null) {
        traverseActiveTreeRecursively(child, callback);
        child = child.nextSibling;
    }
}

// returns true if iframe is same origin, and therefore, can focus its internal elements
function isIframe(node) {
    return node.tagName === 'IFRAME' || node instanceof HTMLIFrameElement;
}

function isIframeOfSameOrigin(iframe) {
    // if we can access contentDocument (is not null) on the iframe, then it is of same origin
    return !!iframe.contentDocument;
}

const ELEMENTS_WITH_DISABLED_ATTRIBUTE = [
    'button',
    'select',
    'textarea',
    'input'
];

// https://html.spec.whatwg.org/multipage/interaction.html#dom-tabindex
const ELEMENTS_WITH_TABINDEX_ZERO_BY_DEFAULT = [
    'a',
    'select',
    'textarea',
    'input',
    'button',
    'iframe',
    'object',
    'area',
    'frame'
];

function isTabbable({ element, rootContainer }) {
    const elementLocalName = element.localName;

    if (elementLocalName === 'input' && elementLocalName.type === 'hidden') {
        return false;
    }

    const tabIndexAttribute = element?.getAttribute('tabindex');
    if (tabIndexAttribute === '-1') {
        return false;
    }

    if (
        element.disabled &&
        ELEMENTS_WITH_DISABLED_ATTRIBUTE.includes(element.localName)
    ) {
        return false;
    }

    // Either the attribute was set directly to '0' or it's an element that has tabIndex zero by default
    const hasTabIndexZero =
        tabIndexAttribute === '0' ||
        (element.tabIndex === 0 &&
            ELEMENTS_WITH_TABINDEX_ZERO_BY_DEFAULT.includes(element.localName));

    return (
        hasTabIndexZero &&
        isElementVisible(element) &&
        isParentCustomElementTabbable({ element, rootContainer })
    );
}

/**
 * Test if element has role='tooltip'
 * @param {Element} Element that has focus.
 * @returns {boolean} element has role='tooltip'
 */
const elemHasRoleTooltip = (elem) => {
    return elem?.getAttribute('role') === 'tooltip';
};

/**
 * Test if the element has class='ignore-autofocus'
 * @param {Element} Element that has focus.
 * @returns {boolean} element has class='ignore-autofocus'
 */
const elemHasIgnoreAutofocus = (elem) => {
    return elem.classList.contains(IGNORE_AUTOFOCUS);
};

/**
 * Test if element has unique properties of <lightning-helptext>
 * @param {Element} Element that needs to be tested
 * @returns {boolean} element matches criteria of <lightning-helptext>
 */
const elemIsHelpTextComponent = (elem) => {
    // properties of <lightning-helptext>
    const tagNameIsButton = elem.tagName.toLowerCase() === 'button';
    const ariaDescValue = elem?.getAttribute('aria-describedby');
    // ie11 doesn't support .startsWith()
    const ariaValueMatchesPrefix = ariaDescValue
        ? String(ariaDescValue).indexOf(BUBBLE_PREFIX) === 0
        : false;
    return tagNameIsButton && ariaValueMatchesPrefix;
};

/**
 * Verify element doesn't have tooltip properties by running tooltip tests
 * Primary use in autofocus feature of LighningModal
 * @param {Element} Element to verify is not a tooltip
 * @returns {boolean} element is not a tooltip
 */
const elemIsNotTooltip = (elem) => {
    if (!elem) {
        return false;
    }
    // evaluate whether element has properties of a tooltip
    // if any tooltip test is true, the element is a tooltip
    const elemIsTooltip = [
        // array of tooltip tests
        elemHasRoleTooltip(elem),
        elemIsHelpTextComponent(elem),
        elemHasIgnoreAutofocus(elem)
    ].some((val) => val === true);
    return !elemIsTooltip;
};

/**
 *
 * Returns tabbable elements, filtered to remove any tooltips
 * @param {Array} elemsArray Array of elements to filter tooltips from
 * @returns {Array} Filtered tabbable elements with no tooltips
 */
export function filterTooltips(elemsArray) {
    // reference SLDS tooltip patterns && global focus in
    // modalBase focusFirstElement() -> used to autofocus first element
    // https://www.lightningdesignsystem.com/accessibility/patterns/tooltip/
    return elemsArray && Array.isArray(elemsArray) && elemsArray.length > 0
        ? elemsArray.filter(elemIsNotTooltip)
        : [];
}

function isElementVisible(element) {
    const { width, height } = element.getBoundingClientRect();
    const nonZeroSize = width > 0 || height > 0;
    return nonZeroSize && getComputedStyle(element).visibility !== 'hidden';
}

function isParentCustomElementTabbable({ element, rootContainer }) {
    const parentRoot = rootContainer.getRootNode();
    const ownerDocument = element.ownerDocument;
    let root = element.getRootNode();
    while (root && root !== parentRoot && root !== ownerDocument) {
        const host = root.host;
        if (host?.getAttribute('tabindex') === '-1') {
            return false;
        }
        root = host && host.getRootNode();
    }
    return true;
}

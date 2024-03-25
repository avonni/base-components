// Goal: Move all this to a utility

/**
 * Added on click.
 */
export const CLICK_CLASS = 'slds-kx-is-animating-from-click';

/**
 * Kinetics Types.
 */
export const KineticsType = {
    Underline: 'underline',
    Ripple: 'ripple'
};

/**
 * Map variants to the Kinetics attributes.
 */
const variantKinectAttributes = {
    bare: {
        'kx-scope': 'button',
        'kx-type': KineticsType.Ripple
    },
    'bare-inverse': {
        'kx-scope': 'button',
        'kx-type': KineticsType.Ripple
    },
    base: {
        'kx-scope': 'button',
        'kx-type': KineticsType.Underline
    },
    border: {
        'kx-scope': 'button-neutral',
        'kx-type': KineticsType.Ripple
    },
    'border-filled': {
        'kx-scope': 'button-filled',
        'kx-type': KineticsType.Ripple
    },
    'border-inverse': {
        'kx-scope': 'button-neutral',
        'kx-type': KineticsType.Ripple
    },
    brand: {
        'kx-scope': 'button-brand',
        'kx-type': KineticsType.Ripple
    },
    'brand-outline': {
        'kx-scope': 'button-outline',
        'kx-type': KineticsType.Ripple
    },
    container: {
        'kx-scope': 'button-filled',
        'kx-type': KineticsType.Ripple
    },
    destructive: {
        'kx-scope': 'button-filled',
        'kx-type': KineticsType.Ripple
    },
    'destructive-text': {
        'kx-scope': 'button-outline',
        'kx-type': KineticsType.Ripple
    },
    inverse: {
        'kx-scope': 'button-outline',
        'kx-type': KineticsType.Ripple
    },
    neutral: {
        'kx-scope': 'button-neutral',
        'kx-type': KineticsType.Ripple
    },
    success: {
        'kx-scope': 'button-filled',
        'kx-type': KineticsType.Ripple
    }
};

/**
 * Retrieve a list of attributes by the variant.
 *
 * @param {string} variant
 */
export function getKineticsAttributes(variant) {
    if (!variant) {
        console.warn('getKineticsAttributes: variant is required');
        return [];
    }
    const attributes = [];
    const map = variantKinectAttributes[variant];
    Object.keys(map).forEach((attribute) => {
        attributes.push({ name: attribute, value: map[attribute] });
    });
    return attributes;
}

const previousTimeRef = {};
const requestRef = {};
const previousPointerRef = {};
const pointerRef = {};

/**
 * Get component name from kx-scope.
 *
 * @param {HtmlElement} element Element
 */
export function getComponentName(element) {
    const kxScope = element.getAttribute('kx-scope');
    const match = kxScope ? kxScope.match(/^(\w+)/) : null;
    return match ? match[1] : '';
}

/**
 * Set x, y CSS Mouse mouse position.
 *
 * @param {HtmlElement} element Element
 */
export function setCssVariables(element) {
    if (
        !pointerRef ||
        !pointerRef.current ||
        pointerRef.current === previousPointerRef.current
    ) {
        return;
    }
    const { offsetX, offsetY } = pointerRef.current;
    const component = getComponentName(element);
    element.style.setProperty(
        `--slds-kx-${component}-pointer-position-x`,
        `${offsetX}px`
    );
    const kxType = element.getAttribute('kx-type');
    if (kxType !== KineticsType.Underline) {
        element.style.setProperty(
            `--slds-kx-${component}-pointer-position-y`,
            `${offsetY}px`
        );
    }
}

/**
 * Cleanup CSS Variables.
 *
 * @param {HtmlElement} element Element
 */
export function removeCssVariables(element) {
    if (!element) {
        return;
    }
    const component = getComponentName(element);
    element.style.removeProperty(`--slds-kx-${component}-pointer-position-x`);
    element.style.removeProperty(`--slds-kx-${component}-pointer-position-y`);
}

export function handleMouseMove(event) {
    if (!event) {
        return;
    }
    const { offsetX, offsetY } = event;
    pointerRef.current = { offsetX, offsetY };
}

function handleMouseEnter(event) {
    const { target } = event;
    enterAnimate(target);
}

/**
 * Attach animation logic.
 *
 * @param {HtmlElement} element Element
 */
export function animate(element) {
    if (!element) return;
    element.addEventListener('mouseenter', handleMouseEnter);
}

function enterAnimate(element, timestamp) {
    const kxType = element.getAttribute('kx-type');
    function handleClick() {
        clickAnimate(element);
    }
    function handleMouseLeave() {
        window.cancelAnimationFrame(requestRef.current);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('click', handleClick);
        element.removeEventListener('mouseleave', handleMouseLeave);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            removeCssVariables(element);
        }, 250);
    }
    if (!timestamp) {
        if (kxType !== KineticsType.Underline) {
            element.addEventListener('click', handleClick);
        }
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
    }
    if (previousTimeRef.current !== undefined) {
        setCssVariables(element);
        previousPointerRef.current = pointerRef.current;
    }
    previousTimeRef.current = timestamp;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    requestRef.current = window.requestAnimationFrame((timestamp2) => {
        enterAnimate(element, timestamp2);
    });
}

let cacheHandleAnimationEnd;

function getSingletonHandleAnimationEnd(element) {
    if (cacheHandleAnimationEnd) {
        return cacheHandleAnimationEnd;
    }
    cacheHandleAnimationEnd = function () {
        element.classList.remove(CLICK_CLASS);
        element.removeEventListener('animationend', cacheHandleAnimationEnd);
    };
    return cacheHandleAnimationEnd;
}

function clickAnimate(element) {
    const handleAnimationEnd = getSingletonHandleAnimationEnd(element);
    element.removeEventListener('animationend', handleAnimationEnd);
    element.classList.remove(CLICK_CLASS);
    // Restart a css animation allowing another animationend event.
    // Why? Rapidly clicking the button for a smooth ripple.
    // eslint-disable-next-line no-void
    void element.offsetWidth;
    element.addEventListener('animationend', handleAnimationEnd);
    element.classList.add(CLICK_CLASS);
}

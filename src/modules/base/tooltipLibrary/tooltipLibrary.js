import { createElement } from 'lwc';
import { AutoPosition, Direction } from 'c/positionLibrary';
import {
    assert,
    guid,
    normalizeAriaAttribute,
    normalizeString,
} from 'c/utilsPrivate';
import PrimitiveBubble from 'c/primitiveBubble';

export { Direction } from 'c/positionLibrary';

const BUBBLE_ID = `salesforce-lightning-tooltip-bubble_${guid()}`;

function isResizeObserverSupported() {
    return window.ResizeObserver != null;
}

function buildResizeObserver(callback) {
    if (isResizeObserverSupported()) {
        return new ResizeObserver(callback);
    }
    return {
        observe() {},

        unobserve() {},
    };
}
/**
 * Shared instance of a primitive bubble used as a tooltip by most components. This was originally
 * defined in the helptext component which is where the minWidth style came from.
 * TODO: We may want to revisit the minWidth style with the PO and/or UX.
 */
let CACHED_BUBBLE_ELEMENT;

function getCachedBubbleElement() {
    if (!CACHED_BUBBLE_ELEMENT) {
        CACHED_BUBBLE_ELEMENT = createElement('lightning-primitive-bubble', {
            is: PrimitiveBubble,
        });
        CACHED_BUBBLE_ELEMENT.contentId = BUBBLE_ID;
        CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
        CACHED_BUBBLE_ELEMENT.style.minWidth = '75px';
        // hide bubble element on create
        CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
        CACHED_BUBBLE_ELEMENT.addEventListener('transitionend', () => {
            // W-7201022 https://gus.lightning.force.com/lightning/r/ADM_Work__c/a07B00000079kNjIAI/view
            // The tooltip uses absolute positioning and visibility gets set to hidden to
            // hide it from view which means it's still part of the document layout.
            // If we don't hide the bubble it could stay on the page and accidentally scroll pages
            // in the console app after a tab switch, especially when the tab content lengths differ.
            if (!CACHED_BUBBLE_ELEMENT.visible) {
                CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
            }
        });
    }

    return CACHED_BUBBLE_ELEMENT;
}

const ARIA_DESCRIBEDBY = 'aria-describedby';

/**
 * Used as a position offset to compensate for the nubbin. The dimensions of the nubbin are not
 * included in the position library bounding box calculations. This is the size in pixels of the
 * nubbin.
 * TODO: We may want to measure this instead in cases it changes.
 */
const NUBBIN_SIZE = 16;

/**
 * Used in the calculation that moves the tooltip to a location that places the nubbin at the
 * center of the target element. This is the nubbin offset from the edge of the bubble in pixels
 * when using slds-nubbin_bottom-left or slds-nubbin_bottom-right.
 * TODO: We may want to measure this instead in case it changes.
 */
const NUBBIN_OFFSET = 24;

/**
 * Known tooltip types:
 * - info: used in cases where target already has click handlers such as button-icon
 * - toggle: used in cases where target only shows a tooltip such as helptext
 */
export const TooltipType = {
    Info: 'info',
    Toggle: 'toggle',
};

/**
 * Allows us to attach a tooltip to components. Typical usage is as follows:
 * - Create an instance of Tooltip
 * - Call Tooltip.initialize() to add the appropriate listeners to the element that needs a tooltip
 * See buttonIcon and buttonMenu for example usage.
 */
export class Tooltip {
    _autoPosition = null;
    _disabled = true;
    _initialized = false;
    _visible = false;

    _config = {};

    /**
     * A shared instance of primitiveBubble is used when an element is not specified in the config
     * object.
     * @param {string} value the content of the tooltip
     * @param {object} config specifies the root component, target element of the tooltip
     */
    constructor(value, config) {
        assert(config.target, 'target for tooltip is undefined or missing');

        this.value = value;

        this._root = config.root;
        this._target = config.target;

        this._config = { ...config };
        this._config.align = config.align || {};
        this._config.targetAlign = config.targetAlign || {};

        this._type = normalizeString(config.type, {
            fallbackValue: TooltipType.Info,
            validValues: Object.values(TooltipType),
        });

        // If a tooltip element is not given, fall back on the globally shared instance.
        this._element = config.element;
        if (!this._element) {
            this._element = getCachedBubbleElement;
            const bubbleElement = getCachedBubbleElement();
            if (bubbleElement.parentNode === null) {
                document.body.appendChild(bubbleElement);
            }
        }
        this.handleDocumentTouch = this.handleDocumentTouch.bind(this);
    }

    /**
     * Disables the tooltip.
     */
    detach() {
        this._disabled = true;
    }

    /**
     * Enables the tooltip.
     */
    attach() {
        this._disabled = false;
    }

    /**
     * Adds the appropriate event listeners to the target element to make the tooltip appear. Also
     * links the tooltip and target element via the aria-describedby attribute for screen readers.
     */
    initialize() {
        const target = this._target();
        if (!this._initialized && target) {
            switch (this._type) {
                case TooltipType.Toggle:
                    this.addToggleListeners();
                    break;
                case TooltipType.Info:
                default:
                    this.addInfoListeners();
                    break;
            }
            const ariaDescribedBy = normalizeAriaAttribute([
                target.getAttribute(ARIA_DESCRIBEDBY),
                this._element().contentId,
            ]);
            target.setAttribute(ARIA_DESCRIBEDBY, ariaDescribedBy);

            this._initialized = true;
        }
    }

    addInfoListeners() {
        const target = this._target();
        if (!this._initialized && target) {
            ['mouseenter', 'focus'].forEach((name) =>
                target.addEventListener(name, () => this.show())
            );
            // Unlike the tooltip in Aura, we want clicks and keys to dismiss the tooltip.
            ['mouseleave', 'blur', 'click', 'keydown'].forEach((name) =>
                target.addEventListener(name, (event) =>
                    this.hideIfNotSelfCover(event)
                )
            );
        }
    }

    hideIfNotSelfCover(event) {
        if (event.type === 'mouseleave' && event.clientX && event.clientY) {
            // In any chance, if mouseleave is caused by tooltip itself, it would means
            // tooltip cover the target which mostly caused by dynamic resize of tooltip by CSS or JS.
            try {
                const elementMouseIsOver = document.elementFromPoint
                    ? document.elementFromPoint(event.clientX, event.clientY)
                    : null;
                if (elementMouseIsOver === this._element()) {
                    if (!isResizeObserverSupported()) {
                        this.startPositioning();
                    }
                    return;
                }
            } catch (ex) {
                // Jest Throw Exception
            }
        }
        this.hide();
    }

    handleDocumentTouch() {
        if (this._visible) {
            this.hide();
        }
    }

    addToggleListeners() {
        const target = this._target();
        if (!this._initialized && target) {
            target.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            ['mouseenter', 'focus'].forEach((name) =>
                target.addEventListener(name, () => this.show())
            );
            ['mouseleave', 'blur'].forEach((name) =>
                target.addEventListener(name, (event) =>
                    this.hideIfNotSelfCover(event)
                )
            );
        }
    }

    get resizeObserver() {
        if (!this._resizeObserver) {
            this._resizeObserver = buildResizeObserver(() => {
                if (this._visible && this._autoPosition) {
                    this.startPositioning();
                }
            });
        }
        return this._resizeObserver;
    }

    show() {
        if (this._disabled) {
            return;
        }

        this._visible = true;
        const tooltip = this._element();

        /* We only change the visibility of the cached bubble element here,
           for custom bubble elements, we expect them to react to `visible`
           property change */
        if (CACHED_BUBBLE_ELEMENT) {
            // Show cached bubble element
            CACHED_BUBBLE_ELEMENT.classList.remove('slds-hide');
        }

        tooltip.content = this._value;

        this.startPositioning();

        document.addEventListener('touchstart', this.handleDocumentTouch);

        this.resizeObserver.observe(tooltip);
    }

    hide() {
        this._visible = false;
        const tooltip = this._element();
        tooltip.visible = this._visible;

        this.stopPositioning();

        document.removeEventListener('touchstart', this.handleDocumentTouch);

        this.resizeObserver.unobserve(tooltip);
    }

    toggle() {
        if (this._visible) {
            this.hide();
        } else {
            this.show();
        }
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this._disabled = !value;
    }

    get initialized() {
        return this._initialized;
    }

    get visible() {
        return this._visible;
    }

    startPositioning() {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this._root);
        }

        // The lightning-helptext component was originally left aligned.
        const align = {
            horizontal: this._config.align.horizontal || Direction.Left,
            vertical: this._config.align.vertical || Direction.Bottom,
        };
        const targetAlign = {
            horizontal: this._config.targetAlign.horizontal || Direction.Left,
            vertical: this._config.targetAlign.vertical || Direction.Top,
        };

        // Pads the tooltip so its nubbin is at the center of the target element.
        const targetBox = this._target().getBoundingClientRect();
        const padLeft = targetBox.width * 0.5 - NUBBIN_OFFSET;

        this._autoPosition
            .start({
                target: this._target,
                element: this._element,
                align,
                targetAlign,
                autoFlip: true,
                padTop: NUBBIN_SIZE,
                padLeft,
            })
            .then((autoPositionUpdater) => {
                // The calculation above may have flipped the alignment of the tooltip. When the
                // tooltip changes alignment we need to update the nubbin class to have it draw in
                // the appropriate place.
                if (autoPositionUpdater) {
                    const tooltip = this._element();
                    tooltip.align = autoPositionUpdater.config.align;
                    tooltip.visible = this._visible;
                }
            });
    }

    stopPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }
}

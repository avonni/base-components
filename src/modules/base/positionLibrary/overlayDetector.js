import { isShadowRoot } from './util';

export const OVERLAY_TYPE = {
    NONE: 'none',
    MODAL: 'uiModal',
    DIALOG: 'lightning-dialog',
    POPOVER: 'lightning-popover',
    PANEL: 'uiPanel',
};

export function isOverlay(element) {
    const isDialog = element.localName === OVERLAY_TYPE.DIALOG;
    if (isDialog) {
        return OVERLAY_TYPE.DIALOG;
    }

    const isPopover = element.localName === OVERLAY_TYPE.POPOVER;
    if (isPopover) {
        return OVERLAY_TYPE.POPOVER;
    }

    const isModal =
        element.classList && element.classList.contains(OVERLAY_TYPE.MODAL);
    if (isModal) {
        return OVERLAY_TYPE.MODAL;
    }

    const isPanel =
        element.classList && element.classList.contains(OVERLAY_TYPE.PANEL);
    if (isPanel) {
        return OVERLAY_TYPE.PANEL;
    }
    return OVERLAY_TYPE.NONE;
}

function isInsideOverlay(element) {
    if (!element) {
        return {
            isInside: false,
            type: null,
            overlay: null,
        };
    }

    const type = isOverlay(element);

    if (type !== OVERLAY_TYPE.NONE) {
        return {
            isInside: true,
            type,
            overlay: element,
        };
    }

    if (!element.parentNode) {
        return {
            isInside: false,
            type: null,
            overlay: null,
        };
    }

    return isInsideOverlay(
        isShadowRoot(element.parentNode)
            ? element.parentNode.host
            : element.parentNode
    );
}

export class OverlayDetector {
    constructor(element) {
        this._element = element;
        this._detection = isInsideOverlay(this._element) || {
            isInside: false,
            overlay: null,
        };
    }

    get isInsideModal() {
        return (
            this.isInside &&
            (this._detection.type === OVERLAY_TYPE.MODAL ||
                this._detection.type === OVERLAY_TYPE.DIALOG)
        );
    }

    get isInside() {
        return this._detection.isInside;
    }

    get overlay() {
        return this._detection.overlay;
    }
}

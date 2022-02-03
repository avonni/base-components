import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { keyCodes, normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

const i18n = {
    collapseBranch: 'Collapse Branch',
    expandBranch: 'Expand Branch'
};

const POPOVER_FOOTER_HEIGHT = 55;

export default class PrimitiveTreeItem extends LightningElement {
    @api isLeaf;
    @api loadingStateAlternativeText;
    @api nodeRef;
    @api nodeKey;

    _actions = [];
    _level;
    _childItems = [];
    _focusedChild = null;
    _href;
    _isDisabled = false;
    _isExpanded = false;
    _isLoading = false;
    _label;
    _metatext;
    _nodename;
    _sortable = false;

    buttonActions = [];
    menuActions = [];
    draftValues;
    hasError = false;
    popoverVisible = false;
    _focusOnFirstPopoverElement = false;
    _menuIsOpen = false;

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('privateregisteritem', {
                composed: true,
                bubbles: true,
                detail: {
                    bounds: this.getBounds,
                    focus: this.handleChildFocus,
                    removeBorder: this.removeBorder,
                    setBorder: this.setBorder,
                    unfocus: this.handleChildUnfocus,
                    key: this.nodeKey
                }
            })
        );

        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('mousedown', this.handleMouseDown);
        this.updateLevel();
    }

    renderedCallback() {
        if (typeof this.focusedChild === 'number') {
            const child = this.getNthChildItem(this.focusedChild + 1);
            if (child) {
                child.tabIndex = '0';
            }
        }

        if (this._focusOnFirstPopoverElement) {
            const closeButton = this.template.querySelector(
                '[data-element-id="lightning-button-icon-close"]'
            );
            if (closeButton) closeButton.focus();
            this._focusOnFirstPopoverElement = false;
        }

        if (this.popoverVisible) this.positionPopover();
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this.handleKeydown);
        this.removeEventListener('mousedown', this.handleMouseDown);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
        this.splitActions();
    }

    @api
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        this.updateLevel();
    }

    @api
    get childItems() {
        return this._childItems;
    }
    set childItems(value) {
        this._childItems = normalizeArray(value);
    }

    @api
    get focusedChild() {
        return this._focusedChild;
    }
    set focusedChild(value) {
        this._focusedChild = value;
    }

    @api
    get href() {
        return this._href;
    }
    set href(value) {
        this._href = value;
    }

    @api
    get isDisabled() {
        return this._isDisabled;
    }
    set isDisabled(value) {
        this._isDisabled = normalizeBoolean(value);
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(value) {
        this._isExpanded = normalizeBoolean(value);
    }

    @api
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }

    @api
    get metatext() {
        return this._metatext;
    }
    set metatext(value) {
        this._metatext = value;
    }

    @api
    get nodename() {
        return this._nodename;
    }
    set nodename(value) {
        this._nodename = value;
    }

    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get buttonLabel() {
        if (this.nodeRef && this.nodeRef.expanded) {
            return i18n.collapseBranch;
        }
        return i18n.expandBranch;
    }

    get computedButtonClass() {
        return classSet(
            'slds-m-right_x-small slds-p-vertical_xx-small avonni-primitive-tree-item__chevron'
        )
            .add({
                'slds-hidden': this.isLeaf || this.isDisabled,
                'avonni-primitive-tree-item__chevron_expanded': this.isExpanded,
                'slds-p-top_xx-small': this.metatext
            })
            .toString();
    }

    get computedIconName() {
        return document.dir === 'rtl'
            ? 'utility:chevronleft'
            : 'utility:chevronright';
    }

    get computedLabelClass() {
        return classSet('slds-show slds-truncate')
            .add({
                'slds-p-vertical_xx-small': !this.actions.length
            })
            .toString();
    }

    get itemElement() {
        return this.template.querySelector('[data-element-id="div-item"]');
    }

    get showExpanded() {
        if (!this.nodeRef) return false;
        return !this.isDisabled && this.nodeRef.expanded;
    }

    get showLink() {
        return !this.isDisabled && this.href;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    getBounds = () => {
        if (this.itemElement) {
            return this.itemElement.getBoundingClientRect();
        }
        return {};
    };

    getImmediateChildItem(key) {
        return this.template.querySelector(
            `[data-element-id="avonni-primitive-tree-item"][data-key="${key}"]`
        );
    }

    getNthChildItem(n) {
        return this.template.querySelector(
            `[data-element-id="avonni-primitive-tree-item"]:nth-of-type(${n})`
        );
    }

    hideBranchButtons() {
        if (!this.popoverVisible && this.actions.length) {
            this.template.querySelector(
                '[data-element-id="div-branch-buttons"]'
            ).style.opacity = 0;

            // Close button menu
            if (this._menuIsOpen) {
                const menu = this.template.querySelector(
                    '[data-element-id="lightning-button-menu"]'
                );
                if (menu) menu.click();
            }
        }
    }

    positionPopover() {
        const popoverBody = this.template.querySelector(
            '[data-element-id="div-popover-body"]'
        );
        const topInWindow = popoverBody.getBoundingClientRect().top;
        const maxHeight =
            window.innerHeight - topInWindow - POPOVER_FOOTER_HEIGHT;
        popoverBody.style.maxHeight = `${maxHeight}px`;
    }

    preventDefaultAndStopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    removeBorder = () => {
        if (!this.itemElement) return;
        this.itemElement.classList.remove(
            'avonni-primitive-tree-item__item_border-top'
        );
        this.itemElement.classList.remove(
            'avonni-primitive-tree-item__item_border-bottom'
        );
        this.itemElement.classList.remove(
            'avonni-primitive-tree-item__item_border'
        );
        this.itemElement.style = '';
    };

    setBorder = (position, level) => {
        if (!this.itemElement) return;

        this.removeBorder();
        switch (position) {
            case 'top':
                this.itemElement.classList.add(
                    'avonni-primitive-tree-item__item_border-top'
                );
                break;
            case 'bottom':
                this.itemElement.classList.add(
                    'avonni-primitive-tree-item__item_border-bottom'
                );
                if (level) {
                    this.itemElement.style = `--avonni-tree-item-border-offset-left: ${level}rem;`;
                }
                break;
            default:
                this.itemElement.classList.add(
                    'avonni-primitive-tree-item__item_border'
                );
                break;
        }
    };

    showBranchButtons() {
        if (!this.popoverVisible && this.actions.length) {
            this.template.querySelector(
                '[data-element-id="div-branch-buttons"]'
            ).style.opacity = 1;
        }
    }

    splitActions() {
        const buttonActions = [];
        const menuActions = [];
        this._actions.forEach((action) => {
            if (action.alwaysVisible) {
                buttonActions.push(action);
            } else {
                menuActions.push(action);
            }
        });
        this.buttonActions = buttonActions;
        this.menuActions = menuActions;
    }

    togglePopoverVisibility = () => {
        if (this.popoverVisible) {
            this.draftValues = undefined;
        } else {
            this._focusOnFirstPopoverElement = true;
            this.draftValues = {
                label: this.label,
                nodename: this.nodename,
                href: this.href,
                metatext: this.metatext,
                isExpanded: this.isExpanded,
                isDisabled: this.isDisabled
            };
        }

        this.popoverVisible = !this.popoverVisible;
        this.hideBranchButtons();
    };

    updateLevel() {
        let style = this.template.host.style.cssText;
        style += `--avonni-tree-item-offset-left: ${this.level}rem;`;
        this.template.host.style.cssText = style;
    }

    validate(input) {
        if (input.value.length === 0) {
            input.setCustomValidity('Cannot be empty');
            input.reportValidity();
            this.hasError = true;
            return false;
        }
        input.setCustomValidity('');
        input.reportValidity();
        this.hasError = false;
        return true;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Callback so that the child it contains can be made focusable
     * @param {string} childKey - key of the item to receive focus
     * @param {boolean} shouldFocus - whether to focus the item immediately
     * @param {boolean} shouldSelect - whether visually focus the item immediately
     */
    handleChildFocus = (childKey, shouldFocus, shouldSelect) => {
        const child = this.getImmediateChildItem(childKey);
        if (child) {
            if (child.tabIndex !== '0') {
                child.tabIndex = '0';
            }
            if (shouldFocus) {
                child.focus();
            }
            if (shouldSelect) {
                child.ariaSelected = true;
            }
        }
    };

    /**
     * Callback to remove the tabindex attribute and make ariaSelected false
     */
    handleChildUnfocus = () => {
        this.ariaSelected = 'false';
        this.removeAttribute('tabindex');
    };

    handleClick(event) {
        if (!this.isDisabled) {
            let target = 'anchor';
            if (event.target.dataset.type === 'chevron') {
                target = 'chevron';
            } else if (event.target.tagName === 'LIGHTNING-INPUT') {
                target = 'input';
            } else if (event.target.tagName === 'LIGHTNING-BUTTON-MENU') {
                target = 'menu';
            } else if (event.target.tagName === 'LIGHTNING-BUTTON-ICON') {
                target = 'icon';
            }

            const customEvent = new CustomEvent('privateitemclick', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    name: this.nodename,
                    key: this.nodeKey,
                    target
                }
            });
            this.dispatchEvent(customEvent);
            if (customEvent.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    handleDisabledEdit(event) {
        event.stopPropagation();
        this.draftValues.disabled = event.detail.checked;
    }

    handleDone() {
        Object.entries(this.draftValues).forEach(([key, value]) => {
            this[`_${key}`] = value;
        });

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    values: {
                        disabled: this.isDisabled,
                        expanded: this.isExpanded,
                        href: this.href,
                        label: this.label,
                        metatext: this.metatext,
                        name: this.nodename
                    },
                    key: this.nodeKey
                },
                composed: true,
                bubbles: true
            })
        );

        this.togglePopoverVisibility();
    }

    handleExpandedEdit(event) {
        event.stopPropagation();
        this.draftValues.isExpanded = event.detail.checked;
    }

    handleHrefEdit(event) {
        event.stopPropagation();
        this.draftValues.href = event.value;
    }

    handleKeydown = (event) => {
        switch (event.keyCode) {
            case keyCodes.enter:
                this.preventDefaultAndStopPropagation(event);
                this.template
                    .querySelector('[data-element-id="a-label-link"]')
                    .click();
                break;
            case keyCodes.up:
            case keyCodes.down:
            case keyCodes.right:
            case keyCodes.left:
            case keyCodes.home:
            case keyCodes.end:
                this.preventDefaultAndStopPropagation(event);
                this.dispatchEvent(
                    new CustomEvent('privateitemkeydown', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                        detail: {
                            key: this.nodeKey,
                            keyCode: event.keyCode
                        }
                    })
                );
                break;
            default:
                break;
        }
    };

    handleLabelBlur(event) {
        this.validate(event.currentTarget);
    }

    handleLabelEdit(event) {
        event.stopPropagation();
        this.draftValues.label = event.detail.value;
    }

    handleMetatextEdit(event) {
        event.stopPropagation();
        this.draftValues.metatext = event.detail.value;
    }

    handleActionClick(event) {
        const name = event.detail.value || event.currentTarget.name;
        const actionClickEvent = new CustomEvent('privateactionclick', {
            detail: {
                key: this.nodeKey,
                name
            },
            cancelable: true,
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(actionClickEvent);

        if (name === 'edit' && !actionClickEvent.defaultPrevented) {
            this.togglePopoverVisibility();
        }
    }

    handleActionMenuClose() {
        this._menuIsOpen = false;
    }

    handleActionMenuOpen() {
        this._menuIsOpen = true;
    }

    handleLinkMouseDown(event) {
        if (!this.sortable) return;

        // Prevent the link from being dragged,
        // to allow for dragging the whole item
        event.preventDefault();
    }

    handleMouseDown = (event) => {
        if (!this.sortable) return;
        event.stopPropagation();

        this.dispatchEvent(
            new CustomEvent('privatemousedown', {
                detail: {
                    key: this.nodeKey,
                    name: this.nodename
                },
                bubbles: true,
                composed: true
            })
        );
    };

    handleNameEdit(event) {
        event.stopPropagation();
        this.draftValues.nodename = event.detail.value;
    }

    handlePopoverCloseKeyDown(event) {
        // Trap the keyboard focus inside the popover
        if (event.keyCode === keyCodes.tab && event.shiftKey) {
            this.template
                .querySelector('[data-element-id="lightning-button-done"]')
                .focus();
            event.preventDefault();
        }
    }

    handlePopoverDoneKeyDown(event) {
        // Trap the keyboard focus inside the popover
        if (event.keyCode === keyCodes.tab && !event.shiftKey) {
            this.template
                .querySelector(
                    '[data-element-id="lightning-button-icon-close"]'
                )
                .focus();
            event.preventDefault();
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}

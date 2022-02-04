import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { keyCodes, normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

const i18n = {
    collapseBranch: 'Collapse Branch',
    expandBranch: 'Expand Branch'
};

const POPOVER_FOOTER_HEIGHT = 55;

export default class PrimitiveTreeItem extends LightningElement {
    @api loadingStateAlternativeText;
    @api nodeRef;
    @api nodeKey;

    _actions = [];
    _actionsWhenDisabled = [];
    _level;
    _childItems = [];
    _editFields = [];
    _focusedChild = null;
    _href;
    _disabled = false;
    _expanded = false;
    _isLeaf = false;
    _isLoading = false;
    _label;
    _metatext;
    _name;
    _sortable = false;

    buttonActions = [];
    menuActions = [];
    draftValues = {};
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
        this.splitActions();
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
        if (this.isConnected) this.splitActions();
    }

    @api
    get actionsWhenDisabled() {
        return this._actionsWhenDisabled;
    }
    set actionsWhenDisabled(value) {
        this._actionsWhenDisabled = normalizeArray(value);
        if (this.isConnected) this.splitActions();
    }

    @api
    get childItems() {
        return this._childItems;
    }
    set childItems(value) {
        this._childItems = normalizeArray(value);
    }

    @api
    get editFields() {
        return this._editFields;
    }
    set editFields(value) {
        this._editFields = normalizeArray(value);
        if (this.popoverVisible) this.togglePopoverVisibility();
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
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
        if (this.isConnected) this.splitActions();
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        this._expanded = normalizeBoolean(value);
    }

    @api
    get isLeaf() {
        return this._isLeaf;
    }
    set isLeaf(value) {
        this._isLeaf = normalizeBoolean(value);
    }

    @api
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
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
    get metatext() {
        return this._metatext;
    }
    set metatext(value) {
        this._metatext = value;
    }

    @api
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
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
                'slds-hidden': this.isLeaf || this.disabled,
                'avonni-primitive-tree-item__chevron_expanded': this.expanded,
                'slds-p-top_xx-small': this.metatext
            })
            .toString();
    }

    get computedEditFields() {
        return this.editFields.map((field) => {
            return {
                checked: this.draftValues[field],
                label: this.camelCaseToStartCase(field),
                name: field,
                required: field === 'name' || field === 'label',
                type:
                    typeof this.draftValues[field] === 'boolean'
                        ? 'toggle'
                        : 'text',
                value: this.draftValues[field]
            };
        });
    }

    get computedIconName() {
        return document.dir === 'rtl'
            ? 'utility:chevronleft'
            : 'utility:chevronright';
    }

    get computedLabelClass() {
        return classSet('slds-show slds-truncate')
            .add({
                'slds-p-vertical_xx-small': !this.buttonActions.length
            })
            .toString();
    }

    get itemElement() {
        return this.template.querySelector('[data-element-id="div-item"]');
    }

    get showExpanded() {
        if (!this.nodeRef) return false;
        return !this.disabled && this.nodeRef.expanded;
    }

    get showLink() {
        return !this.disabled && this.href;
    }

    get visibleActions() {
        return this.disabled ? this.actionsWhenDisabled : this.actions;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    camelCaseToStartCase(string) {
        const result = string.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

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
        if (!this.popoverVisible && this.visibleActions.length) {
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
        if (!this.popoverVisible && this.visibleActions.length) {
            this.template.querySelector(
                '[data-element-id="div-branch-buttons"]'
            ).style.opacity = 1;
        }
    }

    splitActions() {
        const buttonActions = [];
        const menuActions = [];
        this.visibleActions.forEach((action) => {
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
            this.draftValues = {};
        } else {
            this._focusOnFirstPopoverElement = true;
            this.editFields.forEach((field) => {
                this.draftValues[field] = this[field];
            });
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
        if (!this.disabled) {
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
                    name: this.name,
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
                        disabled: this.disabled,
                        expanded: this.expanded,
                        href: this.href,
                        label: this.label,
                        metatext: this.metatext,
                        name: this.name
                    },
                    key: this.nodeKey
                },
                composed: true,
                bubbles: true
            })
        );

        this._isLeaf = !this.isLoading && this.childItems.length === 0;
        this.togglePopoverVisibility();
        this.splitActions();
    }

    handleExpandedEdit(event) {
        event.stopPropagation();
        this.draftValues.expanded = event.detail.checked;
    }

    handleHrefEdit(event) {
        event.stopPropagation();
        this.draftValues.href = event.value;
        console.log(event);
    }

    handleInputChange(event) {
        event.stopPropagation();
        const name = event.currentTarget.name;
        const { checked, value } = event.detail;
        this.draftValues[name] = checked !== undefined ? checked : value;
    }

    handleIsLoadingEdit(event) {
        event.stopPropagation();
        this.draftValues.isLoading = event.detail.checked;
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

    handleEditInputBlur(event) {
        if (event.currentTarget.required) {
            this.validate(event.currentTarget);
        }
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
                    name: this.name
                },
                bubbles: true,
                composed: true
            })
        );
    };

    handleNameEdit(event) {
        event.stopPropagation();
        this.draftValues.name = event.detail.value;
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

import { LightningElement, api } from 'lwc';
import { classSet, generateUUID } from 'c/utils';
import { keyCodes, normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

const i18n = {
    collapseBranch: 'Collapse Branch',
    expandBranch: 'Expand Branch'
};

const POPOVER_FOOTER_HEIGHT = 55;
const DEFAULT_EDIT_FIELDS = [
    'label',
    'metatext',
    'name',
    'href',
    'expanded',
    'disabled',
    'isLoading'
];

export default class PrimitiveTreeItem extends LightningElement {
    @api focusedChild;
    @api loadingStateAlternativeText;
    @api nodeKey;

    _actions = [];
    _actionsWhenDisabled = [];
    _allowInlineEdit = false;
    _avatar;
    _level;
    _childItems = [];
    _editFields = DEFAULT_EDIT_FIELDS;
    _fields = [];
    _href;
    _disabled = false;
    _expanded = false;
    _isLeaf = false;
    _isLoading = false;
    _label;
    _metatext;
    _name;
    _selected = false;
    _showCheckbox = false;
    _sortable = false;

    buttonActions = [];
    labelIsEdited = false;
    menuActions = [];
    draftValues = {};
    hasError = false;
    popoverVisible = false;
    _checkboxIsIndeterminate = false;
    _focusOn = false;
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
                    setSelected: this.setSelected,
                    unfocus: this.handleChildUnfocus,
                    key: this.nodeKey
                }
            })
        );

        this.addEventListener('keydown', this.handleKeydown);
        this.addEventListener('mousedown', this.handleMouseDown);
        this.updateLevel();
        this.splitActions();
        this.computeSelection();
    }

    renderedCallback() {
        if (typeof this.focusedChild === 'number') {
            const child = this.getNthChildItem(this.focusedChild + 1);
            if (child) {
                child.tabIndex = '0';
            }
        }

        if (this._focusOn) {
            const focusedElement = this.template.querySelector(
                `[data-element-id="${this._focusOn}"]`
            );
            if (focusedElement) focusedElement.focus();
            this._focusOn = null;
        }

        if (this.popoverVisible) this.positionPopover();

        this.updateCheckboxStatus();
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
    get allowInlineEdit() {
        return this._allowInlineEdit;
    }
    set allowInlineEdit(value) {
        this._allowInlineEdit = normalizeBoolean(value);
    }

    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value instanceof Object ? value : null;
    }

    @api
    get childItems() {
        return this._childItems;
    }
    set childItems(value) {
        this._childItems = normalizeArray(value);
        if (this.isConnected) this.computeSelection();
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
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = normalizeArray(value);
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
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = normalizeBoolean(value);
        if (this.isConnected) this.computeSelection();
    }

    @api
    get showCheckbox() {
        return this._showCheckbox;
    }
    set showCheckbox(value) {
        this._showCheckbox = normalizeBoolean(value);
        if (this.isConnected) this.computeSelection();
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
        if (this.expanded) {
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
        return classSet('slds-truncate')
            .add({
                'slds-p-vertical_xx-small': !this.buttonActions.length
            })
            .toString();
    }

    get computedWrapperClass() {
        return classSet('slds-is-relative')
            .add({
                'avonni-primitive-tree-item__single-selection':
                    !this.showCheckbox
            })
            .toString();
    }

    get expandButtonTabindex() {
        return this.showCheckbox ? '0' : '-1';
    }

    get itemElement() {
        return this.template.querySelector('[data-element-id="div-item"]');
    }

    get showChildren() {
        return !this.disabled && this.expanded;
    }

    get showFields() {
        return this.fields.length && !this.disabled && this.expanded;
    }

    get showLink() {
        return !this.disabled && !this.allowInlineEdit && this.href;
    }

    get uniqueKey() {
        return generateUUID();
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

    computeSelection() {
        if (!this.selected && this.showCheckbox && this.childItems.length) {
            const selectedChildren = this.childItems.filter(
                (child) => child.selected
            );

            if (selectedChildren.length === this.childItems.length) {
                // All children are selected
                this._selected = true;
                this._checkboxIsIndeterminate = false;
            } else {
                // Some or no children are selected
                this._selected = false;
                this._checkboxIsIndeterminate = !!selectedChildren.length;
            }
        } else {
            this._checkboxIsIndeterminate = false;
        }

        if (this.showCheckbox) {
            this.ariaSelected = this.selected ? 'true' : 'false';
        }
        this.updateCheckboxStatus();
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

    setSelected = (value) => {
        this._selected = value;
        this.computeSelection();
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
            this.labelIsEdited = false;
            this._focusOn = 'lightning-button-icon-close';
            this.editFields.forEach((field) => {
                this.draftValues[field] = this[field];
            });
        }

        this.popoverVisible = !this.popoverVisible;
        this.hideBranchButtons();
    };

    updateCheckboxStatus() {
        const checkbox = this.template.querySelector(
            '[data-element-id="input-checkbox"]'
        );
        if (checkbox) {
            checkbox.indeterminate = this._checkboxIsIndeterminate;
        }
    }

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

            if (this.showCheckbox && target === 'anchor') {
                this._selected = !this.selected;
                this._checkboxIsIndeterminate = false;
            }

            this.dispatchClick(target, event);
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

        this.dispatchChange();
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

    handleExpandButtonFocus() {
        if (this.showCheckbox) return;

        this.dispatchEvent(
            new CustomEvent('focus', {
                detail: {
                    key: this.nodeKey
                },
                bubbles: true
            })
        );
    }

    handleKeydown = (event) => {
        if (this.popoverVisible) return;
        switch (event.keyCode) {
            case keyCodes.enter: {
                this.preventDefaultAndStopPropagation(event);
                const link = this.template.querySelector(
                    '[data-element-id="a-label-link"]'
                );
                if (link) {
                    link.click();
                } else if (this.allowInlineEdit) {
                    this.handleLabelDoubleClick();
                }
                break;
            }
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

    handleCheckboxClick(event) {
        if (this.allowInlineEdit) event.stopPropagation();
    }

    handleLabelDoubleClick() {
        if (!this.allowInlineEdit || this.disabled) return;

        this.dispatchEvent(
            new CustomEvent('privateitemdblclick', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: {
                    key: this.nodeKey
                }
            })
        );
        if (this.popoverVisible) this.togglePopoverVisibility();
        this.labelIsEdited = true;
        this.draftValues.label = this.label;
        this._focusOn = 'lightning-input-inline-label';
    }

    handleLabelInlineKeyDown(event) {
        event.stopPropagation();
        this.draftValues.label = event.currentTarget.value;

        if (event.key === 'Enter') {
            this.handleSaveLabelInlineEdit();
        } else if (event.key === 'Escape') {
            this.draftValues = {};
            this.labelIsEdited = false;
        }
    }

    handleSaveLabelInlineEdit() {
        const labelInput = this.template.querySelector(
            '[data-element-id="lightning-input-inline-label"]'
        );
        if (!labelInput || !this.validate(labelInput)) return;

        this._label = this.draftValues.label;
        this.draftValues = {};
        this.labelIsEdited = false;
        this.dispatchChange();
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

    dispatchChange() {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    values: {
                        disabled: this.disabled,
                        expanded: this.expanded,
                        isLoading: this.isLoading,
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
    }

    dispatchClick(target, event) {
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

    stopPropagation(event) {
        event.stopPropagation();
    }
}

import {
    deepCopy,
    generateUUID,
    normalizeArray,
    normalizeBoolean
} from 'c/utils';
import { keyCodes } from 'c/utilsPrivate';
import { LightningElement, api, track } from 'lwc';
import { TreeData } from './treeData';

const DEFAULT_ADD_BUTTON_LABEL = 'Add Item';
const DEFAULT_ACTION_NAMES = [
    'Standard.Tree.Add',
    'Standard.Tree.Edit',
    'Standard.Tree.Delete',
    'Standard.Tree.Duplicate'
];
const DEFAULT_CANCEL_BUTTON_LABEL = 'Cancel';
const DEFAULT_COLLAPSE_BUTTON_ALTERNATIVE_TEXT = 'Collapse Branch';
const DEFAULT_CLOSE_BUTTON_ICON_ALTERNATIVE_TEXT = 'Close Dialog';
const DEFAULT_DONE_BUTTON_LABEL = 'Done';
const DEFAULT_EDITABLE_FIELDS = [
    'label',
    'metatext',
    'name',
    'href',
    'expanded',
    'disabled',
    'isLoading'
];
const DEFAULT_EXPAND_BUTTON_ALTERNATIVE_TEXT = 'Expand Branch';
const DEFAULT_LOAD_MORE_BUTTON_LABEL = 'Load More';
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_SAVE_BUTTON_ALTERNATIVE_TEXT = 'Save Label';

/**
 * Tree of nested items. Used to display a visualization of a structural hierarchy.
 *
 * @class
 * @descriptor avonni-tree
 * @storyId example-tree--base
 * @public
 */
export default class Tree extends LightningElement {
    /**
     * Label for the add button.
     *
     * @type {string}
     * @public
     * @default 'Add Item'
     */
    @api addButtonLabel = DEFAULT_ADD_BUTTON_LABEL;
    /**
     * The label for the cancel button.
     *
     * @type {string}
     * @public
     * @default 'Cancel'
     */
    @api cancelButtonLabel = DEFAULT_CANCEL_BUTTON_LABEL;
    /**
     * The alternative text used to describe the close button icon.
     *
     * @type {string}
     * @public
     * @default 'Close Dialog'
     */
    @api closeButtonAlternativeText =
        DEFAULT_CLOSE_BUTTON_ICON_ALTERNATIVE_TEXT;
    /**
     * The alternative text used to describe the collapse button icon.
     *
     * @type {string}
     * @public
     * @default 'Collapse Branch'
     */
    @api collapseButtonAlternativeText =
        DEFAULT_COLLAPSE_BUTTON_ALTERNATIVE_TEXT;
    /**
     * The label for the done button.
     *
     * @type {string}
     * @public
     * @default 'Done'
     */
    @api doneButtonLabel = DEFAULT_DONE_BUTTON_LABEL;
    /**
     * The alternative text used to describe the expand button icon.
     *
     * @type {string}
     * @public
     * @default 'Expand Branch'
     */
    @api expandButtonAlternativeText = DEFAULT_EXPAND_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Tree heading.
     *
     * @type {string}
     * @public
     */
    @api header;
    /**
     * Label for the load more button.
     *
     * @type {string}
     * @public
     * @default 'Load More'
     */
    @api loadMoreButtonLabel = DEFAULT_LOAD_MORE_BUTTON_LABEL;
    /**
     * New branch default label.
     *
     * @type {string}
     * @public
     */
    @api placeholder;
    /**
     * The alternative text used to describe the save button icon.
     *
     * @type {string}
     * @public
     * @default 'Save Label'
     */
    @api saveButtonIconAlternativeText = DEFAULT_SAVE_BUTTON_ALTERNATIVE_TEXT;

    _actions = [];
    _actionsWhenDisabled = [];
    _allowInlineEdit = false;
    _collapseDisabled = false;
    _disabled = false;
    _editableFields = DEFAULT_EDITABLE_FIELDS;
    _enableInfiniteLoading = false;
    _independentMultiSelect = false;
    _isLoading = false;
    _isMultiSelect = false;
    @track _items = [];
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _rootSlottableTypes = [];
    _selectedItems = [];
    _sortable = false;

    callbackMap = {};
    @track children = [];
    treedata = new TreeData();
    _connected = false;
    _dragState;
    _editedItemKey;
    _focusedItem;
    _mouseDownTimeout;
    _mouseOverItemTimeout;
    _previousSelectedItems = [];
    _selectTimeout;
    _setFocus = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.initItems();

        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        this._connected = true;
    }

    renderedCallback() {
        if (this._focusedItem) {
            this.setFocusToItem(this._focusedItem, this._setFocus);
            this._setFocus = false;
        }
    }

    disconnectedCallback() {
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects to display to the right of each item. These actions are not visible on disabled items.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * Array of action objects to display to the right of disabled items.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actionsWhenDisabled() {
        return this._actionsWhenDisabled;
    }
    set actionsWhenDisabled(value) {
        this._actionsWhenDisabled = normalizeArray(value);
    }

    /**
     * If present, the items' label can be edited by double-clicking on it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get allowInlineEdit() {
        return this._allowInlineEdit;
    }
    set allowInlineEdit(value) {
        this._allowInlineEdit = normalizeBoolean(value);
    }

    /**
     * If present, all branches in the tree are expanded and cannot be collapsed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get collapseDisabled() {
        return this._collapseDisabled;
    }
    set collapseDisabled(value) {
        this._collapseDisabled = normalizeBoolean(value);
    }

    /**
     * If present, the component is disabled and items cannot be selected or edited.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * Array of fields that should be visible in the item edit form. The item edit form can be opened through the standard `Standard.Tree.Edit` action.
     *
     * @type {string[]}
     * @default ['label', 'metatext', 'name', 'href', 'expanded', 'disabled', 'isLoading']
     * @public
     */
    @api
    get editableFields() {
        return this._editableFields;
    }
    set editableFields(value) {
        this._editableFields = normalizeArray(value);
    }

    /**
     * If present, a "Load more" button is displayed at the end of the root items. On click, it will fire the `loadmore` event.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);
    }

    /**
     * Used only if `is-multi-select` is true.
     * If present, the parent and children nodes will be selected independently of each other.
     * If empty, when all children of a node are selected, the node is selected automatically. If a node is selected, all its children are also selected by default.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get independentMultiSelect() {
        return this._independentMultiSelect;
    }
    set independentMultiSelect(value) {
        this._independentMultiSelect = normalizeBoolean(value);

        if (this._connected) {
            this.resetSelection();
        }
    }

    /**
     * If present, the tree is loading and shows a spinner.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * If present, multiple items can be selected and a checkbox is displayed to the left of the items.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isMultiSelect() {
        return this._isMultiSelect;
    }
    set isMultiSelect(value) {
        this._isMultiSelect = value;
        if (this._connected) this.resetSelection();
    }

    /**
     * Array of item objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items || [];
    }
    set items(value) {
        const items = normalizeArray(value);
        this._items = items.map((item) => {
            return this.treedata.cloneItem(item);
        });

        if (this._connected) this.initItems();
    }

    /**
     * The alternative text used to describe the reason for the wait and need for a spinner.
     *
     * @type {string}
     * @default Loading...
     * @public
     */
    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    }

    /**
     * Array of types of items that can be slotted in the root of the tree.
     *
     * @type {object[]}
     * @public
     */
    @api
    get rootSlottableTypes() {
        return this._rootSlottableTypes;
    }
    set rootSlottableTypes(value) {
        this._rootSlottableTypes = normalizeArray(value);
    }

    /**
     * Array of tree item names to select and highlight.
     * If the tree is not multi-select:
     * * Only the first item of the list will be selected.
     * * If it is nested, selecting this item also expands the parent branches.
     *
     * @type {string[]}
     * @public
     */
    @api
    get selectedItems() {
        return this._selectedItems;
    }
    set selectedItems(value) {
        this._selectedItems =
            typeof value === 'string'
                ? [value]
                : deepCopy(normalizeArray(value));
        this._previousSelectedItems = [];
        if (this._connected) this.resetSelection();
    }

    /**
     * If present, the tree item are sortable.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Definition of the "add" action, if present.
     *
     * @type {(object|undefined)}
     */
    get addAction() {
        return (
            !this.isLoading &&
            this.actions.find((action) => action.name === 'Standard.Tree.Add')
        );
    }

    /**
     * Computed list of selected items names.
     *
     * @type {string[]}
     */
    get computedSelectedItems() {
        if (!this.selectedItems.length) return [];
        return this.isMultiSelect
            ? this.selectedItems
            : this.selectedItems.slice(0, 1);
    }

    /**
     * True if the laoding spinner should be displayed.
     *
     * @type {boolean}
     */
    get showLoadMore() {
        return this.enableInfiniteLoading && !this.isLoading;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Remove keyboard focus from the tree.
     *
     * @public
     */
    @api
    blur(itemException) {
        const currentFocused = this.treedata.getItemAtIndex(
            this.treedata.currentFocusedItemIndex
        );

        if (
            currentFocused &&
            (!itemException || itemException.key !== currentFocused.key) &&
            this.callbackMap[currentFocused.key]
        ) {
            this.callbackMap[currentFocused.key].unfocus();
        }
    }

    /**
     * Set keyboard focus on the tree.
     *
     * @public
     */
    @api
    focus() {
        if (this.items.length) {
            this.setFocusToFirstItem();
        } else {
            const addButton = this.template.querySelector(
                '[data-element-id="button-add-action"]'
            );
            if (addButton) addButton.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Add a new child item to the given parent item.
     *
     * @param {string} parentKey Unique key of the parent item.
     */
    addItem(parentKey) {
        const name = generateUUID();
        const newItem = {
            label: this.placeholder || 'New branch',
            name,
            items: []
        };

        if (parentKey) {
            // Add a new item in a nested branch
            const path = parentKey.split('.');
            const branch = this.getBranch(path);
            branch.items.unshift(newItem);
            if (this.isMultiSelect) branch.expanded = true;
        } else {
            // Add a new item in the main branch
            this.items.push(newItem);
        }

        this.singleSelect(newItem);
    }

    /**
     * Circle and open the hovered item when an item is dragged.
     */
    circleAndExpandHoveredItem() {
        if (
            !this._dragState ||
            this._dragState.key === this._dragState.item.key
        )
            return;

        if (this._dragState.item.treeNode.disabled) {
            this._dragState.initialX = undefined;
            return;
        }

        this._dragState.position = 'center';
        const { key, treeNode, index } = this._dragState.item;
        const isValidSorting = this.isSortingValid();
        this.callbackMap[key].removeBorder();
        this.callbackMap[key].setBorder(undefined, undefined, isValidSorting);
        this._dragState.currentLevelItem = null;

        if (treeNode.children.length && !treeNode.nodeRef.expanded) {
            // Expand the hovered item after 500ms
            this._mouseOverItemTimeout = setTimeout(() => {
                this.expandBranch(treeNode);

                // Find the nested next item after the expansion happens
                // and elements are rerendered
                setTimeout(() => {
                    const nextItem = this.treedata.findNextNodeToFocus(index);
                    this._dragState.nextItem = nextItem;
                    const nextBounds = this.callbackMap[nextItem.key].bounds();
                    this._dragState.bottomLimit =
                        nextBounds.top + nextBounds.height / 3;
                }, 0);
            }, 500);
        }
    }

    /**
     * Collapse a branch.
     *
     * @param {object} node The item to collapse.
     */
    collapseBranch(node) {
        if (!node.isLeaf && !node.disabled) {
            node.nodeRef.expanded = false;
            this.treedata.updateVisibleTreeItemsOnCollapse(node.key);
            this.dispatchChange({
                name: node.name,
                action: 'Standard.Tree.Collapse',
                key: node.key
            });
        }
    }

    /**
     * Compute the selected items when the tree is muti-select.
     */
    computeMultiSelection() {
        const selectedItems = [...this.selectedItems];
        for (let i = 0; i < selectedItems.length; i++) {
            const name = selectedItems[i];
            const cascadeSelection = !this.independentMultiSelect;
            this.treedata.computeSelection(
                name,
                selectedItems,
                cascadeSelection
            );
        }
        if (selectedItems.length !== this.selectedItems.length) {
            this._previousSelectedItems = [...this.selectedItems];
            this._selectedItems = selectedItems;
            this.dispatchSelect();
        }

        this.forceChildrenSelectionUpdate();
    }

    /**
     * Set an item as the current position of the dragged item.
     *
     * @param {object} item The item the dragged item is moving to.
     */
    dragTo(item) {
        if (!this._dragState) return;

        if (this._dragState.item) {
            this.callbackMap[this._dragState.item.key].removeBorder();
        }

        const prevItem = this.treedata.findPrevNodeToFocus(item.index);
        const nextItem = this.treedata.findNextNodeToFocus(item.index);
        const bounds = this.callbackMap[item.key].bounds();

        this._dragState.centerBottomLimit = bounds.bottom - bounds.height / 3;
        this._dragState.centerTopLimit = bounds.top + bounds.height / 3;
        this._dragState.item = item;
        this._dragState.nextItem = nextItem;
        this._dragState.prevItem = prevItem;
        this._dragState.currentLevelItem = null;

        if (prevItem) {
            const prevBounds = this.callbackMap[prevItem.key].bounds();
            this._dragState.topLimit =
                prevBounds.bottom - prevBounds.height / 3;
        } else {
            this._dragState.topLimit = null;
        }

        if (nextItem) {
            const nextBounds = this.callbackMap[nextItem.key].bounds();
            this._dragState.bottomLimit =
                nextBounds.top + nextBounds.height / 3;
        } else {
            this._dragState.bottomLimit = Infinity;
        }
    }

    /**
     * Duplicate an item in the tree.
     *
     * @param {string} key Key of the duplicated item.
     * @returns {object} New item created.
     */
    duplicateItem(key) {
        const { index, items } = this.getPositionInBranch(key);
        const name = generateUUID();
        const duplicated = this.treedata.cloneItem(items[index]);
        duplicated.name = name;
        items.splice(index + 1, 0, duplicated);
        this.singleSelect(duplicated);
        return duplicated;
    }

    /**
     * Execute a standard action.
     *
     * @param {string} action Name of the action. Valid values are add, edit, delete or duplicate.
     * @param {object} item Item the action originated from.
     */
    executeStandardAction(action, item) {
        let name = item ? item.treeNode.name : null;
        const key = item ? item.key : null;
        let previousName;

        if (this._editedItemKey) {
            this.callbackMap[this._editedItemKey].closePopover();
            this._editedItemKey = null;
        }

        switch (action) {
            case 'Standard.Tree.Add': {
                this.addItem(key);
                break;
            }
            case 'Standard.Tree.Edit': {
                this._editedItemKey = key;
                return;
            }
            case 'Standard.Tree.Delete': {
                const prevItem = this.treedata.findPrevNodeToFocus(item.index);
                if (prevItem && !this.isMultiSelect) {
                    this.singleSelect(prevItem.treeNode);
                }
                const { index, items } = this.getPositionInBranch(key);
                items.splice(index, 1);
                break;
            }
            case 'Standard.Tree.Duplicate': {
                previousName = item.treeNode.name;
                const duplicatedItem = this.duplicateItem(key);
                name = duplicatedItem.name;
                break;
            }
            default: {
                break;
            }
        }

        this.initItems();
        this.dispatchChange({ name, action, previousName, key });
        this._setFocus = true;
    }

    /**
     * Expand a branch.
     *
     * @param {object} node Item to expand.
     */
    expandBranch(node) {
        if (!node.isLeaf && !node.disabled) {
            node.nodeRef.expanded = true;
            this.dispatchChange({
                name: node.name,
                action: 'Standard.Tree.Expand',
                key: node.key
            });
        }
    }

    /**
     * Force the update of the children "selected" attribute. This manual reassignment is necessary because the @track decorator will not track changes made to the nested objects.
     */
    forceChildrenSelectionUpdate() {
        const children = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-tree-item"]'
        );
        if (children.length === this.children.length) {
            children.forEach((child, index) => {
                child.selected =
                    this.children[index].selected &&
                    !this.children[index].unselectable;
            });
        }
    }

    /**
     * Find an item in the items array.
     *
     * @param {string[]} path Path to the item, based on its split key.
     * @returns {object} Item found.
     */
    getBranch(path) {
        path.forEach((str, i) => {
            path[i] = parseInt(str, 10);
        });

        let currentItems = this._items;
        path.forEach((node, i) => {
            if (i === 0) {
                currentItems = currentItems[node - 1];
            } else {
                currentItems = currentItems.items[node - 1];
            }
        });

        return currentItems;
    }

    /**
     * Get the position of an item in its branch.
     *
     * @param {string} key Key of the item.
     * @returns {object} Object with two keys: index (the index of the item in the branch) and items (the branch).
     */
    getPositionInBranch(key) {
        const path = key.split('.');
        const index = parseInt(path.pop(), 10) - 1;
        const branch = this.getBranch(path);
        const items = path.length ? branch.items : branch;
        return { index, items };
    }

    /**
     * Initialize the tree items.
     * Check the input data for circular references or cycles and build a list of items in depth-first manner for traversing the tree by keyboard.
     * Build a list of visible items to be checked while traversing the tree, at any point any branch is expanded or collapsed, this list has to be kept updated.
     */
    initItems() {
        // Reset the state
        this.setFocusToItem({});
        this.treedata = new TreeData(this.disabled, this.actions);
        if (!this.items.length) {
            this.children = [];
            return;
        }

        // Create a new tree
        const treeRoot = this.treedata.parse(
            this.items,
            this.computedSelectedItems
        );
        this.children = treeRoot ? treeRoot.children : [];
        this._focusedItem = treeRoot.selectedItem;

        // Compute the selected items
        if (this.isMultiSelect) {
            this.computeMultiSelection();
        } else if (this._focusedItem) {
            this.treedata.expandTo(this._focusedItem);
        }
    }

    /**
     * Reset the selected items to the current value of selectedItems.
     */
    resetSelection() {
        if (!this.children.length) return;

        // Reset all selection
        this.treedata.resetSelection(this.computedSelectedItems);

        if (this.isMultiSelect) {
            this.computeMultiSelection();
        } else {
            const selectedItem = this.treedata.getItemFromName(
                this.computedSelectedItems[0]
            );
            if (selectedItem) {
                this.treedata.expandTo(selectedItem);
                this.setFocusToItem(selectedItem);
            } else if (this._focusedItem) {
                const callbacks = this.callbackMap[this._focusedItem.key];
                callbacks.setSelected(false);
                callbacks.unfocus();
                this._focusedItem = null;
            }
            this.forceChildrenSelectionUpdate();
        }
    }

    /**
     * Verify if the item can be sorted into the given position.
     *
     * @param {string} position Position of the item being sorted. Can be 'top' or 'bottom'.
     */
    isSortingValid(position) {
        const { currentLevelItem, item, key } = this._dragState;
        const targetItem = currentLevelItem || item;

        const { index, items } = this.getPositionInBranch(key);
        const itemToSort = items[index];
        const parent = this.treedata.getItem(targetItem.parent);

        const { treeNode } = targetItem;
        const { slottableTypes, noSlots, expanded, children } = treeNode;

        const itemType = itemToSort?.type;

        // Position
        const isTop = position === 'top';
        const isBottom = position === 'bottom';
        const isMiddle = !isTop && !isBottom;

        // Target item
        const hasSlots = !noSlots;
        const supportsType =
            slottableTypes.length === 0 || slottableTypes.includes(itemType);
        const isExpanded = expanded && children.length > 0;

        const canInsertInCurrent = hasSlots && supportsType && isMiddle;
        const canInsertAtBottomOfCurrent =
            hasSlots &&
            supportsType &&
            isBottom &&
            isExpanded &&
            !currentLevelItem;

        // Parent
        const parentExists = !!parent;
        const parentHasSlots = parentExists && !parent.noSlots;
        const parentSupportsType =
            parentExists &&
            (parent.treeNode.slottableTypes.length === 0 ||
                parent.treeNode.slottableTypes.includes(itemType));

        const canInsertAtTopOfParent =
            isTop && parentHasSlots && parentSupportsType;
        const canInsertAtBottomOfParent =
            isBottom && parentHasSlots && parentSupportsType;

        // Root
        const isSlottableInRoot =
            this.rootSlottableTypes.length === 0 ||
            this.rootSlottableTypes.includes(itemType);

        const canInsertAtRoot = !isMiddle && !parentExists && isSlottableInRoot;

        return (
            canInsertInCurrent ||
            canInsertAtBottomOfCurrent ||
            canInsertAtTopOfParent ||
            canInsertAtBottomOfParent ||
            canInsertAtRoot
        );
    }

    /**
     * Set the focus on the first item.
     */
    setFocusToFirstItem() {
        const node = this.treedata.findFirstNodeToFocus();
        if (node && node.index !== -1) {
            this.setFocusToItem(node);
        }
    }

    /**
     * Set the focus on an item and/or visually select it.
     *
     * @param {object} item Item to focus and select.
     * @param {boolean} shouldFocus If true, focus will be set on the item. Defaults to true.
     * @param {boolean} shouldSelect If true, visually select an item. Defaults to true.
     */
    setFocusToItem(item, shouldFocus = true, shouldSelect = true) {
        this.blur(item);

        if (item) {
            this._focusedItem = this.treedata.updateCurrentFocusedItemIndex(
                item.index
            );

            if (this.callbackMap[item.parent]) {
                this.callbackMap[item.parent].focus(
                    item.key,
                    shouldFocus,
                    shouldSelect
                );
            } else {
                this.setFocusToRootItem(item.key, shouldFocus, shouldSelect);
            }
        }
    }

    /**
     * Set the focus on the last visible item, in depth first manner.
     */
    setFocusToLastItem() {
        const lastNode = this.treedata.findLastNodeToFocus();
        if (lastNode && lastNode.index !== -1) {
            this.setFocusToItem(lastNode);
        }
    }

    /**
     * Set the focus on the next visible item.
     */
    setFocusToNextItem() {
        const nextNode = this.treedata.findNextNodeToFocus();
        if (nextNode && nextNode.index !== -1) {
            this.setFocusToItem(nextNode);
        }
    }

    /**
     * Set the focus on the previous visible item.
     */
    setFocusToPrevItem() {
        const prevNode = this.treedata.findPrevNodeToFocus();
        if (prevNode && prevNode.index !== -1) {
            this.setFocusToItem(prevNode);
        }
    }

    /**
     * Set the focus on a root item.
     *
     * @param {string} key Key of the item to focus.
     * @param {boolean} shouldFocus If true, focus will be set on the item.
     * @param {boolean} shouldSelect If true, visually select the item.
     */
    setFocusToRootItem(key, shouldFocus, shouldSelect) {
        const child = this.template.querySelector(`[data-key="${key}"]`);
        if (child) {
            if (child.tabIndex !== '0') {
                child.tabIndex = '0';
            }
            if (shouldFocus && this.isMultiSelect) {
                child.focusContent();
            } else if (shouldFocus) {
                child.focus();
            }
            if (shouldSelect) {
                child.ariaSelected = true;
            }
        }
    }

    /**
     * Update the currently selected item when the tree is not multi-select.
     *
     * @param {string} name Name of the item to select.
     * @param {Event} event Event that triggered the selection.
     */
    singleSelect(node, event) {
        const isAlreadySelected =
            this.selectedItems.length === 1 &&
            this.selectedItems[0] === node.name;
        if (this.isMultiSelect || isAlreadySelected || node.unselectable) {
            return;
        }

        this._previousSelectedItems = [...this.selectedItems];
        this._selectedItems = [node.name];
        this.dispatchSelect(event);
    }

    /**
     * Display a bottom border on the hovered item, when an item is being dragged.
     *
     * @param {number} x The horizontal position of the mouse pointer.
     */
    showBottomBorderOnHoveredItem(x) {
        if (!this._dragState) return;

        const { initialX, item, currentLevelItem } = this._dragState;
        const hasMovedLeft = x < initialX - 10;
        const hasMovedRight = x > initialX + 10;
        const { children, expanded } = item.treeNode;

        if (isNaN(initialX)) {
            // Show the bottom border
            this._dragState.position = 'bottom';
            this._dragState.initialX = x;
            this.callbackMap[item.key].removeBorder();
            const level =
                expanded && children.length ? item.level + 1 : item.level;
            const isValidSorting = this.isSortingValid('bottom');
            this.callbackMap[item.key].setBorder(
                'bottom',
                level,
                isValidSorting
            );
        } else if (hasMovedLeft) {
            this._dragState.initialX = x;
            // If the hovered item is not expanded...
            if (children.length && expanded) return;

            // ... it has a parent...
            const currentItem = currentLevelItem || item;
            const parentItem = this.treedata.getItem(currentItem.parent);
            if (!parentItem) return;

            // ... and it is the last child of its parent...
            const siblings = parentItem.treeNode.children;
            const isLastChild =
                currentItem.key === siblings[siblings.length - 1].key;
            if (!isLastChild) return;

            // ...move the border left, outward from the most nested item
            this._dragState.currentLevelItem = parentItem;
            const isValidSorting = this.isSortingValid('bottom');
            const level = parentItem ? parentItem.level : 1;
            this.callbackMap[item.key].setBorder(
                'bottom',
                level,
                isValidSorting
            );
        } else if (hasMovedRight) {
            // Move right, towards the most nested item
            this._dragState.initialX = x;
            const node = currentLevelItem
                ? currentLevelItem.treeNode.children
                : children;
            const lastChild = node[node.length - 1];

            if (expanded && lastChild) {
                const lastChildItem = this.treedata.getItem(lastChild.key);
                this._dragState.currentLevelItem = lastChildItem;
                const isValidSorting = this.isSortingValid('bottom');
                this.callbackMap[item.key].setBorder(
                    'bottom',
                    lastChildItem.level,
                    isValidSorting
                );
            }
        }
    }

    /**
     * Display a top border on the hovered item, when an item is being dragged.
     *
     * @param {number} x The horizontal position of the mouse pointer.
     */
    showTopBorderOnHoveredItem(x) {
        if (!this._dragState) return;

        const { initialX, item } = this._dragState;
        const hasMovedRight = x > initialX + 10;
        const isValidSorting = this.isSortingValid('top');

        if (isNaN(initialX)) {
            // Show the top border
            this._dragState.position = 'top';
            this._dragState.initialX = x;
            this.callbackMap[item.key].removeBorder();
            this.callbackMap[item.key].setBorder(
                'top',
                undefined,
                isValidSorting
            );
        } else if (hasMovedRight) {
            this._dragState.initialX = x;
            const prevItemInSameBranch = this.treedata.findPrevNodeInSameBranch(
                item.key
            );

            if (prevItemInSameBranch) {
                // Move right, to the most nested item
                const { children, expanded } = prevItemInSameBranch.treeNode;

                if (expanded && children.length) {
                    const lastChildKey = children[children.length - 1].key;
                    const lastChild = this.treedata.getItem(lastChildKey);
                    this.dragTo(lastChild);
                    this._dragState.initialX = undefined;
                }
            }
        }
    }

    /**
     * Update the selection state of an item's parent. The parent is selected only if all its children are selected.
     *
     * @param {object} node Child item.
     */
    updateParentsSelection(node) {
        const parent = this.treedata.getItem(node.parent);
        if (parent) {
            const isSelected =
                this.treedata.areSelectableChildrenSelected(parent.treeNode) &&
                !parent.treeNode.unselectable;

            if (isSelected !== parent.treeNode.selected) {
                parent.treeNode.selected = isSelected;
                this.callbackMap[parent.key].setSelected(isSelected);

                const selectedItemIndex = this.selectedItems.indexOf(
                    parent.treeNode.name
                );
                if (isSelected && selectedItemIndex < 0) {
                    this.selectedItems.push(parent.treeNode.name);
                } else if (!isSelected && selectedItemIndex >= 0) {
                    this.selectedItems.splice(selectedItemIndex, 1);
                }

                this.updateParentsSelection(parent);
            } else if (parent.treeNode.unselectable) {
                this.updateParentsSelection(parent);
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the click on an item action.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        event.stopPropagation();
        const action = event.detail.name || 'Standard.Tree.Add';
        const key = event.detail.key;
        const levelPath = this.treedata.getLevelPath(
            key || this.items.length.toString()
        );
        const item = this.treedata.getItem(key);
        let name = item ? item.treeNode.name : null;

        /**
         * The event fired when an action is clicked.
         *
         * @event
         * @name actionclick
         * @param {DOMRect} bounds Bounds of the item clicked.
         * @param {number[]} levelPath Array of the clicked item levels of depth.
         * The levels start from 0. For example, if an item is the third child of its parent, and its parent is the second child of the tree root, the value would be: ``[1, 2]``.
         * @param {string} name Name of the action.
         * @param {string} targetName Name of the item the action originated from. If the action came from the root, the ``targetName`` will be null.
         * @public
         * @cancelable
         */
        const actionClickEvent = new CustomEvent('actionclick', {
            detail: {
                bounds: event.detail.bounds,
                levelPath,
                name: action,
                targetName: name
            },
            cancelable: true
        });
        this.dispatchEvent(actionClickEvent);

        // If the event is canceled, or the action is a custom action, return
        if (
            actionClickEvent.defaultPrevented ||
            !DEFAULT_ACTION_NAMES.includes(action)
        ) {
            event.preventDefault();
            return;
        }

        this.executeStandardAction(action, item);
    }

    /**
     * Handle the change of an item.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();

        const { key, values } = event.detail;
        const path = key.split('.');
        const item = this.getBranch(path);
        const previousName =
            values.name && item.name !== values.name ? item.name : null;

        Object.entries(values).forEach(([property, value]) => {
            item[property] = value;
        });

        this.singleSelect(item);
        this.initItems();
        this.dispatchChange({
            name: item.name,
            action: 'Standard.Tree.Edit',
            previousName,
            key
        });
        this._setFocus = true;
    }

    /**
     * Handle the click on an item. If the click was on a chevron, expand or collapse the item. Else, select the item.
     *
     * @param {Event} event
     */
    handleClick(event) {
        const key = event.detail.key;
        const target = event.detail.target;
        const item = this.treedata.getItem(key);
        const node = item.treeNode;

        if (item) {
            if (target === 'chevron') {
                if (node.nodeRef.expanded) {
                    this.collapseBranch(node);
                } else {
                    this.expandBranch(node);

                    if (node.enableInfiniteLoading && !node.children.length) {
                        this.dispatchLoadMore(key);
                    }
                }
            } else if (target === 'anchor') {
                if (node.unselectable) {
                    return;
                }
                if (this.isMultiSelect) {
                    this._previousSelectedItems = [...this.selectedItems];
                    const cascadeSelection = !this.independentMultiSelect;

                    if (!node.selected) {
                        this.treedata.selectNode(
                            node,
                            this.selectedItems,
                            cascadeSelection
                        );
                    } else {
                        this.treedata.unselectNode(
                            node,
                            this.selectedItems,
                            cascadeSelection
                        );
                    }

                    if (!this.independentMultiSelect) {
                        this.updateParentsSelection(item);
                        this.forceChildrenSelectionUpdate();
                    }
                    this.dispatchSelect(event);
                } else {
                    this.setFocusToItem(item);
                    this.singleSelect(node, event);
                }
            }
        }
    }

    /**
     * Handle the first focus on the tree.
     *
     * @param {Event} event
     */
    handleFocus(event) {
        if (!this._focusedItem) {
            const item = this.treedata.getItem(event.detail.key);
            this.setFocusToItem(item);
        }
    }

    /**
     * Handle a key down on an item.
     *
     * @param {Event} event
     */
    handleKeydown(event) {
        event.preventDefault();
        event.stopPropagation();

        const { key, keyCode } = event.detail;
        const item = this.treedata.getItem(key);

        switch (keyCode) {
            case keyCodes.up:
                this.setFocusToPrevItem();
                break;
            case keyCodes.down:
                this.setFocusToNextItem();
                break;
            case keyCodes.home:
                this.setFocusToFirstItem();
                break;
            case keyCodes.end:
                this.setFocusToLastItem();
                break;
            case keyCodes.right:
                this.expandBranch(item.treeNode);
                break;
            case keyCodes.left:
                if (item.treeNode.nodeRef.expanded && !item.treeNode.isLeaf) {
                    this.collapseBranch(item.treeNode);
                }
                break;

            default:
                break;
        }
    }

    /**
     * Handle a click on a load more button.
     *
     * @param {Event} event `click` or `privateitemloadmore` event.
     */
    handleLoadMore(event) {
        this.dispatchLoadMore(event.detail.key);
    }

    /**
     * Handle a mouse button down on an item. If the tree is sortable, initialize the dragging state.
     *
     * @param {Event} event
     */
    handleMouseDown(event) {
        event.stopPropagation();
        if (!this.sortable) return;

        // Start the dragging process only if the button is pressed long enough
        clearTimeout(this._mouseDownTimeout);
        this._mouseDownTimeout = setTimeout(() => {
            const { key, name } = event.detail;
            const item = this.treedata.getItem(key);

            if (item.treeNode.nodeRef.expanded) {
                // Collapse branch
                this.collapseBranch(item.treeNode);
            }

            this._dragState = { key };
            this.dragTo(item);
            this._focusedItem = name;
            this.setFocusToItem(item);

            // Remove item hover color
            const tree = this.template.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            tree.style.cssText =
                '--avonni-tree-item-color-background-hover: transparent;';
        }, 200);
    }

    /**
     * Handle a mouse movement on the tree. If the tree is sortable and an item is being dragged, process the dragging movement.
     *
     * @param {Event} event
     */
    handleMouseMove = (event) => {
        if (!this._dragState || !this.sortable) return;

        const {
            bottomLimit,
            centerBottomLimit,
            centerTopLimit,
            nextItem,
            position,
            prevItem,
            topLimit
        } = this._dragState;
        const y = event.clientY;

        const isAbove = y < topLimit;
        const isOnTop = y >= topLimit && y < centerTopLimit;
        const isInCenter =
            position !== 'center' &&
            y >= centerTopLimit &&
            y <= centerBottomLimit;
        const isOnBottom = y > centerBottomLimit && y <= bottomLimit;
        const isBelow = y > bottomLimit;

        if (isAbove) {
            this.dragTo(prevItem);
        } else if (isOnTop) {
            this.showTopBorderOnHoveredItem(event.clientX);
        } else if (isInCenter) {
            this.circleAndExpandHoveredItem();
        } else if (isOnBottom) {
            this.showBottomBorderOnHoveredItem(event.clientX);
        } else if (isBelow) {
            this.dragTo(nextItem);
        }

        if (this._dragState.position !== 'center') {
            // If the mouse has moved from the center,
            // prevent the item expansion
            clearTimeout(this._mouseOverItemTimeout);

            if (this._dragState.position !== position) {
                this._dragState.initialX = undefined;
            }
        } else {
            this._dragState.initialX = undefined;
        }
    };

    /**
     * Handle a mouse button up. Update the tree after an ttem drag, and clear the dragging state.
     */
    handleMouseUp = () => {
        clearTimeout(this._mouseDownTimeout);
        clearTimeout(this._mouseOverItemTimeout);
        if (!this._dragState || !this.sortable) return;

        const { currentLevelItem, item, key, position } = this._dragState;
        this.callbackMap[item.key].removeBorder();
        const currentItem = currentLevelItem || item;

        if (currentItem.key !== key) {
            // Get the new position of the item in the tree
            const { items, index } = this.getPositionInBranch(currentItem.key);
            const initialPosition = this.getPositionInBranch(key);
            const initialBranch = initialPosition.items;
            const initialIndex = initialPosition.index;
            const initialItem = this.treedata.cloneItem(
                initialBranch[initialIndex]
            );

            if (this.isSortingValid(position)) {
                const temporaryName = generateUUID();
                initialBranch[initialIndex].name = temporaryName;

                // Copy the item in the new position
                switch (position) {
                    case 'top':
                        items.splice(index, 0, initialItem);
                        break;
                    case 'bottom':
                        if (
                            item.treeNode.expanded &&
                            item.treeNode.children.length
                        ) {
                            items[index].items.unshift(initialItem);
                        } else {
                            items.splice(index + 1, 0, initialItem);
                        }
                        break;
                    default:
                        items[index].items.unshift(initialItem);
                        break;
                }

                // Remove the item from its original position
                const initialItemNewIndex = initialPosition.items.findIndex(
                    (it) => {
                        return it.name === temporaryName;
                    }
                );
                initialPosition.items.splice(initialItemNewIndex, 1);
                if (!initialItem.unselectable) {
                    this.singleSelect(initialItem);
                }
                this.initItems();
                this.dispatchChange({
                    name: initialItem.name,
                    action: 'Standard.Tree.Move',
                    key
                });
            }
        }

        this._dragState = null;

        // Reset item hover color
        const tree = this.template.querySelector(
            '[data-element-id="div-tree-wrapper"]'
        );
        tree.style.cssText = null;
    };

    /**
     * Handle the registration event dispatched by items when they're first insterted into the DOM. Save the callback functions.
     *
     * @param {Event} event
     */
    handleRegistration(event) {
        event.stopPropagation();
        const {
            bounds,
            closePopover,
            key,
            focus,
            removeBorder,
            setBorder,
            setSelected,
            unfocus
        } = event.detail;

        this.callbackMap[key] = {
            bounds,
            closePopover,
            focus,
            removeBorder,
            setBorder,
            setSelected,
            unfocus
        };
        this.treedata.addVisible(key);
    }

    /**
     * Dispatch the change event.
     *
     * @param {string} key Key of the changed item.
     * @param {string} name Name of the item that has changed.
     * @param {string} action Action that has been performed on the item.
     * @param {string} previousName Previous name of the item, if it has changed.
     */
    dispatchChange({ key, name, action, previousName }) {
        // If no key is given, it's a new item at the root of the tree
        let levelPath = this.treedata.getLevelPath(
            (key || this.items.length - 1).toString()
        );

        const previousLevelPath = levelPath;
        if (action === 'Standard.Tree.Move') {
            const newItem = this.treedata.getItemFromName(name);
            levelPath = this.treedata.getLevelPath(newItem.key);
        }

        /**
         * The event fired when a change is made to the tree.
         *
         * @event
         * @name change
         * @param {string} action Type of change made to the item. Options are `Standard.Tree.Add`, `Standard.Tree.Collapse`, `Standard.Tree.Delete`, `Standard.Tree.Duplicate`, `Standard.Tree.Edit`, `Standard.Tree.Expand` and `Standard.Tree.Move`.
         * @param {object[]} items The new items array.
         * @param {number[]} levelPath Array of the levels of depth of the changed item.
         * The levels start from 0. For example, if an item is the third child of its parent, and its parent is the second child of the tree root, the value would be: `[1, 2]`.
         * @param {string} name Name of the specific item the change was made to.
         * @param {string} previousName For the `Standard.Tree.Duplicate` action, name of the original item. For the `Standard.Tree.Edit` action, if the name has changed, previous name of the item.
         * @param {number[]} previousLevelPath Array of the levels of depth, of the previous position of the changed item.
         * This value will differ from the levelPath only if the action is `Standard.Tree.Move`.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    action,
                    items: deepCopy(this.items),
                    levelPath,
                    name,
                    previousLevelPath,
                    previousName
                }
            })
        );
    }

    /**
     * Dispatch the `loadmore` event.
     *
     * @param {string} key Key of the parent item that triggered the event.
     */
    dispatchLoadMore(key) {
        let levelPath = [];
        if (key) {
            levelPath = this.treedata.getLevelPath(key.toString());
        }

        /**
         * The event fired when a "Load more" button is clicked.
         *
         * @event
         * @name loadmore
         * @param {number[]} levelPath Array of the levels of depth of the item that is loading. Empty if the root level is loading.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('loadmore', { detail: { levelPath } })
        );
    }

    /**
     * Dispatch the select event.
     *
     * @param {Event} event The event that triggered the selection.
     */
    dispatchSelect(event) {
        const levelPath = event
            ? this.treedata.getLevelPath(event.detail.key)
            : null;

        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name select
         * @param {(DOMRect|null)} bounds Bounds of the last item to have been selected or unselected, if it was a manual selection. Null if the selection was updated automatically.
         * @param {(number[]|null)} levelPath Array of the levels of depth of the last item to have been selected or unselected.
         * The levels start from 0. For example, if an item is the third child of its parent, and its parent is the second child of the tree root, the value would be: ``[1, 2]``.
         * Null if the selection was updated automatically.
         * @param {string[]} selectedItems Array of selected items names.
         * @public
         * @bubbles
         * @cancelable
         * @composed
         */
        const customEvent = new CustomEvent('select', {
            bubbles: true,
            composed: true,
            cancelable: true,
            detail: {
                bounds: event ? event.detail.bounds : null,
                levelPath,
                selectedItems: this.selectedItems
            }
        });

        if (this.allowInlineEdit) {
            clearTimeout(this._selectTimeout);
            this._selectTimeout = setTimeout(() => {
                // Prevent a double click from dispatching a select event twice.
                this.dispatchEvent(customEvent);
            }, 300);
        } else {
            this.dispatchEvent(customEvent);

            if (customEvent.defaultPrevented) {
                if (event) {
                    event.preventDefault();
                }
                this._selectedItems = this._previousSelectedItems;
            }
        }
        this._previousSelectedItems = [];
    }
}

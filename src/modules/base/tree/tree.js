import { LightningElement, api, track } from 'lwc';
import { TreeData } from './treeData';
import { generateUUID } from 'c/utils';
import {
    keyCodes,
    deepCopy,
    normalizeArray,
    normalizeBoolean
} from 'c/utilsPrivate';

const DEFAULT_ACTION_NAMES = ['add', 'edit', 'delete', 'duplicate'];
const DEFAULT_EDIT_FIELDS = [
    'label',
    'metatext',
    'name',
    'href',
    'expanded',
    'disabled',
    'isLoading'
];
const DEFAULT_FOCUSED = { key: '1', parent: '0' };
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';

/**
 * Editable tree of nested items. Used to display a visualization of a structural hierarchy.
 */
export default class Tree extends LightningElement {
    /**
     * Tree heading.
     *
     * @type {string}
     */
    @api header;

    _actions = [];
    _actionsWhenDisabled = [];
    _allowInlineEdit = false;
    _editFields = DEFAULT_EDIT_FIELDS;
    _isLoading = false;
    @track _items = [];
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _readOnly = false;
    _selectedItem;
    _sortable = false;

    callbackMap = {};
    @track children = [];
    focusedChild;
    rootElement;
    treedata = new TreeData();
    _computedSelectedItem;
    _currentFocusedItem;
    _dragState;
    _setFocus = false;
    _mouseDownTimeout;
    _mouseOverItemTimeout;

    connectedCallback() {
        this.initItems();

        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    renderedCallback() {
        if (this._computedSelectedItem) {
            this.setFocusToItem(this._currentFocusedItem, this._setFocus);
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
     */
    @api
    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /**
     * Array of action objects to display to the right of disabled items.
     *
     * @type {object[]}
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
     * NB: If inline editing is allowed, the label link will be disabled.
     *
     * @type {boolean}
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
     * Array of fields that should be visible in the item edit form. The item edit form can be opened through the standard edit action.
     *
     * @type {string[]}
     * @default ['label', 'metatext', 'name', 'href', 'expanded', 'disabled', 'isLoading']
     */
    @api
    get editFields() {
        return this._editFields;
    }

    set editFields(value) {
        this._editFields = normalizeArray(value);
    }

    /**
     * If present, the tree is loading and shows a spinner.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Array of item objects.
     *
     * @type {object[]}
     */
    @api
    get items() {
        return this._items || [];
    }

    set items(value) {
        const items = normalizeArray(value);
        this._items = items.map((item) => {
            return this.treedata.cloneItems(item);
        });

        if (this.isConnected) this.initItems();
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
     * Name of the tree item to select and highlight. Tree item names are case-sensitive.
     * If the tree item is nested, selecting this item also expands the parent branches.
     *
     * @type {string}
     */
    @api
    get selectedItem() {
        return this._selectedItem;
    }

    set selectedItem(value) {
        this._selectedItem = value;
        if (this.isConnected) this.syncSelected();
    }

    /**
     * If present, the tree item are sortable.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get sortable() {
        return this._sortable;
    }

    set sortable(value) {
        this._sortable = value;
        if (this.isConnected) this.syncSelected();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get addAction() {
        return this.actions.find((action) => action.name === 'add');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Check the input data for circular references or cycles,
     * Build a list of items in depth-first manner for traversing the tree by keyboard
     * This list - treeItems is an array of data-keys of the nodes using which nodes can be accessed by querySelector
     * Build a list of visible items to be checked while traversing the tree, at any point any branch is expanded
     * or collapsed, this list has to be kept updated
     */
    initItems() {
        this.setFocusToItem({});
        this.treedata = new TreeData();
        if (!this.items.length) {
            this.children = [];
            this.rootElement = null;
            return;
        }

        const treeRoot = this.treedata.parse(this.items, this.selectedItem);
        this.children = treeRoot ? treeRoot.children : [];
        this._computedSelectedItem = treeRoot.selectedItem;
        this.rootElement = this.children.length > 0 ? treeRoot.key : null;
        if (this.rootElement) this.syncCurrentFocused();
    }

    addItem(parentKey) {
        const name = generateUUID();
        const newItem = {
            label: 'New branch',
            name,
            items: []
        };

        if (parentKey) {
            // Add a new item in a nested branch
            const path = parentKey.split('.');
            const branch = this.getBranch(path);
            branch.items.unshift(newItem);
        } else {
            // Add a new item in the main branch
            this.items.push(newItem);
        }

        this._selectedItem = name;
    }

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
        this.callbackMap[key].removeBorder();
        this.callbackMap[key].setBorder();
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

    collapseBranch(node) {
        if (!node.isLeaf && !node.disabled) {
            node.nodeRef.expanded = false;
            this.treedata.updateVisibleTreeItemsOnCollapse(node.key);
            this.dispatchChange(node.name, 'collapse');
        }
    }

    deleteItem(key) {
        const { index, items } = this.getPositionInBranch(key);

        return items.splice(index, 1)[0];
    }

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

    duplicateItem(key) {
        const { index, items } = this.getPositionInBranch(key);
        const name = generateUUID();
        const duplicated = this.treedata.cloneItems(items[index]);
        duplicated.name = name;
        items.splice(index + 1, 0, duplicated);
        this._selectedItem = name;
    }

    expandBranch(node) {
        if (!node.isLeaf && !node.disabled) {
            node.nodeRef.expanded = true;
            if (
                this._computedSelectedItem &&
                this._computedSelectedItem.key.startsWith(node.key)
            ) {
                // focus after expansion happens and elements are rerendered
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                setTimeout(() => {
                    this.setFocusToItem(this._computedSelectedItem);
                }, 0);
            }

            // Need to dispatch a change event specifically for interop to pick up the change to node.expanded
            this.dispatchChange(node.name, 'expand');
        }
    }

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

    getPositionInBranch(key) {
        const path = key.split('.');
        const index = parseInt(path.pop(), 10) - 1;
        const branch = this.getBranch(path);
        const items = path.length ? branch.items : branch;
        return { index, items };
    }

    /**
     * Moves focus to the first item node
     * */
    setFocusToFirstItem() {
        const node = this.treedata.findFirstNodeToFocus();
        if (node && node.index !== -1) {
            this.setFocusToItem(node);
        }
    }

    /**
     * Sets focus to given node item with data-key, marks this node as focusable
     * and all other non-focusable (tabindex -1)
     * @param {String} item - item in the index which has to receive focus
     * @param {boolean} shouldFocus - should put focus on item or not,
     *     default true, false when only visual focus is necessary
     * @param {boolean} shouldSelect - should add visual focus to item,
     *     default true, false when visual focus not necessary
     */
    setFocusToItem(item, shouldFocus = true, shouldSelect = true) {
        const currentFocused = this.treedata.getItemAtIndex(
            this.treedata.currentFocusedItemIndex
        );

        if (
            currentFocused &&
            currentFocused.key !== item.key &&
            this.callbackMap[currentFocused.key]
        ) {
            this.callbackMap[currentFocused.key].unfocus();
        }
        if (item) {
            this._currentFocusedItem =
                this.treedata.updateCurrentFocusedItemIndex(item.index);

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
     * Moves focus to the last item node which is visible in depth first manner
     * */
    setFocusToLastItem() {
        const lastNode = this.treedata.findLastNodeToFocus();
        if (lastNode && lastNode.index !== -1) {
            this.setFocusToItem(lastNode);
        }
    }

    /**
     * If its not the last item node in the tree, moves focus to next visible item in the tree
     * If its last item node, focus stays as it is
     */
    setFocusToNextItem() {
        const nextNode = this.treedata.findNextNodeToFocus();
        if (nextNode && nextNode.index !== -1) {
            this.setFocusToItem(nextNode);
        }
    }

    /**
     * If its not the first item node in the tree, moves focus to previous visible item in the tree
     * If its first item node, focus stays as it is
     */
    setFocusToPrevItem() {
        const prevNode = this.treedata.findPrevNodeToFocus();
        if (prevNode && prevNode.index !== -1) {
            this.setFocusToItem(prevNode);
        }
    }

    setFocusToRootItem(key, shouldFocus, shouldSelect) {
        const child = this.template.querySelector(`[data-key="${key}"]`);
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
    }

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
            this.callbackMap[item.key].setBorder('bottom', level);
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
            const level = parentItem ? parentItem.level : 1;
            this.callbackMap[item.key].setBorder('bottom', level);
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
                this.callbackMap[item.key].setBorder(
                    'bottom',
                    lastChildItem.level
                );
            }
        }
    }

    showTopBorderOnHoveredItem(x) {
        if (!this._dragState) return;

        const { initialX, item } = this._dragState;
        const hasMovedRight = x > initialX + 10;

        if (isNaN(initialX)) {
            // Show the top border
            this._dragState.position = 'top';
            this._dragState.initialX = x;
            this.callbackMap[item.key].removeBorder();
            this.callbackMap[item.key].setBorder('top');
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

    syncCurrentFocused() {
        if (this._computedSelectedItem) {
            this._currentFocusedItem = this._computedSelectedItem;
        } else {
            this._currentFocusedItem = DEFAULT_FOCUSED;
        }

        this.updateCurrentFocusedChild();
    }

    syncSelected() {
        if (!this.children.length) return;

        this._computedSelectedItem = this.treedata.syncSelectedToData(
            this.selectedItem
        );
        this.syncCurrentFocused();

        if (!this._computedSelectedItem) {
            this.setFocusToItem(this._currentFocusedItem, false, false);
        }
    }

    updateCurrentFocusedChild() {
        if (this.rootElement === this._currentFocusedItem.parent) {
            this.focusedChild = this.treedata.getChildNum(
                this._currentFocusedItem.key
            );
        } else {
            this.focusedChild = this._currentFocusedItem.key;
            this.treedata.updateCurrentFocusedChild(
                this._currentFocusedItem.key
            );
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleActionClick(event) {
        event.stopPropagation();
        const action = event.detail.name || 'add';
        const key = event.detail.key;
        const item = this.treedata.getItem(key);
        let name = item ? item.treeNode.name : null;

        const actionClickEvent = new CustomEvent('actionclick', {
            detail: {
                name: action,
                targetName: name
            },
            cancelable: true
        });
        this.dispatchEvent(actionClickEvent);

        if (
            actionClickEvent.defaultPrevented ||
            !DEFAULT_ACTION_NAMES.includes(action)
        )
            return;

        let previousName;
        switch (action) {
            case 'add': {
                this.addItem(key);
                break;
            }
            case 'edit': {
                return;
            }
            case 'delete': {
                const prevItem = this.treedata.findPrevNodeToFocus(item.index);
                if (prevItem) {
                    this._selectedItem = prevItem.treeNode.name;
                }
                this.deleteItem(key);
                break;
            }
            case 'duplicate': {
                previousName = item.treeNode.name;
                this.duplicateItem(key);
                name = this._selectedItem;
                break;
            }
            default: {
                break;
            }
        }

        this.initItems();
        this.dispatchChange(name, action, previousName);
        this._setFocus = true;
    }

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

        this.initItems();
        this.dispatchChange(item.name, 'edit', previousName);
        this._setFocus = true;
    }

    handleChildBranchCollapse(event) {
        event.stopPropagation();
        this.treedata.updateVisibleTreeItemsOnCollapse(event.detail.key);
    }

    handleClick(event) {
        const key = event.detail.key;
        const target = event.detail.target;
        const item = this.treedata.getItem(key);

        if (item) {
            if (target === 'chevron') {
                if (item.treeNode.nodeRef.expanded) {
                    this.collapseBranch(item.treeNode);
                } else {
                    this.expandBranch(item.treeNode);
                }
            } else if (target === 'anchor') {
                this._computedSelectedItem = item;
                this.dispatchSelectEvent(item.treeNode, event);
                this.setFocusToItem(item);
            }
        }
    }

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
                } else {
                    // if this is a leaf, move focus to its parent group and collapse it, move focus there
                    // if this is a collapsed group, move focus to its parent group and collapse it, move focus there
                    this.handleParentCollapse(key);
                }
                break;

            default:
                break;
        }
    }

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
            this._selectedItem = name;
            this.setFocusToItem(item);

            // Remove item hover color
            const tree = this.template.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            tree.style.cssText = '--avonni-tree-item-color-hover: transparent;';
        }, 200);
    }

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

    handleMouseUp = () => {
        clearTimeout(this._mouseDownTimeout);
        clearTimeout(this._mouseOverItemTimeout);
        if (!this._dragState || !this.sortable) return;

        const { currentLevelItem, item, key, position } = this._dragState;
        this.callbackMap[item.key].removeBorder();
        const currentItem = currentLevelItem || item;

        if (currentItem.key !== key) {
            // Get the item, and its initial position in the tree
            const initialPosition = this.getPositionInBranch(key);
            const initialBranch = initialPosition.items;
            const initialIndex = initialPosition.index;
            const initialItem = this.treedata.cloneItems(
                initialBranch[initialIndex]
            );
            const temporaryName = generateUUID();
            initialBranch[initialIndex].name = temporaryName;

            // Get the new position of the item in the tree
            const { items, index } = this.getPositionInBranch(currentItem.key);

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
            this.initItems();
            this.dispatchChange(initialItem.name, 'move');
        }

        this._dragState = null;

        // Reset item hover color
        const tree = this.template.querySelector(
            '[data-element-id="div-tree-wrapper"]'
        );
        tree.style.cssText = null;
    };

    /**
     * For leaf arrow key, in case it is leaf or already collapsed node
     * go to parent and call its collapse callback
     *
     * @param {string} key of the parent to collapse
     */
    handleParentCollapse(key) {
        const item = this.treedata.getItem(key);
        if (item && item.level > 1) {
            // if not item at the level 1 which cant be collapsed further
            const parent = this.treedata.getItem(item.parent);
            this.collapseBranch(parent.treeNode);
            this.setFocusToItem(parent);
        }
    }

    handleRegistration(event) {
        event.stopPropagation();
        const { bounds, key, focus, removeBorder, setBorder, unfocus } =
            event.detail;

        this.callbackMap[key] = {
            bounds,
            focus,
            removeBorder,
            setBorder,
            unfocus
        };
        this.treedata.addVisible(key);
    }

    dispatchChange(name, action, previousName) {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    action,
                    items: deepCopy(this.items),
                    name,
                    previousName
                }
            })
        );
    }

    dispatchSelectEvent(node, event) {
        if (!node.disabled) {
            const customEvent = new CustomEvent('select', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { name: node.name }
            });
            this.dispatchEvent(customEvent);

            if (customEvent.defaultPrevented) {
                event.preventDefault();
            }
        }
    }
}

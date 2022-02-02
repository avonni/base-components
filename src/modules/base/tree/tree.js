import { LightningElement, api, track } from 'lwc';
import { TreeData } from './treeData';
import { generateUUID } from 'c/utils';
import { keyCodes, deepCopy, normalizeArray } from 'c/utilsPrivate';

const DEFAULT_FOCUSED = { key: '1', parent: '0' };

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
    @track _items = [];

    callbackMap = {};
    @track children = [];
    focusedChild;
    rootElement;
    treedata = new TreeData();
    _computedSelectedItem;
    _currentFocusedItem;
    _dragState;
    _selectedItem;
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initDragState(item) {
        const prevItem = this.treedata.findPrevNodeToFocus(item.index);
        const nextItem = this.treedata.findNextNodeToFocus(item.index);
        const bounds = this.callbackMap[item.key].bounds();

        this._dragState = {
            centerBottomLimit: bounds.bottom - bounds.height / 3,
            centerTopLimit: bounds.top + bounds.height / 3,
            item,
            key: item.key,
            nextItem,
            prevItem
        };

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

    collapseBranch(node) {
        if (!node.isLeaf && !node.isDisabled) {
            node.nodeRef.expanded = false;
            this.treedata.updateVisibleTreeItemsOnCollapse(node.key);
            this.dispatchChange();
        }
    }

    deleteItem(key) {
        const { index, items } = this.getPositionInBranch(key);

        return items.splice(index, 1)[0];
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
        if (!node.isLeaf && !node.isDisabled) {
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
            this.dispatchChange();
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

        if (currentFocused && currentFocused.key !== item.key) {
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

    handleAddBranch(event) {
        const name = generateUUID();
        const key = event.detail.key;
        const newItem = {
            label: 'New branch',
            name,
            items: [],
            expanded: false
        };

        if (key) {
            // Add a new item in a nested branch
            const path = key.split('.');
            const branch = this.getBranch(path);
            branch.items.unshift(newItem);
        } else {
            // Add a new item in the main branch
            this.items.push(newItem);
        }

        this._selectedItem = name;
        this.initItems();
        this.dispatchChange();
        this._setFocus = true;
    }

    handleBranchAction(event) {
        event.stopPropagation();

        const { action, key } = event.detail;

        if (action === 'duplicate') {
            this.duplicateItem(key);
        } else if (action === 'delete') {
            const prevItem = this.treedata.findPrevNodeToFocus();
            this._selectedItem = prevItem.treeNode.name;
            this.deleteItem(key);
        }

        this.initItems();
        this.dispatchChange();
        this._setFocus = true;
    }

    handleChange(event) {
        event.stopPropagation();

        const { key, values } = event.detail;
        const path = key.split('.');
        const item = this.getBranch(path);

        Object.entries(values).forEach(([property, value]) => {
            item[property] = value;
        });

        this.initItems();
        this.dispatchChange();
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
                this.dispatchSelectEvent(item.treeNode);
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

        // Start the dragging process only if the button is pressed long enough
        clearTimeout(this._mouseDownTimeout);
        this._mouseDownTimeout = setTimeout(() => {
            const { key, name } = event.detail;
            const item = this.treedata.getItem(key);

            if (item.treeNode.nodeRef.expanded) {
                // Collapse branch
                this.collapseBranch(item.treeNode);
            }

            this.initDragState(item);
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
        if (!this._dragState) return;

        const {
            bottomLimit,
            centerBottomLimit,
            centerTopLimit,
            item,
            key,
            position,
            topLimit
        } = this._dragState;
        const y = event.clientY;

        if (y < topLimit) {
            // Set the previous item as the current item
            this.handleMouseMoveToPreviousItem();
        } else if (position !== 'top' && y >= topLimit && y < centerTopLimit) {
            // Show the top border
            this._dragState.position = 'top';
            this.callbackMap[item.key].removeBorder();
            this.callbackMap[item.key].setBorder('top');
        } else if (
            position !== 'center' &&
            y >= centerTopLimit &&
            y <= centerBottomLimit
        ) {
            // Expand the current item
            this._dragState.position = 'center';
            if (item.key !== key) this.handleMouseMoveToCenterOfItem();
        } else if (
            position !== 'bottom' &&
            y > centerBottomLimit &&
            y <= bottomLimit
        ) {
            // Show the bottom border
            this._dragState.position = 'bottom';
            this.callbackMap[item.key].removeBorder();
            this.callbackMap[item.key].setBorder('bottom');
        } else if (y > bottomLimit) {
            // Set the next item as the current item
            this.handleMouseMoveToNextItem();
        }

        if (this._dragState.position !== 'center') {
            // If the mouse has moved from the center,
            // prevent the item expansion
            clearTimeout(this._mouseOverItemTimeout);
        }
    };

    handleMouseMoveToCenterOfItem() {
        const { key, treeNode, index } = this._dragState.item;
        this.callbackMap[key].removeBorder();
        this.callbackMap[key].setBorder();

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

    handleMouseMoveToNextItem() {
        if (!this._dragState) return;

        // Set the current item to the next item
        this._dragState.prevItem = this._dragState.item;
        this._dragState.item = this._dragState.nextItem;
        const { bottomLimit, centerBottomLimit, item, prevItem } =
            this._dragState;
        this.callbackMap[prevItem.key].removeBorder();

        // Find the new next item
        const nextItem = this.treedata.findNextNodeToFocus(item.index);
        this._dragState.nextItem = nextItem;

        // Set the new dragging limits
        this._dragState.topLimit = centerBottomLimit;
        this._dragState.centerTopLimit = bottomLimit;
        const bounds = this.callbackMap[item.key].bounds();
        this._dragState.centerBottomLimit = bounds.bottom - bounds.height / 3;

        if (nextItem) {
            const nextBounds = this.callbackMap[nextItem.key].bounds();
            this._dragState.bottomLimit =
                nextBounds.top + nextBounds.height / 3;
        } else {
            this._dragState.bottomLimit = Infinity;
        }
    }

    handleMouseMoveToPreviousItem() {
        if (!this._dragState) return;

        // Set the current item to the previous item
        this._dragState.nextItem = this._dragState.item;
        this._dragState.item = this._dragState.prevItem;
        const { centerTopLimit, topLimit, item, nextItem } = this._dragState;
        this.callbackMap[nextItem.key].removeBorder();

        // Find the new previous item
        const prevItem = this.treedata.findPrevNodeToFocus(item.index);
        this._dragState.prevItem = prevItem;

        // Set the new dragging limits
        this._dragState.bottomLimit = centerTopLimit;
        this._dragState.centerBottomLimit = topLimit;
        const bounds = this.callbackMap[item.key].bounds();
        this._dragState.centerTopLimit = bounds.top + bounds.height / 3;

        if (prevItem) {
            const prevBounds = this.callbackMap[prevItem.key].bounds();
            this._dragState.topLimit =
                prevBounds.bottom - prevBounds.height / 3;
        } else {
            this._dragState.topLimit = null;
        }
    }

    handleMouseUp = () => {
        clearTimeout(this._mouseDownTimeout);
        clearTimeout(this._mouseOverItemTimeout);
        if (!this._dragState) return;

        const { item, key, position } = this._dragState;
        this.callbackMap[item.key].removeBorder();

        if (item.key !== key) {
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
            const { items, index } = this.getPositionInBranch(item.key);

            // Copy the item in the new position
            switch (position) {
                case 'top':
                    items.splice(index, 0, initialItem);
                    break;
                case 'bottom':
                    if (items[index].items.length && index === 0) {
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
            this.dispatchChange();
        }

        this.callbackMap[item.key].removeBorder();
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
        const { bounds, key, focus, setBorder, removeBorder, unfocus } =
            event.detail;

        this.callbackMap[key] = {
            bounds,
            focus,
            setBorder,
            removeBorder,
            unfocus
        };
        this.treedata.addVisible(key);
    }

    dispatchChange() {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    items: deepCopy(this.items)
                }
            })
        );
    }

    dispatchSelectEvent(node) {
        if (!node.isDisabled) {
            const customEvent = new CustomEvent('select', {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: { name: node.name }
            });
            this.dispatchEvent(customEvent);
        }
    }
}

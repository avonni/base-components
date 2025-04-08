const SELECT_ALL_ACTION = {
    label: 'Select All Descendants',
    name: 'select-all'
};

const SELECT_IMMEDIATE_CHILDREN_ACTION = {
    label: 'Select Immediate Descendants',
    name: 'select-immediate'
};

const UNSELECT_ALL_ACTION = {
    label: 'Unselect All Descendants',
    name: 'unselect-all'
};

/*
 * -------------------------------------------------------------
 *  PRIVATE FUNCTIONS
 * -------------------------------------------------------------
 */

function _getChildrenNames(item) {
    const children = [];
    if (Array.isArray(item.items)) {
        item.items.forEach((childItem) => {
            if (childItem.name) {
                children.push(childItem.name);
                const grandChildren = _getChildrenNames(childItem);
                if (grandChildren.length) {
                    children.push(...grandChildren);
                }
            }
        });
    }
    return children;
}

function _selectChildren({ action, item, selectedItems }) {
    if (!action || !Array.isArray(item.items)) {
        return;
    }
    const selectAll = action === SELECT_ALL_ACTION.name;
    const selectImmediate = action === SELECT_IMMEDIATE_CHILDREN_ACTION.name;

    if (selectAll) {
        const childrenNames = _getChildrenNames(item);
        childrenNames.forEach((child) => {
            selectedItems.add(child);
        });
    } else if (selectImmediate) {
        item.items.forEach((child) => {
            selectedItems.add(child.name);
        });
    }
}

function _unselectChildren({ action, item, selectedItems }) {
    if (action !== UNSELECT_ALL_ACTION.name || !Array.isArray(item.items)) {
        return;
    }
    const childrenNames = _getChildrenNames(item);
    childrenNames.forEach((child) => {
        selectedItems.delete(child);
    });
}

/*
 * -------------------------------------------------------------
 *  PUBLIC FUNCTIONS
 * -------------------------------------------------------------
 */

function getItemByName(name, items = []) {
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.name === name || item.value === name) {
            return item;
        }

        if (Array.isArray(item.items)) {
            const childItem = getItemByName(name, item.items);
            if (childItem) {
                return childItem;
            }
        }
    }
    return null;
}

function getTreeItemByLevelPath(levelPath = [], items = []) {
    let item;
    let level = items;

    for (let i = 0; i < levelPath.length; i += 1) {
        const index = levelPath[i];
        item = level[index];
        if (!item) {
            break;
        }
        level = item.items || [];
    }
    return item;
}

function toggleTreeItemValue({ action, item, value }) {
    const index = value.indexOf(item.name);
    const selectedItems = new Set(value);
    const isSelected = index < 0;

    if (isSelected) {
        item.checked = true;
        selectedItems.add(item.name);
        _selectChildren({ action, item, selectedItems });
    } else {
        item.checked = false;
        selectedItems.delete(item.name);
        _unselectChildren({ action, item, selectedItems });
    }
    return Array.from(selectedItems);
}

export {
    getItemByName,
    getTreeItemByLevelPath,
    SELECT_ALL_ACTION,
    SELECT_IMMEDIATE_CHILDREN_ACTION,
    toggleTreeItemValue,
    UNSELECT_ALL_ACTION
};

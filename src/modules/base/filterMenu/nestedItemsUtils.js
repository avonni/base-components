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

function _selectChildren({ item, cascade, selectedItems }) {
    if (!Array.isArray(item.items)) {
        return;
    }
    item.items.forEach((child) => {
        selectedItems.add(child.name);
        child.checked = true;
        child.updateActions();

        if (cascade) {
            _selectChildren({ item: child, selectedItems });
        }
    });
}

function _unselectChildren({ item, selectedItems }) {
    if (!Array.isArray(item.items)) {
        return;
    }
    item.items.forEach((child) => {
        selectedItems.delete(child.name);
        child.checked = false;
        child.updateActions();
        _unselectChildren({ item: child, selectedItems });
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
        item.updateActions();
        selectedItems.add(item.name);
        const selectAll = action === SELECT_ALL_ACTION.name;
        const selectImmediate =
            action === SELECT_IMMEDIATE_CHILDREN_ACTION.name;
        if (selectAll || selectImmediate) {
            _selectChildren({ item, selectedItems, cascade: selectAll });
        }
    } else {
        item.checked = false;
        item.updateActions();
        selectedItems.delete(item.name);

        const unselectAll = action === UNSELECT_ALL_ACTION.name;
        if (unselectAll) {
            _unselectChildren({ item, selectedItems });
        }
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

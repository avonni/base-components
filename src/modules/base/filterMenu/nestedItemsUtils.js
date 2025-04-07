const SELECT_ALL_ACTION = {
    label: 'Select All',
    name: 'select-all'
};

const UNSELECT_ALL_ACTION = {
    label: 'Unselect All',
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

function toggleTreeItemValue({ cascade = false, item, value }) {
    const childrenNames = _getChildrenNames(item);
    const index = value.indexOf(item.name);
    const selectedItems = new Set(value);
    const isSelected = index < 0;
    if (isSelected) {
        item.checked = true;
        selectedItems.add(item.name);

        if (cascade) {
            childrenNames.forEach((child) => {
                selectedItems.add(child);
            });
        }
    } else {
        item.checked = false;
        selectedItems.delete(item.name);

        if (cascade) {
            childrenNames.forEach((child) => {
                selectedItems.delete(child);
            });
        }
    }
    return Array.from(selectedItems);
}

export {
    getItemByName,
    getTreeItemByLevelPath,
    SELECT_ALL_ACTION,
    toggleTreeItemValue,
    UNSELECT_ALL_ACTION
};

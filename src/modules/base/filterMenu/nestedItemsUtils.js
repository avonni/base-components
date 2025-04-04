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

function getTreeItemByLevelPath(levelPath = [], items = []) {
    let item;
    let level = items;

    for (let i = 0; i < levelPath.length; i += 1) {
        const index = levelPath[i];
        item = level[index];
        if (!item || !Array.isArray(item.items)) {
            return null;
        }
        level = item.items;
    }
    return item;
}

function getTreeItemByName(name, items = []) {
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.name === name) {
            return item;
        }

        if (Array.isArray(item.items)) {
            const childItem = getTreeItemByName(name, item.items);
            if (childItem) {
                return childItem;
            }
        }
    }
    return null;
}

function toggleTreeItemValue(item, value) {
    const childrenNames = _getChildrenNames(item);
    const index = value.indexOf(item.name);
    const selectedItems = new Set(value);
    const isSelected = index < 0;
    if (isSelected) {
        item.checked = true;
        selectedItems.add(item.name);
        childrenNames.forEach((child) => {
            selectedItems.add(child);
        });
    } else {
        item.checked = false;
        selectedItems.delete(item.name);
        childrenNames.forEach((child) => {
            selectedItems.delete(child);
        });
    }
    return Array.from(selectedItems);
}

function updateTreeItemParentsStatus(levelPath, items = [], isSelected) {
    let level = items;

    for (let i = 0; i < levelPath.length - 1; i += 1) {
        const index = levelPath[i];
        const item = level[index];
        if (!item) {
            return;
        }
        item.indeterminate = isSelected;
        level = item.items || [];
    }
}

export {
    getTreeItemByLevelPath,
    getTreeItemByName,
    toggleTreeItemValue,
    updateTreeItemParentsStatus
};

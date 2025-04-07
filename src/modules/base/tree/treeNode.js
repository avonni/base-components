import { normalizeArray } from 'c/utils';

/**
 * Compute an item key value.
 *
 * @param {string} parentKey Key of the parent item.
 * @param {number} childNum Number of the item in the parent.
 * @returns {string} Key of the item.
 */
function computeKey(parentKey, childNum) {
    if (!parentKey) {
        return '0';
    }
    if (parentKey === '0') {
        return `${childNum}`;
    }
    return `${parentKey}.${childNum}`;
}

/**
 * Create a usable tree item object.
 *
 * @param {object} node Original item.
 * @param {number} level Depth level of the item in the tree.
 * @param {string} parentKey Key of the parent item.
 * @param {number} childNum Number of the item in its parent.
 * @returns {object} Tree node object.
 */
export function getTreeNode({
    actions,
    childNum,
    disabled,
    level,
    node,
    parentKey
}) {
    const computedActions = [
        ...normalizeArray(actions),
        ...normalizeArray(node.actions)
    ];
    return {
        actions: computedActions,
        avatar: node.avatar,
        children: [],
        color: node.color,
        disabled: node.disabled || disabled || false,
        enableInfiniteLoading: node.enableInfiniteLoading || false,
        get expanded() {
            return this.isLeaf && !this.isLoading
                ? true
                : node.expanded || false;
        },
        fields: node.fields,
        href: node.href,
        iconName: node.iconName,
        indeterminate: node.indeterminate || false,
        isLeaf:
            !node.enableInfiniteLoading &&
            !node.isLoading &&
            (!node.items ||
                (Array.isArray(node.items) && node.items.length === 0)),
        isLoading: node.isLoading || false,
        key: computeKey(parentKey, childNum),
        label: node.label,
        level,
        metatext: node.metatext,
        name: node.name,
        nodeRef: node,
        visible: level === 1,
        visibleItems: []
    };
}

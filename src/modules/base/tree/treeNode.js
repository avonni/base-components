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
export function getTreeNode(node, level, parentKey, childNum) {
    return {
        avatar: node.avatar,
        children: [],
        disabled: node.disabled || false,
        get expanded() {
            return this.isLeaf && !this.isLoading
                ? true
                : node.expanded || false;
        },
        fields: node.fields,
        href: node.href,
        isLeaf:
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
        get strexpanded() {
            return (
                this.isLeaf ? true : this.nodeRef.expanded || false
            ).toString();
        },
        visible: level === 1,
        visibleItems: []
    };
}

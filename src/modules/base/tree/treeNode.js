function computeKey(parentKey, childNum) {
    if (!parentKey) {
        return '0';
    }
    if (parentKey === '0') {
        return `${childNum}`;
    }
    return `${parentKey}.${childNum}`;
}

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
        focusedChild: null,
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
        selected: node.selected,
        get strexpanded() {
            return (
                this.isLeaf ? true : this.nodeRef.expanded || false
            ).toString();
        },
        visible: level === 1,
        visibleItems: []
    };
}

// borrowed from bootstrap
const screenReaderOnlyStyles = `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
`;

let microtaskQueued = false;
const queue = [];

function flushQueue() {
    const sortedQueue = [...queue].sort((a, b) => a.priority - b.priority);
    queue.length = 0;
    microtaskQueued = false;
    sortedQueue.forEach(({ callback }) => callback());
}

// Queue a microtask, but execute with the given priority (lower priority runs first)
function queueMicrotaskWithPriority(priority, callback) {
    queue.push({ callback, priority });
    if (microtaskQueued) {
        return;
    }
    microtaskQueued = true;
    Promise.resolve().then(flushQueue);
}

// borrowed from https://github.com/salesforce/kagekiri/blob/cfd0699/src/index.js#L18-L31
function getChildNodesIgnoringShadowRoot(node) {
    if (node.shadowRoot) {
        // shadow host
        return node.shadowRoot.childNodes;
    } else if (typeof node.assignedNodes === 'function') {
        // slot
        // If the slot has assigned elements, then those
        // should be shown. Otherwise the (default) children should be shown.
        const assigned = node.assignedNodes();
        return assigned.length ? assigned : node.childNodes;
    }
    // regular element
    return node.childNodes;
}

// borrowed from https://github.com/salesforce/kagekiri/blob/cfd0699/src/index.js#L72-L87
function getParentIgnoringShadowRoot(element) {
    // If an element is slotted, ignore the "real" parent and use the shadow DOM parent.
    // Unless the slot is also slotted; just return the parent element in this case.
    if (
        typeof element.assignedNodes !== 'function' &&
        element.assignedSlot &&
        element.assignedSlot.parentElement
    ) {
        return element.assignedSlot.parentElement;
    }
    if (element.parentElement) {
        return element.parentElement;
    }
    // if an element is inside the shadow DOM, break outside of it
    const rootNode = element.getRootNode();
    /* istanbul ignore else */
    if (rootNode !== document) {
        return rootNode.host;
    }
    return null;
}

function isAncestor(node, possibleAncestor) {
    let ancestor = node;
    while (ancestor !== null && ancestor !== undefined) {
        ancestor = getParentIgnoringShadowRoot(ancestor);
        if (ancestor === possibleAncestor) {
            return true;
        }
    }
    return false;
}

// MutationObserver that deeply observes open shadow roots

class DeepMutationObserver {
    constructor(rootNode) {
        this._observers = [];
        this._callbacks = [];

        const observedNodes = [];

        // Avoid adding a mutation observer to a node when its ancestor is already being observed
        // When we cross shadow boundaries, Node.contains() will automatically return false because
        // it's not an ancestor-descendant relationship in the same shadow root
        const alreadyObserved = (node) => {
            return observedNodes.some((otherNode) => otherNode.contains(node));
        };

        const observe = (node) => {
            if (!alreadyObserved(node)) {
                observedNodes.push(node);
                const observer = new MutationObserver(() =>
                    this._mutationCallback()
                );
                observer.observe(node, {
                    subtree: true,
                    attributes: true,
                    childList: true,
                    characterData: true
                });
                this._observers.push(observer);
            }
            getChildNodesIgnoringShadowRoot(node).forEach((child) =>
                observe(child)
            );
        };
        observe(rootNode);
    }

    onMutation(callback) {
        this._callbacks.push(callback);
    }

    _mutationCallback() {
        queueMicrotaskWithPriority(/* priority */ 0, () =>
            this._callbacks.forEach((callback) => callback())
        );
    }

    disconnect() {
        this._observers.forEach((observer) => observer.disconnect());
        this._observers = undefined;
        this._callbacks = undefined;
    }
}

// Figure out what tasks we actually need to do, based on the minimal

function collateTasks(tasks) {
    const mapOfFromRootsToTasks = new Map();
    tasks.forEach((task) => {
        // TODO: fast path if both nodes have the same shadow root
        const { fromNode } = task;
        const fromRoot = fromNode.getRootNode();
        let collatedTask = mapOfFromRootsToTasks.get(fromRoot);
        if (!collatedTask) {
            collatedTask = {
                relationships: [],
                redundantChildNodes: new Set()
            };
            mapOfFromRootsToTasks.set(fromRoot, collatedTask);
        }
        collatedTask.relationships.push(task);
    });

    // find the common ancestor for all toNodes
    mapOfFromRootsToTasks.forEach((value) => {
        const { relationships, redundantChildNodes } = value;

        const allToNodes = relationships
            .map((relationship) => relationship.toNodes)
            .flat();

        for (let i = 0; i < allToNodes.length; i++) {
            for (let j = i + 1; j < allToNodes.length; j++) {
                const toNodeA = allToNodes[i];
                const toNodeB = allToNodes[j];

                if (toNodeA && toNodeB && i !== j) {
                    if (isAncestor(toNodeA, toNodeB)) {
                        // B is an ancestor of A
                        redundantChildNodes.add(toNodeA);
                    } else if (isAncestor(toNodeB, toNodeA)) {
                        // A is an ancestor of B
                        redundantChildNodes.add(toNodeB);
                    }
                }
            }
        }
    });

    return mapOfFromRootsToTasks;
}

function getAttributes(node) {
    const res = {};
    const { attributes } = node;
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        res[attribute.name] = attribute.value;
    }
    return res;
}

const stableIds = new WeakMap();

function generateId() {
    return 'shadow-aria-' + Math.floor(Math.random() * 1000000000).toString(16);
}

function getStableId(referenceNode) {
    let id = stableIds.get(referenceNode);
    if (!id) {
        id = generateId();
        stableIds.set(referenceNode, id);
    }
    return id;
}

// Loosely based on https://github.com/focus-trap/tabbable/blob/67452d0/src/index.js#L1-L13
// We don't actually need to support the full list; only the things that actually get mirrored (e.g. tag name)
// Also we are fine with false positives.

const TABBABLE_TAG_NAMES = new Set([
    'a',
    'audio',
    'button',
    'details',
    'input',
    'select',
    'summary',
    'textarea',
    'video'
]);

function redirectEvents(fromNode, toNode) {
    if (fromNode && toNode) {
        redirectFocusEvent(fromNode, toNode);
    }
}

function redirectFocusEvent(fromNode, toNode) {
    fromNode.addEventListener('focus', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        toNode.dispatchEvent(new event.constructor(event.type, event));
        toNode.focus();
    });
}

// These styles have an impact on accessibility (e.g. accessible name calculation, DOM hierarchy calculation),
// so they must be mirrored
const STYLE_PROPS_TO_MIRROR = ['display', 'visibility'];

function mirrorNode(node, existingNode) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (existingNode && existingNode.nodeType === Node.TEXT_NODE) {
            if (existingNode.textContent !== node.textContent) {
                existingNode.textContent = node.textContent;
            }
            return existingNode;
        }
        return node.cloneNode();
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
        // comment or other unsupported node
        return document.createComment('shadow-aria-deleted');
    }

    let { tagName } = node;
    if (['style', 'link', 'script'].includes(tagName.toLowerCase())) {
        // semantically useless
        return document.createComment('shadow-aria-deleted');
    }
    // For custom elements and slots, just render a <div> The problem with custom elements
    // is that they may bring their own shadow DOM, which we don't want. The problem
    // with slots is that they will try to render slot content since we're inside a shadow root.
    if (tagName.includes('-') || tagName.toLowerCase() === 'slot') {
        tagName = 'div';
    }
    let oldAttributes;
    let mirroredNode;
    if (
        existingNode &&
        existingNode.nodeType === Node.ELEMENT_NODE &&
        existingNode.tagName.toLowerCase() === tagName.toLowerCase()
    ) {
        // reuse existing node
        mirroredNode = existingNode;
        oldAttributes = getAttributes(mirroredNode);
    } else {
        // create a brand-new node
        mirroredNode = document.createElement(tagName);
    }
    const newAttributes = Object.fromEntries(
        [...Object.entries(getAttributes(node))].filter(
            ([name]) =>
                name.toLowerCase().startsWith('aria-') ||
                name.toLowerCase() === 'role'
        )
    );

    const computedStyle = getComputedStyle(node);

    let newStyle = '';

    STYLE_PROPS_TO_MIRROR.forEach(
        (prop) => (newStyle += `${prop}:${computedStyle[prop]};`)
    );

    if (computedStyle?.display !== 'contents') {
        // Firefox gets confused by IDs on elements with `display:contents`
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1762999
        newAttributes.id = getStableId(node);
    }

    newAttributes.style = newStyle;

    if (TABBABLE_TAG_NAMES.has(tagName.toLowerCase())) {
        newAttributes.tabindex = '-1';
    }

    Object.entries(newAttributes).forEach(([name, value]) => {
        if (!oldAttributes || oldAttributes[name] !== value) {
            mirroredNode.setAttribute(name, value);
        }
    });

    if (oldAttributes) {
        Object.keys(oldAttributes).forEach((name) => {
            if (!(name in newAttributes)) {
                mirroredNode.removeAttribute(name);
            }
        });
    }

    redirectEvents(mirroredNode, node);

    return mirroredNode;
}

function patchMirrorDomTree(root, existingRoot, trackedNodes) {
    const trackedNodesToMirroredNodes = new Map();

    const mirrorNodeRecursive = (node, existingNode) => {
        const mirroredNode = mirrorNode(node, existingNode);
        if (mirroredNode.nodeType === Node.COMMENT_NODE) {
            // ignore child nodes of comments; we don't care
            return mirroredNode;
        }
        if (trackedNodes.has(node)) {
            trackedNodesToMirroredNodes.set(node, mirroredNode);
        }
        const childNodes = getChildNodesIgnoringShadowRoot(node);
        if (
            existingNode &&
            existingNode.childNodes.length === childNodes.length
        ) {
            // patch
            for (let i = 0; i < childNodes.length; i++) {
                const existingChild = existingNode.childNodes[i];
                const child = childNodes[i];
                const newChild = mirrorNodeRecursive(child, existingChild);
                if (newChild !== existingChild) {
                    existingNode.replaceChild(newChild, existingChild);
                }
            }
        } else {
            // clear and overwrite
            if (existingNode) {
                while (existingNode.childNodes.length) {
                    existingNode.childNodes[
                        existingNode.childNodes.length - 1
                    ].remove();
                }
            }
            childNodes.forEach((childNode) => {
                const mirrorChild = mirrorNodeRecursive(childNode, null);
                mirroredNode.appendChild(mirrorChild);
            });
        }
        return mirroredNode;
    };

    const mirroredDomTree = mirrorNodeRecursive(root, existingRoot);

    return {
        mirroredNode: mirroredDomTree,
        trackedNodesToMirroredNodes
    };
}

function updateAttribute(fromNode, toNodes, relationship) {
    const newIds = toNodes.map((toNode) => toNode.getAttribute('id'));
    const existingIds = splitIds(fromNode.getAttribute(relationship));
    const linkedNodeIds = newIds.filter(
        (newId) => !existingIds.includes(newId)
    );
    const unlinkedNodeIds = existingIds.filter(
        (existingId) => !newIds.includes(existingId)
    );

    fromNode.setAttribute(relationship, newIds.join(' '));
    return { linkedNodeIds, unlinkedNodeIds };
}

function splitIds(ids) {
    if (!ids) {
        return [];
    }
    return ids.trim().split(/\s+/);
}

// Certain ARIA relationships only support one target, not multiple.
const SINGLE_TARGET_ARIA_RELATIONSHIPS = [
    'aria-activedescendant',
    'aria-errormessage'
];

const mirroredEnvironments = new WeakMap();
const taskQueue = [];

function processTask(fromRoot, task) {
    const mirroredEnvironment = getMirroredEnvironment(fromRoot);

    mirrorNodes(mirroredEnvironment, task);
    linkAndObserveNodes(mirroredEnvironment, task);
}

function getMirroredEnvironment(fromRoot) {
    let mirroredEnvironment = mirroredEnvironments.get(fromRoot);
    if (!mirroredEnvironment) {
        const mirrorRoot = document.createElement('div');
        mirrorRoot.setAttribute('class', 'aria-element-reflection-mirror');
        mirrorRoot.setAttribute('style', screenReaderOnlyStyles);
        const fromAnchorRoot = fromRoot.body || fromRoot; // for document, append to body
        fromAnchorRoot.appendChild(mirrorRoot);
        mirroredEnvironment = {
            redundantChildNodes: new Set(),
            nodesToMirroredNodes: new Map(),
            mirrorRoot
        };
        mirroredEnvironments.set(fromRoot, mirroredEnvironment);
    }
    return mirroredEnvironment;
}

function mirrorNodes(mirroredEnvironment, task) {
    const { redundantChildNodes, nodesToMirroredNodes, mirrorRoot } =
        mirroredEnvironment;

    task.redundantChildNodes.forEach((node) => redundantChildNodes.add(node));

    const rootToNodes = new Set(
        task.relationships
            .map(({ toNodes }) => toNodes)
            .flat()
            .filter(Boolean) // skip nulls
            .filter((_) => !redundantChildNodes.has(_)) // skip redundant child nodes
    );

    rootToNodes.forEach((toNode) => {
        const trackedNodes = new Set([...redundantChildNodes, toNode]);
        const { node: existingMirroredNode = null, usage = 0 } =
            nodesToMirroredNodes.get(toNode) || {};
        const { mirroredNode, trackedNodesToMirroredNodes } =
            patchMirrorDomTree(toNode, existingMirroredNode, trackedNodes);
        if (mirroredNode !== existingMirroredNode) {
            // The following line should never happen, but I feel safer having it in
            /* istanbul ignore if */
            if (existingMirroredNode) {
                mirrorRoot.removeChild(existingMirroredNode);
            }
            mirrorRoot.appendChild(mirroredNode);
        }

        trackedNodesToMirroredNodes.forEach(
            (trackedMirroredNode, trackedNode) =>
                nodesToMirroredNodes.set(trackedNode, {
                    node: trackedMirroredNode,
                    usage
                })
        );
    });
}

function linkAndObserveNodes(mirroredEnvironment, task) {
    const { nodesToMirroredNodes } = mirroredEnvironment;

    task.relationships.forEach((collatedRelationship) => {
        const { fromNode, toNodes, relationship, track, signal, mirrorOnly } =
            collatedRelationship;

        if (toNodes?.length) {
            if (!mirrorOnly) {
                const mirroredNodes = toNodes.map(
                    (toNode) => nodesToMirroredNodes.get(toNode).node
                );
                const { linkedNodeIds, unlinkedNodeIds } = updateAttribute(
                    fromNode,
                    mirroredNodes,
                    relationship
                );

                updateNodeUsage(
                    mirroredEnvironment,
                    unlinkedNodeIds,
                    linkedNodeIds
                );

                if (track) {
                    observeNode(fromNode, toNodes, signal);
                }
            }
        } else {
            // toNodes not existing indicates the relationship is severed
            const { unlinkedNodeIds } = updateAttribute(
                fromNode,
                [],
                relationship
            );
            updateNodeUsage(mirroredEnvironment, unlinkedNodeIds);
            fromNode.removeAttribute(relationship);
        }
    });
}

function updateNodeUsage(mirroredEnvironment, unlinkedNodes, linkedNodes = []) {
    const { nodesToMirroredNodes, mirrorRoot } = mirroredEnvironment;

    nodesToMirroredNodes.forEach((mirroredNode, node) => {
        if (linkedNodes.includes(mirroredNode.node.id)) {
            mirroredNode.usage++;
        } else if (
            unlinkedNodes.includes(mirroredNode.node.id) &&
            --mirroredNode.usage <= 0
        ) {
            // If mirrored node is no longer used, remove it from the mirrored environment
            nodesToMirroredNodes.delete(node);
            // If the mirrored node's parent is not the root, then its parent node
            // is being mirrored. Only that parent node can be removed at the top level
            if (mirroredNode.node.parentElement === mirrorRoot) {
                mirrorRoot.removeChild(mirroredNode.node);
            }
        }
    });
}

function observeNode(fromNode, toNodes, signal) {
    toNodes.forEach((toNode) => {
        const mutationObserver = new DeepMutationObserver(toNode);
        mutationObserver.onMutation(() => {
            updateAriaRelationship(fromNode, [toNode]);
        });
        if (signal) {
            signal.addEventListener('abort', () => {
                mutationObserver.disconnect();
            });
        }
    });
}

function processQueue() {
    // Process multiple tasks together so we can collate
    const mapOfFromRootsToTasks = collateTasks(taskQueue);
    taskQueue.length = 0;
    mapOfFromRootsToTasks.forEach((task, fromRoot) =>
        processTask(fromRoot, task)
    );
}

function updateAriaRelationship(fromNode, toNodes) {
    queueTask({ fromNode, toNodes, mirrorOnly: true });
}

function queueTask(task) {
    taskQueue.push(task);
    queueMicrotaskWithPriority(/* priority */ 1, processQueue);
}

// We accept an Element, null, or an Array of Elements
function massageToNodes(toNodes, relationship) {
    if (!Array.isArray(toNodes)) {
        toNodes = [toNodes];
    }

    toNodes = toNodes.filter(Boolean); // remove falsy values

    if (
        toNodes.length > 1 &&
        SINGLE_TARGET_ARIA_RELATIONSHIPS.includes(relationship)
    ) {
        // Certain ARIA relationships only support one target, not multiple. For those, we should warn
        // when someone tries to set multiple, and only take the first element.
        // See: https://w3c.github.io/aria/#ARIAMixin
        console.warn(
            `Multiple targets passed to aria relationship "${relationship}". ` +
                'This API only accepts a single target. Ignoring elements beyond the first one.'
        );
        toNodes = toNodes.slice(0, 1);
    }
    return toNodes;
}

function setAriaRelationship(fromNode, toNodes, relationship, options = {}) {
    const { track, signal } = options;
    toNodes = massageToNodes(toNodes, relationship);
    queueTask({
        fromNode,
        toNodes,
        relationship,
        track,
        signal
    });
}

// via https://wicg.github.io/aom/spec/aria-reflection.html#attribute-reflection
// limited to just those that define an idref relationship

function setAriaActiveDescendant(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-activedescendant', options);
}
function setAriaControls(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-controls', options);
}
function setAriaDescribedBy(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-describedby', options);
}
function setAriaDetails(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-details', options);
}
function setAriaErrorMessage(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-errormessage', options);
}
function setAriaFlowTo(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-flowto', options);
}
function setAriaLabelledBy(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-labelledby', options);
}
function setAriaOwns(fromNode, toNodes, options) {
    setAriaRelationship(fromNode, toNodes, 'aria-owns', options);
}

export {
    setAriaActiveDescendant,
    setAriaControls,
    setAriaDescribedBy,
    setAriaDetails,
    setAriaErrorMessage,
    setAriaFlowTo,
    setAriaLabelledBy,
    setAriaOwns
};

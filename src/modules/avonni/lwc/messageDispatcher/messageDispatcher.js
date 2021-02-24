// Closure to hold the APIs if and when available
let DispatcherCount = 1;
const Dispatchers = {};
const Domains = [];
const dispatcherState = {
    isMessageEventHandled: false
};
function generateDispatchId() {
    return `lightningIframeMessage-${DispatcherCount++}`;
}

export function clearDomains() {
    Domains.splice(0, Domains.length);
}

export function getDomains() {
    return Domains.map((item) => item.domain);
}

export function registerDomain(domain) {
    if (!domain || domain === '') {
        return;
    }
    const found = Domains.find((item) => item.domain === domain);
    if (found) {
        found.ref += 1;
    } else {
        Domains.push({
            domain,
            ref: 1
        });
    }
}

export function unregisterDomain(domain) {
    if (!domain || domain === '') {
        return;
    }
    const index = Domains.findIndex((item) => item.domain === domain);
    if (index >= 0) {
        const found = Domains[index];
        found.ref -= 1;
        if (found.ref === 0) {
            Domains.splice(index, 1);
        }
    }
}

export function setMessageEventHandled() {
    dispatcherState.isMessageEventHandled = true;
}

export function registerMessageHandler(handler) {
    const dispatchId = generateDispatchId();
    Dispatchers[dispatchId] = handler;

    if (!dispatcherState.isMessageEventHandled) {
        dispatcherState.isMessageEventHandled = true;
        window.addEventListener('message', (event) => {
            dispatchEvent(event);
        });
    }
    return dispatchId;
}
export function unregisterMessageHandler(dispatchId) {
    delete Dispatchers[dispatchId];
}

export function dispatchEvent(event) {
    try {
        const data = event.data ? JSON.parse(event.data) : {};
        const dispatchId = data.arguments ? data.arguments.cmpId : null;
        if (dispatchId && Dispatchers[dispatchId]) {
            Dispatchers[dispatchId](data);
            return true;
        }
    } catch (e) {
        // Catch JSON parse exception.
    }
    return false;
}

export function createMessage(dispatcherId, event, params) {
    params.cmpId = dispatcherId;
    return {
        event,
        arguments: params
    };
}

export function postMessage(handler, message, domain, useObject) {
    if (handler) {
        handler(useObject ? message : JSON.stringify(message || {}), domain);
    }
}

let iframeMessageIndex = 1;
const messageHandlers = {};
const domains = [];
const status = {
    isMessageEventHandled: false
};

export function clearDomains() {
    domains.splice(0, domains.length);
}

export function createMessage(cmpId, event, value) {
    value.cmpId = cmpId;

    return {
        event: event,
        arguments: value
    };
}

export function dispatchEvent(event) {
    try {
        const data = event.data ? JSON.parse(event.data) : {};
        const cmpId = data.arguments ? data.arguments.cmpId : null;

        if (cmpId && messageHandlers[cmpId]) {
            return messageHandlers[cmpId](data);
        }

        return true;
    } catch (e) {
        console.log(e);
    }

    return false;
};

export function getDomains() {
    return domains.map(e => e.domain);
}

export function postMessage(e, n, t, s) {
    if (e) {
        e(s ? n : JSON.stringify(n || {}), t);
    }
}

export function registerDomain(e) {
    if (!e || e === '') {
        return;
    }
    const n = domains.find(n => n.domain === e);

    if (n) {
        n.ref += 1;
    } else {
        domains.push({ domain: e, ref: 1 });
    }
}

export function registerMessageHandler(handler) {
    const messageHandlerName = `lightningIframeMessage-${iframeMessageIndex++}`;

    messageHandlers[messageHandlerName] = handler;

    if (!status.isMessageEventHandled) {
        status.isMessageEventHandled = true;

        window.addEventListener('message', event => {
            dispatchEvent(event);
        });
    }

    return messageHandlerName;
}

export function setMessageEventHandled() {
    status.isMessageEventHandled = true;
}

export function unregisterDomain(e) {
    if (!e || '' === e) {
        return;
    }
    const n = domains.findIndex(n => n.domain === e);
    if (n >= 0) {
        const e = domains[n];
        e.ref -= 1;

        if (e.ref === 0) {
            domains.splice(n, 1);
        }
    }
}

export function unregisterMessageHandler(e) {
    delete messageHandlers[e];
}
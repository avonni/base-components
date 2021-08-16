/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

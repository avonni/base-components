import { ElementProxy } from './elementProxy';
import { WindowManager, POSITION_ATTR_NAME } from './util';

class ProxyCache {
    proxyCache = {};

    get count() {
        return Object.keys(this.proxyCache).length;
    }

    bakeOff() {
        for (const proxy in this.proxyCache) {
            if (this.proxyCache[proxy].el.isDirty()) {
                this.proxyCache[proxy].el.bake();
            }
        }
    }
    getReferenceCount(proxy) {
        const id = proxy.id;
        if (!id || !this.proxyCache[id]) {
            return 0;
        }
        return this.proxyCache[id].refCount;
    }

    release(proxy) {
        const proxyInstance = this.proxyCache[proxy.id];
        if (proxyInstance) {
            --proxyInstance.refCount;
        }
        if (proxyInstance && proxyInstance.refCount <= 0) {
            delete this.proxyCache[proxy.id];
        }
    }

    reset() {
        this.proxyCache = {};
    }

    create(element) {
        let key = 'window';
        if (!WindowManager.isWindow(element)) {
            key = element ? element.getAttribute(POSITION_ATTR_NAME) : null;
            // 1 - Node.ELEMENT_NODE, 11 - Node.DOCUMENT_FRAGMENT_NODE
            if (
                !key ||
                !element.nodeType ||
                !(element.nodeType !== 1 || element.nodeType !== 11)
            ) {
                throw new Error(
                    `Element Proxy requires an element and has property ${POSITION_ATTR_NAME}`
                );
            }
        }

        if (this.proxyCache[key]) {
            this.proxyCache[key].refCount++;
            return this.proxyCache[key].el;
        }

        const newProxy = new ElementProxy(element, key);
        newProxy.setReleaseCallback(release, newProxy);

        this.proxyCache[key] = {
            el: newProxy,
            refCount: 1
        };

        return this.proxyCache[key].el;
    }
}

const elementProxyCache = new ProxyCache();

export function bakeOff() {
    elementProxyCache.bakeOff();
}

export function getReferenceCount(proxy) {
    return elementProxyCache.getReferenceCount(proxy);
}

export function release(proxy) {
    return elementProxyCache.release(proxy);
}

export function reset() {
    elementProxyCache.reset();
}

export function createProxy(element) {
    return elementProxyCache.create(element);
}

export function count() {
    return elementProxyCache.count;
}

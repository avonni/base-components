import { reposition } from './reposition';
import { POSITION_ATTR_NAME } from './util';

export class Relationship {
    constructor(config, constraintList, scrollableParent, observer) {
        this.config = config;
        this.constraintList = constraintList;
        this.scrollableParent = scrollableParent;
        this.observer = observer;
    }
    disable() {
        this.constraintList.forEach((constraintToDisable) => {
            constraintToDisable.detach();
        });
    }

    enable() {
        this.constraintList.forEach((constraintToEnable) => {
            constraintToEnable.attach();
        });
    }

    destroy() {
        if (this.config.removeListeners) {
            this.config.removeListeners();
            this.config.removeListeners = undefined;
        }

        while (this.constraintList.length > 0) {
            this.constraintList.pop().destroy();
        }

        // Clean up node appended to body of dom
        if (this.config.appendToBody && this.config.element) {
            // eslint-disable-next-line @lwc/lwc/no-document-query
            const nodeToRemove = document.querySelector(
                `[${POSITION_ATTR_NAME}="${this.config.element.getAttribute(
                    POSITION_ATTR_NAME
                )}"]`
            );
            if (nodeToRemove) {
                nodeToRemove.parentNode.removeChild(nodeToRemove);
            }
        }

        // Due to https://github.com/salesforce/lwc/pull/1423
        // require to call disconnect explicitly.
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    reposition() {
        return new Promise((resolve) => {
            reposition(() => {
                resolve();
            });
        });
    }
}

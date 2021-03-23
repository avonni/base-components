import { LightningElement, api } from 'lwc';
import { registerDomain, unregisterDomain } from 'c/messageDispatcher';

/**
 * Class representing primitive iframe.
 * @extends Element
 */
export default class PrimitiveIframe extends LightningElement {
    @api src;
    @api domain;
    @api width = '100%';
    @api height = '100%';
    @api frameStyle = '';
    @api title;

    language = document.documentElement.lang || null;

    connectedCallback() {
        registerDomain(this.src);
    }

    disconnectedCallback() {
        unregisterDomain(this.src);
    }

    handleContentLoad() {
        const iframeload = new CustomEvent('iframeload', {
            detail: {
                callbacks: {
                    postToWindow: this.postToWindow.bind(this)
                }
            }
        });

        this.contentWindow = this.template.querySelector(
            'iframe'
        ).contentWindow;
        this.dispatchEvent(iframeload);
    }

    @api
    postToWindow(message) {
        if (this.contentWindow) {
            this.contentWindow.postMessage(message, this.domain);
        }
    }
}

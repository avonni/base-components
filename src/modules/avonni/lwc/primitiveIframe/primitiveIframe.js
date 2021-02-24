import { LightningElement, api } from 'lwc';
import { registerDomain, unregisterDomain } from 'c/messageDispatcher';

export default class PrimitiveIframe extends LightningElement {
    @api src;
    @api domain;
    @api width = '100%';
    @api height = '100%';
    @api frameStyle = '';
    @api title;

    connectedCallback() {
        registerDomain(this.src);
    }

    disconnectedCallback() {
        unregisterDomain(this.src);
    }

    handleContentLoad() {
        const event = new CustomEvent('iframeload', {
            detail: {
                callbacks: {
                    postToWindow: this.postToWindow.bind(this)
                }
            }
        });

        this.contentWindow = this.template.querySelector(
            'iframe'
        ).contentWindow;
        this.dispatchEvent(event);
    }

    @api
    postToWindow(value) {
        if (this.contentWindow) {
            this.contentWindow.postMessage(value, this.domain);
        }
    }
}

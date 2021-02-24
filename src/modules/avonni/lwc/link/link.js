import { LightningElement, api } from 'lwc';

export default class Link extends LightningElement {
    @api type;
    @api label;
    @api href;
    @api className;
    @api title;
    @api target = '_blank';
    @api rel;

    @api
    focus() {
        this.linkElement.focus();
    }

    @api
    blur() {
        this.linkElement.blur();
    }
    get computedHref() {
        return this.href
            ? '/HelpAndTrainingDoor?version=2&resource=' +
                  encodeURIComponent(this.href)
            : '';
    }
    get computedClass() {
        return this.className || '';
    }
    get linkElement() {
        return this.template.querySelector('a');
    }
}

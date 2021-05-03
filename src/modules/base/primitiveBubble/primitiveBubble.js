import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { classListMutation } from 'c/utilsPrivate';

const DEFAULT_ALIGN = {
    horizontal: 'left',
    vertical: 'bottom',
};

export default class PrimitiveBubble extends LightningElement {
    @track
    state = {
        visible: false,
        contentId: '',
    };

    divElement;

    @api
    get contentId() {
        return this.state.contentId;
    }

    set contentId(value) {
        this.state.contentId = value;

        if (this.state.inDOM) {
            this.divEl.setAttribute('id', this.state.contentId);
        }
    }

    connectedCallback() {
        this.updateClassList();
        this.setAttribute('role', 'tooltip');
        this.state.inDOM = true;
    }

    disconnectedCallback() {
        this.state.inDOM = false;
    }

    renderedCallback() {
        // set content manually once rendered
        // - this is required to avoid the content update being in the wrong 'tick'
        this.setContentManually();
        this.setIdManually();
    }

    set content(value) {
        this.state.content = value;

        if (this.state.inDOM) {
            this.setContentManually();
        }
    }

    @api
    get content() {
        return this.state.content || '';
    }

    @api
    get align() {
        return this.state.align || DEFAULT_ALIGN;
    }
    set align(value) {
        this.state.align = value;
        this.updateClassList();
    }

    @api
    get visible() {
        return this.state.visible;
    }

    set visible(value) {
        this.state.visible = value;
        this.updateClassList();
    }

    setIdManually() {
        this.divElement = this.divElement
            ? this.divElement
            : this.template.querySelector('div');
        this.divElement.setAttribute('id', this.state.contentId);
    }

    // manually set the content value
    setContentManually() {
        /* manipulate DOM directly */
        this.template.querySelector(
            '.slds-popover__body'
        ).textContent = this.state.content;
    }

    // compute class value for this bubble
    updateClassList() {
        const classes = classSet('slds-popover').add('slds-popover_tooltip');

        // show or hide bubble
        classes.add({
            'slds-rise-from-ground': this.visible,
            'slds-fall-into-ground': !this.visible,
        });

        // apply the proper nubbin CSS class
        const { horizontal, vertical } = this.align;
        classes.add({
            'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
            'slds-nubbin_top-right':
                horizontal === 'right' && vertical === 'top',
            'slds-nubbin_bottom-left':
                horizontal === 'left' && vertical === 'bottom',
            'slds-nubbin_bottom-right':
                horizontal === 'right' && vertical === 'bottom',
            'slds-nubbin_bottom':
                horizontal === 'center' && vertical === 'bottom',
            'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
            'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
            'slds-nubbin_right':
                horizontal === 'right' && vertical === 'center',
        });

        classListMutation(this.classList, classes);
    }

    handleMouseLeave() {
        this.visible = false;
    }
}

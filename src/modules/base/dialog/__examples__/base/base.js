import { LightningElement } from 'lwc';

export default class DialogBase extends LightningElement {
    openDialog() {
        const dialog = this.template.querySelector('avonni-dialog');
        dialog.show();
    }
}

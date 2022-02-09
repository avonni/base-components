import { LightningElement } from 'lwc';

export default class DialogBaseXSmall extends LightningElement {
    openDialog() {
        const dialog = this.template.querySelector('avonni-dialog');
        dialog.show();
    }
}

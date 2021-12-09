import { LightningElement } from 'lwc';

export default class DialogBaseSmall extends LightningElement {
    openDialog() {
        const dialog = this.template.querySelector('avonni-dialog');
        dialog.show();
    }
}

import { LightningElement, api } from 'lwc';

export default class Alert extends LightningElement {
    @api iconName;
    @api closeAction;
    @api variant;
    @api textured;
    @api isDismissible;
}

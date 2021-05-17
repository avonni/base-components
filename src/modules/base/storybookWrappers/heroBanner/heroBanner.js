import { LightningElement, api } from 'lwc';

const DEFAULT_TEXT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_TEXT_VERTICAL_ALIGNMENT = 'center';

export default class DynamicMenu extends LightningElement {
    @api title;
    @api description;
    @api src;
    @api textHorizontalAlignment = DEFAULT_TEXT_HORIZONTAL_ALIGNMENT;
    @api textVerticalAlignment = DEFAULT_TEXT_VERTICAL_ALIGNMENT;
}

import { LightningElement, api } from 'lwc';

const DEFAULT_TEXT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_TEXT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_TITLE_FONT_COLOR = '#ffffff';
const DEFAULT_DESCRIPTION_FONT_COLOR = '#ffffff';
const DEFAULT_TITLE_FONT_SIZE = 'large';
const DEFAULT_DESCRIPTION_FONT_SIZE = 'medium';

export default class DynamicMenu extends LightningElement {
    @api title;
    @api titleFontColor = DEFAULT_TITLE_FONT_COLOR;
    @api titleFontSize = DEFAULT_TITLE_FONT_SIZE;
    @api description;
    @api descriptionFontColor = DEFAULT_DESCRIPTION_FONT_COLOR;
    @api descriptionFontSize = DEFAULT_DESCRIPTION_FONT_SIZE;
    @api src;
    @api textHorizontalAlignment = DEFAULT_TEXT_HORIZONTAL_ALIGNMENT;
    @api textVerticalAlignment = DEFAULT_TEXT_VERTICAL_ALIGNMENT;
}

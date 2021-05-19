import { LightningElement, api } from 'lwc';

const DEFAULT_TEXT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_TEXT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_TITLE_FONT_COLOR = '#ffffff';
const DEFAULT_DESCRIPTION_FONT_COLOR = '#ffffff';
const DEFAULT_TITLE_FONT_SIZE = 'large';
const DEFAULT_DESCRIPTION_FONT_SIZE = 'medium';
const DEFAULT_HEIGHT = '400';
const DEFAULT_TITLE_FONT_WEIGHT = 'bold';
const DEFAULT_DESCRIPTION_FONT_WEIGHT = 'normal';
const DEFAULT_LINEAR_GRADIENT = 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)';
const DEFAULT_FONT_FAMILY = '"Salesforce Sans", Arial, sans-serif';

export default class HeroBannerWithButton extends LightningElement {
    @api title;
    @api titleFontColor = DEFAULT_TITLE_FONT_COLOR;
    @api titleFontFamily = DEFAULT_FONT_FAMILY;
    @api titleFontSize = DEFAULT_TITLE_FONT_SIZE;
    @api titleFontWeight = DEFAULT_TITLE_FONT_WEIGHT;
    @api description;
    @api descriptionFontColor = DEFAULT_DESCRIPTION_FONT_COLOR;
    @api descriptionFontFamily = DEFAULT_FONT_FAMILY;
    @api descriptionFontSize = DEFAULT_DESCRIPTION_FONT_SIZE;
    @api descriptionFontWeight = DEFAULT_DESCRIPTION_FONT_WEIGHT;
    @api src;
    @api linearGradient = DEFAULT_LINEAR_GRADIENT;
    @api height = DEFAULT_HEIGHT;
    @api textHorizontalAlignment = DEFAULT_TEXT_HORIZONTAL_ALIGNMENT;
    @api textVerticalAlignment = DEFAULT_TEXT_VERTICAL_ALIGNMENT;
}

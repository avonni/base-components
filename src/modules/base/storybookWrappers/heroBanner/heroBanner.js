import { LightningElement, api } from 'lwc';

const DEFAULT_TEXT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_TEXT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_TITLE_COLOR = '#ffffff';
const DEFAULT_SUBTITLE_COLOR = '#ffffff';
const DEFAULT_TITLE_FONT_SIZE = 'large';
const DEFAULT_SUBTITLE_FONT_SIZE = 'medium';
const DEFAULT_HEIGHT = '400';
const DEFAULT_TITLE_FONT_WEIGHT = 'bold';
const DEFAULT_SUBTITLE_FONT_WEIGHT = 'normal';
const DEFAULT_LINEAR_GRADIENT = 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)';
const DEFAULT_FONT_FAMILY = '"Salesforce Sans", Arial, sans-serif';

export default class HeroBanner extends LightningElement {
    @api title;
    @api titleColor = DEFAULT_TITLE_COLOR;
    @api titleFontFamily = DEFAULT_FONT_FAMILY;
    @api titleFontSize = DEFAULT_TITLE_FONT_SIZE;
    @api titleFontWeight = DEFAULT_TITLE_FONT_WEIGHT;
    @api subtitle;
    @api subtitleColor = DEFAULT_SUBTITLE_COLOR;
    @api subtitleFontFamily = DEFAULT_FONT_FAMILY;
    @api subtitleFontSize = DEFAULT_SUBTITLE_FONT_SIZE;
    @api subtitleFontWeight = DEFAULT_SUBTITLE_FONT_WEIGHT;
    @api src;
    @api linearGradient = DEFAULT_LINEAR_GRADIENT;
    @api height = DEFAULT_HEIGHT;
    @api textHorizontalAlignment = DEFAULT_TEXT_HORIZONTAL_ALIGNMENT;
    @api textVerticalAlignment = DEFAULT_TEXT_VERTICAL_ALIGNMENT;
}

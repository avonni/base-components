import { LightningElement, api } from 'lwc';

const DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_CONTENT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_HEIGHT = 400;
const DEFAULT_MAX_WIDTH = 960;
const DEFAULT_CONTENT_WIDTH = 100;

export default class HeroBanner extends LightningElement {
    @api title;
    @api caption;
    @api subtitle;
    @api src;
    @api height = DEFAULT_HEIGHT;
    @api maxWidth = DEFAULT_MAX_WIDTH;
    @api contentHorizontalAlignment = DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT;
    @api contentVerticalAlignment = DEFAULT_CONTENT_VERTICAL_ALIGNMENT;
    @api contentWidth = DEFAULT_CONTENT_WIDTH;
    @api primaryButtonLabel;
    @api secondaryButtonLabel;
}

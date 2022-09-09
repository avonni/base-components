import { LightningElement, api } from 'lwc';

const DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_CONTENT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_HEIGHT = 400;
const DEFAULT_MAX_WIDTH = 960;
const DEFAULT_CONTENT_WIDTH = 100;
const DEFAULT_ICON_POSITION = 'left';
const DEFAULT_ICON_SIZE = 'medium';
const DEFAULT_BUTTON_VARIANT = 'neutral';

export default class HeroBannerWithSearchBarInFooter extends LightningElement {
    @api title;
    @api caption;
    @api subtitle;
    @api src;
    @api height = DEFAULT_HEIGHT;
    @api maxWidth = DEFAULT_MAX_WIDTH;
    @api contentHorizontalAlignment = DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT;
    @api contentVerticalAlignment = DEFAULT_CONTENT_VERTICAL_ALIGNMENT;
    @api contentWidth = DEFAULT_CONTENT_WIDTH;
    @api primaryButtonIconName;
    @api primaryButtonIconPosition = DEFAULT_ICON_POSITION;
    @api primaryButtonIconSize = DEFAULT_ICON_SIZE;
    @api primaryButtonLabel;
    @api primaryButtonVariant = DEFAULT_BUTTON_VARIANT;
    @api secondaryButtonIconName;
    @api secondaryButtonIconPosition = DEFAULT_ICON_POSITION;
    @api secondaryButtonIconSize = DEFAULT_ICON_SIZE;
    @api secondaryButtonLabel;
    @api secondaryButtonVariant = DEFAULT_BUTTON_VARIANT;
}

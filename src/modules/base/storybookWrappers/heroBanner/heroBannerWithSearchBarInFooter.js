import { LightningElement, api } from 'lwc';

const DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT = 'left';
const DEFAULT_CONTENT_VERTICAL_ALIGNMENT = 'center';
const DEFAULT_TEXT_COLOR = '#ffffff';
const DEFAULT_BACKGROUND_COLOR = '#ffffff';
const DEFAULT_BUTTON_BACKGROUND_COLOR = '#0932c6';
const DEFAULT_BUTTON_BACKGROUND_HOVER_COLOR = '#092695';
const DEFAULT_TITLE_FONT_SIZE = 'large';
const DEFAULT_CAPTION_FONT_SIZE = 'small';
const DEFAULT_SUBTITLE_FONT_SIZE = 'medium';
const DEFAULT_HEIGHT = 400;
const DEFAULT_MAX_WIDTH = 960;
const DEFAULT_CONTENT_WIDTH = 100;
const DEFAULT_TITLE_FONT_WEIGHT = 'bold';
const DEFAULT_CAPTION_FONT_WEIGHT = 'light';
const DEFAULT_SUBTITLE_FONT_WEIGHT = 'normal';
const DEFAULT_LINEAR_GRADIENT = 'rgba(0,0,0,0.4), rgba(0,0,0,0.4)';
const DEFAULT_FONT_FAMILY = '"Salesforce Sans", Arial, sans-serif';
const DEFAULT_SHADOW_COLOR = '1px 1px 0 rgb(0 0 0 / 50%)';
const DEFAULT_BUTTON_BORDER_RADIUS = 4;

export default class HeroBannerWithSearchBarInFooter extends LightningElement {
    @api title;
    @api titleColor = DEFAULT_TEXT_COLOR;
    @api titleFontFamily = DEFAULT_FONT_FAMILY;
    @api titleFontSize = DEFAULT_TITLE_FONT_SIZE;
    @api titleFontWeight = DEFAULT_TITLE_FONT_WEIGHT;
    @api titleShadowColor = DEFAULT_SHADOW_COLOR;
    @api caption;
    @api captionColor = DEFAULT_TEXT_COLOR;
    @api captionFontFamily = DEFAULT_FONT_FAMILY;
    @api captionFontSize = DEFAULT_CAPTION_FONT_SIZE;
    @api captionFontWeight = DEFAULT_CAPTION_FONT_WEIGHT;
    @api captionShadowColor = DEFAULT_SHADOW_COLOR;
    @api subtitle;
    @api subtitleColor = DEFAULT_TEXT_COLOR;
    @api subtitleFontFamily = DEFAULT_FONT_FAMILY;
    @api subtitleFontSize = DEFAULT_SUBTITLE_FONT_SIZE;
    @api subtitleFontWeight = DEFAULT_SUBTITLE_FONT_WEIGHT;
    @api subtitleShadowColor = DEFAULT_SHADOW_COLOR;
    @api src;
    @api backgroundColor = DEFAULT_BACKGROUND_COLOR;
    @api linearGradient = DEFAULT_LINEAR_GRADIENT;
    @api height = DEFAULT_HEIGHT;
    @api maxWidth = DEFAULT_MAX_WIDTH;
    @api contentHorizontalAlignment = DEFAULT_CONTENT_HORIZONTAL_ALIGNMENT;
    @api contentVerticalAlignment = DEFAULT_CONTENT_VERTICAL_ALIGNMENT;
    @api contentWidth = DEFAULT_CONTENT_WIDTH;
    @api primaryButtonLabel;
    @api primaryButtonTextColor = DEFAULT_TEXT_COLOR;
    @api primaryButtonTextHoverColor = DEFAULT_TEXT_COLOR;
    @api primaryButtonBackgroundColor = DEFAULT_BUTTON_BACKGROUND_COLOR;
    @api
    primaryButtonBackgroundHoverColor = DEFAULT_BUTTON_BACKGROUND_HOVER_COLOR;
    @api primaryButtonBorderColor;
    @api primaryButtonBorderRadius = DEFAULT_BUTTON_BORDER_RADIUS;
    @api secondaryButtonLabel;
    @api secondaryButtonTextColor = DEFAULT_TEXT_COLOR;
    @api secondaryButtonTextHoverColor = DEFAULT_TEXT_COLOR;
    @api secondaryButtonBackgroundColor = DEFAULT_BUTTON_BACKGROUND_COLOR;
    @api
    secondaryButtonBackgroundHoverColor = DEFAULT_BUTTON_BACKGROUND_HOVER_COLOR;
    @api secondaryButtonBorderColor;
    @api secondaryButtonBorderRadius = DEFAULT_BUTTON_BORDER_RADIUS;
}

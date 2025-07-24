import { LightningElement, api } from 'lwc';

const DEFAULT_BUTTON_POSITION = 'middle';
const DEFAULT_BUTTONS_VARIANT = 'neutral';
const DEFAULT_FRACTION_LABEL = '/';
const DEFAULT_INDICATOR_POSITION = 'bottom-center';
const DEFAULT_INDICATOR_TYPE = 'bullets';
const DEFAULT_INITIAL_SLIDE = 0;
const DEFAULT_NEXT_BUTTON_ICON_NAME = 'utility:right';
const DEFAULT_NEXT_ICON_POSITION = 'right';
const DEFAULT_PREVIOUS_BUTTON_ICON_NAME = 'utility:left';
const DEFAULT_PREVIOUS_ICON_POSITION = 'left';
const DEFAULT_SLIDES_DIRECTION = 'horizontal';
const DEFAULT_SLIDES_EFFECT = 'slide';
const DEFAULT_SLIDES_PER_VIEW = 1;
const DEFAULT_SPACE_BETWEEN = 0;
const DEFAULT_SPEED = 300;

export default class Slides extends LightningElement {
    @api autoplayDelay;
    @api buttonInner = false;
    @api buttonPosition = DEFAULT_BUTTON_POSITION;
    @api coverflowSlideHeight;
    @api coverflowSlideWidth;
    @api direction = DEFAULT_SLIDES_DIRECTION;
    @api effect = DEFAULT_SLIDES_EFFECT;
    @api fractionLabel = DEFAULT_FRACTION_LABEL;
    @api fractionPrefixLabel;
    @api height;
    @api indicatorInner = false;
    @api indicatorPosition = DEFAULT_INDICATOR_POSITION;
    @api indicators = false;
    @api indicatorType = DEFAULT_INDICATOR_TYPE;
    @api initialSlide = DEFAULT_INITIAL_SLIDE;
    @api loop = false;
    @api navigation = false;
    @api nextButtonIconName = DEFAULT_NEXT_BUTTON_ICON_NAME;
    @api nextButtonIconPosition = DEFAULT_NEXT_ICON_POSITION;
    @api nextButtonLabel;
    @api nextButtonVariant = DEFAULT_BUTTONS_VARIANT;
    @api previousButtonIconName = DEFAULT_PREVIOUS_BUTTON_ICON_NAME;
    @api previousButtonIconPosition = DEFAULT_PREVIOUS_ICON_POSITION;
    @api previousButtonLabel;
    @api previousButtonVariant = DEFAULT_BUTTONS_VARIANT;
    @api slidesPerView = DEFAULT_SLIDES_PER_VIEW;
    @api spaceBetween = DEFAULT_SPACE_BETWEEN;
    @api speed = DEFAULT_SPEED;
    @api width;
}

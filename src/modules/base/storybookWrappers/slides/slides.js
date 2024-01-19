import { LightningElement, api } from 'lwc';

const DEFAULT_SLIDES_PER_VIEW = 1;
const DEFAULT_SPACE_BETWEEN = 0;
const DEFAULT_SPEED = 300;
const DEFAULT_PREVIOUS_BUTTON_ICON_NAME = 'utility:left';
const DEFAULT_NEXT_BUTTON_ICON_NAME = 'utility:right';
const DEFAULT_FRACTION_LABEL = '/';
const DEFAULT_INITIAL_SLIDE = 0;
const DEFAULT_SLIDES_DIRECTION = 'horizontal';
const DEFAULT_SLIDES_EFFECT = 'slide';
const DEFAULT_PREVIOUS_ICON_POSITION = 'left';
const DEFAULT_BUTTONS_VARIANT = 'neutral';
const DEFAULT_NEXT_ICON_POSITION = 'right';
const DEFAULT_BUTTON_POSITION = 'middle';
const DEFAULT_INDICATOR_TYPE = 'bullets';
const DEFAULT_INDICATOR_POSITION = 'bottom-center';

export default class Slides extends LightningElement {
    @api slidesPerView = DEFAULT_SLIDES_PER_VIEW;
    @api spaceBetween = DEFAULT_SPACE_BETWEEN;
    @api autoplayDelay;
    @api speed = DEFAULT_SPEED;
    @api initialSlide = DEFAULT_INITIAL_SLIDE;
    @api previousButtonIconName = DEFAULT_PREVIOUS_BUTTON_ICON_NAME;
    @api previousButtonLabel;
    @api nextButtonIconName = DEFAULT_NEXT_BUTTON_ICON_NAME;
    @api nextButtonLabel;
    @api fractionPrefixLabel;
    @api fractionLabel = DEFAULT_FRACTION_LABEL;
    @api width;
    @api height;
    @api coverflowSlideWidth;
    @api coverflowSlideHeight;
    @api direction = DEFAULT_SLIDES_DIRECTION;
    @api effect = DEFAULT_SLIDES_EFFECT;
    @api previousButtonIconPosition = DEFAULT_PREVIOUS_ICON_POSITION;
    @api previousButtonVariant = DEFAULT_BUTTONS_VARIANT;
    @api nextButtonIconPosition = DEFAULT_NEXT_ICON_POSITION;
    @api nextButtonVariant = DEFAULT_BUTTONS_VARIANT;
    @api buttonPosition = DEFAULT_BUTTON_POSITION;
    @api indicatorType = DEFAULT_INDICATOR_TYPE;
    @api indicatorPosition = DEFAULT_INDICATOR_POSITION;
    @api navigation = false;
    @api buttonInner = false;
    @api indicators = false;
    @api indicatorInner = false;
    @api loop = false;
}
